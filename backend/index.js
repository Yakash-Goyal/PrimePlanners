import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db'
import cors from 'cors'

let app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on PORT " + process.env.PORT)
    })
})

