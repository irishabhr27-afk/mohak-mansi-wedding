const RSVP = require('../models/RSVP')

async function getRSVPStats(req, res, next) {
  try {
    const [total, attending, notAttending, guestResult] = await Promise.all([
      RSVP.countDocuments(),
      RSVP.countDocuments({ attendance: 'attending' }),
      RSVP.countDocuments({ attendance: 'not-attending' }),
      RSVP.aggregate([
        { $match: { attendance: 'attending' } },
        { $group: { _id: null, totalGuests: { $sum: '$guests' } } },
      ]),
    ])

    return res.status(200).json({
      success: true,
      stats: {
        totalSubmissions: total,
        attending,
        notAttending,
        confirmedGuests: guestResult[0]?.totalGuests || 0,
      },
    })
  } catch (error) {
    next(error)
  }
}

async function getRSVPList(req, res, next) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1)
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 20)
    )

    const attendance = req.query.attendance
    const search = typeof req.query.search === 'string'
      ? req.query.search.trim().slice(0, 80)
      : ''

    if (
      attendance &&
      !['attending', 'not-attending'].includes(attendance)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance filter',
      })
    }

    const filter = {}

    if (attendance) {
      filter.attendance = attendance
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      filter.$or = [
        { name: { $regex: escapedSearch, $options: 'i' } },
        { phone: { $regex: escapedSearch, $options: 'i' } },
      ]
    }

    const [rsvps, total] = await Promise.all([
      RSVP.find(filter)
        .select('name phone attendance guests message createdAt')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      RSVP.countDocuments(filter),
    ])

    return res.status(200).json({
      success: true,
      data: rsvps,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getRSVPStats, getRSVPList }
