import { BUILDS, SAVANNAH_PHONE, SAVANNAH_PHONE_DISPLAY } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import PageImage from '../components/PageImage.jsx'

/* The case-study section, done honestly. With no outside clients there are no
   client results to report, so these are our own builds, labelled as our own.
   A real client case study replaces the first one the day there is one —
   with their name, their permission, and their numbers. */
export default function Work() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">What we’ve built</span>
        <h1 className="serif-display pp-headline">Two systems, both running&nbsp;now.</h1>
        <p className="pp-lead">
          These aren’t client case studies, because there aren’t any clients yet — and a case study
          with an invented company on it is worth less than nothing. These are the two systems we
          built and run ourselves. One of them you can test from your own phone without giving me
          your name.
        </p>

        {BUILDS.map((b) => (
          <article className="build" key={b.slug} aria-labelledby={`build-${b.slug}`}>
            <div className="build-head">
              <h2 className="build-name" id={`build-${b.slug}`}>{b.name}</h2>
              <span className="build-status">{b.status}</span>
            </div>

            <div className="build-body">
              <div className="build-row">
                <h3>The problem</h3>
                <p>{b.problem}</p>
              </div>
              <div className="build-row">
                <h3>What we built</h3>
                <p>{b.built}</p>
              </div>
              <div className="build-row">
                <h3>How you can check it</h3>
                <p>{b.proof}</p>
              </div>
              <div className="build-row">
                <h3>Built with</h3>
                <p className="build-stack">{b.stack}</p>
              </div>
            </div>

            <p className="build-honest">{b.honest}</p>
          </article>
        ))}

        {/* Deliberately not a testimonial carousel with placeholder quotes in
            it. The section appears when there is something true to put in it. */}

        <PageImage name="veins" />

        <section className="detail-block" aria-labelledby="reviews">
          <h2 className="detail-headline" id="reviews">Customer reviews</h2>
          <p className="detail-body">
            There aren’t any yet, and you won’t find invented ones here. When a client is willing
            to put their name to what we built for them, their words go in this space with their
            company attached — and until then, the phone number above is the honest substitute:
            judge the work directly instead of taking a stranger’s word for it.
          </p>
          {SAVANNAH_PHONE && (
            <a className="proof-dial" href={`tel:${SAVANNAH_PHONE}`}>
              <span className="proof-dial-num">{SAVANNAH_PHONE_DISPLAY}</span>
              <span className="proof-dial-cap">Call it and see →</span>
            </a>
          )}
        </section>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Be the first one on this page.</p>
          <p className="bz-transition-body">
            Founding clients pay the published price, get their rates held for twelve months in
            writing, and get the work written up with their name on it — every word approved by
            them first.
          </p>
          <CallToAction />
        </div>
      </div>
    </main>
  )
}
