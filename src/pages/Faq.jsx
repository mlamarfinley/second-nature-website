import { FAQS, RESPONSE_PROMISE } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

/* Native <details> — keyboard-accessible for free, works without JS, and
   costs nothing in bundle size. FAQPage schema is included as clean data for
   crawlers and AI answer engines; note Google restricted FAQ *rich results*
   to government and health sites in 2023, so this is for comprehension and
   citation rather than SERP furniture. */
export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Questions</span>
        <h1 className="serif-display pp-headline">The things you’d ask on the&nbsp;call.</h1>
        <p className="pp-lead">
          Most of a first call is the same five questions. They’re answered here so you can decide
          whether to spend thirty minutes with me before you spend them.
        </p>

        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <details className="faq" key={q} open={i === 0}>
              <summary>{q}</summary>
              <div><p>{a}</p></div>
            </details>
          ))}
        </div>

        <p className="response-promise">{RESPONSE_PROMISE}</p>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Still got a question?</p>
          <p className="bz-transition-body">
            Ask the AI receptionist — it answers this kind of thing all day, and it will hand you
            to me when it can’t.
          </p>
          <CallToAction />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
