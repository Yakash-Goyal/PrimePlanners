import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['attender', 'creator', 'admin'],
    default: 'attender'
  },

  categoryPreferences: [{
    type: String,
    enum: ['Concert', 'Wedding', 'Corporate', 'Private Party', 'Festival']
  }],

  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
},{timestamps:true})

export const User = mongoose.model('User', UserSchema)