// All site copy lives here. Voice: plain, direct, specific.
//
// ONE RULE GOVERNS THIS FILE: every number must survive the question
// "measured on whom?" We have no outside clients yet, so there are no client
// results to report. Where a number comes from our own operations, it says so.
// A label may read LIVE only if (1) the system is running right now, (2) the
// page names whose system it is, and (3) the number is fetched at request time
// or carries a visible date. Everything else is captioned
// "Screenshot · <system> · <month year>".

export const SITE_URL = 'https://aisecondnature.com'
export const SITE_NAME = 'Second Nature'
export const CONTACT_EMAIL = 'miles@aisecondnature.com'
export const LOCALITY = 'Atlanta, Georgia'

// Screen quads measured from the actual hero render (percent of image),
// order: top-left, top-right, bottom-right, bottom-left.
export const HERO = {
  ratio: 1456 / 816,
  quads: {
    left:   [[16.277, 28.064], [34.478, 31.985], [34.478, 50.245], [16.277, 50.245]],
    center: [[39.354, 31.985], [61.401, 31.985], [61.401, 50.490], [39.354, 50.490]],
    right:  [[66.690, 31.985], [83.654, 28.186], [83.654, 49.877], [66.690, 50.245]],
  },
  // sun bloom position (percent of image)
  bloom: { x: 61, y: 22, w: 34, h: 42 },
}

export const CATEGORIES = [
  {
    slug: 'time',
    label: 'Time management',
    headline: 'Your schedule, self-assembling.',
    narrative:
      'Planning your day is a job in itself, one you do every morning, unpaid. We build time systems that take that job off your plate. Yours hears what you need to do, builds the schedule around how you actually work, and keeps it current as the day moves.',
    features: [
      ['AI daily planner', 'Builds each day from your goals, energy, and calendar.'],
      ['Smart schedule builder', 'Restructures the week when priorities shift.'],
      ['Voice-input planning', 'Say it once and it lands as real, scheduled time.'],
      ['Automated reminders', 'Nudges arrive when they help, not when they interrupt.'],
    ],
  },
  {
    slug: 'accountability',
    label: 'Accountability',
    headline: 'A system that follows up.',
    narrative:
      'Most goals fail quietly, in the gaps between check-ins that never happen. Our accountability systems never forget to ask. They call, they track, and they reflect your week back at you, so drift gets caught early.',
    features: [
      ['Check-in call agent', 'A real voice call that asks how the commitment went.'],
      ['Habit follow-up', 'Tracks streaks and rescues them before they break.'],
      ['Weekly goal tracking', 'Progress measured against what you said mattered.'],
      ['Guided reflection', 'A short weekly review that compounds.'],
    ],
  },
  {
    slug: 'admin',
    label: 'Admin overload',
    headline: 'Inbox to action, automatically.',
    narrative:
      'The busywork between decisions, the triaging and summarizing and digging out the actual task, is exactly what agents are for. We turn your inbox into a queue your system works through, not a place your time disappears.',
    features: [
      ['Voice-to-plan workflow', 'Think out loud, get back a structured plan.'],
      ['Inbox triage + summary', 'What matters, surfaced. The rest, filed.'],
      ['Task extraction', 'Every buried to-do pulled into one list.'],
      ['Follow-up drafting', 'Replies drafted for your approval, in your voice.'],
    ],
  },
  {
    slug: 'finances',
    label: 'Finances',
    headline: 'Money that reports to you.',
    narrative:
      'You shouldn’t have to go looking for your own financial picture. We build finance systems that watch the flow, learn the patterns, and report up, so you make decisions with the numbers already in hand.',
    features: [
      ['Budget tracking agent', 'Live view of where the month actually stands.'],
      ['Spending pattern analysis', 'Sees the trend before it becomes the problem.'],
      ['Savings suggestions', 'Concrete moves, sized to your real cash flow.'],
      ['Goal monitoring', 'Progress toward the number that matters to you.'],
    ],
  },
]

// Build status is published, not hidden. LIVE = running right now, ours or a
// client's. BUILT TO ORDER = architecture designed and priced, not yet deployed
// for an outside client, because there aren't any yet.
export const STATUS = {
  LIVE: 'Live',
  ORDER: 'Built to order',
}

export const BIZ = {
  automations: {
    tag: 'Automations',
    title: 'Work that repeats shouldn’t need you',
    body:
      'Some work repeats, stalls, or quietly gets missed, and that drag adds up. We build systems that take on the chasing, the routing, the paperwork and the follow-through, so the work keeps moving without anyone pushing it uphill.',
    items: [
      ['Lead capture and routing', STATUS.ORDER],
      ['Quotes and proposals', STATUS.ORDER],
      ['Invoicing and payment chase', STATUS.ORDER],
      ['Scheduling and dispatch', STATUS.ORDER],
      ['Client onboarding', STATUS.ORDER],
      ['Document and data extraction', STATUS.ORDER],
      ['Reporting and KPI digests', STATUS.ORDER],
      ['Reviews and reputation', STATUS.ORDER],
    ],
  },
  communication: {
    tag: 'Communication',
    title: 'Nothing waits on someone remembering',
    body:
      'Most delay isn’t people being slow. It’s people not knowing it was their turn. We make the handoffs explicit, so your team, your clients, and your inbox keep moving in the same direction without anyone chasing.',
    items: [
      ['Client follow-up that never goes cold', STATUS.ORDER],
      ['Internal handoffs with clear owners', STATUS.ORDER],
      ['Meeting summaries and action items', STATUS.ORDER],
      ['Team check-ins without the standup', STATUS.ORDER],
      ['One inbox for every channel', STATUS.ORDER],
      ['A knowledge base that answers itself', STATUS.ORDER],
      ['Escalation that reaches the right person', STATUS.ORDER],
    ],
  },
  employees: {
    tag: 'AI Employees',
    title: 'A role, not a chatbot',
    body:
      'An AI employee has a job description, a schedule, and a standard it’s held to. It shows up, does the work, logs everything it did, and reports back to you. Every one starts under your review and earns its autonomy.',
    items: [
      ['Receptionist — answers every call, books the work', STATUS.LIVE],
      ['Intake coordinator', STATUS.ORDER],
      ['Sales development', STATUS.ORDER],
      ['Account manager', STATUS.ORDER],
      ['Operations assistant', STATUS.ORDER],
      ['Bookkeeping assistant', STATUS.ORDER],
      ['Recruiter', STATUS.ORDER],
      ['Support agent', STATUS.ORDER],
    ],
  },
  // What "built to order" actually means, said out loud. Honest implementation
  // status is a stronger signal than a perfect pitch.
  statusNote:
    'Built to order means the architecture is designed, the price is set, and it hasn’t been deployed for an outside client yet — because there aren’t any yet. You’d be first, which is why founding-client terms exist.',
  outcomes: ['Faster client follow-up', 'Fewer dropped tasks', 'Better team response time', 'Greater workflow visibility'],
}

// Replaces the old invented stat counters (40 hrs / 60% / 2x). Mechanism
// claims, not metrics: what the system removes, not a number we can't source.
export const BIZ_REMOVES = [
  ['Chasing an unpaid invoice', 'A reminder ladder that runs before and after the due date, and escalates to you only when an account is genuinely stuck.'],
  ['Calling back a two-week-old lead', 'A reply inside sixty seconds, at any hour, that qualifies and books.'],
  ['Retyping receipts into your books', 'Parsed, coded to your chart of accounts, and flagged when it isn’t sure.'],
  ['“So who’s doing what?” after every meeting', 'Decisions and action items extracted with owners and dates, sent to everyone who was in the room.'],
]

export const SYSTEMS = {
  lead:
    'Automations move work through the tools you already have. Sometimes the tool doesn’t exist yet — this is where we build it.',
  items: [
    ['Websites', 'Your front door, built properly. Custom design, written with you, fast on a phone, with booking, intake, and payment wired in from day one.'],
    ['Business dashboards', 'One screen that answers “how are we doing” — live numbers pulled from every tool you already use, built around the decisions you actually make.'],
    ['Client portals', 'A professional front door for your customers: status, documents, approvals, invoices, and messages in one place, so they stop emailing you for updates.'],
    ['Internal operations tools', 'The custom software your spreadsheet is pretending to be. Your real process, with roles, permissions, and a record of who did what.'],
    ['Booking platforms', 'Services, staff, locations, and availability modeled properly, with deposits at booking and your cancellation policy enforced automatically.'],
    ['Online storefronts', 'Selling, with the back office attached — checkout, inventory, fulfillment, and the follow-up that turns one order into the next.'],
    ['Custom AI applications', 'Something only your business could use: your documents, your standards, your judgment — wrapped in an interface your team can actually operate.'],
    ['Rebuilds and migrations', 'You have a system. It’s the wrong one. We audit what exists, move the data without losing it, and rebuild on something maintainable.'],
  ],
}

/* The booking destination, named for the job rather than the vendor — it was
   CALENDLY_URL, which meant switching scheduler touched six files instead of
   this line. Every CTA on the site reads from here.

   Moving to a Google Calendar appointment schedule: replace this string with
   the booking page URL and nothing else changes. */
export const BOOKING_URL = 'https://calendly.com/mlamarfinley/30min'

// Savannah, our AI receptionist, went live on this line 2026-08-10 (Retell +
// Calendly + Supabase all green). It is a real, callable product.
// If the line is ever taken down, set this to '' — the CTA components hide the
// phone option site-wide rather than ship a number that reaches nothing.
export const SAVANNAH_PHONE = '+14707489278'

// Every place the number appears, sighted users must be able to READ it, not
// just click it — a tel: link is inert on the desktop browsers most business
// research happens on.
export const SAVANNAH_PHONE_DISPLAY = '(470) 748-9278'

// The AI is disclosed at the point of action, every time. Nobody should learn
// they're talking to software after they've already started talking.
export const AGENT_DISCLOSURE =
  'It’s an AI receptionist, not a person — it says so when it picks up. It answers 24/7, books appointments, and hands you to Miles if you ask.'

// Published so it can be held to. Speed-to-lead is the one promise a company
// selling follow-up automation cannot afford to break.
export const RESPONSE_PROMISE =
  'Email gets an answer within one business day, usually the same afternoon. The AI answers the phone on the first ring, always.'

/* "Case studies" with zero clients means one thing only: our own builds,
   labelled as our own. Nothing here is client work, and the copy says so —
   inventing a client is both a lie and, since the FTC's 2024 rule on reviews
   and testimonials, an actionable one. */
export const BUILDS = [
  {
    slug: 'savannah',
    name: 'The AI receptionist',
    status: 'Live — answering our own line',
    problem:
      'A call that rings out at 6pm on a Saturday is a job that goes to whoever picks up next. Small businesses lose work in the gap between the phone ringing and someone being free to answer it.',
    built:
      'A voice agent that answers every call in the business’s own voice, handles the questions a front desk answers forty times a week, books straight into a real calendar, and texts back anyone who hangs up before it picks up. It says it’s an AI when it answers, and hands the caller to a human the moment they ask.',
    proof:
      'It answers our own business line right now. Call it — that is the demo, and it is the same build we install for a client, pointed at us.',
    stack: 'Retell · Claude · Supabase · Calendly',
    honest:
      'Deployed for us. Not yet deployed for an outside client — you would be the first.',
  },
  {
    slug: 'odessa',
    name: 'The personal operations system',
    status: 'Live — running daily for months, four instances',
    problem:
      'Plans rebuilt from scratch every morning, follow-ups that never got sent, and tasks that rolled over so many times they quietly stopped being real.',
    built:
      'A system that calls in the morning and sets the day, carries unfinished work forward instead of losing it, audits its own call transcripts afterwards, and calls back in the evening to ask how it went.',
    proof:
      'It has run every day for months, and three more instances run for members of my family on their own numbers and their own schedules — which is how I know it clones onto someone else’s life without me hovering over it.',
    stack: 'Retell · Claude · Supabase · Vercel',
    honest:
      'A personal system on a business site on purpose: the machinery underneath is the machinery a business build runs on.',
  },
]

export const FAQS = [
  [
    'What does it cost?',
    'Every number is published rather than quoted on a call. An AI receptionist is from $1,000 to build and $249/month including 400 minutes. Automations start at $750 to build. Custom software starts at $2,500. You get an exact number in writing before anything begins, and the number quoted is the number you pay.',
  ],
  [
    'How long does it take?',
    'An AI receptionist is usually answering within about a week. A single automation is one to three weeks. Custom software runs three to eight weeks depending on size. You get an exact delivery date in writing before we start, based on what is already in the queue.',
  ],
  [
    'What actually happens on the call?',
    'Thirty minutes. You describe where the work backs up; I ask a lot of questions about how a job moves through your business from first call to final invoice. Afterwards I write it up as a one-page friction map — where the time goes, where the leads leak, and which fix pays back first. You keep that map whether you hire me or not.',
  ],
  [
    'Is my data safe?',
    'Your data stays in your own accounts wherever possible — I connect to your calendar, your books and your inbox through official APIs, using access you grant and can revoke in one click. Call transcripts and task records live in a database I can name and you can request a copy of at any time. Nothing is used to train models. On termination I delete or return everything within 30 days and revoke every credential.',
  ],
  [
    'Do you have clients I can talk to?',
    'Not yet, and I would rather say so than imply otherwise. Second Nature has no outside clients — you would be among the first, which is exactly what founding-client terms are for. What I can offer instead is a product you can test without asking me: call the AI receptionist and judge the work directly.',
  ],
]

export const HOME_COPY = {
  hero: {
    eyebrow: 'Atlanta · AI reception + business automation',
    h1: 'The calls you miss are the jobs you lose.',
    sub:
      'Second Nature builds the AI receptionist that answers your phone 24/7, books the job into your calendar, and texts back everyone who hangs up. Then we automate the paperwork behind it — and build the software when the tool you need doesn’t exist yet.',
    proofLine: 'Call it from your own phone and hear exactly what your customers would hear.',
  },
  reframe: {
    line: 'You don’t need more apps. You need a system.',
    body:
      'Most days leak through the gaps between tools: the task in one place, the follow-up in another, the reminder that never fires. We connect the pieces into one system that quietly runs the repetitive parts of your day.',
  },
  tracks: {
    business: {
      title: 'For your business',
      items: ['Automations that carry the repeating work', 'Communication that never drops a thread', 'AI employees with a real job description', 'Follow-up that never goes cold'],
      to: '/business',
      cta: 'Explore business systems',
    },
    systems: {
      title: 'Custom software',
      items: ['Websites that work on a phone first', 'Dashboards and client portals', 'Internal tools your process actually fits', 'Custom AI applications'],
      to: '/systems',
      cta: 'Explore custom builds',
    },
    life: {
      title: 'For your life',
      items: ['A daily planner that builds itself', 'Check-in calls that keep you on track', 'Inbox triage and task extraction', 'Money that reports to you'],
      to: '/personal',
      cta: 'Explore personal systems',
    },
  },
  steps: [
    ['Map the friction', 'A short call. We find where your time actually goes, and which parts a system should carry. You keep the map whether you hire us or not.'],
    ['We build your system', 'Custom agents shaped to how you already work. You get an exact price and an exact date in writing before anything starts.'],
    ['It runs with you', 'Your system works in the background every day, and we tune it as your life or business changes. The first 90 days of monitoring are included.'],
  ],
  // The one claim on this site a stranger can falsify in ninety seconds.
  proof: {
    title: 'Proof you can check',
    body:
      'We have no outside clients yet — that’s the honest starting point, and everything we show is built to be checked rather than believed. What we do have is running. An AI receptionist answers our own line every hour of the day: call it, and you’ll hear the same build we install for a client, pointed at us. A personal system has run our mornings for months, and three more run for our family.',
    cta: 'Call it and see',
  },
  truths: [
    ['Fully custom', 'Built around how you actually work, not a template with your logo on it.'],
    ['We run on our own systems', 'Every system we sell, we live on daily. We feel the rough edges before you do.'],
    ['Calm by design', 'Less noise, fewer dashboards. Systems that reduce pressure instead of adding it.'],
    ['You own it', 'The code and the data are yours. At handover you get the repository, the keys, and a walkthrough.'],
  ],
  // The real, checkable scarcity: a solo operator's capacity. Update the count
  // on a schedule and never fake it.
  founding: {
    title: 'Founding clients',
    body:
      'We need case studies more than we need margin right now. The first businesses we build for get our rates held for twelve months in writing, direct access, and the work written up with their name on it — every word approved by them first. That’s the whole trade. The work is the same either way; the case study is what the terms buy.',
  },
}
