import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../data/content.js'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

/* Terms drafted from the commitments already made elsewhere on this site and
   in CLIENT-AGREEMENT.md, so the page can't contradict the sales copy.
   Prices are stated as structure rather than numbers, because the pricing
   architecture is still being finalised — a terms page that quotes a stale
   figure is worse than one that points at the pricing page.

   REVIEW BEFORE LAUNCH: a Georgia attorney should read this alongside the
   privacy policy and the client agreement. */
export default function Terms() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Terms</span>
        <h1 className="serif-display pp-headline">The deal, in plain&nbsp;language.</h1>
        <p className="pp-lead">
          These terms cover work done by Second Nature, operated by Miles Finley in Rome,
          Georgia. They’re written to be read rather than survived. Where a specific engagement
          has a signed scope, that scope wins over anything general said here.
        </p>

        <section className="detail-block" aria-labelledby="t-scope">
          <h2 className="detail-headline" id="t-scope">1. Scope is what’s on the invoice</h2>
          <p className="detail-body">
            Every project starts with a written scope: what’s being built, what it costs, and when
            it’s due. You get that in writing before anything begins, and the number quoted is the
            number you pay. Changes are welcome — they’re quoted and added to the scope rather than
            absorbed silently, so the original number keeps meaning something.
          </p>
          <p className="detail-body">
            <strong>Two rounds of revisions are included</strong> on every build. A round is one
            consolidated list of changes, not a rolling stream of messages. Additional rounds are
            quoted before they start.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-pay">
          <h2 className="detail-headline" id="t-pay">2. Payment</h2>
          <p className="detail-body">
            Projects are half up front and half at launch; smaller builds are paid up front.
            Recurring plans are billed monthly in advance and can be cancelled with 30 days’
            notice. Card or bank through Square. Current prices are on the{' '}
            <Link className="inline-link" to="/contact">contact page</Link> or available on
            request.
          </p>
          <p className="detail-body">
            Anything with usage-based costs behind it — voice minutes in particular — carries a
            stated monthly allowance and a stated overage rate. You’ll be told the ceiling before
            you sign, not after you cross it.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-own">
          <h2 className="detail-headline" id="t-own">3. You own what we build</h2>
          <p className="detail-body">
            On final payment, the code and the data are yours. At handover you get the repository,
            the credentials, and a walkthrough. Your domain is registered in your name. If you want
            to take the work to another developer, everything they need comes with it — there is no
            proprietary platform of mine sitting in the middle, and you are never locked in.
          </p>
          <p className="detail-body">
            We keep the right to reuse general techniques and the underlying components we bring to
            every build. We don’t reuse your content, your data, or anything specific to your
            business.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-ai">
          <h2 className="detail-headline" id="t-ai">4. What an AI employee does, and doesn’t</h2>
          <p className="detail-body">
            Anything customer-facing starts under your review and earns its autonomy. An AI
            employee works from information you supply — your hours, services, prices, policies —
            and is scoped to hand off to a human when a question falls outside that. It logs what
            it does, and you get transcripts.
          </p>
          <p className="detail-body">
            It will occasionally get something wrong, the way a new hire does. When that happens we
            fix the scope. What it is not: a licensed professional. The bookkeeping assistant
            prepares and does not advise, and works alongside your accountant rather than instead
            of one. Nothing we build gives legal, financial, medical or tax advice.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-yours">
          <h2 className="detail-headline" id="t-yours">5. What we need from you</h2>
          <p className="detail-body">
            Access to the systems the build touches, the content it needs, and a decision-maker who
            can answer questions. Projects stall on content more than on code: if what we need
            hasn’t arrived within two weeks, the project pauses and re-enters the queue, because
            holding calendar time open for a stalled build isn’t fair to anyone else waiting.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-end">
          <h2 className="detail-headline" id="t-end">6. Ending it</h2>
          <p className="detail-body">
            You can stop a recurring plan with 30 days’ notice, and I’ll tell you plainly what stops
            working when it ends. If a project is cancelled midway, you pay for the work completed
            and you keep it. Data handling on termination — deletion, return, credential revocation
            — is covered in the{' '}
            <Link className="inline-link" to="/privacy">privacy policy</Link>.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-limits">
          <h2 className="detail-headline" id="t-limits">7. Liability, honestly stated</h2>
          <p className="detail-body">
            Software built on third-party services inherits their outages. We choose stable
            infrastructure and monitor it, but we don’t control it, and we can’t promise uptime we
            don’t own. Liability is limited to the fees you’ve paid for the work in question.
            Neither of us is liable for indirect or consequential losses. These terms are governed
            by the law of the State of Georgia.
          </p>
          <p className="detail-body">
            If something we built stops doing the job the scope describes, I fix it. That’s not an
            upsell and it isn’t a legal question — it’s just the deal.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="t-contact">
          <h2 className="detail-headline" id="t-contact">8. Questions</h2>
          <p className="detail-body">
            These terms may change; material changes will be dated here. Anything unclear goes to a
            person rather than a ticket queue:{' '}
            <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
