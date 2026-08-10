import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ORG_JSON_LD } from './data/seo.js'
import { initAnalytics } from './lib/analytics.js'
import './index.css'

initAnalytics()

/* LocalBusiness / Person structured data — the site had none, so it was
   ineligible for local and rich results entirely. Note this is injected
   client-side; it moves into the served HTML when the site is prerendered. */
const ld = document.createElement('script')
ld.type = 'application/ld+json'
ld.textContent = JSON.stringify(ORG_JSON_LD)
document.head.appendChild(ld)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
