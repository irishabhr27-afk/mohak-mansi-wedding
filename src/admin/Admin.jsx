import { ArrowRight, Eye, EyeOff, Heart, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import './Admin.css'
import Dashboard from './Dashboard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)
  const [adminEmail, setAdminEmail] = useState('')

  async function handleLogin(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Login failed')
      }

      setToken(result.token)
      setAdminEmail(result.admin.email)
      setPassword('')
    } catch (err) {
      setError(err.message || 'Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    setToken(null)
    setAdminEmail('')
    setEmail('')
    setPassword('')
    setError('')
  }

  if (token) {
  return (
    <Dashboard
      token={token}
      adminEmail={adminEmail}
      onLogout={handleLogout}
    />
  )
}

  return (
    <main className="admin-page">
      <section className="admin-login">
        <div className="admin-decoration">
          <span>✳</span>
        </div>

        <Heart className="admin-heart" size={27} strokeWidth={1.2} />

        <p className="admin-eyebrow">MANSI & MOHAK</p>

        <h1>Welcome Back</h1>

        <p className="admin-subtitle">
          Private Wedding Administration
        </p>

        <div className="admin-divider" />

        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">EMAIL ADDRESS</label>

          <div className="admin-input-wrap">
            <Mail size={17} />
            <input
              id="admin-email"
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <label htmlFor="admin-password">PASSWORD</label>

          <div className="admin-input-wrap">
            <LockKeyhole size={17} />

            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="admin-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-submit"
            disabled={loading}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="admin-footer">
          <LockKeyhole size={12} />
          AUTHORISED ACCESS ONLY
        </p>
      </section>
    </main>
  )
}

export default Admin

