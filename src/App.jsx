import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Personal from './pages/Personal.jsx'
import Business from './pages/Business.jsx'
import Systems from './pages/Systems.jsx'
import Founder from './pages/Founder.jsx'
import Build from './pages/Build.jsx'
import { CALENDLY_URL } from './data/content.js'

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
  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToMain}>Skip to content</a>
      <Nav />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/build" element={<Build />} />
        </Routes>
      </motion.div>
      <footer className="site-footer">
        <span className="site-footer-mark">SECOND&nbsp;NATURE</span>
        <a href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        <span>© 2026 Second Nature</span>
      </footer>
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
