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
          Second Nature is one person: me, Miles&nbsp;Finley, in Atlanta.
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
            Then my family wanted it. Three more instances now run for them, on their own numbers,
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

        {/* This was "Where I actually am", which had become a defence of working
            remotely rather than a reason to hire anyone — and the page already
            says Atlanta in the headline. What it lacked was any account of what
            the engagement feels like, so that's what stands here now. Location
            is a detail inside it instead of the subject of it. */}
        <section className="detail-block" aria-labelledby="how">
          <h2 className="detail-headline" id="how">How this actually goes</h2>
          <p className="detail-body">
            It starts with a call where you do most of the talking. I ask a lot of questions about
            where your week goes and what you keep meaning to get to, and by the end of it we both
            know whether there’s something here worth building. Plenty of those calls end with me
            saying you don’t need me yet.
          </p>
          <p className="detail-body">
            From there it’s video, phone and email. You see the thing early and often — half-built,
            while it’s still cheap to change — you tell me what’s wrong with it, and I fix it. I’m
            in {LOCALITY}, so I’m awake when you are, and when something goes sideways at four on a
            Tuesday you’re not filing a ticket. You’re talking to the person who built it.
          </p>
        </section>

        {/* Saying the uncomfortable thing first is the whole strategy. A
            prospect who finds out later feels misled; one who reads it here
            feels respected. */}
        <section className="detail-block" aria-labelledby="straight">
          <h2 className="detail-headline" id="straight">What I’ll tell you before you ask</h2>
          <p className="detail-body">
            <strong>I’m early.</strong> Second Nature has no outside clients yet. That’s why
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
                <span>Our AI receptionist, 24/7. It’ll hand you to me if you ask.</span>
              </li>
            )}
          </ul>
          <CallToAction />
        </section>
      </div>
    </main>
  )
}
