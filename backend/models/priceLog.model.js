import mongoose from 'mongoose'

const PriceLogSchema = new mongoose.Schema({
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  basePrice: Number,
  finalPrice: Number,
  demandMultiplier: Number,
  timeMultiplier: Number,
  categoryMultiplier: Number,
  fillRateAtTime: Number,
  daysUntilEvent: Number
},{timestamps:true})

export const PriceLog = mongoose.model('PriceLog', PriceLogSchema)