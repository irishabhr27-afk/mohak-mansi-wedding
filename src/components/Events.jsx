
const events = [
  {
    name: "Bride's Haldi",
    subtitle: 'A golden beginning',
    date: '8 March 2027',
    time: '8:00 AM',
    symbol: '✧',
    description:
      'A beautiful tradition filled with blessings, laughter and sunshine.',
  },
  {
    name: 'Tilak Ceremony',
    subtitle: 'A celebration of family and blessings',
    date: '9 March 2027',
    time: '10:00 AM',
    symbol: '❀',
    description:
      'A special gathering of families to celebrate the upcoming wedding.',
  },
  {
    name: 'Sangeet Ceremony',
    subtitle: 'An evening of music',
    date: '9 March 2027',
    time: '5:00 PM',
    symbol: '♫',
    description:
      'An evening of music, dance and unforgettable celebrations.',
  },
  {
    name: 'Wedding Ceremony',
    subtitle: 'A promise of forever',
    date: '10 March 2027',
    time: '9:00 AM onwards',
    symbol: '♡',
    description:
      'Join us as two hearts come together to begin a beautiful journey.',
  },
  {
    name: 'Reception',
    subtitle: 'An evening to remember',
    date: '10 March 2027',
    time: '6:00 PM',
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
