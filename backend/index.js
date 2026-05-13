import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'

let app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/',(req,res) => res.json({ message: 'PrimePlanners API running' }))

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on PORT " + process.env.PORT)
    })
})

