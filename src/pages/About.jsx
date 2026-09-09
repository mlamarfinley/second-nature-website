import {
  CONTACT_EMAIL,
  LOCALITY,
  SAVANNAH_PHONE,
  SAVANNAH_PHONE_DISPLAY,
} from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'

/* A founder page was built here once and then deleted. For a solo studio,
   anonymity is a liability with no offsetting benefit: there is no brand to
   hide behind, so the founder's name, face, city and work ARE the trust
   asset. This page restores them.

   The portrait is real and it is Miles. It was shot on a light studio
   backdrop, so it is cropped tight, desaturated and vignetted into the site's
   key — otherwise it lands on a near-black page as a bright rectangle. It
   sits in the left margin column on wide screens, which is the one place on
   this site that empty space was already doing nothing.

   A working shot — at the desk, on a job site — would still be stronger than
   a suit against seamless, and is worth taking when there's a chance. */
export default function About() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <span className="pp-eyebrow mono-label">About</span>
        <h1 className="serif-display pp-headline">
          Second Nature is one person: me, Miles&nbsp;Finley, in Georgia.
        </h1>

        <p className="pp-lead">
          I build AI systems for small businesses — the receptionist that answers your phone, the
          automations that chase your invoices, and the custom software for the parts of your
          operation no off-the-shelf tool fits. I do the work myself. When you email this site,
          I’m the one who reads it.
        </p>

        <section className="detail-block" aria-labelledby="why">
          <figure className="about-portrait">
            <picture>
              <source media="(max-width: 700px)" type="image/webp" srcSet="/img/miles-450.webp" />
              <source media="(max-width: 700px)" srcSet="/img/miles-450.jpg" />
              <source type="image/webp" srcSet="/img/miles-900.webp" />
              <img
                src="/img/miles-900.jpg"
                width="900"
                height="1135"
                alt="Miles Finley"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
          <h2 className="detail-headline" id="why">Why I built this</h2>
          <p className="detail-body">
            I built the first one for myself. My own days leaked — the follow-up I meant to send,
            the task that rolled over three times, the plan I rebuilt every morning from scratch.
            So I built a system that calls me in the morning, sets the day, carries the unfinished
            work forward, and calls back at night to ask how it went. It has run every day for
            months.
          </p>
          <p className="detail-body">
            Then my family wanted it. It was cloned onto four more phones for them, on their own numbers,
            in their own time zones. That’s when it stopped being a personal project: the thing
            cloned onto three other lives without me hovering over it, which is the only real test
            of whether something is a system or a script you’re personally propping up.
          </p>
          <p className="detail-body">
            The business version came next. An AI receptionist answers our line at{' '}
            {SAVANNAH_PHONE_DISPLAY}. Call it — it’s the same build I install for a client’s
            business, pointed at ours.
          </p>
        </section>

        {/* A section describing what the engagement is actually like belongs
            here — between why he built it and the straight-talk disclosures.
            Two drafts were written and both rejected; Miles is writing it.
            The brief is in ABOUT-SECTION-BRIEF.md in the project root.

            Deliberately left absent rather than filled with something weak:
            the page reads fine without it, and placeholder copy on a live
            business site is worse than a shorter page. */}
        {/* Saying the uncomfortable thing first is the whole strategy. A
            prospect who finds out later feels misled; one who reads it here
            feels respected. */}
        <section className="detail-block" aria-labelledby="straight">
          <h2 className="detail-headline" id="straight">What I’ll tell you before you ask</h2>
          <p className="detail-body">
            <strong>I’m early.</strong> The first client work is under way, and I won’t name anyone or publish results until they’ve agreed to it. That’s why
            founding-client terms exist, and it’s why I’d rather show you a running system than a
            slide deck.
          </p>
          <p className="detail-body">
            <strong>I build with AI</strong>, which is why the same work takes fewer hours than it
            takes a team billing a project manager, a designer and two developers. That’s a
            different cost structure, not a lower standard — and I’d rather pass the difference to
            you and earn the case study.
          </p>
          <p className="detail-body">
            <strong>I don’t sell what I haven’t run.</strong> Every system on this site has either
            been live in my own operations or is built on the same chassis as one that has. Where
            something is designed but not yet deployed for a client, the Business page says so by
            name.
          </p>
          <p className="detail-body">
            <strong>I’m one person.</strong> That means you get me and not an account manager, and
            it also means I take a handful of builds at a time rather than thirty. If you need a
            large build delivered next week, hire an agency — I’ll tell you that on the call.
          </p>
        </section>

        <section className="detail-block" aria-labelledby="reach">
          <h2 className="detail-headline" id="reach">Reach me</h2>
          <ul className="about-contact">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>I answer within one business day.</span>
            </li>
            {SAVANNAH_PHONE && (
              <li>
                <a href={`tel:${SAVANNAH_PHONE}`}>{SAVANNAH_PHONE_DISPLAY}</a>
                <span>Our AI receptionist, 24/7. Ask for me and it takes a message.</span>
              </li>
            )}
          </ul>
          <CallToAction />
        </section>
      </div>
    </main>
  )
}
