import {
  BOOKING_URL,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
  AGENT_DISCLOSURE,
} from '../data/content.js'
import { track } from '../lib/analytics.js'

/* Two ways in: call the AI receptionist now, or book time with Miles.
   Three rules this component exists to enforce:
   1. The digits are VISIBLE text, not just an href — a tel: link is inert on
      the desktop browsers where most business research happens.
   2. The AI is disclosed at the point of action, every time. Nobody learns
      they're talking to software after they've started talking.
   3. If SAVANNAH_PHONE is ever emptied, the phone option disappears
      site-wide rather than shipping a number that reaches nothing. */
export function formatPhone(raw) {
  const d = String(raw).replace(/\D/g, '').replace(/^1/, '')
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw
}

export default function CallToAction({ className = '', disclose = true }) {
  return (
    <div className={`cta-block ${className}`.trim()}>
      <div className="cta-pair">
        {SAVANNAH_PHONE && (
          <a
            className="cta-button cta-button-agent"
            href={`tel:${SAVANNAH_PHONE}`}
            aria-label={`Call our AI receptionist at ${formatPhone(SAVANNAH_PHONE)}`}
            onClick={() => track('Call Click')}
          >
            Call our AI · {SAVANNAH_PHONE_DISPLAY}
          </a>
        )}
        <a
          className="cta-button"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          onClick={() => track('Booking Click')}
        >
          Book 30 minutes
        </a>
      </div>
      {disclose && SAVANNAH_PHONE && (
        <p className="cta-disclosure">{AGENT_DISCLOSURE}</p>
      )}
    </div>
  )
}
