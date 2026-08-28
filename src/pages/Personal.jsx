import { CATEGORIES, CONTACT_EMAIL, SAVANNAH_PHONE, SAVANNAH_PHONE_DISPLAY } from '../data/content.js'
import PageImage from '../components/PageImage.jsx'

/* Unlisted by design.
 *
 * The internal decision (2026-08-04) was that personal systems are friends,
 * family and referrals only — "not marketed cold" — yet this page used to hold
 * a nav slot, a homepage track, one of the two clickable hero monitors, and a
 * booking CTA. A third of the site's conversion surface was recruiting leads
 * the business intended to turn away.
 *
 * It is now: out of the nav, out of the homepage, noindexed (see
 * NOINDEX_ROUTES), and opened with an explanation so a referred friend
 * understands what they've been sent. The 3,787px unbroken scroll is broken
 * into disclosure groups — everything below the third heading was
 * functionally unread.
 */
export default function Personal() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <span className="pp-eyebrow mono-label">Personal systems · by referral</span>
        <h1 className="serif-display pp-headline">
          We don’t sell this one publicly. You’re here because someone sent&nbsp;you.
        </h1>

        <p className="pp-lead">
          A personal system is the same machinery we build for businesses, pointed at one person’s
          life: a morning call that sets the day, an evening one that asks how it went, an inbox
          that turns itself into a task list, and a running picture of where the money is.
        </p>
        <p className="pp-lead">
          I built mine for myself and it has run every day for months. Three more run for members
          of my family, on their own numbers and their own schedules.
        </p>
        <p className="pp-lead">
          I’m not marketing this cold, because a personal system touches somebody’s calendar,
          inbox and money, and I’d rather work with people who’ll tell me when something is rough.
          If you were referred, that’s you.
        </p>


        <section className="detail-block" aria-labelledby="p-what">
          <PageImage name="dunes">
            <h2 className="page-image-heading serif-display" id="p-what">What it&nbsp;covers</h2>
          </PageImage>
          <p className="detail-body">
            Four areas. Most people start with one and add another when the first has proved
            itself.
          </p>
          <div className="faq-list">
            {CATEGORIES.map((c, i) => (
              <details className="faq" key={c.slug} open={i === 0}>
                <summary>{c.label} — {c.headline}</summary>
                <div>
                  <p>{c.narrative}</p>
                  <div className="personal-features">
                    {c.features.map(([name, desc]) => (
                      <div className="feature-row" key={name}>
                        <strong>{name}</strong>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="detail-block" aria-labelledby="p-next">
          <h2 className="detail-headline" id="p-next">If you want one</h2>
          <p className="detail-body">
            Text or email me and say which of the four is the loudest right now. There’s no form
            for this one and no booking link — a referral deserves a conversation, not a funnel.
          </p>
          <ul className="about-contact">
            {SAVANNAH_PHONE && (
              <li>
                <a href={`sms:${SAVANNAH_PHONE}`}>Text {SAVANNAH_PHONE_DISPLAY}</a>
                <span>Same number as our AI receptionist — a text reaches me.</span>
              </li>
            )}
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>Mention who sent you.</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
