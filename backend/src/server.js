require('dotenv').config()
require('node:dns').setDefaultResultOrder('ipv4first')
const connectDB = require('./config/db')
const mongoose = require('mongoose')

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const rsvpRoutes = require('./routes/rsvpRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// Security headers
app.use(helmet())

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://mohak-mansi-wedding.vercel.app',
  ...(process.env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
]

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin not allowed by CORS'))
  },
  methods: ['GET', 'POST'],
}))

/// Parse JSON requests
app.use(express.json({ limit: '10kb' }))

// API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

app.use('/api', apiLimiter)

// RSVP routes
app.use('/api/rsvp', rsvpRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mohak & Mansi API is running',
    database:
      mongoose.connection.readyState === 1
        ? 'Connected'
        : 'Disconnected',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message)

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message === 'Origin not allowed by CORS'
        ? err.message
        : 'Internal server error',
  })
})

// Start server

async function connectDatabaseWithRetry() {
  while (mongoose.connection.readyState !== 1) {
    try {
      await connectDB()
      return
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
      console.log('Retrying MongoDB connection in 10 seconds...')
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}

function startServer() {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding API running on port ${PORT}`)
  })

  connectDatabaseWithRetry()
}

startServer()
