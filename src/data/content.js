// All site copy lives here. Draft voice: plain, direct, systems-flavored.

export const TAGLINE = 'Technology that becomes second nature.'

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
    strip: 'AGENTS: 04 · INPUT: VOICE + TEXT',
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
    strip: 'AGENTS: 04 · CADENCE: DAILY + WEEKLY',
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
    strip: 'AGENTS: 04 · MODE: ALWAYS-ON',
  },
  {
    slug: 'finances',
    label: 'Finances',
    headline: 'Money that reports to you.',
    narrative:
      'You shouldn\u2019t have to go looking for your own financial picture. We build finance systems that watch the flow, learn the patterns, and report up, so you make decisions with the numbers already in hand.',
    features: [
      ['Budget tracking agent', 'Live view of where the month actually stands.'],
      ['Spending pattern analysis', 'Sees the trend before it becomes the problem.'],
      ['Savings suggestions', 'Concrete moves, sized to your real cash flow.'],
      ['Goal monitoring', 'Progress toward the number that matters to you.'],
    ],
    strip: 'AGENTS: 04 · REVIEW: WEEKLY',
  },
]

export const BIZ = {
  automations: {
    tag: 'Automations',
    title: 'Work that repeats shouldn\u2019t need you',
    body:
      'Some work repeats, stalls, or quietly gets missed, and that drag adds up. We build systems that take on the chasing, the routing, the paperwork and the follow-through, so the work keeps moving without anyone pushing it uphill.',
    items: [
      'Lead capture and routing',
      'Quotes and proposals',
      'Invoicing and payment chase',
      'Scheduling and dispatch',
      'Client onboarding',
      'Document and data extraction',
      'Reporting and KPI digests',
      'Reviews and reputation',
    ],
  },
  communication: {
    tag: 'Communication',
    title: 'Nothing waits on someone remembering',
    body:
      'Most delay isn\u2019t people being slow. It\u2019s people not knowing it was their turn. We build the connective tissue that keeps your team, your clients, and your inbox moving in the same direction.',
    items: [
      'Client follow-up that never goes cold',
      'Internal handoffs with clear owners',
      'Meeting summaries and action items',
      'Team check-ins without the standup',
      'One inbox for every channel',
      'A knowledge base that answers itself',
      'Escalation that reaches the right person',
    ],
  },
  employees: {
    tag: 'AI Employees',
    title: 'A role, not a chatbot',
    body:
      'An AI employee has a job description, a schedule, and a standard it\u2019s held to. It shows up, does the work, logs everything it did, and reports back to you. Every one starts under your review and earns its autonomy.',
    items: [
      'Receptionist \u2014 answers every call, books the work',
      'Intake coordinator',
      'Sales development',
      'Account manager',
      'Operations assistant',
      'Bookkeeping assistant',
      'Recruiter',
      'Support agent',
    ],
  },
  stats: [
    { n: 40, suffix: '', cap: 'hours saved per week' },
    { n: 60, suffix: '%', cap: 'less admin time' },
    { n: 2, suffix: '\u00d7', cap: 'more deadlines hit' },
  ],
  outcomes: ['Faster client follow-up', 'Fewer dropped tasks', 'Better team response time', 'Greater workflow visibility'],
}

export const SYSTEMS = {
  lead:
    'Automations move work through the tools you already have. Sometimes the tool doesn\u2019t exist yet \u2014 this is where we build it.',
  items: [
    ['Websites', 'Your front door, built properly. Custom design, written with you, fast on a phone, with booking, intake, and payment wired in from day one.'],
    ['Business dashboards', 'One screen that answers \u201chow are we doing\u201d \u2014 live numbers pulled from every tool you already use, built around the decisions you actually make.'],
    ['Client portals', 'A professional front door for your customers: status, documents, approvals, invoices, and messages in one place, so they stop emailing you for updates.'],
    ['Internal operations tools', 'The custom software your spreadsheet is pretending to be. Your real process, with roles, permissions, and a record of who did what.'],
    ['Booking platforms', 'Services, staff, locations, and availability modeled properly, with deposits at booking and your cancellation policy enforced automatically.'],
    ['Online storefronts', 'Selling, with the back office attached \u2014 checkout, inventory, fulfillment, and the follow-up that turns one order into the next.'],
    ['Custom AI applications', 'Something only your business could use: your documents, your standards, your judgment \u2014 wrapped in an interface your team can actually operate.'],
    ['Rebuilds and migrations', 'You have a system. It\u2019s the wrong one. We audit what exists, move the data without losing it, and rebuild on something maintainable.'],
  ],
}

export const FOCUS_CHIPS = {
  personal: CATEGORIES.map((c) => [c.slug, c.label]),
  business: [
    ['ops', 'Operations'],
    ['team', 'Team & Community'],
    ['dashboards', 'Dashboards'],
    ['onboarding', 'Onboarding'],
  ],
}

export const CALENDLY_URL = 'https://calendly.com/mlamarfinley/30min'

// Savannah's inbound line. Set this once the Retell number is purchased
// (SETUP.md step 6) and the second CTA turns on everywhere automatically.
// Format: '+14045550134'. Empty string = phone option stays hidden.
export const SAVANNAH_PHONE = ''

export const HOME_COPY = {
  reframe: {
    line: 'You don\u2019t need more apps. You need a system.',
    body:
      'Most days leak through the gaps between tools: the task in one place, the follow-up in another, the reminder that never fires. We connect the pieces into one system that quietly runs the repetitive parts of your day.',
  },
  tracks: {
    life: {
      title: 'For your life',
      items: ['A daily planner that builds itself', 'Check-in calls that keep you on track', 'Inbox triage and task extraction', 'Money that reports to you'],
      to: '/personal',
    },
    business: {
      title: 'For your business',
      items: ['Automations that carry the repeating work', 'Communication that never drops a thread', 'AI employees with a real job description', 'Follow-up that never goes cold'],
      to: '/business',
    },
    systems: {
      title: 'Built from scratch',
      items: ['Websites that work on a phone first', 'Dashboards and client portals', 'Internal tools your process actually fits', 'Custom AI applications'],
      to: '/systems',
    },
  },
  steps: [
    ['Map the friction', 'A short call. We find where your time actually goes, and which parts a system should carry.'],
    ['We build your system', 'Custom agents shaped to how you already work. No templates, no dashboards for their own sake.'],
    ['It runs with you', 'Your system works in the background every day, and we tune it as your life or business changes.'],
  ],
  proof: {
    title: 'Running right now',
    body:
      'We\u2019re our own first client. A voice agent answers a real intake line every day. A personal system runs our mornings \u2014 the check-in call, the task carry-over, the follow-ups that never slip. We feel the rough edges before you do.',
  },
  truths: [
    ['Fully custom', 'Built around how you actually work, not a template with your logo on it.'],
    ['Life and business, one philosophy', 'The same calm-systems thinking at home and at work.'],
    ['Calm by design', 'Less noise, fewer dashboards. Systems that reduce pressure instead of adding it.'],
    ['We run on our own systems', 'Every system we sell, we live on daily. We feel the rough edges before you do.'],
  ],
}
