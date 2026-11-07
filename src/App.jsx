
import './App.css'
import Countdown from './components/Countdown'
import Events from './components/Events'
import RSVP from './components/RSVP'
import Gallery from './components/Gallery'

function App() {
  return (
    <main>
      <nav className="navbar">
        <a href="#" className="brand">M <span>&</span> M</a>
        <div className="nav-links">
          <a href="#story">Our Story</a>
          <a href="#celebration">Celebration</a>
          <a href="#venue">Venue</a>
        </div>
        <a href="#celebration" className="nav-button">THE WEDDING</a>
      </nav>

      <section className="hero">
        <div className="hero-frame">
          <div className="hero-content">
            <p className="eyebrow">TOGETHER WITH THEIR FAMILIES</p>

            <div className="ornament">✳</div>

            <h1>
              Mohak
              <span className="ampersand">&</span>
              Mansi
            </h1>

            <p className="hero-subtitle">
              A CELEBRATION OF FOREVER
            </p>

            <div className="gold-line" />

            <p className="invitation-text">
              Two hearts, one beautiful journey.
              <br />
              We invite you to celebrate our beginning.
            </p>

            <div className="wedding-date">
              <span>10</span>
              <div>
                <strong>MARCH</strong>
                <small>WEDNESDAY</small>
              </div>
              <span>2027</span>
            </div>

            <a href="#celebration" className="discover-button">
              DISCOVER OUR CELEBRATION
              <span>↓</span>
            </a>
          </div>

          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
        </div>

        <div className="hero-bottom">
          <span>WITH LOVE & BLESSINGS</span>
          <span>RANCHI, INDIA</span>
        </div>
      </section>

      <section className="story" id="story">
        <p className="eyebrow">A NEW CHAPTER BEGINS</p>
        <div className="ornament">❀</div>
        <h2>Two Souls, One Journey</h2>
        <p>
          Some stories are written in the stars.
          Some journeys begin with a beautiful moment.
          Ours is a story of love, laughter and forever.
        </p>
        <div className="story-names">Mohak <span>&</span> Mansi</div>
      </section>

      <section className="celebration" id="celebration">
        <p className="eyebrow">SAVE THE DATE</p>
        <h2>Join Our Celebration</h2>

        <div className="event-card">
          <div className="event-icon">✧</div>
          <h3>The Wedding</h3>
          <p>10 March 2027</p>
          <div className="gold-line" />
          <p className="event-location">
            Tikratoli Farm Resorts and Banquet
          </p>
          <a href="#venue" className="text-link">EXPLORE THE VENUE ↗</a>
        </div>
      </section>
<Countdown />
      <section className="venue" id="venue">
        <p className="eyebrow">THE PLACE WHERE IT ALL BEGINS</p>
        <h2>Celebrate With Us</h2>
        <p>Tikratoli Farm Resorts and Banquet</p>
        <p className="venue-city">Ranchi, Jharkhand, India</p>
      </section>
      
      <RSVP />
<Gallery />

      <footer>
        <div className="footer-monogram">M <span>&</span> M</div>
        <p>MOHAK & MANSI</p>
        <span>A CELEBRATION OF FOREVER · 10.03.2027</span>
      </footer>
      <Events />
    </main>
  )
}

export default App
