import { CATEGORIES } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'
import { useReveal } from '../lib/useReveal.js'

function Reveal({ i = 0, className, children }) {
  const ref = useReveal({ delay: i * 50 })
  return (
    <div ref={ref} className={`reveal ${className || ''}`.trim()}>
      {children}
    </div>
  )
}

export default function Personal() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
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

        {CATEGORIES.map((c, idx) => (
          <Reveal key={c.slug} className="detail-block" i={idx + 3}>
            <span className="mono-label detail-label">{c.label}</span>
            <h2 className="detail-headline">{c.headline}</h2>
            <p className="detail-body">{c.narrative}</p>
            <div>
              {c.features.map(([name, desc]) => (
                <div className="feature-row" key={name}>
                  <strong>{name}</strong>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="page-transition" i={7}>
          <hr className="thin-rule page-transition-rule" />
          <p className="serif-display page-transition-headline">Your life needs a&nbsp;system.</p>
          <p className="page-transition-body">
            Thirty minutes is enough to map where yours should start.
          </p>
          <CallToAction />
        </Reveal>
      </div>
    </main>
  )
}
