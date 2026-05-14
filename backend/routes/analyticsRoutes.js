import express from 'express'
import {
  getOverview,
  getRegistrationTrend,
  getCategoryStats,
  getBookingHeatmap,
  getConversionFunnel,
  getPriceElasticity,
  getTopEvents,
  getPricingMonitor
} from '../controllers/analyticsController.js'
import {protect, authorize} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/overview', protect, authorize('admin'), getOverview)
router.get('/registrations', protect, authorize('admin'), getRegistrationTrend)
router.get('/categories', protect, authorize('admin'), getCategoryStats)
router.get('/heatmap', protect, authorize('admin'), getBookingHeatmap)
router.get('/funnel', protect, authorize('admin'), getConversionFunnel)
router.get('/top-events', protect, authorize('admin'), getTopEvents)
router.get('/pricing-monitor', protect, authorize('admin'), getPricingMonitor)
router.get('/price-elasticity/:eventId', protect, authorize('admin'), getPriceElasticity)

export default router