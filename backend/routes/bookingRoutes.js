import express from 'express'
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings
} from '../controllers/bookingController.js'
import {protect, authorize} from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, authorize('attender', 'creator', 'admin'), createBooking)
router.get('/my', protect, getMyBookings)
router.put('/:id/cancel', protect, cancelBooking)
router.get('/all', protect, authorize('admin'), getAllBookings)

export default router