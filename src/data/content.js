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
  ops: {
    tag: 'Systems',
    title: 'Operations Automation',
    body:
      'Some work repeats, stalls, or quietly gets missed, and that drag adds up. We build systems that take on the reporting, the scheduling, the task routing, and the deadline tracking, so work keeps moving without you pushing it uphill.',
    items: ['Admin reduction', 'Workflow automation', 'KPI visibility', 'Deadline tracking', 'AI operational support'],
  },
  team: {
    tag: 'People',
    title: 'Team & Community',
    body:
      'The other half of your business is people, and people need follow-through. We build systems that improve communication, accountability, and coordination, so your team, clients, and collaborators stay aligned without the constant chasing.',
    items: ['Communication support', 'Meeting clarity', 'Team accountability', 'Client follow-up', 'Relationship tracking'],
  },
  stats: [
    { n: 40, suffix: '', cap: 'hours saved per week' },
    { n: 60, suffix: '%', cap: 'less admin time' },
    { n: 2, suffix: '\u00d7', cap: 'more deadlines hit' },
  ],
  outcomes: ['Faster client follow-up', 'Fewer dropped tasks', 'Better team response time', 'Greater workflow visibility'],
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

// Replace with a real Formspree form ID to connect the intake form.
export const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'
