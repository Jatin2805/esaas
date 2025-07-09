const mongoose = require("mongoose")
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const funnlroute = require('./routes/workouts')
const app = express()
app.use(express.json())
// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use("/api/funnel",funnlroute)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{

        app.listen(process.env.PORT,()=>{
            console.log("app listening on port 3000")
    })
})
    .catch((errorr)=>{
        console.log(errorr)
    })

