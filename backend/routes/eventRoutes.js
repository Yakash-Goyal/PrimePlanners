import express from 'express'
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventPrice
} from '../controllers/eventController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/', getAllEvents)
router.get('/:id', getEventById)
router.get('/:id/price', getEventPrice)

router.post('/', protect, authorize('creator', 'admin'), createEvent)
router.put('/:id', protect, authorize('creator', 'admin'), updateEvent)
router.delete('/:id', protect, authorize('creator', 'admin'), deleteEvent)

export default router