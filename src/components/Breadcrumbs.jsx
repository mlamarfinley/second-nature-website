import { Link, useLocation } from 'react-router-dom'
import { SITE_URL } from '../data/content.js'
import { normalisePath } from '../Shell.jsx'

const LABELS = {
  '/business': 'Business',
  '/systems': 'Custom software',
  '/personal': 'Personal',
  '/about': 'About',
  '/work': 'What we’ve built',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/privacy': 'Privacy',
  '/build': 'Start a project',
}

/* Breadcrumbs plus BreadcrumbList schema. Two levels is the honest depth of
   this site — inventing a deeper hierarchy to look bigger is the same species
   of decoration the rest of this rebuild removed. */
export default function Breadcrumbs() {
  const pathname = normalisePath(useLocation().pathname)
  const label = LABELS[pathname]
  if (!label) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: label, item: `${SITE_URL}${pathname}` },
    ],
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        <li aria-current="page">{label}</li>
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}
