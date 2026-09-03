import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CONTACT_EMAIL,
  LOCALITY,
  RESPONSE_PROMISE,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
  AGENT_DISCLOSURE,
  BOOKING_URL,
} from '../data/content.js'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

/* The site had no form, no email address and no async path of any kind — only
   a phone call or a 30-minute calendar booking, the two channels business
   buyers reach for least. Three fields is the whole ask.

   The form posts to Netlify Forms (data-netlify) if hosted there; the hidden
   form-name field and honeypot are what its build-time scraper looks for.
   On any other host, swap the action for Formspree — the markup is the same. */
export default function Contact() {
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    const data = new FormData(e.target)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      navigate('/thanks')
    } catch {
      setSending(false)
      setError(
        `That didn’t send — which is embarrassing on an automation website. Email me directly at ${CONTACT_EMAIL} and I’ll pick it up from there.`,
      )
    }
  }

  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Contact</span>
        <h1 className="serif-display pp-headline">Tell me where the work backs&nbsp;up.</h1>
        <p className="pp-lead">
          Answer three questions. Within one business day I’ll send back a short walkthrough of
          where your time and your leads are leaking, and a one-page friction map with the fixes
          ranked by what pays back first. You keep it whether you hire me or not.
        </p>

        <form
          className="sn-form"
          name="friction-map"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="form-name" value="friction-map" />
          <p className="sn-hp">
            <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
          </p>

          <div className="sn-field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" required autoComplete="name" />
          </div>

          <div className="sn-field">
            <label htmlFor="contact">Email or phone</label>
            <input id="contact" name="contact" type="text" required autoComplete="email" />
          </div>

          <div className="sn-field">
            <label htmlFor="friction">What keeps slipping?</label>
            <textarea id="friction" name="friction" rows="4" required />
            <p className="sn-hint">
              Missed calls, invoices going out late, follow-ups that die, someone retyping the same
              data — whatever it actually is. One sentence is plenty.
            </p>
          </div>

          <button className="cta-button cta-button-agent" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send it over'}
          </button>
          {error && <p className="sn-error" role="alert">{error}</p>}
          <p className="sn-hint">
            No sales sequence, no newsletter, and your details go nowhere else.
          </p>
        </form>

        <section className="detail-block" aria-labelledby="other-ways">
          <h2 className="detail-headline" id="other-ways">Or skip the form</h2>
          <ul className="about-contact">
            {SAVANNAH_PHONE && (
              <li>
                <a href={`tel:${SAVANNAH_PHONE}`}>{SAVANNAH_PHONE_DISPLAY}</a>
                <span>{AGENT_DISCLOSURE}</span>
              </li>
            )}
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>Straight to Miles.</span>
            </li>
            <li>
              <a href={BOOKING_URL} target="_blank" rel="noopener">Book thirty minutes</a>
              <span>If you’d rather just talk it through.</span>
            </li>
          </ul>
          <p className="response-promise">{RESPONSE_PROMISE}</p>
          <p className="sn-hint">{LOCALITY} — the work happens over video and phone.</p>
        </section>
      </div>
    </main>
  )
}
