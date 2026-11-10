
const express = require('express')
const { createRSVP } = require('../controllers/rsvpController')

const router = express.Router()

// Submit a wedding RSVP
router.post('/', createRSVP)

module.exports = router
