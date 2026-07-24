import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FOCUS_CHIPS, FORMSPREE_ID } from '../data/content.js'

export default function Build() {
  const [params] = useSearchParams()
  const [track, setTrack] = useState(params.get('track') === 'business' ? 'business' : 'personal')
  const [focus, setFocus] = useState(() => new Set(params.get('focus') ? [params.get('focus')] : []))
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const accent = track === 'business' ? 'var(--pulse)' : 'var(--nebula)'
  const connected = FORMSPREE_ID !== 'YOUR_FORMSPREE_ID'

  const toggleFocus = (slug) => {
    setFocus((prev) => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
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
    <main className="page" style={{ '--accent': accent }}>
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
          <form onSubmit={onSubmit} style={{ marginTop: '2.4rem' }}>
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

            <label className="field">
              <span className="mono-label">Name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="mono-label">Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="field">
              <span className="mono-label">What should stop taking your time?</span>
              <textarea name="message" rows="4" />
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
