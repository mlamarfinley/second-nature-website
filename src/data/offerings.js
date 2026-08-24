import { STATUS } from './content.js'

/* The catalog, with depth.
 *
 * These 23 offerings used to be plain <li> text — desire generated with
 * nowhere to spend it. A visitor who read "Invoicing and payment chase" and
 * wanted to know more had exactly one next step: book a 30-minute call and
 * ask. Every item now links to a block that answers what it does, who it's
 * for, and what it needs from you.
 *
 * The copy comes from OFFERINGS.md, rewritten from the internal third person
 * ("they've found a two-week-old inquiry") into second person. It is the best
 * writing in the repo and it had never been published.
 */

export const AUTOMATIONS = [
  {
    slug: 'lead-capture',
    name: 'Lead capture and routing',
    status: STATUS.ORDER,
    trigger: 'You’ve found a two-week-old inquiry nobody ever answered.',
    does: 'Inquiries from your form, your DMs, your email and your phone land in one pipeline. Each one is qualified, acknowledged instantly, and assigned to a person — and if it sits untouched, it escalates instead of going quiet.',
    needs: 'Wherever leads currently arrive, and a rule for who owns what.',
  },
  {
    slug: 'quotes',
    name: 'Quotes and proposals',
    status: STATUS.ORDER,
    trigger: 'Proposals take an hour to write and go out two days late.',
    does: 'Intake answers become a formatted proposal with your own pricing logic applied, sent for signature, tracked, and nudged until it’s signed or declined.',
    needs: 'Your pricing rules and one proposal you’re happy with, as the model.',
  },
  {
    slug: 'invoicing',
    name: 'Invoicing and payment chase',
    status: STATUS.ORDER,
    trigger: 'You’re the one sending “just following up on that invoice.”',
    does: 'Invoices go out on completion or milestone. Reminders climb a ladder before and after the due date — polite, then firm — and only accounts that are genuinely stuck ever reach you, with an outstanding-balance summary.',
    needs: 'Your invoicing tool, your payment terms, and half an hour on the tone of the reminders.',
  },
  {
    slug: 'scheduling',
    name: 'Scheduling and dispatch',
    status: STATUS.ORDER,
    trigger: 'You have field staff, or a calendar somebody manages by hand.',
    does: 'Real availability with buffers and travel time, automatic confirmations, reminders and reschedules, crew assignment by skill and location, and no-show slots backfilled rather than lost.',
    needs: 'Your calendar, your service areas, and how long jobs actually take.',
  },
  {
    slug: 'onboarding',
    name: 'Client onboarding',
    status: STATUS.ORDER,
    trigger: 'Onboarding quality depends on who happens to be doing it.',
    does: 'A triggered sequence for every new client or hire — documents, contracts, credentials, access — tracked to completion, with a handoff summary when it’s done.',
    needs: 'The steps you already follow when you remember to follow them.',
  },
  {
    slug: 'extraction',
    name: 'Document and data extraction',
    status: STATUS.ORDER,
    trigger: 'Somebody on your team retypes numbers for a living.',
    does: 'Invoices, receipts, contracts and forms parsed straight into your CRM or accounting system. Anything it isn’t sure about is flagged for a human rather than failing silently.',
    needs: 'Samples of the documents, and where the data should land.',
  },
  {
    slug: 'reporting',
    name: 'Reporting and KPI digests',
    status: STATUS.ORDER,
    trigger: '“How did we do last month” takes more than a minute to answer.',
    does: 'Pulls every tool into one brief written in plain language, on a schedule you choose, with anomalies called out rather than buried in a chart.',
    needs: 'The numbers you actually make decisions on — not every number you have.',
  },
  {
    slug: 'reviews',
    name: 'Reviews and reputation',
    status: STATUS.ORDER,
    trigger: 'You have great customers and eleven Google reviews.',
    does: 'A review request timed to job completion, unhappy responses routed privately to you first, and new public reviews monitored with replies drafted in your voice.',
    needs: 'Your review profiles, and how you want to handle an unhappy one.',
  },
]

export const COMMUNICATION = [
  {
    slug: 'follow-up',
    name: 'Client follow-up that never goes cold',
    status: STATUS.ORDER,
    trigger: 'Your pipeline is really a list of people you meant to call.',
    does: 'Every contact carries a next step and an owner. Nudges go out in your voice, and the long tail — the ones who went quiet months ago — gets worked instead of forgotten.',
    needs: 'Your contact list, wherever it lives, even if that’s a spreadsheet.',
  },
  {
    slug: 'handoffs',
    name: 'Internal handoffs with clear owners',
    status: STATUS.ORDER,
    trigger: 'Work crosses roles and things get dropped in between.',
    does: 'Ownership is logged at every handoff, requests are routed by type rather than by whoever is least busy, and SLA timers escalate visibly instead of silently.',
    needs: 'Your team, their roles, and the handoffs that go wrong most often.',
  },
  {
    slug: 'meetings',
    name: 'Meeting summaries and action items',
    status: STATUS.ORDER,
    trigger: 'Meetings end with “so who’s doing what?”',
    does: 'Recording, transcript and a plain-language summary. Decisions and actions are extracted with owners and dates attached, pushed into your task tool, and recapped to everyone who was in the room.',
    needs: 'Your meeting tool and your task tool.',
  },
  {
    slug: 'team-pulse',
    name: 'Team check-ins without the standup',
    status: STATUS.ORDER,
    trigger: 'Nobody likes the standup and it still doesn’t surface blockers.',
    does: 'A short automated check-in per person, rolled into one digest. Blockers surface the same day, and overload becomes visible before somebody burns out.',
    needs: 'Your team and the cadence you want.',
  },
  {
    slug: 'unified-inbox',
    name: 'One inbox for every channel',
    status: STATUS.ORDER,
    trigger: 'Customers reach you five ways and two of them get ignored.',
    does: 'Email, SMS, DMs, web chat and voicemail in a single queue sorted by urgency, with replies drafted for approval and automatic answers for the questions you answer forty times a week.',
    needs: 'Access to the channels you actually use.',
  },
  {
    slug: 'knowledge-base',
    name: 'A knowledge base that answers itself',
    status: STATUS.ORDER,
    trigger: 'You’re the bottleneck because you’re the one who knows.',
    does: 'SOPs, policies and past decisions searchable in plain English, with sources cited — and every new question that comes up becomes new documentation instead of another interruption.',
    needs: 'Whatever documentation exists, however messy.',
  },
  {
    slug: 'escalation',
    name: 'Escalation that reaches the right person',
    status: STATUS.ORDER,
    trigger: 'Your “urgent” channel has been ruined by things that weren’t.',
    does: 'Rules for what genuinely deserves interrupting a human, sent to the right channel, to the right person, at a reasonable hour — with quiet hours honoured.',
    needs: 'What counts as urgent in your business, and who owns what.',
  },
]

export const EMPLOYEES = [
  {
    slug: 'receptionist',
    name: 'Receptionist',
    status: STATUS.LIVE,
    trigger: 'The phone rings while you’re under a car, on a roof, or with a customer.',
    does: 'Answers 24/7 in your business’s voice. Handles questions about hours, services, quotes and availability. Books into your calendar. Qualifies and routes what it shouldn’t handle itself, and sends you a transcript and summary of every call.',
    needs: 'Your hours, services, prices and policies — and a calendar to book into.',
    note: 'This is the one running on our own line. Call it and judge it directly.',
  },
  {
    slug: 'intake',
    name: 'Intake coordinator',
    status: STATUS.ORDER,
    trigger: 'People express interest and then drift away before the appointment.',
    does: 'Turns interest into a booked, prepared appointment: collects documents, details and requirements up front, confirms, reminds, reschedules, and hands you a prepared brief before the meeting starts.',
    needs: 'What you need to know before a first meeting is worth having.',
  },
  {
    slug: 'sdr',
    name: 'Sales development',
    status: STATUS.ORDER,
    trigger: 'Leads arrive at 9pm and get answered at 11am.',
    does: 'Responds to a new lead in under a minute at any hour, qualifies against your real criteria, books the call, works the ones who went quiet on a genuine cadence, and logs everything to your CRM.',
    needs: 'What a good lead looks like, and what disqualifies one.',
  },
  {
    slug: 'account-manager',
    name: 'Account manager',
    status: STATUS.ORDER,
    trigger: 'You find out an account is unhappy when they leave.',
    does: 'Scheduled check-ins on key accounts, watching for churn signals — silence, complaints, dropped usage — and surfacing renewal and upsell moments with context and drafted outreach.',
    needs: 'Your account list and what healthy usage looks like.',
  },
  {
    slug: 'ops-assistant',
    name: 'Operations assistant',
    status: STATUS.ORDER,
    trigger: 'You are the master status picture, and you hold it in your head.',
    does: 'Monitors deadlines, deliverables and open loops across the business, chases the team for updates, maintains the status picture, and escalates only what’s genuinely stuck.',
    needs: 'Where work is tracked today, even if that’s several places.',
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping assistant',
    status: STATUS.ORDER,
    trigger: 'The month-end close is an event rather than a routine.',
    does: 'Receipts and expenses captured and coded, invoices matched, discrepancies flagged, a monthly close package assembled, and your cash position reported weekly.',
    needs: 'Your accounting tool and your chart of accounts.',
    note: 'Prepares; does not advise. It works alongside your accountant, not instead of one.',
  },
  {
    slug: 'recruiter',
    name: 'Recruiter',
    status: STATUS.ORDER,
    trigger: 'Applications pile up and good candidates go cold waiting.',
    does: 'Screens applications against your real requirements, schedules without the email tennis, applies consistent scorecards, and makes sure every candidate actually hears back.',
    needs: 'The role, the requirements, and your calendar.',
  },
  {
    slug: 'support',
    name: 'Support agent',
    status: STATUS.ORDER,
    trigger: 'You answer the same five questions all week.',
    does: 'Tier-one resolution drawn from your actual documentation, with sources shown. Solves the repeats outright, escalates the rest with full context, and turns every escalation into new documentation.',
    needs: 'Your documentation and your escalation path.',
  },
]

export const FAMILIES = [
  { key: 'automations', items: AUTOMATIONS },
  { key: 'communication', items: COMMUNICATION },
  { key: 'employees', items: EMPLOYEES },
]
