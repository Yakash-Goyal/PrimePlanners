import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        enum: ['Concert','Wedding','Corporate','Private Party','Festival']
    },
    date :{
        type: Date,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    image:{
        type:String,
    },
    price:{
        type: Number,
        required: true,
    },
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export const Event = mongoose.model("Event",EventsSchema)