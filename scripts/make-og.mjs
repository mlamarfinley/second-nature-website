import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/* Generates one share card per route.
 *
 * A single og.jpg served all ten pages, so every link anyone shared — of the
 * pricing page, the FAQ, a specific offering — rendered the identical generic
 * card. These are typographic rather than photographic: they cost ~25KB each
 * instead of 205KB, they stay legible at the size social platforms actually
 * render them, and they don't depend on imagery we don't have yet. */

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const out = join(root, 'public/og')
mkdirSync(out, { recursive: true })

const { PAGE_META } = await import(join(root, 'src/data/seo.js'))

const CARDS = {
  '/': ['AI reception + automation', 'The calls you miss are the jobs you lose.'],
  '/business': ['Business systems', 'The gaps are where the money goes.'],
  '/systems': ['Custom software', 'The software your spreadsheet is pretending to be.'],
  '/work': ['What we’ve built', 'Two systems, both running now.'],
  '/faq': ['Questions', 'The things you’d ask on the call.'],
  '/contact': ['Get a friction map', 'Tell me where the work backs up.'],
  '/about': ['About', 'One person, in Atlanta.'],
  '/privacy': ['Privacy', 'What we do with your data.'],
  '/terms': ['Terms', 'The deal, in plain language.'],
}

const html = (eyebrow, line) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Playfair";src:url("file://${root}/public/fonts/playfair-display-latin-500-normal.woff2") format("woff2");font-weight:500}
@font-face{font-family:"Schibsted";src:url("file://${root}/public/fonts/schibsted-grotesk-latin-wght-normal.woff2") format("woff2-variations");font-weight:400 700}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#050505;color:#F0F0EC;
 font-family:"Schibsted",system-ui;display:flex;flex-direction:column;justify-content:space-between;
 padding:76px 80px;position:relative;overflow:hidden}
.glow{position:absolute;top:-220px;right:-140px;width:680px;height:680px;border-radius:50%;
 background:radial-gradient(circle,rgba(232,168,76,.20),transparent 68%)}
.eyebrow{font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:#E8A84C;position:relative}
.line{font-family:"Playfair",Georgia,serif;font-size:78px;line-height:1.04;max-width:15ch;position:relative}
.foot{display:flex;justify-content:space-between;align-items:baseline;font-size:22px;
 color:rgba(240,240,236,.62);border-top:1px solid rgba(240,240,236,.14);padding-top:26px;position:relative}
.mark{letter-spacing:.28em;text-transform:uppercase;color:#F0F0EC;font-size:20px}
</style></head><body>
<div class="glow"></div>
<div class="eyebrow">${eyebrow}</div>
<div class="line">${line}</div>
<div class="foot"><span class="mark">Second&nbsp;Nature</span><span>aisecondnature.com · Atlanta</span></div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

for (const [route, [eyebrow, line]] of Object.entries(CARDS)) {
  await page.setContent(html(eyebrow, line), { waitUntil: 'load' })
  await page.waitForTimeout(180)
  const name = route === '/' ? 'home' : route.slice(1)
  const buf = await page.screenshot({ type: 'jpeg', quality: 86 })
  writeFileSync(join(out, `${name}.jpg`), buf)
  console.log(`  ${route.padEnd(11)} -> og/${name}.jpg  ${(buf.length / 1024).toFixed(1)} KB`)
}

await browser.close()
console.log(`\n${Object.keys(CARDS).length} share cards generated.`)
