import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BIZ } from '../data/content.js'

function GridStreams() {
  const streams = useMemo(
    () => [
      { cls: 'h', top: '18%', dur: 9, delay: 0 },
      { cls: 'h', top: '52%', dur: 13, delay: -4 },
      { cls: 'h', top: '78%', dur: 11, delay: -7 },
      { cls: 'v', left: '24%', dur: 12, delay: -2 },
      { cls: 'v', left: '71%', dur: 10, delay: -6 },
    ],
    [],
  )
  return (
    <div className="grid-bg" aria-hidden="true">
      {streams.map((s, i) => (
        <span
          key={i}
          className={`data-stream ${s.cls}`}
          style={{ top: s.top, left: s.left, '--st-dur': `${s.dur}s`, '--st-delay': `${s.delay}s` }}
        />
      ))}
    </div>
  )
}

function Counter({ n, suffix, cap }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [val, setVal] = useState(reduce ? n : 0)
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1400
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1)
          setVal(Math.round(n * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [n, reduce])
  return (
    <div ref={ref} className="bz-metric">
      <div className="bz-metric-num">{val}<em>{suffix}</em></div>
      <div className="mono-label">{cap}</div>
    </div>
  )
}

/* Ops module: a live workflow rail — work moving through the machine. */
function WorkflowRail() {
  const stages = ['Intake', 'Triage', 'Execute', 'Report']
  return (
    <div className="bz-rail" aria-hidden="true">
      <span className="bz-rail-pulse" />
      {stages.map((st) => (
        <span key={st} className="bz-rail-stage">{st}</span>
      ))}
    </div>
  )
}

/* Team module: a live communication thread. */
function CommThread() {
  const rows = [
    ['Meeting summary', 'sent · 09:12'],
    ['Client follow-up', 'drafted for review'],
    ['Team check-in', 'scheduled · Fri'],
    ['Deadline shift', 'flagged to owner'],
  ]
  return (
    <div className="bz-comm" aria-hidden="true">
      {rows.map(([name, status], i) => (
        <div key={name} className="bz-comm-row">
          <span className="bz-comm-dot" style={{ animationDelay: `${i * 0.7}s` }} />
          <span className="bz-comm-name">{name}</span>
          <span className="bz-comm-status">{status}</span>
        </div>
      ))}
    </div>
  )
}

function Pillar({ data, flavor, live, setLive, moduleTitle, children, footer }) {
  const reduce = useReducedMotion()
  const state = live === flavor ? ' is-live' : live ? ' is-rest' : ''
  return (
    <motion.section
      className={`bz-pillar bz-${flavor}${state}`}
      aria-label={data.title}
      onMouseEnter={() => setLive(flavor)}
      onMouseLeave={() => setLive(null)}
      onFocusCapture={() => setLive(flavor)}
      onBlurCapture={() => setLive(null)}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="bz-tag mono-label">{data.tag}</span>
      <h3 className="bz-title">{data.title}</h3>
      <p className="bz-body">{data.body}</p>
      <div className="bz-module">
        <div className="bz-module-head">
          <span className="mono-label">{moduleTitle}</span>
          <span className={`bz-live-dot bz-live-${flavor}`} aria-hidden="true" />
        </div>
        {children}
        {footer && <p className="bz-module-foot mono-label">{footer}</p>}
      </div>
      <ul className="bz-items">
        {data.items.map((name) => (
          <li key={name} className="bz-item">
            <span className={`bz-marker bz-marker-${flavor}`} aria-hidden="true" />
            {name}
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default function Business() {
  const [live, setLive] = useState(null)
  return (
    <main className="page" style={{ '--accent': 'var(--pulse)' }}>
      <div className="bz-leaf" aria-hidden="true" />
      <GridStreams />
      <div className="page-inner">
        <span className="pp-eyebrow mono-label" style={{ color: 'var(--pulse)' }}>Business Systems</span>
        <h1 className="bz-headline">
          Your business runs on two things: systems and&nbsp;people.
        </h1>
        <p className="bz-lead">
          When either side breaks down, the whole business feels it. Deadlines slip. Communication
          gets messy. Admin expands. Follow-through weakens. We build AI systems that help your
          business run more clearly, move faster, and stay connected where it counts.
        </p>
        <p className="bz-dim">
          We split this page across the two forces that shape how a business performs: the
          operational side that keeps work moving, and the people side that keeps teams, clients,
          and communication aligned. Explore both, then tell us where it hurts most.
        </p>

        <div className="bz-section">
          <h2 className="pp-prompt">Where is your business feeling the most friction?</h2>
          <p className="pp-instruction mono-label">
            <span className="pp-pulse bz-pulse" aria-hidden="true" />
            Explore both sides of the system
          </p>
        </div>

        <div className="biz-columns">
          <Pillar
            data={BIZ.ops}
            flavor="ops"
            live={live}
            setLive={setLive}
            moduleTitle="Operations · Live"
            footer="AI support that works like an extra employee. Always on, never behind."
          >
            <div className="bz-metrics">
              {BIZ.stats.map((s) => (
                <Counter key={s.cap} {...s} />
              ))}
            </div>
            <WorkflowRail />
          </Pillar>

          <Pillar
            data={BIZ.team}
            flavor="team"
            live={live}
            setLive={setLive}
            moduleTitle="Communication · Live"
            footer={BIZ.outcomes.join(' · ')}
          >
            <CommThread />
          </Pillar>
        </div>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Your systems need a&nbsp;home.</p>
          <p className="bz-transition-body">
            Once the work is clearer and the communication is stronger, the next step is the
            interface those systems live inside. A dashboard, portal, or workflow layer that gives
            your business a calm place to operate. That&rsquo;s what we build next.
          </p>
          <Link to="/build?track=business" className="cta-button">Build your system</Link>
        </div>
      </div>
    </main>
  )
}
