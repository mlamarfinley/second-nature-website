import { CALENDLY_URL, SAVANNAH_PHONE } from '../data/content.js'

/* Two ways in: book it yourself, or talk to Savannah now.
   The phone option only renders once SAVANNAH_PHONE is set, so the site
   never ships a dead tel: link. */
export function formatPhone(raw) {
  const d = String(raw).replace(/\D/g, '').replace(/^1/, '')
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw
}

export default function CallToAction({ label = 'Book a call', className = '' }) {
  return (
    <div className={`cta-pair ${className}`.trim()}>
      <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">
        {label}
      </a>

      {SAVANNAH_PHONE && (
        <a className="cta-voice" href={`tel:${SAVANNAH_PHONE}`}>
          <span className="cta-voice-lead mono-label">
            <span className="cta-voice-dot" aria-hidden="true" />
            Or talk to someone now
          </span>
          <span className="cta-voice-num">{formatPhone(SAVANNAH_PHONE)}</span>
          <span className="cta-voice-note">
            Savannah is our AI receptionist. She answers day or night, hears what you need,
            and books you in &mdash; and she&rsquo;s a working example of what we build.
          </span>
        </a>
      )}
    </div>
  )
}
