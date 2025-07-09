const mongoose = require("mongoose")
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const funnlroute = require('./routes/workouts')

const app = express()

// Middleware
app.use(express.json())

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

// Routes
app.use("/api/funnel", funnlroute)

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

// MongoDB connection with better error handling
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...')
        console.log('MongoDB URI:', process.env.MONGO_URI ? 'URI provided' : 'URI missing')
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log('✅ Connected to MongoDB successfully')
        
        // Start server only after successful DB connection
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`)
            console.log(`📊 Health check: http://localhost:${PORT}/health`)
        })
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message)
        console.error('Full error:', error)
        
        // Retry connection after 5 seconds
        console.log('🔄 Retrying connection in 5 seconds...')
        setTimeout(connectDB, 5000)
    }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('📡 Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT. Graceful shutdown...')
    try {
        await mongoose.connection.close()
        console.log('📡 MongoDB connection closed')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error during shutdown:', error)
        process.exit(1)
    }
})

// Start the connection process
connectDB()