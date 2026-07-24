import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CATEGORIES, TAGLINE } from '../data/content.js'

/* Starfield: deterministic pseudo-random, SVG, CSS twinkle. */
function Cosmos() {
  const stars = useMemo(() => {
    let seed = 7
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
    return Array.from({ length: 110 }, () => ({
      x: rand() * 100, y: rand() * 100,
      r: 0.4 + rand() * 1.1,
      dur: 3 + rand() * 5, delay: -rand() * 6,
      o: 0.2 + rand() * 0.6,
    }))
  }, [])
  return (
    <div className="cosmos-bg" aria-hidden="true">
      <svg className="stars" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        {stars.map((s, i) => (
          <circle
            key={i} cx={s.x} cy={s.y} r={s.r * 0.1}
            fill="#F0F0EC" opacity={s.o}
            style={{ '--tw-dur': `${s.dur}s`, '--tw-delay': `${s.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

/* Orbit: 4 rings, one node each, auto-rotating via rAF (mouse-independent).
   Click a node → the orbit implodes into the logo core, which blooms into
   the category's reading card. */
const RADII = [20.5, 28.5, 36.5, 44.5] // percent of wrap size, from center — outer ring stays inside the wrap
const SPEEDS = [0.11, -0.08, 0.06, -0.045] // rad/s, alternating directions

function Orbit({ active, setActive, hot }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const nodeRefs = useRef([])
  const lineRefs = useRef([])
  const angles = useRef(CATEGORIES.map((_, i) => (Math.PI * 2 * i) / CATEGORIES.length + i * 0.9))
  const [, force] = useState(0)

  useEffect(() => {
    if (reduce) { force((n) => n + 1); return }
    let raf, last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!active) {
        angles.current = angles.current.map((a, i) => a + SPEEDS[i] * dt)
        const wrap = wrapRef.current
        if (wrap) {
          const S = wrap.clientWidth
          const pos = angles.current.map((a, i) => {
            const r = (RADII[i] / 100) * S
            return [S / 2 + r * Math.cos(a), S / 2 + r * Math.sin(a)]
          })
          pos.forEach(([x, y], i) => {
            const el = nodeRefs.current[i]
            if (el) { el.style.left = `${x}px`; el.style.top = `${y}px` }
          })
          // constellation threads: node i ↔ node i+1
          lineRefs.current.forEach((ln, i) => {
            if (!ln) return
            const [x1, y1] = pos[i]
            const [x2, y2] = pos[(i + 1) % pos.length]
            ln.setAttribute('x1', x1); ln.setAttribute('y1', y1)
            ln.setAttribute('x2', x2); ln.setAttribute('y2', y2)
          })
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduce])

  // static fallback positions (reduced motion / first paint)
  const staticPos = (i) => {
    const a = angles.current[i]
    return { left: `${50 + RADII[i] * Math.cos(a)}%`, top: `${50 + RADII[i] * Math.sin(a)}%` }
  }

  const activeCat = CATEGORIES.find((c) => c.slug === active)

  return (
    <div className="orbit-wrap" ref={wrapRef}>
      {RADII.map((r, i) => (
        <div
          key={i} className="orbit-ring" aria-hidden="true"
          style={{ left: `${50 - r}%`, top: `${50 - r}%`, width: `${r * 2}%`, height: `${r * 2}%` }}
        />
      ))}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: active ? 0 : 0.35, transition: 'opacity .4s' }}>
        {CATEGORIES.map((_, i) => (
          <line key={i} ref={(el) => (lineRefs.current[i] = el)} stroke="rgba(142,124,195,.4)" strokeWidth="0.7" />
        ))}
      </svg>

      <motion.div
        className="orbit-core" aria-hidden="true"
        initial={{ x: '-50%', y: '-50%' }}
        animate={active ? { x: '-50%', y: '-50%', scale: [1, 1.35, 0.9], opacity: [1, 1, 0] } : { x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
      >
        <img src="./logo.png" alt="" />
      </motion.div>

      <AnimatePresence>
        {!active &&
          CATEGORIES.map((c, i) => (
            <motion.button
              key={c.slug}
              ref={(el) => (nodeRefs.current[i] = el)}
              className={`orbit-node${hot === c.slug ? ' is-hot' : ''}`}
              style={staticPos(i)}
              onClick={() => setActive(c.slug)}
              aria-label={`Open ${c.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={reduce ? { opacity: 0 } : {
                opacity: 0, scale: 0.15,
                left: '50%', top: '50%',
                transition: { duration: 0.45, ease: [0.6, 0, 0.8, 1] },
              }}
            >
              <span className="node-dot" aria-hidden="true" />
              <span className="node-label">{c.label}</span>
              <span className="node-hint" aria-hidden="true">Click to explore</span>
            </motion.button>
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {activeCat && (
          <motion.div
            key={activeCat.slug}
            className="category-card"
            role="dialog" aria-modal="false" aria-label={activeCat.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: reduce ? 0 : 0.38, duration: reduce ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.7, transition: { duration: 0.3 } }}
          >
            <button className="card-close" onClick={() => setActive(null)} aria-label="Close and restore orbit">CLOSE ✕</button>
            <span className="mono-label" style={{ color: 'var(--teal)' }}>{activeCat.label}</span>
            <h3 className="serif-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', margin: '0.8rem 0 1rem' }}>{activeCat.headline}</h3>
            <p style={{ color: 'var(--ink-dim)', fontSize: '.95rem', margin: '0 0 1.4rem' }}>{activeCat.narrative}</p>
            <div>
              {activeCat.features.map(([name, desc]) => (
                <div className="feature-row" key={name}>
                  <strong>{name}</strong>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-label">{activeCat.strip}</span>
              <Link to={`/build?track=personal&focus=${activeCat.slug}`} className="crosslink" style={{ color: 'var(--ink)' }}>
                Build this system →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Reveal({ i = 0, className, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Personal() {
  const [active, setActive] = useState(null)
  const [hot, setHot] = useState(null)
  return (
    <main className="page" style={{ '--accent': 'var(--nebula)' }}>
      <Cosmos />
      <div className="page-inner">
        <div className="personal-grid">
          <div className="personal-copy">
            <Reveal i={0}>
              <span className="pp-eyebrow mono-label">Personal Systems</span>
            </Reveal>

            <Reveal i={1}>
              <h1 className="serif-display pp-headline">What&rsquo;s creating the most friction in your&nbsp;life?</h1>
            </Reveal>

            <Reveal i={2}>
              <p className="pp-lead">
                Maybe it&rsquo;s the schedule that never quite holds. The follow-through that slips.
                The admin that eats your evenings, or the money questions that stay unanswered.
                Wherever the friction lives, we build personal AI systems that reduce it, so you
                stay on top of your time, follow through on what matters, and get more room to
                be human.
              </p>
            </Reveal>

            <Reveal i={3}>
              <p className="pp-dim">
                We built this page around the four pressure points we see most often in our
                clients&rsquo; lives. Start with the one that feels familiar, and see how your routines,
                responsibilities, and decisions can be carried by intelligence that works with you
                instead of against you.
              </p>
            </Reveal>

            <Reveal i={4} className="pp-section">
              <h2 className="pp-prompt">Where do you need more support?</h2>
              <p className="pp-instruction mono-label">
                <span className="pp-pulse" aria-hidden="true" />
                Click an orbital to explore a pressure point
                <span className="pp-cue-line" aria-hidden="true" />
                <span className="pp-cue-arrow" aria-hidden="true">→</span>
              </p>
            </Reveal>

            <Reveal i={5}>
              <ul className="pp-rows" aria-label="Pressure points">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <button
                      className="pp-row"
                      onClick={() => setActive(c.slug)}
                      onMouseEnter={() => setHot(c.slug)}
                      onMouseLeave={() => setHot(null)}
                      onFocus={() => setHot(c.slug)}
                      onBlur={() => setHot(null)}
                    >
                      <span className="pp-row-dot" aria-hidden="true" />
                      <span>{c.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal i={6}>
              <p className="pp-support">
                Each path shows a different way we can help you build a personal system that feels
                clear, supportive, and sustainable.
              </p>
            </Reveal>

            <Reveal i={7} className="pp-close">
              <hr className="thin-rule" />
              <p className="serif-display pp-close-line">
                You don&rsquo;t need more pressure. You&nbsp;need better&nbsp;support.
              </p>
            </Reveal>
          </div>

          <div className="orbit-cell">
            <Orbit active={active} setActive={setActive} hot={hot} />
            <div className="orbit-caption" style={{ opacity: active ? 0 : 1 }}>
              <p className="mono-label orbit-caption-main">
                <span className="pp-pulse" aria-hidden="true" />
                Select a path
              </p>
              <p className="orbit-caption-sub">Start with what feels hardest.</p>
            </div>
          </div>
        </div>

        <motion.div
          className="page-transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <hr className="thin-rule page-transition-rule" />
          <p className="serif-display page-transition-headline">Your life needs a&nbsp;system.</p>
          <p className="page-transition-body">
            You&rsquo;ve seen where the friction lives. The next step is a system built around it,
            shaped to how you actually live, and ready to carry what you&rsquo;ve been carrying alone.
          </p>
          <Link to="/build?track=personal" className="cta-button">Build your system</Link>
        </motion.div>
      </div>
    </main>
  )
}
