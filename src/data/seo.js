import { SITE_URL, SITE_NAME, CONTACT_EMAIL, SAVANNAH_PHONE } from './content.js'

/* STAGING MODE — flip to false on launch day.
 *
 * While true the site asks every search engine not to index or follow it, so
 * the work can live on the real domain without turning up in results, in AI
 * answers, or in anyone's share preview. It does NOT stop a person who has the
 * URL — that needs an access gate in front of the host (see DOMAIN-SETUP.md).
 *
 * Flipping this to false is the single switch that makes the site public.
 * public/robots.txt has to be swapped at the same time; both are noted there. */
export const STAGING = true

/* Per-route titles and descriptions. Previously all five routes shared one
   <title> and one meta description, so every tab, bookmark, history entry and
   shared link described the site identically. */
export const PAGE_META = {
  '/': {
    title: 'AI Agents & Automations for Business — Second Nature, Georgia',
    description:
      'A Georgia AI consultancy. We find where your business leaks time and money, then build the agents, automations and custom software that close those gaps. Hear one working: (470) 748-9278.',
  },
  '/business': {
    title: 'Business Automations & AI Employees — Second Nature, Georgia',
    description:
      'Automations that carry the repeating work, communication that drops nothing, and AI employees with a real job description. Every offering carries an honest build status.',
  },
  '/systems': {
    title: 'Custom Websites, Dashboards & Client Portals — Second Nature',
    description:
      'When the tool you need doesn’t exist yet: websites, dashboards, client portals, booking platforms and internal software, built around how you actually work.',
  },
  '/pricing': {
    title: 'Pricing — Websites from $149, Systems from $750 — Second Nature',
    description:
      'Flat published prices for websites, student and business, plus the floors for automations and AI employees. The number you see is the number you pay, in writing before anything starts.',
  },
  '/personal': {
    title: 'Personal Systems — Second Nature (by referral)',
    description:
      'Personal systems that plan the day, check in, triage the inbox and report the money. Not sold publicly — friends, family and referrals only.',
  },
  '/terms': {
    title: 'Terms of Service — Second Nature',
    description:
      'Scope, payment, ownership, cancellation and the limits on what an AI employee does unsupervised. Written to be read, not to be survived.',
  },
  '/about': {
    title: 'About Miles Finley — Second Nature, Georgia',
    description:
      'One person in Georgia who builds AI systems for small businesses, and runs on them first. What’s live, what’s not, and how to reach me.',
  },
  '/work': {
    title: 'What We’ve Built — Second Nature, Georgia',
    description:
      'Two systems running right now: an AI receptionist answering our own line, and a personal operations system running daily for months. Call one of them and judge it yourself.',
  },
  '/faq': {
    title: 'Questions & Answers — Second Nature, Georgia',
    description:
      'What it costs, how long it takes, what happens on the call, what we do with your data, and whether we have clients yet. Answered before you spend thirty minutes.',
  },
  '/contact': {
    title: 'Get a Free Friction Map — Second Nature, Georgia',
    description:
      'Three questions, and within one business day you get a one-page map of where your time and leads are leaking. Yours to keep whether you hire us or not.',
  },
  '/thanks': {
    title: 'Thanks — Second Nature',
    description: 'We’ve got your note. Here’s exactly what happens next, and by when.',
  },
  '/privacy': {
    title: 'Privacy Policy — Second Nature',
    description:
      'What we do with your data on this site, and what we do with your business data during an engagement. Every subprocessor named.',
  },
  '/build': {
    title: 'Start a Project — Second Nature, Georgia',
    description: 'Tell us where the work backs up. You leave with the friction map whether you hire us or not.',
  },
}

/* Routes kept out of search permanently, regardless of STAGING.
   Personal systems are friends/family/referrals only — the internal decision
   was "not marketed cold" — so the page exists for people sent a direct link
   and should never turn up in a search result. /thanks is a post-submit page
   with no standalone value. */
export const NOINDEX_ROUTES = new Set(['/personal', '/thanks'])

export const DEFAULT_META = PAGE_META['/']

export const NOT_FOUND_META = {
  title: 'Page not found — Second Nature',
  description: 'That page doesn’t exist. Here’s everything that does.',
}

/* LocalBusiness structured data. `telephone` is included only because the line
   is genuinely answered — an unanswered number in schema is worse than none. */
export const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      description:
        'Second Nature builds custom AI systems for small businesses across Georgia: AI phone reception, automated follow-up and invoicing, business dashboards, client portals, and custom internal software.',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og/home.jpg`,
      email: CONTACT_EMAIL,
      telephone: SAVANNAH_PHONE ? '+1-470-748-9278' : undefined,
      areaServed: [
        { '@type': 'City', name: 'Rome' },
        { '@type': 'City', name: 'Atlanta' },
        { '@type': 'State', name: 'Georgia' },
      ],
      founder: { '@id': `${SITE_URL}/#miles` },
      knowsAbout: [
        'AI phone receptionists',
        'Business process automation',
        'Custom web applications',
        'Business dashboards',
        'Client portals',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#miles`,
      name: 'Miles Finley',
      jobTitle: 'Founder',
      worksFor: { '@id': `${SITE_URL}/#business` },
      url: `${SITE_URL}/#/about`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#business` },
      inLanguage: 'en-US',
    },
  ],
}
