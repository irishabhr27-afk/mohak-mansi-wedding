
import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    attendance: 'yes',
    guests: '1',
    message: '',
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      attendance: form.attendance === 'yes'
        ? 'attending'
        : 'not-attending',
      guests: form.attendance === 'yes'
        ? Number(form.guests)
        : 0,
      message: form.message.trim(),
    }

    try {
      const response = await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit RSVP')
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Unable to connect. Please try again later.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rsvp-section" id="rsvp">
      <p className="eyebrow">WE WOULD LOVE TO SEE YOU</p>
      <h2>Kindly Respond</h2>

      <p className="rsvp-intro">
        Your presence would make our celebration even more special.
      </p>

      {submitted ? (
        <div className="rsvp-success">
          <div className="event-symbol">♡</div>
          <h3>Thank You!</h3>
          <p>Your response has been received successfully.</p>
          <button onClick={() => setSubmitted(false)}>
            EDIT RESPONSE
          </button>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Full Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            minLength="2"
            maxLength="80"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label htmlFor="attendance">Will you attend?</label>
          <select
            id="attendance"
            name="attendance"
            value={form.attendance}
            onChange={handleChange}
          >
            <option value="yes">Joyfully Accept</option>
            <option value="no">Regretfully Decline</option>
          </select>

          {form.attendance === 'yes' && (
            <>
              <label htmlFor="guests">Number of Guests</label>
              <select
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </>
          )}

          <label htmlFor="message">A Message for the Couple</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your wishes..."
            rows="4"
            maxLength="500"
          />

          {error && (
            <p role="alert" className="rsvp-error">{error}</p>
          )}

          <button
            type="submit"
            className="rsvp-submit"
            disabled={loading}
          >
            {loading ? 'SENDING...' : 'SEND RSVP'} <span>♡</span>
          </button>
        </form>
      )}
    </section>
  )
}

export default RSVP
