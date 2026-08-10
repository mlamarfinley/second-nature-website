import { useEffect, useState } from 'react'
import { SAVANNAH_PHONE, SAVANNAH_PHONE_DISPLAY } from '../data/content.js'
import { track } from '../lib/analytics.js'

/* One action, docked to the bottom of the viewport on phones once the hero has
   scrolled past. One button, never two — a sticky bar with competing choices
   is just the hero's decision problem moved lower down the screen.

   Deliberately simple: a scroll threshold, an inline transform, no transition.
   An earlier version tried to hide itself whenever another CTA was on screen,
   which needed an IntersectionObserver and a transition, and the transition
   got stuck holding a stale transform. Not worth the bug for the polish. */
const SHOW_AFTER = 600

export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!SAVANNAH_PHONE) return
    const update = () => setShow(window.scrollY > SHOW_AFTER)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (!SAVANNAH_PHONE) return null

  return (
    <div
      className="sticky-cta"
      style={{ transform: show ? 'translateY(0)' : 'translateY(115%)' }}
      aria-hidden={!show}
    >
      <a
        href={`tel:${SAVANNAH_PHONE}`}
        tabIndex={show ? 0 : -1}
        onClick={() => track('Call Click', { position: 'sticky' })}
      >
        Call our AI · {SAVANNAH_PHONE_DISPLAY}
      </a>
    </div>
  )
}
