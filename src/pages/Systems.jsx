import { motion, useReducedMotion } from 'framer-motion'
import { SYSTEMS } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'

export default function Systems() {
  const reduce = useReducedMotion()
  return (
    <main id="main" tabIndex={-1} className="page page-quiet" style={{ '--accent': 'var(--gold)' }}>
      <div className="page-inner">
        <span className="pp-eyebrow mono-label">Systems</span>
        <h1 className="bz-headline">When the thing doesn&rsquo;t exist yet.</h1>
        <p className="bz-lead">{SYSTEMS.lead}</p>
        <p className="bz-dim">
          A website, a dashboard, a portal, the internal software your business has been faking
          with spreadsheets. We build it around how you actually work, hand you the keys, and stay
          on for as long as you want us.
        </p>

        <div className="sys-list">
          {SYSTEMS.items.map(([name, body], i) => (
            <motion.article
              key={name}
              className="sys-row"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="sys-name">{name}</h2>
              <p className="sys-body">{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Start with the map.</p>
          <p className="bz-transition-body">
            Every build starts the same way: a short call where we find where your time actually
            goes and what a system should carry. You leave with that map whether you hire us or not.
          </p>
          <CallToAction />
        </div>
      </div>
    </main>
  )
}
