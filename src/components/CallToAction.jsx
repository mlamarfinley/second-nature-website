import { CALENDLY_URL, SAVANNAH_PHONE } from '../data/content.js'

/* Two separate buttons: talk to Savannah now, or book a meeting yourself.
   The agent button only renders once SAVANNAH_PHONE is set, so the site
   never ships a dead tel: link. */
export function formatPhone(raw) {
  const d = String(raw).replace(/\D/g, '').replace(/^1/, '')
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw
}

export default function CallToAction({ className = '' }) {
  return (
    <div className={`cta-pair ${className}`.trim()}>
      {SAVANNAH_PHONE && (
        <a
          className="cta-button cta-button-agent"
          href={`tel:${SAVANNAH_PHONE}`}
          aria-label={`Speak to an agent at ${formatPhone(SAVANNAH_PHONE)}`}
        >
          <span className="cta-dot" aria-hidden="true" />
          Speak to an agent
        </a>
      )}
      <a className="cta-button" href={CALENDLY_URL} target="_blank" rel="noopener">
        Book a meeting
      </a>
    </div>
  )
}
