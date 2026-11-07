
const events = [
  {
    name: 'Mehendi',
    subtitle: 'A celebration of colours',
    date: 'To be announced',
    time: 'Coming soon',
    symbol: '❀',
    description:
      'An afternoon filled with beautiful henna, music and joyful moments.',
  },
  {
    name: 'Haldi',
    subtitle: 'A golden beginning',
    date: 'To be announced',
    time: 'Coming soon',
    symbol: '✧',
    description:
      'A beautiful tradition filled with blessings, laughter and sunshine.',
  },
  {
    name: 'Sangeet',
    subtitle: 'An evening of music',
    date: 'To be announced',
    time: 'Coming soon',
    symbol: '♫',
    description:
      'An evening of dance, music and unforgettable celebrations.',
  },
  {
    name: 'The Wedding',
    subtitle: 'A promise of forever',
    date: '10 March 2027',
    time: 'Time to be announced',
    symbol: '♡',
    description:
      'Join us as two hearts come together to begin a beautiful journey.',
  },
  {
    name: 'Reception',
    subtitle: 'An evening to remember',
    date: 'To be announced',
    time: 'Coming soon',
    symbol: '✦',
    description:
      'Celebrate love, happiness and the beginning of a new chapter.',
  },
]

function Events() {
  return (
    <section className="events-section" id="events">
      <p className="eyebrow">THE WEDDING FESTIVITIES</p>

      <h2>Moments To Celebrate</h2>

      <p className="events-intro">
        Every celebration tells a story.
        We cannot wait to share ours with you.
      </p>

      <div className="events-grid">
        {events.map((event, index) => (
          <article className="event-item" key={event.name}>
            <span className="event-number">
              0{index + 1}
            </span>

            <div className="event-symbol">
              {event.symbol}
            </div>

            <h3>{event.name}</h3>

            <p className="event-subtitle">
              {event.subtitle}
            </p>

            <div className="gold-line" />

            <p className="event-description">
              {event.description}
            </p>

            <div className="event-meta">
              <span>{event.date}</span>
              <span>{event.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Events
