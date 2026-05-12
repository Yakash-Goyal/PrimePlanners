import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },

  seats:{ 
    type: Number, 
    required: true
},

  totalPrice:{ 
    type: Number, 
    required: true
},

  pricingSnapshot: {
    basePrice: Number,
    demandMultiplier: Number,
    timeMultiplier: Number,
    categoryMultiplier: Number,
    fillRateAtBooking: Number
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
},{timestamps:true})

export const Booking = mongoose.model('Booking', BookingSchema)
