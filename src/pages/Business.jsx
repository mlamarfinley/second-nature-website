import { BIZ, BIZ_REMOVES, STATUS } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'
import { useReveal } from '../lib/useReveal.js'

/* What used to live here: a `Counter` component that eased "40 hours saved per
   week", "60% less admin time" and "2× more deadlines hit" upward over 1.4
   seconds, inside modules captioned "Live" with pulsing status dots, beside a
   fake workflow rail, fake client threads ("Meeting summary sent · 09:12") and
   a fake staff roster clocked in 24/7 — from a company with no clients.
   Animating a number is a claim that it was measured. All of it is deleted.

   What replaces it: what each system removes from your desk, and an honest
   build status per offering. */

function Remove({ task, result, i }) {
  const ref = useReveal({ delay: Math.min(i * 60, 240) })
  return (
    <div ref={ref} className="bz-remove reveal">
      <h3 className="bz-remove-task">{task}</h3>
      <p className="bz-remove-result">{result}</p>
    </div>
  )
}

function Removes() {
  return (
    <div className="bz-removes">
      {BIZ_REMOVES.map(([task, result], i) => (
        <Remove key={task} task={task} result={result} i={i} />
      ))}
    </div>
  )
}

function Pillar({ data }) {
  const ref = useReveal()
  return (
    <section ref={ref} className="bz-pillar reveal" aria-labelledby={`pillar-${data.tag}`}>
      <span className="bz-tag mono-label">{data.tag}</span>
      <h2 className="bz-title" id={`pillar-${data.tag}`}>{data.title}</h2>
      <p className="bz-body">{data.body}</p>
      <ul className="bz-items">
        {data.items.map(([name, status]) => (
          <li key={name} className="bz-item">
            <span className="bz-item-name">{name}</span>
            <span className={`bz-status bz-status-${status === STATUS.LIVE ? 'live' : 'order'}`}>
              {status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Business() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner">
        <span className="pp-eyebrow mono-label">Business Systems</span>
        <h1 className="bz-headline">The gaps are where the money&nbsp;goes.</h1>
        <p className="bz-lead">
          Most businesses don’t lose money on the big decisions. They lose it in the gaps — the
          lead that never got called back, the invoice that never went out, the handoff that lived
          in someone’s head. We build the connective tissue that closes those gaps.
        </p>
        <p className="bz-dim">
          Three kinds of help, depending on where it hurts: automations that carry the repeating
          work, communication systems that keep nothing waiting on someone’s memory, and AI
          employees that take a role outright.
        </p>

        <section className="bz-section" aria-labelledby="removes">
          <h2 id="removes" className="section-heading">What a system takes off your desk</h2>
          <Removes />
          <p className="bz-note">
            We don’t publish hours-saved numbers, because we’d be making them up — we have no
            client operations to measure yet. What we can tell you is exactly which task each
            system removes, what it needs from you, how long it takes to build, and what it costs.
          </p>
        </section>

        <div className="biz-stack">
          <Pillar data={BIZ.automations} />
          <Pillar data={BIZ.communication} />
          <Pillar data={BIZ.employees} />
        </div>

        {/* Saying "not deployed yet" out loud is a stronger signal than a
            perfect pitch — and it's the only honest way to publish a catalog
            this wide with one client on it. */}
        <p className="bz-status-note">{BIZ.statusNote}</p>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Your systems need a&nbsp;home.</p>
          <p className="bz-transition-body">
            Once the work is moving and the communication holds, the next question is where those
            systems live — a dashboard, a portal, a tool built to your process. That’s custom
            software, and it starts with a call.
          </p>
          <CallToAction />
        </div>
      </div>
    </main>
  )
}
