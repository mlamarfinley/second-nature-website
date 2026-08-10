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
            If you send the contact form we receive your name, the contact detail you gave us, and
            what you wrote. It is used to answer you and nothing else. It is never sold, rented or
            shared, and you are not added to any mailing list.
          </p>
          <p className="detail-body">
            Analytics, if enabled, are privacy-preserving and aggregate: page views and clicks on
            the call and booking links, with no cookies and no cross-site tracking. Fonts are
            currently loaded from Google Fonts, which means Google receives your IP address when
            the page loads; self-hosting them is a pending fix.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="p-client">
          <h2 className="detail-headline" id="p-client">2. Your business data, during an engagement</h2>
          <p className="detail-body">
            Building a system means being given access to real systems — a calendar, an inbox, a
            CRM, sometimes accounting. The rules are:
          </p>
          <ul className="policy-list">
            <li><strong>Your data stays in your accounts</strong> wherever it can. We connect through official APIs using access you grant and can revoke in one click.</li>
            <li><strong>Nothing is used to train models.</strong> Not by us, and not by our providers on data submitted through their APIs.</li>
            <li><strong>Calls are recorded and transcribed</strong> where a voice agent is deployed, and the agent says so when it answers. Recordings and transcripts are yours.</li>
            <li><strong>Access is one person.</strong> Second Nature is Miles Finley; no one else touches your systems without your written say-so.</li>
            <li><strong>On termination we delete or return everything within 30 days</strong> and revoke every credential and OAuth grant. You can ask for deletion at any time.</li>
            <li><strong>If your data is ever exposed</strong> we tell you within 72 hours of finding out, with what we know, what we’ve done, and what we recommend.</li>
          </ul>
        </section>

        <section className="detail-block" aria-labelledby="p-sub">
          <h2 className="detail-headline" id="p-sub">3. Who else touches it</h2>
          <p className="detail-body">
            The services a build may run on, named rather than described vaguely: Anthropic (model
            inference), Retell (voice and SMS), Supabase (database), Vercel (hosting), Resend
            (email), Stripe (payments), Calendly (scheduling), and — only where the build needs
            them — Google Workspace APIs, QuickBooks, or Plaid. We tell you before adding one to
            your build.
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
