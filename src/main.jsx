import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ORG_JSON_LD } from './data/seo.js'
import { initAnalytics } from './lib/analytics.js'
import './index.css'

/* Old links shared before the router change look like /#/business. The server
   never sees a fragment, so this has to be rescued client-side. Runs before
   React mounts, and only for hash paths — in-page anchors like #how pass
   straight through. */
const legacyHash = window.location.hash
if (/^#\/[a-z0-9\-/]*$/i.test(legacyHash)) {
  const target = legacyHash.slice(1)
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  window.history.replaceState(null, '', base + target + window.location.search)
}

/* Enables the scroll-reveal animation. Set from JS so the prerendered HTML
   is readable without it — see .js-anim in index.css. */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-anim')
}

initAnalytics()

/* Structured data is baked into the prerendered HTML, so only add it here if
   it's missing — i.e. during dev, where there is no prerender step. */
if (!document.querySelector('script[data-org-schema]')) {
  const ld = document.createElement('script')
  ld.type = 'application/ld+json'
  ld.setAttribute('data-org-schema', '')
  ld.textContent = JSON.stringify(ORG_JSON_LD)
  document.head.appendChild(ld)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
