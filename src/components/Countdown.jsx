
import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2027-03-10T00:00:00+05:30').getTime()

function getTimeLeft() {
  const difference = WEDDING_DATE - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINUTES', value: time.minutes },
    { label: 'SECONDS', value: time.seconds },
  ]

  return (
    <section className="countdown-section">
      <p className="eyebrow">THE COUNTDOWN BEGINS</p>

      <h2>Until Forever Begins</h2>

      <div className="countdown">
        {units.map((unit) => (
          <div className="countdown-unit" key={unit.label}>
            <span className="countdown-number">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>

      <p className="countdown-note">
        Every second brings us closer to forever.
      </p>
    </section>
  )
}

export default Countdown
