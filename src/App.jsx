import { useEffect, useRef } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import Home from './pages/Home.jsx'
import Personal from './pages/Personal.jsx'
import Business from './pages/Business.jsx'
import Systems from './pages/Systems.jsx'
import Build from './pages/Build.jsx'
import About from './pages/About.jsx'
import Work from './pages/Work.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import Thanks from './pages/Thanks.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'
import { PAGE_META, DEFAULT_META, NOT_FOUND_META, STAGING } from './data/seo.js'

/* Route changes in a single-page app reload nothing, so unless something
   moves focus and updates the title, a screen-reader user gets no signal at
   all that the page changed — every link appears to do nothing, silently.
   This focuses the new page's h1 (which makes screen readers announce it) and
   keeps the title and description in step. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    // An unknown path is a 404 and should say so in the tab, the history entry
    // and the shared link — not quietly borrow the homepage's title.
    const known = PAGE_META[pathname]
    const meta = known || (pathname === '/' ? DEFAULT_META : NOT_FOUND_META)
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)

    // Staging: ask every crawler to stay away, on every route.
    let robots = document.querySelector('meta[name="robots"]')
    if (STAGING) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet')
    } else if (robots) {
      robots.remove()
    }
  }, [pathname])

  useEffect(() => {
    // Never steal focus on first load — the visitor hasn't navigated yet.
    if (first.current) { first.current = false; return }
    if (hash) return
    const target = document.querySelector('main h1') || document.getElementById('main')
    if (!target) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Shell() {
  const location = useLocation()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <RouteEffects />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/business" element={<Business />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/work" element={<Work />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/build" element={<Build />} />
        {/* Unknown routes used to silently redirect home, which hides broken
            inbound links forever. They get a real 404 page now. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <StickyCta />
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
