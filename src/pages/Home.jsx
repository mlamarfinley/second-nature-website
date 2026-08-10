import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { matrix3dForQuad } from '../lib/homography.js'
import {
  HERO,
  HOME_COPY,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
  FAQS,
  RESPONSE_PROMISE,
} from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'

/* In-screen surfaces, authored at a fixed 640×360 and warped onto the
   photographed monitors with matrix3d.

   These used to display invented telemetry — "WORKFLOWS RUNNING 41",
   "FOLLOW-UPS SENT 128", "Invoice #204 · reminder sent" — under labels that
   read LIVE, from a company with no clients. Every number is gone. What's
   left is ambient light with no claim attached: a screen that is on, not a
   screen that is lying. Real product screenshots replace these entirely once
   they're captured. */

function AmbientBars() {
  return (
    <div className="sui" aria-hidden="true">
      <div className="sui-pad">
        <div className="sui-bars">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} style={{ '--bar-dur': `${2.8 + i * 0.35}s`, '--bar-delay': `${i * 0.22}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AmbientRings() {
  const rings = [
    { size: 292, color: 'rgba(232,168,76,.35)', dur: 26 },
    { size: 224, color: 'rgba(232,168,76,.4)', dur: 19, rev: true },
    { size: 156, color: 'rgba(232,168,76,.5)', dur: 13 },
    { size: 88, color: 'rgba(240,240,236,.4)', dur: 9, rev: true },
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
      let h = Math.max(vw / HERO.ratio, vh)
      const maxW = vw / 0.72
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
      { key: 'left', to: '/business', label: 'Business systems', ui: <AmbientBars />, quad: px(HERO.quads.left), pon: 0.75 },
      { key: 'center', to: null, label: null, ui: <CenterScreenUI />, quad: px(HERO.quads.center), pon: 0.2 },
      { key: 'right', to: '/systems', label: 'Custom software', ui: <AmbientRings />, quad: px(HERO.quads.right), pon: 0.9 },
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
              loading="eager" fetchpriority="high"
              alt="Three monitors on a desk in a forest at sunset"
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
                {/* Label is always faintly visible, not hover-only: touch users
                    never discovered these were links. */}
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
        <img className="mh-bg" src="./hero.jpg" width="1456" height="816" loading="eager" fetchpriority="high" alt="" aria-hidden="true" />
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

/* Renders the desktop stage OR the mobile poster — never both. They used to
   render together, so a phone ran the homography math, two ResizeObservers and
   ~35 animations underneath an opaque image, and left two invisible links
   sitting in the tab order. */
function useIsWide(query = '(min-width: 1025px) and (min-aspect-ratio: 21/20)') {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return wide
}

export default function Home() {
  const wide = useIsWide()
  const { hero, tracks, steps, proof, truths, founding, reframe } = HOME_COPY

  return (
    <main id="main" tabIndex={-1}>
      {/* Wide screens get the composed stage with the copy set into it.
          Narrow screens get type on solid black and the image below as its
          own band — text over a bright photograph needed a scrim, a second
          scrim and a text-shadow to be readable, which is the tell that the
          composition never had room for it. */}
      <section className="hero-band">
        {wide && <Stage />}
        <div className="hero-overlay">
          <span className="mono-label hero-eyebrow">{hero.eyebrow}</span>
          <h1 className="serif-display hero-h1">{hero.h1}</h1>
          <p className="hero-sub">{hero.sub}</p>
          <CallToAction className="hero-cta-block" />
          <p className="hero-proof-line">{hero.proofLine}</p>
        </div>
      </section>
      {!wide && <MobileHome />}

      <div className="home-body">
        <section className="hb-section hb-reframe" aria-labelledby="idea">
          <h2 id="idea" className="serif-display hb-line">{reframe.line}</h2>
          <p className="hb-body">{reframe.body}</p>
        </section>

        {/* Three tracks, three rows. This used to be a two-column grid holding
            three items, so the third orphaned onto its own row — in the site's
            core merchandising section. And every crosslink label came from a
            two-case ternary, so the custom-software track was signposted
            "Explore business". Labels now live in the data. */}
        <section className="hb-section" aria-labelledby="what-we-build">
          <h2 id="what-we-build" className="section-heading">What we build</h2>
          <div className="hb-tracks">
            {[tracks.business, tracks.systems, tracks.life].map((t) => (
              <div className="hb-track" key={t.title}>
                <h3>{t.title}</h3>
                <ul>{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <Link className="crosslink" to={t.to}>{t.cta} →</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="hb-section" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="section-heading">How it works</h2>
          <div className="hb-steps">
            {steps.map(([title, body], i) => (
              <div className="hb-step" key={title}>
                <span className="hb-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The proof section used to be two fabricated dashboards under the
            heading "Running right now". The proof is now the thing a stranger
            can verify in ninety seconds: the number answers. */}
        <section className="hb-section hb-proof" aria-labelledby="proof">
          <h2 id="proof" className="section-heading">{proof.title}</h2>
          <p className="hb-body hb-proof-body">{proof.body}</p>
          {SAVANNAH_PHONE && (
            <a className="proof-dial" href={`tel:${SAVANNAH_PHONE}`}>
              <span className="proof-dial-num">{SAVANNAH_PHONE_DISPLAY}</span>
              <span className="proof-dial-cap">{proof.cta} →</span>
            </a>
          )}
          <p className="hb-body proof-more">
            <Link className="inline-link" to="/work">See both systems in detail →</Link>
          </p>
        </section>

        <section className="hb-section" aria-labelledby="why">
          <h2 id="why" className="section-heading">Why Second Nature</h2>
          <div className="hb-truths">
            {truths.map(([title, body]) => (
              <div className="hb-truth" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hb-section" aria-labelledby="home-faq">
          <h2 id="home-faq" className="section-heading">Questions people ask first</h2>
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <details className="faq" key={q} open={i === 0}>
                <summary>{q}</summary>
                <div><p>{a}</p></div>
              </details>
            ))}
          </div>
          <p className="response-promise">{RESPONSE_PROMISE}</p>
          <p className="hb-body proof-more">
            <Link className="inline-link" to="/faq">All questions and answers →</Link>
          </p>
        </section>

        <section className="hb-section hb-founding" aria-labelledby="founding">
          <h2 id="founding" className="section-heading">{founding.title}</h2>
          <p className="hb-body">{founding.body}</p>
          <p className="hb-body proof-more">
            <Link className="inline-link" to="/contact">Get a free friction map →</Link>
          </p>
        </section>

        <section className="hb-section hb-close" aria-labelledby="start">
          <h2 id="start" className="serif-display hb-line">Call it and decide for yourself.</h2>
          <CallToAction />
        </section>
      </div>
    </main>
  )
}
