import {Analytics} from '../models/analytics.model.js'
import {Booking} from '../models/booking.model.js'
import {Event} from '../models/events.model.js'
import {User} from '../models/user.model.js'
import {PriceLog} from '../models/priceLog.model.js'

// GET /api/analytics/overview
export const getOverview = async (req, res) => {
  try{
    const [totalUsers, totalEvents, totalBookings, allBookings] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments({ isActive: true }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.find({ status: 'confirmed' })
    ])

    const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalPrice, 0)
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' })
    const cancellationRate = totalBookings > 0 ? ((cancelledBookings / (totalBookings + cancelledBookings)) * 100).toFixed(1) : 0

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalBookings,
      totalRevenue,
      cancellationRate
    })
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

// GET /api/analytics/registrations
export const getRegistrationTrend = async (req, res) => {
  try{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const data = await Booking.aggregate([
      { $match:{createdAt: {$gte: thirtyDaysAgo}, status: 'confirmed'}},
      {
        $group: {
          _id: { $dateToString:{format: '%Y-%m-%d', date: '$createdAt'}},
          bookings: {$sum: 1},
          revenue: {$sum: '$totalPrice'}
        }
      },
      {$sort: {_id: 1}}
    ])

    res.status(200).json({ data })
  }catch(error) {
    res.status(500).json({ message: error.message})
  }
}

// GET /api/analytics/categories
export const getCategoryStats = async (req, res) => {
  try{
    const data = await Booking.aggregate([
      {$match: { status:'confirmed'}},
      {
        $lookup:{
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'eventData'
        }
      },
      {$unwind: '$eventData'},
      {
        $group: {
          _id: '$eventData.category',
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      { $sort: { bookings: -1 } }
    ])

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// GET /api/analytics/heatmap
export const getBookingHeatmap = async (req, res) => {
  try{
    const data = await Booking.aggregate([
      {
        $group:{
          _id:{
            hour: {$hour: '$createdAt'},
            dayOfWeek: {$dayOfWeek: '$createdAt'}
          },
          count:{$sum: 1}
        }
      },
      {$sort: { '_id.dayOfWeek': 1, '_id.hour': 1}}
    ])

    res.status(200).json({ data })
  }catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/funnel
export const getConversionFunnel = async (req, res) => {
  try{
    const [views, clicks, started, completed] = await Promise.all([
      Analytics.countDocuments({ actionType: 'page_view' }),
      Analytics.countDocuments({ actionType: 'event_click' }),
      Analytics.countDocuments({ actionType: 'booking_started' }),
      Analytics.countDocuments({ actionType: 'booking_completed' })
    ])

    res.status(200).json({
      funnel:[
        {stage: 'Page Views', count: views},
        {stage: 'Event Clicks', count: clicks},
        {stage: 'Booking Started', count: started},
        {stage: 'Booking Completed', count: completed}
      ]
    })
  }catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/price-elasticity/:eventId
export const getPriceElasticity = async (req, res) => {
  try{
    const priceLogs = await PriceLog.find({ event: req.params.eventId })
      .sort({ createdAt: 1 })

    const data = priceLogs.map(log => ({
      date: log.createdAt,
      finalPrice: log.finalPrice,
      fillRate: log.fillRateAtTime,
      demandMultiplier: log.demandMultiplier
    }))

    res.status(200).json({data})
  }catch(error) {
    res.status(500).json({message: error.message})
  }
}

// GET /api/analytics/top-events
export const getTopEvents = async (req, res) => {
  try{
    const data = await Booking.aggregate([
      {$match: { status: 'confirmed'}},
      {
        $group:{
          _id: '$event',
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
          totalSeats: { $sum: '$seats' }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'eventData'
        }
      },
      {$unwind: '$eventData'},
      {
        $project:{
          title: '$eventData.title',
          category: '$eventData.category',
          totalBookings: 1,
          totalRevenue: 1,
          totalSeats: 1,
          conversionRate:{
            $multiply:[
              { $divide: ['$totalBookings', '$eventData.views'] },
              100
            ]
          }
        }
      },
      {$sort: { totalRevenue: -1 } },
      { $limit: 10 }
    ])

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/pricing-monitor
export const getPricingMonitor = async (req, res) => {
  try{
    const events = await Event.find({ isActive: true })
      .populate('organizer', 'name')

    const monitor = events.map(event => {
      const pricing = event.getCurrentPrice()
      return{
        _id: event._id,
        title: event.title,
        category: event.category,
        date: event.date,
        totalSeats: event.totalSeats,
        bookedSeats: event.bookedSeats,
        ...pricing,
        demandLevel:
          pricing.fillRate >= 90 ? 'Critical' :
          pricing.fillRate >= 70 ? 'High' :
          pricing.fillRate >= 40 ? 'Medium' : 'Low'
      }
    })

    res.status(200).json({ monitor })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role bio createdAt').sort({ createdAt: -1 })
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}