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

/* THE FORM WAS REMOVED, DELIBERATELY. Do not restore it without a backend.
 *
 * The previous version carried Netlify Forms markup (`data-netlify`, a hidden
 * form-name field, a honeypot) and POSTed to `/`. The site is served by GitHub
 * Pages, which answers that POST with 405 — verified against production. The
 * handler then did:
 *
 *     await fetch('/', { method: 'POST', ... })
 *     navigate('/thanks')
 *
 * `fetch()` rejects only on network failure, so a 405 resolves normally, the
 * catch never ran, and every visitor was sent to the thank-you page while the
 * inquiry went nowhere. It was not a broken form — it was a form that lied.
 *
 * Every route below is one we have actually verified end to end. When a real
 * backend exists (Formspree or equivalent), a form can come back — with an
 * `if (!res.ok) throw` so a failure is visible rather than silent.
 */
export default function Contact() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Contact</span>
        <h1 className="serif-display pp-headline">Tell me where the work backs&nbsp;up.</h1>
        <p className="pp-lead">
          Thirty minutes, free, and you do most of the talking. I ask how the work actually moves
          through your business and where it stalls. You leave with a short written map of what’s
          leaking and what to fix first — yours whether you hire me or not.
        </p>

        <section className="detail-block" aria-labelledby="ways">
          <h2 className="detail-headline" id="ways">Three ways to reach me</h2>
          <ul className="about-contact">
            <li>
              <a href={BOOKING_URL} target="_blank" rel="noopener">Book a consultation</a>
              <span>Pick a time that suits you. This is the fastest route.</span>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>Straight to me — no form, no sequence, no newsletter.</span>
            </li>
            {SAVANNAH_PHONE && (
              <li>
                <a href={`tel:${SAVANNAH_PHONE}`}>{SAVANNAH_PHONE_DISPLAY}</a>
                <span>{AGENT_DISCLOSURE}</span>
              </li>
            )}
          </ul>
          <p className="response-promise">{RESPONSE_PROMISE}</p>
          <p className="sn-hint">{LOCALITY} — the work happens over video and phone.</p>
        </section>
      </div>
    </main>
  )
}
