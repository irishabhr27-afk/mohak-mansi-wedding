import { useState } from 'react'

function RSVP() {
  const [submitted, setSubmitted] = useState(false)

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

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
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
          <p>Your response has been received on this device.</p>
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
          />

          <button type="submit" className="rsvp-submit">
            SEND RSVP <span>♡</span>
          </button>
        </form>
      )}
    </section>
  )
}

export default RSVP