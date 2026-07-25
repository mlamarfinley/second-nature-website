import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FOCUS_CHIPS, FORMSPREE_ID } from '../data/content.js'

/* The intake's environment: roots that grow downward as the form fills in.
   Every answered step extends the system taking hold. */
const ROOTS = [
  'M 500 620 C 470 800, 430 980, 380 1180 S 300 1500, 260 1650',
  'M 520 620 C 540 820, 590 1000, 660 1180 S 790 1460, 860 1580',
  'M 480 640 C 420 760, 330 860, 240 940 S 90 1080, 30 1150',
  'M 540 640 C 620 760, 720 850, 830 920 S 1010 1030, 1090 1090',
  'M 505 650 C 505 850, 515 1050, 520 1250 S 525 1550, 528 1700',
]

function RootSystem({ growth }) {
  return (
    <svg className="build-roots" viewBox="0 0 1100 1700" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      {ROOTS.map((d, i) => (
        <path
          key={i} d={d} pathLength="1"
          style={{ strokeDashoffset: Math.max(0, 1 - growth * (1 - i * 0.06)) }}
        />
      ))}
    </svg>
  )
}

export default function Build() {
  const [params] = useSearchParams()
  const [track, setTrack] = useState(params.get('track') === 'business' ? 'business' : 'personal')
  const [focus, setFocus] = useState(() => new Set(params.get('focus') ? [params.get('focus')] : []))
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [filled, setFilled] = useState(0)
  const accent = track === 'business' ? 'var(--pulse)' : 'var(--nebula)'
  const connected = FORMSPREE_ID !== 'YOUR_FORMSPREE_ID'

  const toggleFocus = (slug) => {
    setFocus((prev) => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  const onFormInput = (e) => {
    const f = e.currentTarget
    setFilled(['name', 'email', 'message'].filter((n) => f.elements[n]?.value.trim()).length)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const payload = new FormData(form)
    payload.set('track', track)
    payload.set('focus', [...focus].join(', '))
    if (!connected) { setStatus('sent'); return }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: payload, headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main id="main" tabIndex={-1} className="page" style={{ '--accent': accent }}>
      <RootSystem growth={status === 'sent' ? 1 : 0.18 + 0.75 * (((focus.size > 0 ? 1 : 0) + filled) / 4)} />
      <div className="poster-band" aria-hidden="true">
        <img src="./poster.jpg" alt="" loading="lazy" />
      </div>

      <div className="page-inner" style={{ paddingTop: '1rem', maxWidth: 760 }}>
        <span className="mono-label" style={{ color: accent }}>System Intake</span>
        <h1 className="serif-display" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4rem)', fontWeight: 500, margin: '1rem 0 0' }}>
          Let&rsquo;s build your system.
        </h1>
        <p style={{ color: 'var(--ink-dim)', margin: '1.4rem 0 0', maxWidth: '36rem' }}>
          Tell us where the friction lives. We&rsquo;ll come back with the system that removes it.
        </p>

        {status === 'sent' ? (
          <div style={{ marginTop: '3.5rem', borderTop: '1px solid rgba(240,240,236,.14)', paddingTop: '2.5rem' }}>
            <p className="mono-label" style={{ color: accent }}>SYSTEM REQUEST RECEIVED</p>
            <p style={{ color: 'var(--ink-dim)', maxWidth: '34rem' }}>
              Your request is in our queue. You&rsquo;ll hear from us within two business days with a
              scoped proposal for your system.
            </p>
            {!connected && (
              <p className="mono-label" style={{ marginTop: '1.2rem' }}>
                (Preview mode. The form isn&rsquo;t connected to a delivery address yet.)
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} onInput={onFormInput} style={{ marginTop: '2.4rem' }}>
            <h2 className="sr-only">Choose a track</h2>
            <div className="track-panels" role="group" aria-label="Choose a track">
              <button
                type="button" className="track-panel" aria-pressed={track === 'personal'}
                onClick={() => { setTrack('personal'); setFocus(new Set()) }}
              >
                <span className="mono-label">PERSONAL</span>
                <p style={{ margin: '.6rem 0 0', fontSize: '.9rem', color: 'var(--ink-dim)' }}>
                  A system that runs your time, follow-through, admin, or money.
                </p>
              </button>
              <button
                type="button" className="track-panel" aria-pressed={track === 'business'}
                onClick={() => { setTrack('business'); setFocus(new Set()) }}
              >
                <span className="mono-label">BUSINESS</span>
                <p style={{ margin: '.6rem 0 0', fontSize: '.9rem', color: 'var(--ink-dim)' }}>
                  Agents for operations, teams, and customer communities.
                </p>
              </button>
            </div>

            <span className="mono-label">Focus areas</span>
            <div className="chip-row" role="group" aria-label="Select focus areas">
              {FOCUS_CHIPS[track].map(([slug, label]) => (
                <button key={slug} type="button" className="chip" aria-pressed={focus.has(slug)} onClick={() => toggleFocus(slug)}>
                  {label}
                </button>
              ))}
            </div>

            <h2 className="sr-only">Contact details</h2>
            <label className="field" htmlFor="intake-name">
              <span className="mono-label">Name</span>
              <input id="intake-name" name="name" required autoComplete="name" />
            </label>
            <label className="field" htmlFor="intake-email">
              <span className="mono-label">Email</span>
              <input id="intake-email" name="email" type="email" inputMode="email" required autoComplete="email" />
            </label>
            <label className="field" htmlFor="intake-message">
              <span className="mono-label">What should stop taking your time?</span>
              <textarea id="intake-message" name="message" rows="4" autoComplete="off" />
            </label>

            <button type="submit" className="cta-button" disabled={status === 'sending'} style={{ cursor: 'pointer', background: 'none' }}>
              {status === 'sending' ? 'Sending…' : 'Request my system →'}
            </button>
            {status === 'error' && (
              <p className="mono-label" style={{ color: '#E88A6A', marginTop: '1rem' }}>
                Something interrupted the send. Try again, or email us directly.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  )
}
