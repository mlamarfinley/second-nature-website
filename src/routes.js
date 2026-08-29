/* The one list of routes, shared by the router and the prerenderer.
   If a route isn't here it doesn't get a static HTML file, so it stays
   invisible to crawlers — which is what we want for /thanks, and what we
   very much don't want for anything else. */
export const ROUTES = [
  '/',
  '/business',
  '/systems',
  '/pricing',
  '/work',
  '/faq',
  '/contact',
  '/about',
  '/personal',
  '/privacy',
  '/terms',
]

/* Reachable, but deliberately not prerendered or listed in the sitemap:
   /thanks only makes sense after submitting the form, and /build is a
   redirect target kept alive for old links. */
export const UNLISTED_ROUTES = ['/thanks', '/build']
