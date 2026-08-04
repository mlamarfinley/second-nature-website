import { motion, useReducedMotion } from 'framer-motion'
import { CATEGORIES, CALENDLY_URL } from '../data/content.js'

function Reveal({ i = 0, className, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Personal() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet" style={{ '--accent': 'var(--nebula)' }}>
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
          <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </Reveal>
      </div>
    </main>
  )
}
