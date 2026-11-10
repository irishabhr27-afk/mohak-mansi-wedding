
import { useCallback, useEffect, useState } from 'react'
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Search,
  Download,
  LogOut,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
} from 'lucide-react'
import './Dashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const PAGE_SIZE = 20

function Dashboard({ token, adminEmail, onLogout }) {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    attending: 0,
    notAttending: 0,
    confirmedGuests: 0,
  })

  const [guests, setGuests] = useState([])
 const [search, setSearch] = useState('')
const [appliedSearch, setAppliedSearch] = useState('')
const [attendance, setAttendance] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalGuests, setTotalGuests] = useState(0)

  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const fetchStats = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers,
    })

    const result = await response.json()

    if (response.status === 401) {
      onLogout()
      throw new Error('Your session has expired. Please log in again.')
    }

    if (!response.ok) {
      throw new Error(result.message || 'Unable to load statistics')
    }

    setStats(result.stats)
  }, [token, onLogout])

 
const fetchGuests = useCallback(async () => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
  })

  if (appliedSearch) {
    params.set('search', appliedSearch)
  }

  if (attendance) {
    params.set('attendance', attendance)
  }

  const response = await fetch(
    `${API_URL}/api/admin/rsvps?${params.toString()}`,
    { headers }
  )

  const result = await response.json()

  if (response.status === 401) {
    onLogout()
    throw new Error('Your session has expired. Please log in again.')
  }

  if (!response.ok) {
    throw new Error(result.message || 'Unable to load guest list')
  }

  setGuests(result.data)
  setTotalPages(Math.max(1, result.pagination.totalPages))
  setTotalGuests(result.pagination.total)
}, [token, page, appliedSearch, attendance, onLogout])

  const refreshDashboard = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      await Promise.all([fetchStats(), fetchGuests()])
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [fetchStats, fetchGuests])

  useEffect(() => {
    refreshDashboard()
  }, [refreshDashboard])

  function handleSearch(event) {
    event.preventDefault()
    setPage(1)
    // The search is applied through the form's submitted state below.
    setAppliedSearch(search.trim())
  }

  const displayedSearch = appliedSearch

  const exportCSV = async () => {
    setExporting(true)
    setError('')

    try {
      const allRecords = []
      let currentPage = 1
      let pages = 1

      do {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: '100',
        })

        if (displayedSearch) params.set('search', displayedSearch)
        if (attendance) params.set('attendance', attendance)

        const response = await fetch(
          `${API_URL}/api/admin/rsvps?${params.toString()}`,
          { headers }
        )

        const result = await response.json()

        if (response.status === 401) {
          onLogout()
          throw new Error('Your session has expired. Please log in again.')
        }

        if (!response.ok) {
          throw new Error(result.message || 'CSV export failed')
        }

        allRecords.push(...result.data)
        pages = result.pagination.totalPages
        currentPage += 1
      } while (currentPage <= pages)

      const escapeCSV = (value) => {
        let text = String(value ?? '')

        // Prevent spreadsheet formula injection.
        if (/^[\s]*[=+\-@]/.test(text)) {
          text = `'${text}`
        }

        return `"${text.replace(/"/g, '""')}"`
      }

      const columns = [
        'Name',
        'Phone',
        'Attendance',
        'Guests',
        'Message',
        'Submitted At',
      ]

      const rows = allRecords.map((guest) => [
        guest.name,
        guest.phone,
        guest.attendance,
        guest.guests,
        guest.message,
        new Date(guest.createdAt).toLocaleString(),
      ])

      const csv = [
        columns.map(escapeCSV).join(','),
        ...rows.map((row) => row.map(escapeCSV).join(',')),
      ].join('\n')

      const blob = new Blob(['\uFEFF' + csv], {
        type: 'text/csv;charset=utf-8;',
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = 'wedding-rsvp-guests.csv'
      link.click()

      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message || 'Unable to export guest list')
    } finally {
      setExporting(false)
    }
  }

  const statCards = [
    {
      label: 'Total submissions',
      value: stats.totalSubmissions,
      icon: Users,
    },
    {
      label: 'Attending',
      value: stats.attending,
      icon: UserCheck,
    },
    {
      label: 'Not attending',
      value: stats.notAttending,
      icon: UserX,
    },
    {
      label: 'Confirmed guests',
      value: stats.confirmedGuests,
      icon: CalendarDays,
    },
  ]

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <a href="/" className="dashboard-brand">
          <Heart size={23} />
          <span>MANSI <i>&</i> MOHAK</span>
        </a>

        <div className="dashboard-account">
          <span>{adminEmail}</span>
          <button onClick={onLogout} aria-label="Sign out">
            <LogOut size={17} />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <section className="dashboard-main">
        <div className="dashboard-heading">
          <div>
            <p className="dashboard-eyebrow">
              <ShieldCheck size={14} /> PRIVATE ADMINISTRATION
            </p>
            <h1>Wedding Dashboard</h1>
            <p>Manage your wedding RSVPs and guest information.</p>
          </div>

          <button
            className="dashboard-refresh"
            onClick={refreshDashboard}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="dashboard-error" role="alert">
            {error}
          </div>
        )}

        <section className="dashboard-stats">
          {statCards.map((card) => {
            const Icon = card.icon

            return (
              <article className="stat-card" key={card.label}>
                <div className="stat-icon">
                  <Icon size={20} />
                </div>
                <p>{card.label}</p>
                <strong>{loading ? '—' : card.value}</strong>
              </article>
            )
          })}
        </section>

        <section className="guest-section">
          <div className="guest-heading">
            <div>
              <p className="dashboard-eyebrow">GUEST MANAGEMENT</p>
              <h2>Guest List</h2>
              <p>{totalGuests} matching submissions</p>
            </div>

            <button
              className="export-button"
              onClick={exportCSV}
              disabled={exporting || totalGuests === 0}
            >
              <Download size={16} />
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>

          <form className="guest-filters" onSubmit={handleSearch}>
            <div className="guest-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search name or phone number..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              value={attendance}
              onChange={(event) => {
                setAttendance(event.target.value)
                setPage(1)
              }}
              aria-label="Filter by attendance"
            >
              <option value="">All responses</option>
              <option value="attending">Attending</option>
              <option value="not-attending">Not attending</option>
            </select>

            <button type="submit" className="filter-button">
              Search
            </button>
          </form>

          <div className="guest-table-wrap">
            <table className="guest-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Phone</th>
                  <th>Attendance</th>
                  <th>Guests</th>
                  <th>Message</th>
                  <th>Submitted</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="empty-table">
                      Loading guest information...
                    </td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-table">
                      No matching RSVP submissions found.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr key={guest._id}>
                      <td className="guest-name">{guest.name}</td>
                      <td>{guest.phone}</td>
                      <td>
                        <span
                          className={`attendance-badge ${guest.attendance}`}
                        >
                          {guest.attendance === 'attending'
                            ? 'Attending'
                            : 'Not attending'}
                        </span>
                      </td>
                      <td>{guest.guests}</td>
                      <td className="guest-message">
                        {guest.message || '—'}
                      </td>
                      <td>
                        {new Date(guest.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="guest-pagination">
            <span>
              Page {page} of {totalPages}
            </span>

            <div>
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1 || loading}
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page >= totalPages || loading}
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          MANSI & MOHAK · A CELEBRATION OF FOREVER
        </footer>
      </section>
    </main>
  )
}

export default Dashboard
