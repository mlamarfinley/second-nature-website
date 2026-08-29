import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import Home from './pages/Home.jsx'
import Personal from './pages/Personal.jsx'
import Business from './pages/Business.jsx'
import Systems from './pages/Systems.jsx'
import Pricing from './pages/Pricing.jsx'
import About from './pages/About.jsx'
import Work from './pages/Work.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import Thanks from './pages/Thanks.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'
import { PAGE_META, DEFAULT_META, NOT_FOUND_META, STAGING, NOINDEX_ROUTES } from './data/seo.js'

/* Route changes in a single-page app reload nothing, so unless something moves
   focus and updates the title, a screen-reader user gets no signal at all that
   the page changed — every link appears to do nothing, silently.

   The title and meta work here is now a fallback for client-side navigation:
   the first load already arrives with correct tags baked into the HTML by the
   prerenderer, which is what crawlers and share previews actually read. */
/* GitHub Pages serves /business/ with a trailing slash, but the route keys
   have none — so an unnormalised lookup missed on every sub-page and retitled
   it "Page not found" the moment React hydrated. */
export const normalisePath = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

function RouteEffects() {
  const location = useLocation()
  const pathname = normalisePath(location.pathname)
  const { hash } = location
  const first = useRef(true)

  useEffect(() => {
    const known = PAGE_META[pathname]
    const meta = known || (pathname === '/' ? DEFAULT_META : NOT_FOUND_META)
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)

    let robots = document.querySelector('meta[name="robots"]')
    if (STAGING || NOINDEX_ROUTES.has(pathname)) {
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

export default function Shell() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/business" element={<Business />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        {/* /build was an unfinished intake page; its links live on. */}
        <Route path="/build" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <StickyCta />
    </>
  )
}
