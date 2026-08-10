import { BrowserRouter } from 'react-router-dom'
import Shell from './Shell.jsx'

/* BrowserRouter, not HashRouter.
 *
 * Every route used to live after a "#", and Google strips URL fragments before
 * crawling — the hash-crawling scheme was deprecated in 2015 — so eleven pages
 * collapsed into one indexable URL with one snippet, no deep links in results,
 * and an identical share card for every page on the site. Fragments are also
 * invalid inside a sitemap's <loc>, so the sitemap couldn't be fixed either.
 *
 * basename comes from the build's base path, so the same code works at
 * /second-nature-website/ today and at the domain root later. */
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Shell />
    </BrowserRouter>
  )
}
