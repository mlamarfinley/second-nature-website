import { Link } from 'react-router-dom'
import {
  CONTACT_EMAIL,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
} from '../data/content.js'

/* The site used to end its involvement at the moment of highest intent —
   a Calendly link opening in a new tab and nothing else. This page states
   what happens next and by when, which is the whole product being sold. */
export default function Thanks() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <span className="pp-eyebrow mono-label">Received</span>
        <h1 className="serif-display pp-headline">Got it. Here’s what happens now.</h1>

        <ol className="thanks-steps">
          <li>
            <span className="thanks-num">01</span>
            <div>
              <h2>A confirmation lands in your inbox in the next minute or two.</h2>
              <p>It was sent by our own system rather than by me typing it, which is roughly the point of all this.</p>
            </div>
          </li>
          <li>
            <span className="thanks-num">02</span>
            <div>
              <h2>Within one business day you get your friction map.</h2>
              <p>
                A short walkthrough of where I think your time and your leads are leaking, and a
                one-page map with the fixes ranked by what pays back first. If I’m going to be
                slower than that, I’ll tell you before the day is out.
              </p>
            </div>
          </li>
          <li>
            <span className="thanks-num">03</span>
            <div>
              <h2>If the map makes sense, we book thirty minutes.</h2>
              <p>If it doesn’t, you keep the map and we part on good terms. It’s yours either way.</p>
            </div>
          </li>
        </ol>

        <div className="thanks-meanwhile">
          <h2 className="section-heading">In the meantime</h2>
          {SAVANNAH_PHONE && (
            <p className="pp-lead">
              Call the AI receptionist at{' '}
              <a className="inline-link" href={`tel:${SAVANNAH_PHONE}`}>{SAVANNAH_PHONE_DISPLAY}</a>{' '}
              and hear what your own customers would hear. Or read{' '}
              <Link className="inline-link" to="/work">what we’ve built</Link>.
            </p>
          )}
          <p className="pp-lead">
            Need me sooner? <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
