const mongoose = require("mongoose")
require('dotenv').config()
const express = require("express")
const cors = require("cors")

// Import routes
const funnelRoutes = require('./routes/funnels')
const templateRoutes = require('./routes/templates')
const workoutRoutes = require('./routes/workouts') // Keep for backward compatibility

const app = express()

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

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
app.use("/api/funnels", funnelRoutes)
app.use("/api/templates", templateRoutes)
app.use("/api/funnel", workoutRoutes) // Keep for backward compatibility

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Funnel Builder API',
        version: '1.0.0',
        endpoints: {
            funnels: '/api/funnels',
            templates: '/api/templates',
            health: '/health'
        }
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// MongoDB connection with better error handling
const connectDB = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...')
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set')
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log('✅ Connected to MongoDB successfully')
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
        
        // Start server only after successful DB connection
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`)
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
            console.log(`📊 Health check: http://localhost:${PORT}/health`)
            console.log(`📋 API info: http://localhost:${PORT}/api`)
        })
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message)
        
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