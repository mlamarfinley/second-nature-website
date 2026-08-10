import { Link, useLocation } from 'react-router-dom'
import { CALENDLY_URL, SAVANNAH_PHONE, SAVANNAH_PHONE_DISPLAY } from '../data/content.js'
import { formatPhone } from './CallToAction.jsx'
import SiteIndex from './SiteIndex.jsx'

const LINKS = [
  ['/business', 'Business'],
  ['/systems', 'Systems'],
  ['/work', 'Our work'],
  ['/faq', 'FAQ'],
  ['/about', 'About'],
]

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <header className="site-header">
      <nav className="topnav" aria-label="Site">
        <Link to="/" className="topnav-mark" aria-label="Second Nature home">
          <img src="./logo.webp" width="384" height="384" alt="" />
          <span>SECOND&nbsp;NATURE</span>
        </Link>

        {/* Below 900px these collapse and SiteIndex takes over — the site is
            never left without navigation the way it used to be. */}
        <div className="topnav-links">
          {LINKS.map(([to, label]) => (
            <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined}>
              {label}
            </Link>
          ))}
          {SAVANNAH_PHONE && (
            <a
              className="topnav-cta topnav-cta-agent"
              href={`tel:${SAVANNAH_PHONE}`}
              aria-label={`Call our AI receptionist at ${formatPhone(SAVANNAH_PHONE)}`}
            >
              Call our AI · {SAVANNAH_PHONE_DISPLAY}
            </a>
          )}
          <a className="topnav-cta topnav-cta-book" href={CALENDLY_URL} target="_blank" rel="noopener">
            Book 30 min
          </a>
        </div>

        <SiteIndex links={LINKS} />
      </nav>
    </header>
  )
}
