const mongoose = require("mongoose")
require('dotenv').config()
const express = require("express")
const funnlroute = require('./routes/workouts')
const app = express()
app.use(express.json())
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

