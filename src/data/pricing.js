/* Pricing, taken from LAUNCH-PRICING-CUSTOMER.md and the LOCKED block in
 * OFFERINGS.md. Two different disclosure rules apply here and they are not
 * interchangeable:
 *
 *   Websites  — flat, published in full. That sheet is written to be shown to
 *               a customer, and the whole promise is "this is not a starting
 *               price, it's the price". Publishing a range would break it.
 *   Systems   — floors only ("from $X"). The internal tables carry ranges tied
 *               to scope we can't know before a call; publishing a range
 *               invites anchoring on the bottom of it. OFFERINGS.md: "Show
 *               ranges publicly, never a fixed menu. These tables stay
 *               internal; the site gets 'from $X'."
 *
 * Anything here that changes must change in those documents first — they are
 * the source, this file is the copy.
 */

export const STUDENT_PACKAGES = [
  { name: 'The One-Pager', price: '$149', body: 'A complete one-page site for you or your business: your logo and branding, what you do or sell, a gallery of your work, contact form, social links, résumé download if it’s a portfolio, your own domain, built for your phone first.' },
  { name: 'The Three-Pager', price: '$249', body: 'Everything above across three pages — a services or menu page, an about page, a gallery or events page. Fits clubs, chapters, and businesses that need the room.' },
  { name: 'The Hustle', price: '$399', body: 'The site starts working for you: three pages plus automatic booking — customers pick a time and it lands on your calendar, confirmed, without you touching your phone. Testimonials, services and pricing, and visitor analytics included.' },
]

export const BUSINESS_PACKAGES = [
  { name: 'The One-Pager', price: '$329', body: 'One polished page for your business: your branding, what you do, a gallery, contact form, socials, your domain — complete and live.' },
  { name: 'The Three-Pager', price: '$549', body: 'Everything above across three pages — services or menu, about, gallery or events — plus a team grid and map.' },
  { name: 'The Operator', price: '$899', body: 'Five pages with online booking, testimonials, inquiry forms, services and pricing, and visitor analytics.' },
  { name: 'The Storefront', price: '$1,600', body: 'Everything in The Operator plus online checkout and up to 10 products with order notifications.' },
]

export const STUDENT_EXTRAS = [
  ['Accept payments', '+$99', 'Customers pay you on the site, card or Apple Pay, straight to your bank.'],
  ['Booking', '+$49', 'On the $149 or $249 package — already included in The Hustle.'],
  ['Blog', '+$99', 'A posts section you write and publish yourself, no code.'],
  ['Logo designed', '+$49', 'Only if you don’t have one. Putting your existing logo on the site is free, always.'],
  ['Extra page', '+$49', ''],
  ['48-hour rush', '+50%', ''],
]

/* Floors only — see the note at the top of this file. */
export const SYSTEM_TIERS = [
  { name: 'One system', setup: 'from $750', monthly: 'monthly from $99', body: 'A single automation or communication system, live in one to three weeks. The missed-call text-back, the invoice that sends itself, the handoff that stops living in someone’s head.' },
  { name: 'An AI employee', setup: 'from $1,000', monthly: 'monthly from $199', body: 'One role, scoped and trained — the receptionist being the common first one. It answers, books, qualifies, and hands you a transcript of every call.' },
  { name: 'A stack', setup: 'from $2,500', monthly: 'monthly from $249', body: 'Three or four connected systems that share context, so the thing that answers the phone and the thing that sends the invoice know about each other.' },
  { name: 'Business-wide', setup: 'from $6,000', monthly: 'monthly from $599', body: 'Ongoing build-out where we hold the roadmap and keep shipping against it. For when the answer is "most of this", not "this one thing".' },
]

export const CARE = [
  ['You own it', '$0/mo', 'We hand you everything — the code, the keys, a 20-minute walkthrough. It’s yours.'],
  ['Basic care', '$19/mo', 'Hosting, security, uptime monitoring, and 15 minutes of changes each month. Students $12.'],
  ['Standard care', '$39/mo', 'An hour of changes monthly, updates, backups.'],
  ['Growth care', '$89/mo', 'Three hours of changes monthly, content updates, a monthly traffic report, priority turnaround.'],
]

export const PROCESS = [
  ['Tell us what you need', 'Pick a package or build from the menu — text, email, or a quick call.'],
  ['We confirm the exact price in writing', 'That number doesn’t move unless you add something.'],
  ['You send content', 'Or we write it, if you added that. Two revision rounds are included on every build.'],
  ['We build and launch', 'Typically two to three weeks, on your own domain, and you get your exact date up front.'],
]
