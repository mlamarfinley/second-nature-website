import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../data/content.js'
import CallToAction from '../components/CallToAction.jsx'

/* Unknown routes used to silently redirect home, which hides broken inbound
   links forever — nobody can discover a dead link that quietly succeeds. */
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet">
      <div className="page-inner detail-inner">
        <span className="pp-eyebrow mono-label">404</span>
        <h1 className="serif-display pp-headline">That page doesn’t exist.</h1>
        <p className="pp-lead">
          Either the link was wrong or we moved something without leaving a forwarding address.
          Either way it’s our problem, not yours — here’s everything that does exist:
        </p>

        <ul className="nf-links">
          <li><Link to="/business">Business systems</Link><span>Automations, communication, AI employees.</span></li>
          <li><Link to="/systems">Custom software</Link><span>Websites, dashboards, portals, internal tools.</span></li>
          <li><Link to="/work">What we’ve built</Link><span>The two systems running right now.</span></li>
          <li><Link to="/faq">Questions and answers</Link><span>Cost, timelines, data, what happens on a call.</span></li>
          <li><Link to="/about">About</Link><span>Who builds it.</span></li>
          <li><Link to="/contact">Contact</Link><span>Get a friction map.</span></li>
        </ul>

        <p className="pp-lead">
          If you followed a link from somewhere and it broke, tell me at{' '}
          <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
          I’ll fix it.
        </p>
        <CallToAction />
      </div>
    </main>
  )
}
