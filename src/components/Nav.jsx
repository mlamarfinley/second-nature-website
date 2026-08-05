import { Link, useLocation } from 'react-router-dom'
import { CALENDLY_URL, SAVANNAH_PHONE } from '../data/content.js'
import { formatPhone } from './CallToAction.jsx'

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <header className="site-header">
      <nav className="topnav" aria-label="Site">
        <Link to="/" className="topnav-mark" aria-label="Second Nature home">
          <img src="./logo.webp" width="384" height="384" alt="" />
          <span>SECOND&nbsp;NATURE</span>
        </Link>
        <div className="topnav-links">
          <Link to="/business" aria-current={pathname === '/business' ? 'page' : undefined}>Business</Link>
          <Link to="/systems" aria-current={pathname === '/systems' ? 'page' : undefined}>Systems</Link>
          <Link to="/personal" aria-current={pathname === '/personal' ? 'page' : undefined}>Personal</Link>
          {SAVANNAH_PHONE && (
            <a
              className="topnav-cta topnav-cta-agent"
              href={`tel:${SAVANNAH_PHONE}`}
              aria-label={`Speak to an agent at ${formatPhone(SAVANNAH_PHONE)}`}
            >
              <span className="topnav-phone-dot" aria-hidden="true" />
              <span className="topnav-phone-label">Speak to an agent</span>
              <span className="topnav-phone-num">Call</span>
            </a>
          )}
          <a className="topnav-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a meeting</a>
        </div>
      </nav>
    </header>
  )
}
