import {Booking} from '../models/booking.model.js'
import {Event} from '../models/events.model.js'
import {Analytics} from '../models/analytics.model.js'
import {PriceLog} from '../models/priceLog.model.js'

// POST /api/bookings
export const createBooking = async (req, res) => {
  try{
    const {eventId, seats} = req.body
    const event = await Event.findById(eventId)
    if(!event) return res.status(404).json({ message: 'Event not found' })

    if(event.bookedSeats + seats > event.totalSeats) {
      return res.status(400).json({
        message: `Only ${event.totalSeats - event.bookedSeats} seats remaining`
      })
    }

    const pricing = event.getCurrentPrice()
    const totalPrice = pricing.finalPrice * seats

    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      seats,
      totalPrice,
      pricingSnapshot: {
        basePrice: pricing.basePrice,
        demandMultiplier: pricing.demandMultiplier,
        timeMultiplier: pricing.timeMultiplier,
        categoryMultiplier: pricing.categoryMultiplier,
        fillRateAtBooking: pricing.fillRate
      }
    })

    await Event.findByIdAndUpdate(eventId, {$inc:{bookedSeats: seats}})
    await PriceLog.create({
      event: eventId,
      basePrice: pricing.basePrice,
      finalPrice: pricing.finalPrice,
      demandMultiplier: pricing.demandMultiplier,
      timeMultiplier: pricing.timeMultiplier,
      categoryMultiplier: pricing.categoryMultiplier,
      fillRateAtTime: pricing.fillRate,
      daysUntilEvent: Math.ceil((event.date - Date.now()) / (1000 * 60 * 60 * 24))
    })

    await Analytics.create({
      user: req.user._id,
      event: eventId,
      actionType: 'booking_completed',
      metadata: {category: event.category}
    })
    const {User} = await import('../models/User.js')
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {categoryPreferences: event.category}
    })

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: await booking.populate('event', 'title date location image')
    })

  }catch(error){
    res.status(500).json({ message: error.message })
  }
}

// GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try{
    const bookings = await Booking.find({user: req.user._id})
      .populate('event', 'title date location image category basePrice')
      .sort({createdAt: -1})

    res.status(200).json({bookings})
  }catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/bookings/:id
export const cancelBooking = async (req, res) => {
  try{
    const booking = await Booking.findById(req.params.id)
    if(!booking) return res.status(404).json({message: 'Booking not found'})

    if(booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' })
    }

    await Event.findByIdAndUpdate(booking.event, {
      $inc: {bookedSeats: -booking.seats}
    })

    booking.status = 'cancelled'
    await booking.save()
    res.status(200).json({ message: 'Booking cancelled successfully' })

  }catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/bookings/all
export const getAllBookings = async (req, res) => {
  try{
    const bookings = await Booking.find()
      .populate('user', 'name email role')
      .populate('event', 'title date category')
      .sort({ createdAt: -1 })

    res.status(200).json({ bookings })

  }catch(error){
    res.status(500).json({ message: error.message })
  }
}