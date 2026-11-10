
const RSVP = require('../models/RSVP')

async function createRSVP(req, res, next) {
  try {
    const { name, phone, attendance, guests, message } = req.body

    // Basic request validation
    if (!name || !phone || !attendance || guests === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required RSVP fields',
      })
    }

    const normalizedName = String(name).trim()
    const normalizedPhone = String(phone).trim()

    if (normalizedName.length < 2 || normalizedName.length > 80) {
      return res.status(400).json({
        success: false,
        message: 'Name must contain between 2 and 80 characters',
      })
    }

    if (!/^\+?[0-9\s()-]{10,20}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number',
      })
    }

    if (!['attending', 'not-attending'].includes(attendance)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance selection',
      })
    }

    const guestCount = Number(guests)

    if (!Number.isInteger(guestCount) || guestCount < 0 || guestCount > 10) {
      return res.status(400).json({
        success: false,
        message: 'Guest count must be between 0 and 10',
      })
    }

    if (attendance === 'not-attending' && guestCount !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Guest count must be zero when not attending',
      })
    }

    const normalizedMessage = String(message || '').trim()

    if (normalizedMessage.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot exceed 500 characters',
      })
    }

    const rsvp = await RSVP.create({
      name: normalizedName,
      phone: normalizedPhone,
      attendance,
      guests: guestCount,
      message: normalizedMessage,
    })

    return res.status(201).json({
      success: true,
      message: 'Your RSVP has been received successfully',
      data: {
        id: rsvp._id,
        name: rsvp.name,
        attendance: rsvp.attendance,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createRSVP }
