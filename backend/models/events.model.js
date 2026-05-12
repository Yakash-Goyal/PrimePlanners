import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },

    description:{ 
        type: String, 
        required: true
    },

    category:{
        type: String,
        required: true,
        enum: ['Concert', 'Wedding', 'Corporate', 'Private Party', 'Festival']
    },

    date:{ 
        type: Date, 
        required: true 
    },

    location:{ 
        type: String, 
        required: true 
    },
    
    venue:{ 
        type: String, 
        required: true 
    },

    image:{ 
        type: String, 
        default: '' 
    },

    totalSeats:{ 
        type: Number,
        required: true 
    },

    bookedSeats:{ 
        type: Number, 
        default: 0 
    },

    basePrice:{ 
        type: Number, 
        required: true 
    },

    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Analytics tracking
    views:{ 
        type: Number, 
        default: 0 
    },

    clicks:{ 
        type: Number, 
        default: 0
    },

    isActive:{ 
        type: Boolean, 
        default: true
    }
},{timestamps:true})

// Dynamic Pricing
// Final Price = basePrice × demandMultiplier × timeMultiplier × categoryMultiplier

EventSchema.methods.getCurrentPrice = function () {
    // Demand Multiplier (based on seat occupancy)
    const fillRate = this.bookedSeats / this.totalSeats
    let demandMultiplier = 1.0
    if (fillRate >= 0.9) demandMultiplier = 2.5      
    else if (fillRate >= 0.7) demandMultiplier = 2.0 
    else if (fillRate >= 0.4) demandMultiplier = 1.5

    // Time Multiplier (closer to event date = higher price)
    const daysUntilEvent = Math.ceil((this.date - Date.now()) / (1000 * 60 * 60 * 24))
    let timeMultiplier = 1.0
    if (daysUntilEvent <= 1) timeMultiplier = 2.0 
    else if (daysUntilEvent <= 3) timeMultiplier = 1.7
    else if (daysUntilEvent <= 7) timeMultiplier = 1.4 
    else if (daysUntilEvent <= 14) timeMultiplier = 1.2 

    // Category Multiplier (based on historical demand)
    const categoryMultipliers = {
        'Concert': 1.3,
        'Festival': 1.2,
        'Wedding': 1.1,
        'Private Party': 1.0,
        'Corporate': 0.9
    }

    const categoryMultiplier = categoryMultipliers[this.category] || 1.0
    const finalPrice = Math.round(this.basePrice * demandMultiplier * timeMultiplier * categoryMultiplier)
    return{
        finalPrice,
        basePrice: this.basePrice,
        demandMultiplier,
        timeMultiplier,
        categoryMultiplier,
        fillRate: Math.round(fillRate * 100), // as percentage
        seatsRemaining: this.totalSeats - this.bookedSeats
    }
}

export const Event = mongoose.model('Event', EventSchema)