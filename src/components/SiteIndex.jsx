import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CALENDLY_URL,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
  CONTACT_EMAIL,
  LOCALITY,
} from '../data/content.js'

/* The mobile navigation the site never had. Below 900px the nav links are
   hidden, and before this component existed there was no menu of any kind —
   three of five pages were unreachable from a phone.

   A full-bleed typographic index rather than a hamburger drawer: the brand's
   atoms are large type and thin rules, and an index has room for a line of
   description per destination plus the phone digits, email, and city, which a
   hamburger does not. */

const BLURBS = {
  '/business': 'Automations, communication, and AI employees.',
  '/systems': 'Websites, dashboards, portals, internal tools.',
  '/work': 'The two systems running right now.',
  '/faq': 'Cost, timelines, data, what happens on a call.',
  '/about': 'Who builds it, and what we run on ourselves.',
  '/personal': 'Systems for your own day. Referral only.',
  '/contact': 'Get a free friction map.',
}

export default function SiteIndex({ links = [] }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab') return
      const f = panelRef.current?.querySelectorAll('a, button')
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      buttonRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        className="index-toggle"
        aria-expanded={open}
        aria-controls="site-index"
        onClick={() => setOpen(true)}
      >
        Index
      </button>

      {open && (
        <div
          id="site-index"
          className="index-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
        >
          <nav className="index-list">
            {links.map(([to, title], i) => (
              <Link key={to} to={to} className="index-row" onClick={() => setOpen(false)}>
                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="index-title">{title}</span>
                <span className="index-blurb">{BLURBS[to]}</span>
              </Link>
            ))}
          </nav>

          <div className="index-foot">
            {SAVANNAH_PHONE && (
              <a href={`tel:${SAVANNAH_PHONE}`}>Call our AI · {SAVANNAH_PHONE_DISPLAY}</a>
            )}
            <a href={CALENDLY_URL} target="_blank" rel="noopener">Book 30 minutes</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <span>{LOCALITY}</span>
          </div>

          <button className="index-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </>
  )
}
