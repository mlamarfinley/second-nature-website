/* Analytics — one paste away from live.
 *
 * The site currently measures nothing, so nobody can answer whether it has
 * ever produced a lead. Fill in ONE of the two IDs below and it starts working.
 *
 * GA4: set GA_MEASUREMENT_ID to your "G-XXXXXXX" id from Google Analytics →
 *   Admin → Data streams. Note GA4 sets cookies, so a consent banner is
 *   expected in most jurisdictions, and the script is ~45KB.
 *
 * Plausible (recommended for a 9-page site): set PLAUSIBLE_DOMAIN to
 *   "aisecondnature.com". Under 1KB, cookieless, no consent banner needed,
 *   ~$9/mo. Delete whichever one you don't use.
 *
 * IMPORTANT while the app is still on HashRouter: both tools record every
 * route as "/" unless hash tracking is on. GA4 handles it via the history
 * change event below; Plausible needs its script.hash.js variant, which this
 * loader selects automatically.
 */

const GA_MEASUREMENT_ID = '' // e.g. 'G-XXXXXXXXXX'
const PLAUSIBLE_DOMAIN = '' // e.g. 'aisecondnature.com'

const USES_HASH_ROUTING = true

export function initAnalytics() {
  if (typeof window === 'undefined') return
  if (PLAUSIBLE_DOMAIN) initPlausible()
  if (GA_MEASUREMENT_ID) initGa()
}

function initPlausible() {
  const variant = USES_HASH_ROUTING
    ? 'script.hash.outbound-links.tagged-events.js'
    : 'script.outbound-links.tagged-events.js'
  const s = document.createElement('script')
  s.defer = true
  s.dataset.domain = PLAUSIBLE_DOMAIN
  s.src = `https://plausible.io/js/${variant}`
  document.head.appendChild(s)
  window.plausible =
    window.plausible ||
    function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
}

function initGa() {
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: true })

  if (USES_HASH_ROUTING) {
    window.addEventListener('hashchange', () => {
      gtag('event', 'page_view', {
        page_path: window.location.hash.slice(1) || '/',
        page_location: window.location.href,
      })
    })
  }
}

/* Fire on the actions that actually matter. Called from the CTA components;
   safe no-ops until an ID is set above. */
export function track(event, props = {}) {
  try {
    window.plausible?.(event, { props })
    window.gtag?.('event', event.toLowerCase().replace(/\s+/g, '_'), props)
  } catch {
    /* analytics must never break the page */
  }
}
