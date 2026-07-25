/* The intake's environment: roots reaching down, holding steady until the
   full intake experience is built. */
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
  return (
    <main id="main" tabIndex={-1} className="page page-build" style={{ '--accent': 'var(--gold)' }}>
      <RootSystem growth={0.55} />
      <div className="poster-band" aria-hidden="true">
        <img src="./poster.jpg" alt="" width="1800" height="1008" loading="lazy" />
      </div>

      <div className="page-inner" style={{ paddingTop: '1rem', maxWidth: 760 }}>
        <span className="pp-eyebrow mono-label">System Intake</span>
        <h1 className="serif-display" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4rem)', fontWeight: 500, margin: '1rem 0 0' }}>
          Let&rsquo;s build your system.
        </h1>
        <p style={{ color: 'var(--ink-dim)', margin: '1.4rem 0 0', maxWidth: '36rem' }}>
          Tell us where the friction lives. We&rsquo;ll come back with the system that removes it.
        </p>

        <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(240,240,236,.14)', paddingTop: '2.4rem' }}>
          <p className="mono-label" style={{ color: 'var(--gold)' }}>Intake opens soon</p>
          <p style={{ color: 'var(--ink-dim)', maxWidth: '34rem' }}>
            We&rsquo;re building the full intake experience now. Until it&rsquo;s live, reach us
            directly and we&rsquo;ll take it from there.
          </p>
          <a className="cta-button" href="mailto:hello@secondnature.ai" style={{ marginTop: '.6rem' }}>
            Email us
          </a>
        </div>
      </div>
    </main>
  )
}
