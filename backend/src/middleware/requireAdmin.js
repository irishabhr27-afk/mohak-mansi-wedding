const jwt = require('jsonwebtoken')

function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
  }

  const token = authorization.slice(7).trim()

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin' || decoded.sub !== 'wedding-admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required',
      })
    }

    req.admin = { email: decoded.email }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session',
    })
  }
}

module.exports = requireAdmin
