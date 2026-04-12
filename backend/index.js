import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import cors from 'cors'

let app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get("/",(req,res)=>{
    res.json({message :"Hello my name is yash"})
})

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on PORT " + process.env.PORT)
    })
})

