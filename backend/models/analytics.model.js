import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    default: null
  },

  actionType:{
    type: String,
    required: true,
    enum: ['page_view', 'event_click', 'booking_started', 'booking_completed', 'booking_dropped', 'search']
  },

  metadata:{
    category: String,
    searchQuery: String,
    sessionDuration: Number,
    device: String,
    source: String
  }

},{timestamps:true})

export const Analytics = mongoose.model('Analytics', AnalyticsSchema)