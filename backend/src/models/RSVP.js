
const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 20,
    },
    attendance: {
      type: String,
      required: true,
      enum: ['attending', 'not-attending'],
    },
    guests: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('RSVP', rsvpSchema)
