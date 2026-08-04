import { Link, useLocation } from 'react-router-dom'
import { CALENDLY_URL } from '../data/content.js'

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
          <Link to="/personal" aria-current={pathname === '/personal' ? 'page' : undefined}>Personal</Link>
          <Link to="/business" aria-current={pathname === '/business' ? 'page' : undefined}>Business</Link>
          <a className="topnav-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </div>
      </nav>
    </header>
  )
}
