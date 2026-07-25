import { useEffect } from 'react'
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Home from './pages/Home.jsx'
import Personal from './pages/Personal.jsx'
import Business from './pages/Business.jsx'
import Build from './pages/Build.jsx'

// Page slide directions: Personal enters from the right, Business from the left.
const SLIDE = { '/personal': 60, '/business': -60, '/build': 0, '/': 0 }

// Hash routing owns href="#..." — the skip link moves focus manually instead.
function skipToMain(e) {
  e.preventDefault()
  const main = document.getElementById('main')
  if (main) { main.focus(); main.scrollIntoView() }
}

function Shell() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  const dx = reduce ? 0 : (SLIDE[location.pathname] ?? 0)
  const isHome = location.pathname === '/'

  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToMain}>Skip to content</a>
      {!isHome && (
        <header className="site-header">
          <nav aria-label="Site">
            <Link
              to="/"
              className={`wordmark${location.pathname === '/business' ? ' wordmark-right' : ''}`}
              aria-label="Back to home"
            >
              {location.pathname !== '/business' && <span className="wordmark-arrow" aria-hidden="true">←</span>}
              <img src="./logo.webp" width="384" height="384" alt="" />
              <span>SECOND&nbsp;NATURE</span>
              {location.pathname === '/business' && <span className="wordmark-arrow" aria-hidden="true">→</span>}
            </Link>
          </nav>
        </header>
      )}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: dx }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.32, 0.72, 0, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/build" element={<Build />} />
        </Routes>
      </motion.div>
      {isHome ? (
        <footer className="home-footnote">
          <a href="mailto:hello@secondnature.ai">hello@secondnature.ai</a>
          <span>© 2026 Second Nature</span>
        </footer>
      ) : (
        <footer className="site-footer">
          <span className="site-footer-mark">SECOND&nbsp;NATURE</span>
          <a href="mailto:hello@secondnature.ai">hello@secondnature.ai</a>
          <span>© 2026 Second Nature</span>
        </footer>
      )}
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
