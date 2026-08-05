import { motion, useReducedMotion } from 'framer-motion'
import { FOUNDER } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'

export default function Founder() {
  const reduce = useReducedMotion()
  return (
    <main id="main" tabIndex={-1} className="page page-quiet page-founder" style={{ '--accent': 'var(--gold)' }}>
      <div className="page-inner">

        <div className="fd-hero">
          <div className="fd-intro">
            <span className="pp-eyebrow mono-label">{FOUNDER.role}</span>
            <h1 className="fd-name serif-display">{FOUNDER.name}</h1>
            <p className="fd-lead">{FOUNDER.lead}</p>
          </div>

          <motion.figure
            className="fd-portrait"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="./founder.jpg"
              width="1200"
              height="1800"
              alt={`${FOUNDER.name}, founder of Second Nature`}
            />
            <span className="fd-grain" aria-hidden="true" />
          </motion.figure>
        </div>

        <div className="fd-body">
          {FOUNDER.body.map((para, i) => (
            <motion.p
              key={i}
              className={i === 0 ? 'fd-para fd-para-first' : 'fd-para'}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <section className="fd-receipts" aria-label="What I've built">
          <h2 className="mono-label fd-receipts-head">What I&rsquo;ve built</h2>
          <div className="fd-receipt-list">
            {FOUNDER.receipts.map(([title, body], i) => (
              <motion.article
                key={title}
                className="fd-receipt"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="fd-receipt-idx mono-label">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="fd-receipt-title">{title}</h3>
                <p className="fd-receipt-body">{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">{FOUNDER.close}</p>
          <CallToAction />
        </div>

      </div>
    </main>
  )
}
