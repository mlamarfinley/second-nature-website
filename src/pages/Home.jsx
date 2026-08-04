import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { matrix3dForQuad } from '../lib/homography.js'
import { HERO, CALENDLY_URL, HOME_COPY } from '../data/content.js'

/* In-screen UIs, authored at a fixed 640×360 design size and warped
   onto the photographed screens with matrix3d. All loops are CSS. */

function BusinessScreenUI() {
  return (
    <div className="sui" aria-hidden="true">
      <div className="sui-pad">
        <div className="sui-title"><span className="sui-dot" />OPERATIONS · LIVE</div>
        <div className="sui-hr" />
        <div className="sui-bars">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} style={{ '--bar-dur': `${2.8 + i * 0.35}s`, '--bar-delay': `${i * 0.22}s` }} />
          ))}
        </div>
        <div className="sui-hr" />
        <div className="sui-row"><span>WORKFLOWS RUNNING</span><b>41</b></div>
        <div className="sui-row"><span>FOLLOW-UPS SENT</span><b>128</b></div>
        <div className="sui-typeline">&gt; inbox triage complete · 3 actions extracted_</div>
      </div>
    </div>
  )
}

function PersonalScreenUI() {
  const rings = [
    { size: 292, color: 'rgba(142,124,195,.55)', dur: 26 },
    { size: 224, color: 'rgba(142,124,195,.6)', dur: 19, rev: true },
    { size: 156, color: 'rgba(142,124,195,.75)', dur: 13 },
    { size: 88, color: 'rgba(240,240,236,.5)', dur: 9, rev: true },
  ]
  return (
    <div className="sui" aria-hidden="true">
      <div className="sui-rings">
        {rings.map((r, i) => (
          <span
            key={i}
            className="sui-ring"
            style={{
              width: r.size, height: r.size,
              left: `calc(50% - ${r.size / 2}px)`, top: `calc(50% - ${r.size / 2}px)`,
              borderColor: r.color, borderTopColor: 'transparent',
              animation: `${r.rev ? 'sn-ring-spin-rev' : 'sn-ring-spin'} ${r.dur}s linear infinite`,
            }}
          />
        ))}
      </div>
      <div className="sui-pad" style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div className="sui-title"><span className="sui-dot" style={{ background: 'var(--nebula)' }} />PERSONAL SYSTEM · 4 NODES</div>
      </div>
    </div>
  )
}

function CenterScreenUI() {
  return (
    <div className="sui" aria-hidden="true" style={{ display: 'grid', placeItems: 'center', background: '#0b0f0b' }}>
      <img className="sui-center-logo" src="./logo.webp" width="384" height="384" alt="" />
    </div>
  )
}

const SURFACE_W = 640
const SURFACE_H = 360

function Fireflies({ count = 16 }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: 4 + ((i * 61) % 92),
        bottom: 2 + ((i * 37) % 40),
        size: 2 + ((i * 13) % 4),
        dur: 11 + ((i * 7) % 12),
        delay: -((i * 5) % 18),
        drift: ((i % 5) - 2) * 14,
        peak: 0.35 + ((i * 11) % 50) / 100,
      })),
    [count],
  )
  return (
    <>
      {flies.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            left: `${f.left}%`, bottom: `${f.bottom}%`,
            width: f.size, height: f.size,
            '--fly-dur': `${f.dur}s`, '--fly-delay': `${f.delay}s`,
            '--fly-drift': `${f.drift}px`, '--fly-peak': f.peak,
          }}
        />
      ))}
    </>
  )
}

function Stage() {
  const viewportRef = useRef(null)
  const [box, setBox] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const measure = () => {
      const vw = el.clientWidth
      const vh = el.clientHeight
      // Cover: lock to image ratio, fill viewport, center — but NEVER crop into the
      // monitors (they span ~16%–84% of the image). If covering the height would push
      // them past the edges, clamp the zoom and letterbox top/bottom instead.
      let h = Math.max(vw / HERO.ratio, vh)
      const maxW = vw / 0.72 // keep the monitor span (68%) inside the viewport with margin
      if (h * HERO.ratio > maxW) h = maxW / HERO.ratio
      setBox({ w: h * HERO.ratio, h, letterboxed: h < vh - 1 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const surfaces = useMemo(() => {
    if (!box) return []
    const px = (q) => q.map(([x, y]) => [(x / 100) * box.w, (y / 100) * box.h])
    return [
      { key: 'left', to: '/business', label: 'ENTER BUSINESS SYSTEMS', ui: <BusinessScreenUI />, quad: px(HERO.quads.left), pon: 0.75 },
      { key: 'center', to: null, label: null, ui: <CenterScreenUI />, quad: px(HERO.quads.center), pon: 0.2 },
      { key: 'right', to: '/personal', label: 'ENTER PERSONAL SYSTEMS', ui: <PersonalScreenUI />, quad: px(HERO.quads.right), pon: 0.9 },
    ].map((s) => ({ ...s, matrix: matrix3dForQuad(SURFACE_W, SURFACE_H, s.quad) }))
  }, [box])

  return (
    <div className={`stage-viewport${box?.letterboxed ? ' letterboxed' : ''}`} ref={viewportRef}>
      {box && (
        <div className="stage" style={{ width: box.w, height: box.h }}>
          <picture>
            <source type="image/webp" srcSet="./hero-800.webp 800w, ./hero-1456.webp 1456w" sizes="100vw" />
            <img
              className="stage-img" src="./hero.jpg" width="1456" height="816"
              loading="eager" fetchPriority="high"
              alt="Three monitors on a table in a sunset forest, the Second Nature systems"
            />
          </picture>
          <div
            className="sun-bloom"
            style={{
              left: `${HERO.bloom.x - HERO.bloom.w / 2}%`, top: `${HERO.bloom.y - HERO.bloom.h / 2}%`,
              width: `${HERO.bloom.w}%`, height: `${HERO.bloom.h}%`,
            }}
          />
          <Fireflies />
          <div className="screen-caption" style={{ left: '25.4%', top: '56.2%' }} aria-hidden="true">
            Business systems
          </div>
          <div className="screen-caption" style={{ left: '75.2%', top: '56.2%' }} aria-hidden="true">
            Personal systems
          </div>
          {surfaces.map((s) =>
            s.to ? (
              <a
                key={s.key}
                className="screen-surface screen-link"
                style={{ width: SURFACE_W, height: SURFACE_H, transform: s.matrix }}
                href={`#${s.to}`}
                aria-label={s.label}
                onClick={(e) => { e.preventDefault(); navigate(s.to) }}
              >
                <div className="screen-inner" style={{ '--pon-delay': `${s.pon}s` }}>{s.ui}</div>
                <span className="screen-label">{s.label}</span>
              </a>
            ) : (
              <div key={s.key} className="screen-surface" style={{ width: SURFACE_W, height: SURFACE_H, transform: s.matrix }}>
                <div className="screen-inner" style={{ '--pon-delay': `${s.pon}s` }}>{s.ui}</div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}

function MobileHome() {
  // Mirror the CSS cover math (object-position 50% 26%) to find where the
  // photographed center screen lands, so the logo sits ON the monitor.
  const wrapRef = useRef(null)
  const [screenRect, setScreenRect] = useState(null)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const vw = el.clientWidth
      const vh = el.clientHeight
      const scale = Math.max(vw / 1456, vh / 816)
      const dw = 1456 * scale
      const dh = 816 * scale
      const ox = (vw - dw) * 0.5
      const oy = (vh - dh) * 0.26
      const q = HERO.quads.center
      setScreenRect({
        left: ox + (q[0][0] / 100) * dw,
        top: oy + (q[0][1] / 100) * dh,
        width: ((q[1][0] - q[0][0]) / 100) * dw,
        height: ((q[2][1] - q[1][1]) / 100) * dh,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <div className="mobile-home" ref={wrapRef}>
      <picture>
        <source type="image/webp" srcSet="./hero-800.webp 800w, ./hero-1456.webp 1456w" sizes="100vw" />
        <img className="mh-bg" src="./hero.jpg" width="1456" height="816" loading="eager" fetchPriority="high" alt="" aria-hidden="true" />
      </picture>
      <div className="mh-scrim" aria-hidden="true" />
      {screenRect && (
        <div className="mh-screen-logo" style={screenRect} aria-hidden="true">
          <img src="./logo.webp" width="384" height="384" alt="" />
        </div>
      )}
      <div className="mh-ambient" aria-hidden="true">
        <Fireflies count={8} />
      </div>
    </div>
  )
}

function DailyBriefUI() {
  const rows = [
    ['07:30', 'Morning check-in call', 'done'],
    ['09:00', 'Deep work: proposal draft', 'now'],
    ['12:30', 'Follow-up: 2 replies drafted', 'queued'],
    ['17:00', 'Day review + carry-over', 'queued'],
  ]
  return (
    <div className="sui" aria-hidden="true">
      <div className="sui-pad">
        <div className="sui-title"><span className="sui-dot" style={{ background: 'var(--gold)' }} />TODAY · PERSONAL SYSTEM</div>
        <div className="sui-hr" />
        {rows.map(([t, label, st]) => (
          <div className="sui-row" key={label}><span>{t} · {label}</span><b>{st.toUpperCase()}</b></div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main id="main" tabIndex={-1} aria-label="Second Nature home">
      <section className="hero-band">
        <Stage />
        <MobileHome />
        <div className="hero-overlay">
          <span className="mono-label hero-eyebrow">Second Nature · AI Systems</span>
          <h1 className="serif-display hero-h1">We build AI systems that work with&nbsp;you.</h1>
          <p className="hero-sub">
            Custom agents that carry your schedule, your follow-ups, your admin, and your
            operations, calmly, in the background, every day.
          </p>
          <div className="hero-actions">
            <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
            <a
              className="hero-secondary"
              href="#how"
              onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              See how it works ↓
            </a>
          </div>
        </div>
      </section>

      <div className="home-body">
        <section className="hb-section hb-reframe" aria-label="The idea">
          <p className="serif-display hb-line">{HOME_COPY.reframe.line}</p>
          <p className="hb-body">{HOME_COPY.reframe.body}</p>
        </section>

        <section className="hb-section" aria-label="What we build">
          <span className="mono-label hb-eyebrow">What we build</span>
          <div className="hb-tracks">
            {[HOME_COPY.tracks.life, HOME_COPY.tracks.business].map((t) => (
              <div className="hb-track" key={t.title}>
                <h2>{t.title}</h2>
                <ul>{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <Link className="crosslink" to={t.to}>Explore {t.title === 'For your life' ? 'personal' : 'business'} →</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="hb-section" aria-label="How it works">
          <span className="mono-label hb-eyebrow">How it works</span>
          <div className="hb-steps">
            {HOME_COPY.steps.map(([title, body], i) => (
              <div className="hb-step" key={title}>
                <span className="hb-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hb-section" aria-label="Proof">
          <span className="mono-label hb-eyebrow">{HOME_COPY.proof.title}</span>
          <p className="hb-body hb-proof-body">{HOME_COPY.proof.body}</p>
          <div className="hb-proof-screens" aria-hidden="true">
            <div className="hb-screen"><DailyBriefUI /></div>
            <div className="hb-screen"><BusinessScreenUI /></div>
          </div>
        </section>

        <section className="hb-section" aria-label="Why Second Nature">
          <span className="mono-label hb-eyebrow">Why Second Nature</span>
          <div className="hb-truths">
            {HOME_COPY.truths.map(([title, body]) => (
              <div className="hb-truth" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hb-section hb-close" aria-label="Get started">
          <p className="serif-display hb-line">Technology that becomes second&nbsp;nature.</p>
          <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </section>
      </div>
    </main>
  )
}
