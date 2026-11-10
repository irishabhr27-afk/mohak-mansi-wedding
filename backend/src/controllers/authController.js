const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const passwordHash = process.env.ADMIN_PASSWORD_HASH
    const jwtSecret = process.env.JWT_SECRET

    if (!adminEmail || !passwordHash || !jwtSecret) {
      console.error('Admin authentication environment variables are missing')
      return res.status(500).json({
        success: false,
        message: 'Authentication is not configured',
      })
    }

    if (email.trim().toLowerCase() !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const passwordMatches = await bcrypt.compare(password, passwordHash)

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      jwtSecret,
      { expiresIn: '8h', subject: 'wedding-admin' }
    )

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: { email: adminEmail },
    })
  } catch (error) {
    next(error)
  }
}

function getAdminProfile(req, res) {
  return res.status(200).json({
    success: true,
    admin: { email: req.admin.email },
  })
}

module.exports = { loginAdmin, getAdminProfile }
