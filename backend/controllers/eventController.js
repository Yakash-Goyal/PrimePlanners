import {Event} from '../models/events.model.js'
import {Analytics} from '../models/analytics.model.js'
import {PriceLog} from '../models/priceLog.model.js'

// GET /api/events
export const getAllEvents = async (req, res) => {
  try{
    const { category, search, sort } = req.query

    let filter = { isActive: true }
    if (category) filter.category = category
    if (search) filter.title = { $regex: search, $options: 'i' }

    let sortOption = { createdAt: -1 }
    if (sort === 'price_asc') sortOption = { basePrice: 1 }
    if (sort === 'price_desc') sortOption = { basePrice: -1 }
    if (sort === 'date') sortOption = { date: 1 }

    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort(sortOption)

    const eventsWithPrice = events.map(event => ({
      ...event.toObject(),
      pricing: event.getCurrentPrice()
    }))
    res.status(200).json({ events: eventsWithPrice })

  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/events/:id
export const getEventById = async (req, res) => {
  try{
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    await Event.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
    await Analytics.create({
      user: req.user?._id || null,
      event: event._id,
      actionType: 'event_click',
      metadata: { category: event.category }
    })

    const pricing = event.getCurrentPrice()

    await PriceLog.create({
      event: event._id,
      basePrice: pricing.basePrice,
      finalPrice: pricing.finalPrice,
      demandMultiplier: pricing.demandMultiplier,
      timeMultiplier: pricing.timeMultiplier,
      categoryMultiplier: pricing.categoryMultiplier,
      fillRateAtTime: pricing.fillRate,
      daysUntilEvent: Math.ceil((event.date - Date.now()) / (1000 * 60 * 60 * 24))
    })

    res.status(200).json({
      event: { ...event.toObject(), pricing }
    })

  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/events
export const createEvent = async (req, res) => {
  try{
    const { title, description, category, date, location, venue, image, totalSeats, basePrice } = req.body
    const event = await Event.create({
      title, description, category, date,
      location, venue, image, totalSeats, basePrice,
      organizer: req.user._id
    })

    res.status(201).json({ message: 'Event created successfully', event })
  }catch (error){
    res.status(500).json({ message: error.message })
  }
}

// PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Event not found' })

    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this event' })
    }
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: 'Event updated', event: updated })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Event not found' })

    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this event' })
    }
    await Event.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Event deleted successfully' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/events/:id/price
export const getEventPrice = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'Event not found' })
    const pricing = event.getCurrentPrice()
    res.status(200).json({ pricing })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}