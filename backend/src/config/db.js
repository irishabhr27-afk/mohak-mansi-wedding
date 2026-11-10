
const mongoose = require('mongoose')

async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from environment variables')
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })

    console.log('MongoDB connected successfully')
    console.log(`Database: ${mongoose.connection.name}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
