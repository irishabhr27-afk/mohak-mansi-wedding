const express = require('express')

const {
  loginAdmin,
  getAdminProfile,
} = require('../controllers/authController')

const {
  getRSVPStats,
  getRSVPList,
} = require('../controllers/adminRSVPController')

const requireAdmin = require('../middleware/requireAdmin')

const router = express.Router()

// Public admin login
router.post('/login', loginAdmin)

// Protected admin endpoints
router.get('/me', requireAdmin, getAdminProfile)
router.get('/stats', requireAdmin, getRSVPStats)
router.get('/rsvps', requireAdmin, getRSVPList)

module.exports = router
