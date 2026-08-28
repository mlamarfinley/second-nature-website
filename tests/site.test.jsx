import { describe, it, expect } from 'vitest'
import { PAGE_META, NOINDEX_ROUTES, STAGING } from '../src/data/seo.js'
import { ROUTES } from '../src/routes.js'
import { HOME_COPY, BIZ, SAVANNAH_PHONE } from '../src/data/content.js'
import { FAMILIES } from '../src/data/offerings.js'
import { normalisePath } from '../src/Shell.jsx'

/* Smoke tests for the invariants that actually broke in this project.
   Each one corresponds to a bug that shipped. */

describe('routes and metadata', () => {
  it('gives every prerendered route its own title and description', () => {
    for (const r of ROUTES) {
      expect(PAGE_META[r], `missing meta for ${r}`).toBeTruthy()
      expect(PAGE_META[r].title.length).toBeGreaterThan(10)
      expect(PAGE_META[r].description.length).toBeGreaterThan(40)
    }
  })

  it('uses a unique title per route', () => {
    const titles = ROUTES.map((r) => PAGE_META[r].title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  // GitHub Pages serves /business/ — an unnormalised lookup retitled every
  // sub-page "Page not found" the moment the app hydrated.
  it('normalises trailing slashes before looking up a route', () => {
    expect(normalisePath('/business/')).toBe('/business')
    expect(normalisePath('/business')).toBe('/business')
    expect(normalisePath('/')).toBe('/')
    expect(PAGE_META[normalisePath('/business/')]).toBeTruthy()
  })

  it('keeps the referral-only page out of search', () => {
    expect(NOINDEX_ROUTES.has('/personal')).toBe(true)
  })
})

describe('honesty invariants', () => {
  // The audit deleted invented metrics; this stops them coming back.
  it('publishes no unsourced performance statistics', () => {
    const copy = JSON.stringify({ HOME_COPY, BIZ, FAMILIES })
    expect(copy).not.toMatch(/hours saved per week/i)
    expect(copy).not.toMatch(/\d+% less admin/i)
    expect(copy).not.toMatch(/\d+× more deadlines/i)
  })

  it('marks exactly one offering as live — the one that is', () => {
    const live = FAMILIES.flatMap((f) => f.items).filter((i) => i.status === 'Live')
    expect(live).toHaveLength(1)
    expect(live[0].slug).toBe('receptionist')
  })

  it('gives every offering a unique anchor and real detail', () => {
    const items = FAMILIES.flatMap((f) => f.items)
    expect(new Set(items.map((i) => i.slug)).size).toBe(items.length)
    for (const i of items) {
      expect(i.does.length, `${i.slug} lacks detail`).toBeGreaterThan(60)
      expect(i.needs.length, `${i.slug} lacks a needs line`).toBeGreaterThan(20)
    }
  })

  // The crosslink bug: a two-case ternary labelled two of three tracks the same.
  it('labels every home track distinctly', () => {
    const ctas = Object.values(HOME_COPY.tracks).map((t) => t.cta)
    expect(new Set(ctas).size).toBe(ctas.length)
  })
})

describe('deploy safety', () => {
  it('keeps the site out of search while staging', () => {
    expect(STAGING).toBe(true)
  })

  // The phone CTA must never ship pointing at a line that isn't answered.
  it('only ships the phone CTA when a number is set', () => {
    if (SAVANNAH_PHONE) expect(SAVANNAH_PHONE).toMatch(/^\+1\d{10}$/)
  })
})
