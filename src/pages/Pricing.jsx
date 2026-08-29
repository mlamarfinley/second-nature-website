import { Link } from 'react-router-dom'
import {
  STUDENT_PACKAGES, BUSINESS_PACKAGES, STUDENT_EXTRAS,
  SYSTEM_TIERS, CARE, PROCESS,
} from '../data/pricing.js'
import CallToAction from '../components/CallToAction.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import PageImage from '../components/PageImage.jsx'

/* Rows on rules, not cards in boxes. A pricing page is the single most
   card-shaped page on any agency site and that is exactly the pattern the
   brand work rules out, so every price here is a line in a ledger.

   Two disclosure rules, deliberately different — see src/data/pricing.js. */

function PriceRow({ name, price, body, note }) {
  return (
    <div className="price-row">
      <div className="price-row-head">
        <h3 className="price-row-name">{name}</h3>
        <span className="price-row-figure">{price}</span>
      </div>
      <p className="price-row-body">{body}</p>
      {note && <p className="price-row-note">{note}</p>}
    </div>
  )
}

export default function Pricing() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Pricing</span>
        <h1 className="serif-display pp-headline">The number you see is the number you&nbsp;pay.</h1>
        <p className="pp-lead">
          Websites are priced flat and published in full below — no “contact us for a quote” on work
          we can price without meeting you. Systems are quoted after a call, because what they cost
          genuinely depends on what you already have, so those carry a floor instead of a fiction.
        </p>

        <section className="detail-block" aria-labelledby="sites">
          <h2 className="detail-headline" id="sites">Websites</h2>
          <p className="detail-body">
            Complete builds: design, your logo and branding, your domain connected, live on the
            internet. Your branding is always part of the build — you never pay to put your own logo
            on your own site.
          </p>

          <h3 className="price-group">For businesses</h3>
          <div className="price-list">
            {BUSINESS_PACKAGES.map((p) => <PriceRow key={p.name} {...p} />)}
          </div>

          <h3 className="price-group">For students</h3>
          <p className="detail-body price-gate">
            These are the same builds at a lower price, not a lesser product. They’re for current
            students, grads within a year, and campus orgs — verified with a <code>.edu</code> email
            or a photo of a student ID, which is the entire process. If you’re running a business
            rather than studying, the prices above are the ones that apply to you.
          </p>
          <div className="price-list">
            {STUDENT_PACKAGES.map((p) => <PriceRow key={p.name} {...p} />)}
          </div>

          <h3 className="price-group">Add anything</h3>
          <ul className="price-extras">
            {STUDENT_EXTRAS.map(([name, price, body]) => (
              <li key={name}>
                <span className="price-extra-name">{name}</span>
                <span className="price-extra-figure">{price}</span>
                {body && <span className="price-extra-body">{body}</span>}
              </li>
            ))}
          </ul>
          <p className="price-fine">
            A full menu — extra pages, galleries, payments, catalogues, copywriting, migrations —
            is priced line by line and comes with the written quote. Two revision rounds are
            included on every build.
          </p>
        </section>

        <PageImage name="dunes">
          <h2 className="page-image-heading serif-display" id="systems-pricing">Systems</h2>
        </PageImage>

        <section className="detail-block" aria-labelledby="systems-pricing">
          <p className="detail-body">
            Automations, communication systems and AI employees are quoted after a free 30-minute
            call, and the quote is written down before anything starts. These are floors, not
            estimates — what sits above them depends on how many tools have to talk to each other
            and how much of your process already exists in writing.
          </p>
          <div className="price-list">
            {SYSTEM_TIERS.map((t) => (
              <PriceRow key={t.name} name={t.name} price={t.setup} body={t.body} note={t.monthly} />
            ))}
          </div>
          <p className="price-fine">
            Monthly covers hosting, model usage, monitoring, tuning and a report, with a usage
            ceiling and a stated overage rate written into the quote — voice minutes are the one
            place a bill can quietly run away from you. Any build containing an AI employee includes
            monitoring for its first 90 days.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="care">
          <h2 className="detail-headline" id="care">After launch</h2>
          <p className="detail-body">
            Every build can be handed over completely. Keeping us on is a choice, not a condition.
          </p>
          <ul className="price-extras">
            {CARE.map(([name, price, body]) => (
              <li key={name}>
                <span className="price-extra-name">{name}</span>
                <span className="price-extra-figure">{price}</span>
                <span className="price-extra-body">{body}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail-block" aria-labelledby="how">
          <h2 className="detail-headline" id="how">How it works</h2>
          <ol className="price-steps">
            {PROCESS.map(([step, body], i) => (
              <li key={step}>
                <span className="price-step-n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="price-step-name">{step}</h3>
                  <p className="price-step-body">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="price-fine">
            Builds under $500 are paid up front; larger builds are half to start, half at launch.
            Your domain is bought in your name (about $12 a year) and stays yours — you are never
            locked in to us. See the <Link className="inline-link" to="/faq">questions page</Link> for
            what happens if you want to leave.
          </p>
        </section>

        <div className="bz-transition">
          <hr className="thin-rule bz-transition-rule" />
          <p className="serif-display bz-transition-headline">Not sure which line you’re&nbsp;on?</p>
          <p className="bz-transition-body">
            The 30-minute call is free and you keep what comes out of it — a map of where your time
            actually goes — whether you hire us or not.
          </p>
          <CallToAction />
        </div>
      </div>
    </main>
  )
}
