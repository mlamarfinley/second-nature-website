import ForestBeams from '../components/ForestBeams.jsx'
import { CONTACT_EMAIL, LOCALITY } from '../data/content.js'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

/* A generic generated policy would be worse than useless here: this business
   is handed inboxes, calendars and books, so a policy that never mentions any
   of those answers the wrong question. Two kinds of data are separated
   explicitly, and every subprocessor is named.

   REVIEW BEFORE LAUNCH: have a Georgia attorney read this alongside
   CLIENT-AGREEMENT.md, and re-verify each provider's training terms annually. */
export default function Privacy() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <ForestBeams />
      <div className="page-inner detail-inner">
        <Breadcrumbs />
        <span className="pp-eyebrow mono-label">Privacy</span>
        <h1 className="serif-display pp-headline">What we do with your&nbsp;data.</h1>
        <p className="pp-lead">
          Second Nature is operated by Miles Finley in {LOCALITY}. This policy covers two different
          things, and most policies only cover the first: what happens to your data on this
          website, and what happens to your business data when we build something for you.
        </p>

        <section className="detail-block" aria-labelledby="p-site">
          <h2 className="detail-headline" id="p-site">1. This website</h2>
          <p className="detail-body">
            If you email us, we receive your email address and the information you choose to send.
            Booking through Google Calendar shares the details you enter with Google. We use
            inquiry information to respond and arrange the conversation; contacting us does not
            subscribe you to marketing. Email and scheduling providers process information to
            deliver those services.
          </p>
          <p className="detail-body">
            Analytics, if enabled, are privacy-preserving and aggregate: page views and clicks on
            the call and booking links, with no cookies and no cross-site tracking. Fonts are
            served with this website rather than requested from Google Fonts. Following an
            external booking or payment link takes you to that provider’s service and policy.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="p-client">
          <h2 className="detail-headline" id="p-client">2. Your business data, during an engagement</h2>
          <p className="detail-body">
            Building a system means being given access to real systems — a calendar, an inbox, a
            CRM, sometimes accounting. The rules are:
          </p>
          <ul className="policy-list">
            <li><strong>Your data stays in your accounts</strong> wherever it can. We use scoped access you authorize; revocation steps are documented at handover.</li>
            <li><strong>We do not use your data to train our own general-purpose models.</strong> Provider processing and training settings are verified and recorded in your data schedule before access is enabled.</li>
            <li><strong>Voice recording and transcription are agreed before activation.</strong> The scope identifies the actual configuration, applicable disclosure and consent requirements, retention and a refusal path. We test these controls before live use.</li>
            <li><strong>Access is limited to what the service needs.</strong> Miles operates Second Nature; approved providers may process data as listed in the project schedule. Additional human access requires authorization.</li>
            <li><strong>On termination, we return or delete active client data within 30 days</strong> under the agreed schedule and revoke our access. Backup deletion follows the specified cycle; legally required records are retained only as necessary. You can request deletion at any time.</li>
            <li><strong>If your data is ever exposed</strong> we notify you without undue delay, within 72 hours of awareness or sooner where required, with available facts and updates as the investigation develops.</li>
          </ul>
        </section>

        <section className="detail-block" aria-labelledby="p-sub">
          <h2 className="detail-headline" id="p-sub">3. Who else touches it</h2>
          <p className="detail-body">
            The services a client build may run on, named rather than described vaguely: Anthropic (model
            inference), Retell (voice and SMS), Supabase (database), Vercel (hosting), Resend
            (email), Stripe (payments), Calendly (scheduling), and — only where the build needs
            them — Google Workspace APIs, QuickBooks, or Plaid. We tell you before adding one to
            your build. Second Nature currently requests payment by bank transfer; invoice and
            payment records are retained for bookkeeping. Stripe applies only where a commissioned
            client build needs card payments.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="p-rights">
          <h2 className="detail-headline" id="p-rights">4. Your rights, and reaching a person</h2>
          <p className="detail-body">
            You can ask what we hold, ask for a copy, or ask us to delete it, by emailing{' '}
            <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We do
            not sell personal information and we do not respond differently to Do Not Track
            signals — we don’t track across sites at all. A data processing agreement is available
            on request.
          </p>
          <p className="detail-body sn-hint">
            Questions about any of this go to a person, not a ticket queue: {CONTACT_EMAIL}.
          </p>
        </section>
      </div>
    </main>
  )
}
