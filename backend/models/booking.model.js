import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    seats:{
        type:Number,
        required: true,
    },
    totalPrice:{
        type:Number,
    },
    status:{
        type:String,
        enum:['pending','confirmed','cancelled']
    }
},{timestamps:true})

export const Booking = mongoose.model("Booking",BookingSchema)