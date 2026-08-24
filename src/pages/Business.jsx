import { BIZ, BIZ_REMOVES, STATUS } from '../data/content.js'
import { FAMILIES } from '../data/offerings.js'
import CallToAction from '../components/CallToAction.jsx'
import { useReveal } from '../lib/useReveal.js'

/* What used to live here: a `Counter` component that eased "40 hours saved per
   week", "60% less admin time" and "2× more deadlines hit" upward over 1.4
   seconds, inside modules captioned "Live" with pulsing status dots, beside a
   fake workflow rail, fake client threads and a fake staff roster clocked in
   24/7 — from a company with no clients. Animating a number is a claim that it
   was measured. All of it is deleted.

   The 23 offerings were also plain text that linked nowhere. Each one now
   points at a block that answers what it does, who it's for, and what it needs
   from you. */

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

function Pillar({ data, items }) {
  const ref = useReveal()
  return (
    <section ref={ref} className="bz-pillar reveal" aria-labelledby={`pillar-${data.tag}`}>
      <span className="bz-tag mono-label">{data.tag}</span>
      <h2 className="bz-title" id={`pillar-${data.tag}`}>{data.title}</h2>
      <p className="bz-body">{data.body}</p>
      <ul className="bz-items">
        {items.map((it) => (
          <li key={it.slug} className="bz-item">
            <a className="bz-item-link" href={`#${it.slug}`}>{it.name}</a>
            <span className={`bz-status bz-status-${it.status === STATUS.LIVE ? 'live' : 'order'}`}>
              {it.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Detail({ item }) {
  return (
    <article className="offering" id={item.slug} aria-labelledby={`h-${item.slug}`}>
      <div className="offering-head">
        <h3 className="offering-name" id={`h-${item.slug}`}>{item.name}</h3>
        <span className={`bz-status bz-status-${item.status === STATUS.LIVE ? 'live' : 'order'}`}>
          {item.status}
        </span>
      </div>
      <p className="offering-trigger">{item.trigger}</p>
      <div className="offering-rows">
        <div className="offering-row">
          <h4>What it does</h4>
          <p>{item.does}</p>
        </div>
        <div className="offering-row">
          <h4>What it needs from you</h4>
          <p>{item.needs}</p>
        </div>
      </div>
      {item.note && <p className="offering-note">{item.note}</p>}
    </article>
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
          employees that take a role outright. Every one below says what it does, what it needs
          from you, and whether it’s running today or built to order.
        </p>

        <section className="bz-section" aria-labelledby="removes">
          <h2 id="removes" className="section-heading">What a system takes off your desk</h2>
          <Removes />
          <p className="bz-note">
            We don’t publish hours-saved numbers, because we’d be making them up — we have no
            client operations to measure yet. What we can tell you is exactly which task each
            system removes, what it needs from you, and how long it takes to build.
          </p>
        </section>

        <div className="biz-stack">
          <Pillar data={BIZ.automations} items={FAMILIES[0].items} />
          <Pillar data={BIZ.communication} items={FAMILIES[1].items} />
          <Pillar data={BIZ.employees} items={FAMILIES[2].items} />
        </div>

        {/* Saying "not deployed yet" out loud is a stronger signal than a
            perfect pitch — and it's the only honest way to publish a catalog
            this wide with one client on it. */}
        <p className="bz-status-note">{BIZ.statusNote}</p>

        <section className="bz-section" aria-labelledby="detail">
          <h2 id="detail" className="section-heading">Every one of them, in detail</h2>
          {FAMILIES.map((f) => (
            <div className="offering-group" key={f.key}>
              {f.items.map((item) => <Detail key={item.slug} item={item} />)}
            </div>
          ))}
        </section>

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
