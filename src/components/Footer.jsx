import { Link } from 'react-router-dom'
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  LOCALITY,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
} from '../data/content.js'

/* The footer used to be a wordmark, one Calendly link, and a copyright — no
   email, no phone, no location, no legal pages. That is the pattern consumer
   guidance teaches people to read as a scam signal, and it's also where a
   business proves it exists. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-mark">SECOND&nbsp;NATURE</span>
          <p className="footer-line">AI reception, automations, and custom software.</p>
          <p className="footer-line footer-place">{LOCALITY}</p>
        </div>

        <div className="footer-col">
          <h2 className="footer-head">Reach a human</h2>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener">Book 30 minutes</a>
          <p className="footer-note">Miles answers email within one business day.</p>
        </div>

        {SAVANNAH_PHONE && (
          <div className="footer-col">
            <h2 className="footer-head">Reach the AI</h2>
            <a href={`tel:${SAVANNAH_PHONE}`}>{SAVANNAH_PHONE_DISPLAY}</a>
            <p className="footer-note">
              Answers 24/7 and says it’s an AI when it picks up. You can text it too.
            </p>
          </div>
        )}

        <div className="footer-col">
          <h2 className="footer-head">Site</h2>
          <Link to="/business">Business systems</Link>
          <Link to="/systems">Custom software</Link>
          <Link to="/work">What we’ve built</Link>
          <Link to="/faq">Questions</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-base">
        <span>© 2026 Second Nature — built and run by Miles Finley in Atlanta.</span>
        <Link className="footer-legal" to="/privacy">Privacy</Link>
        <Link className="footer-legal" to="/terms">Terms</Link>
      </div>
    </footer>
  )
}
