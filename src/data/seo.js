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
    title: 'AI Receptionist & Business Automation in Atlanta — Second Nature',
    description:
      'We build the AI receptionist that answers your phone 24/7, books the job, and texts back every missed call — plus the automations and custom software behind it. Call ours: (470) 748-9278.',
  },
  '/business': {
    title: 'Business Automations & AI Employees — Second Nature, Atlanta',
    description:
      'Automations that carry the repeating work, communication that drops nothing, and AI employees with a real job description. Every offering carries an honest build status.',
  },
  '/systems': {
    title: 'Custom Websites, Dashboards & Client Portals — Second Nature',
    description:
      'When the tool you need doesn’t exist yet: websites, dashboards, client portals, booking platforms and internal software, built around how you actually work.',
  },
  '/personal': {
    title: 'Personal AI Systems — Second Nature',
    description:
      'Personal systems that plan the day, check in, triage the inbox, and report the money. Friends, family and referrals only.',
  },
  '/about': {
    title: 'About Miles Finley — Second Nature, Atlanta',
    description:
      'One person in Atlanta who builds AI systems for small businesses, and runs on them first. What’s live, what’s not, and how to reach me.',
  },
  '/work': {
    title: 'What We’ve Built — Second Nature, Atlanta',
    description:
      'Two systems running right now: an AI receptionist answering our own line, and a personal operations system running daily for months. Call one of them and judge it yourself.',
  },
  '/faq': {
    title: 'Questions & Answers — Second Nature, Atlanta',
    description:
      'What it costs, how long it takes, what happens on the call, what we do with your data, and whether we have clients yet. Answered before you spend thirty minutes.',
  },
  '/contact': {
    title: 'Get a Free Friction Map — Second Nature, Atlanta',
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
    title: 'Start a Project — Second Nature, Atlanta',
    description: 'Tell us where the work backs up. You leave with the friction map whether you hire us or not.',
  },
}

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
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      description:
        'Second Nature builds custom AI systems for small businesses in Atlanta: AI phone reception, automated follow-up and invoicing, business dashboards, client portals, and custom internal software.',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og.jpg`,
      email: CONTACT_EMAIL,
      telephone: SAVANNAH_PHONE ? '+1-470-748-9278' : undefined,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atlanta',
        addressRegion: 'GA',
        addressCountry: 'US',
      },
      areaServed: [
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
