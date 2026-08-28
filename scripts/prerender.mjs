import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/* Renders every route to its own HTML file at build time.
 *
 * Before this, the served body was <div id="root"></div> plus 330KB of
 * JavaScript. Googlebot defers JS rendering to a second, budget-constrained
 * pass, and Bing, social crawlers and most AI crawlers don't run it at all —
 * so the content, the links and the metadata were invisible to everything
 * except a fully-executing browser. Now each page ships as real HTML that
 * survives a JS failure and carries its own title, description, share tags
 * and structured data.
 */

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const base = process.env.SITE_BASE || '/'

const { render } = await import(join(dist, 'server/entry-server.js'))
const { ROUTES } = await import(join(root, 'src/routes.js'))
const { PAGE_META, DEFAULT_META, ORG_JSON_LD, STAGING, NOINDEX_ROUTES } = await import(join(root, 'src/data/seo.js'))
const { NOT_FOUND_META } = await import(join(root, 'src/data/seo.js'))

const template = readFileSync(join(dist, 'index.html'), 'utf-8')
const SITE_URL = 'https://aisecondnature.com'

/* StaticRouter matches against the full path, so the location handed to it has
   to carry the base prefix even though the output file doesn't. */
const locationFor = (route) => base.replace(/\/$/, '') + route

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildHead(route, meta) {
  const canonical = `${SITE_URL}${route === '/' ? '/' : route}`
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Second Nature" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og.jpg" />`,
  ]
  if (STAGING || NOINDEX_ROUTES.has(route)) {
    tags.push('<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />')
  }
  // Organisation schema on the homepage only — repeating it on every page is
  // noise, and Google reads it once per site.
  if (route === '/') {
    tags.push(
      `<script type="application/ld+json" data-org-schema>${JSON.stringify(ORG_JSON_LD)}</script>`,
    )
  }
  return tags.join('\n    ')
}

/* The template already carries a title, description and canonical for the
   homepage. Strip them so per-route tags don't end up duplicated. */
function stripTemplateTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, '')
    .replace(/<meta\s+property="og:[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^>]*>\s*/gi, '')
}

const cleanTemplate = stripTemplateTags(template)
let count = 0

for (const route of ROUTES) {
  const meta = PAGE_META[route] || DEFAULT_META
  const appHtml = render(locationFor(route), base)
  const html = cleanTemplate
    .replace('</head>', `  ${buildHead(route, meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outDir = route === '/' ? dist : join(dist, route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  count++
  console.log(`  ${route.padEnd(12)} -> ${route === '/' ? 'index.html' : route.slice(1) + '/index.html'}`)
}

/* 404.html: GitHub Pages serves this for anything unmatched, so an unknown URL
   gets the site's own styled page instead of GitHub's octocat. */
const notFoundHtml = cleanTemplate
  .replace('</head>', `  ${buildHead('/404', NOT_FOUND_META)}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${render(locationFor("/__not_found__"), base)}</div>`)
writeFileSync(join(dist, '404.html'), notFoundHtml)
console.log(`  404          -> 404.html`)

// The SSR bundle is a build artifact, not something to publish.
if (existsSync(join(dist, 'server'))) rmSync(join(dist, 'server'), { recursive: true, force: true })

console.log(`\nPrerendered ${count} routes + 404.`)
