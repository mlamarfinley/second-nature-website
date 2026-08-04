# Site Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Second Nature site as a clear one-page pitch (compressed cinematic hero + persuasion sections) with simplified Personal/Business detail pages and a Calendly CTA throughout.

**Architecture:** Keep the existing Vite+React+HashRouter app and design tokens. Home's fixed full-screen stage becomes a ~70vh hero band inside a normal scrolling page with six content sections below. Personal/Business lose their atmospheric systems (orbit/cosmos/leaf/veins) and become linear ruled-section pages. A new shared Nav replaces the corner wordmark; all CTAs point at Calendly.

**Tech Stack:** Vite 5, React 18, framer-motion (entrance fades + in-view reveals only), hand-written CSS in `src/index.css`.

## Global Constraints

- Primary CTA everywhere: `https://calendly.com/mlamarfinley/30min`, `target="_blank" rel="noopener"`.
- Slogan register: H1 is exactly `We build AI systems that work with you.` Dogfooding is proof copy, never the headline.
- Do NOT alter `HERO.quads`/`HERO.ratio` (measured screen coordinates) or the homography code.
- Keep: type tokens (Playfair/Space Grotesk/Schibsted/Martian Mono), gold-led accent rules, a11y work (skip link, `main#main`, footer, alts, `--ink-faint` at 0.56), WebP image pipeline, power-on keyframes (timing may change), live screen UIs, Business modules (KPI counters, WorkflowRail, CommThread) with gold bezels.
- Retire: Orbit/implode/spine, Cosmos starfield, leaf background + `src/assets` import, VeinSystem SVG, pillar is-live/is-rest hover choreography, page-slide transitions (fade 0.25s only), home quiet-nav/instruction/footnote layers.
- No new dependencies.
- Verification baseline for every task: `npm run build` exits 0.
- Commit after every task with the message given in the task.

---

### Task 1: CTA + copy data plumbing

**Files:**
- Modify: `src/data/content.js`
- Modify: `src/pages/Build.jsx`

**Interfaces:**
- Produces: `CALENDLY_URL` (string export), `HOME` copy object export consumed by Task 4:
  `HOME_COPY = { reframe: {line, body}, tracks: {life: {title, items[4], to}, business: {...}}, steps: [[title, body]×3], proof: {title, body}, truths: [[title, body]×4] }`.

- [ ] **Step 1: Add exports to `src/data/content.js`** (append near bottom, replacing the `FORMSPREE_ID` export):

```js
export const CALENDLY_URL = 'https://calendly.com/mlamarfinley/30min'

export const HOME_COPY = {
  reframe: {
    line: 'You don’t need more apps. You need a system.',
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
      items: ['Operations automation, end to end', 'AI support that works like an extra employee', 'Client follow-up that never goes cold', 'Team communication, summarized and routed'],
      to: '/business',
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
      'We’re our own first client. The systems on this page run our own days: the morning check-in call, the task carry-over, the follow-ups that never slip.',
  },
  truths: [
    ['Fully custom', 'Built around how you actually work, not a template with your logo on it.'],
    ['Life and business, one philosophy', 'The same calm-systems thinking at home and at work.'],
    ['Calm by design', 'Less noise, fewer dashboards. Systems that reduce pressure instead of adding it.'],
    ['We run on our own systems', 'Every system we sell, we live on daily. We feel the rough edges before you do.'],
  ],
}
```

- [ ] **Step 2: Point the Build teaser CTA at Calendly.** In `src/pages/Build.jsx`, add the import and replace the mailto CTA:

```jsx
import { CALENDLY_URL } from '../data/content.js'
```

Replace:
```jsx
          <a className="cta-button" href="mailto:hello@secondnature.ai" style={{ marginTop: '.6rem' }}>
            Email us
          </a>
```
with:
```jsx
          <a className="cta-button" href={CALENDLY_URL} target="_blank" rel="noopener" style={{ marginTop: '.6rem' }}>
            Book a call
          </a>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: exit 0. Then `grep -c "calendly.com/mlamarfinley/30min" dist/assets/*.js` → ≥1.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Calendly CTA constant and home pitch copy"
```

---

### Task 2: Shared Nav + App shell (footer unification, fade transitions)

**Files:**
- Create: `src/components/Nav.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css` (nav styles; retire `.home-footnote` styles later in Task 7)

**Interfaces:**
- Produces: `<Nav />` rendered on every page (including Home). Consumes `CALENDLY_URL`.

- [ ] **Step 1: Create `src/components/Nav.jsx`:**

```jsx
import { Link, useLocation } from 'react-router-dom'
import { CALENDLY_URL } from '../data/content.js'

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <header className="site-header">
      <nav className="topnav" aria-label="Site">
        <Link to="/" className="topnav-mark" aria-label="Second Nature home">
          <img src="./logo.webp" width="384" height="384" alt="" />
          <span>SECOND&nbsp;NATURE</span>
        </Link>
        <div className="topnav-links">
          <Link to="/personal" aria-current={pathname === '/personal' ? 'page' : undefined}>Personal</Link>
          <Link to="/business" aria-current={pathname === '/business' ? 'page' : undefined}>Business</Link>
          <a className="topnav-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Rewrite `src/App.jsx` Shell:** remove the corner wordmark block, the `SLIDE` map and dx logic, and the `home-footnote` branch. Result:

```jsx
import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Personal from './pages/Personal.jsx'
import Business from './pages/Business.jsx'
import Build from './pages/Build.jsx'
import { CALENDLY_URL } from './data/content.js'

function skipToMain(e) {
  e.preventDefault()
  const main = document.getElementById('main')
  if (main) { main.focus(); main.scrollIntoView() }
}

function Shell() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return (
    <>
      <a className="skip-link" href="#main" onClick={skipToMain}>Skip to content</a>
      <Nav />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/build" element={<Build />} />
        </Routes>
      </motion.div>
      <footer className="site-footer">
        <span className="site-footer-mark">SECOND&nbsp;NATURE</span>
        <a href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        <a href="mailto:hello@secondnature.ai">hello@secondnature.ai</a>
        <span>© 2026 Second Nature</span>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
```

- [ ] **Step 3: Add nav CSS to `src/index.css`** (after the `.site-header { display: contents; }` rule — replace that rule):

```css
.site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 40; }
.site-header::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: linear-gradient(180deg, rgba(5,5,5,.94) 0%, rgba(5,5,5,.7) 60%, transparent 100%);
}
.topnav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem clamp(1.25rem, 4vw, 3rem);
}
.topnav-mark { display: flex; align-items: center; gap: .65rem; text-decoration: none; }
.topnav-mark img { width: 28px; height: 28px; object-fit: contain; }
.topnav-mark span { font-family: var(--grotesk); font-size: .8rem; letter-spacing: .3em; color: var(--ink); }
.topnav-links { display: flex; align-items: center; gap: clamp(1.2rem, 3vw, 2.2rem); }
.topnav-links a {
  font-family: var(--mono); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--ink-dim); text-decoration: none; transition: color .3s;
}
.topnav-links a:hover, .topnav-links a[aria-current="page"] { color: var(--ink); }
.topnav-cta {
  padding: .6rem 1.1rem; border: 1px solid var(--gold);
  color: var(--gold) !important; transition: background .3s, color .3s !important;
}
.topnav-cta:hover { background: var(--gold); color: var(--base) !important; }
@media (max-width: 880px) {
  .topnav-links a:not(.topnav-cta) { display: none; }
}
```
Also delete the old `.wordmark`, `.wordmark::before`, `.wordmark-right`, `.wordmark-arrow` rules (they are unused after this task).

- [ ] **Step 4: Verify**

Run: `npm run build` → exit 0. Load `/#/personal` in the dev preview: top bar shows wordmark, Personal/Business, gold Book a call; footer shows Book a call + email.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: shared top nav with Calendly CTA, unified footer, fade transitions"
```

---

### Task 3: Home hero band (compressed stage + overlay + tightened boot + poster variant)

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `CALENDLY_URL` from content.js. Stage/MobileHome components already in Home.jsx.
- Produces: Home renders `<section className="hero-band">` containing the stage (desktop) or poster (small/portrait) plus `.hero-overlay` copy; page continues scrolling below (Task 4 sections).

- [ ] **Step 1: Convert stage viewport from fixed to band.** In `src/index.css` change `.stage-viewport`:

```css
.stage-viewport {
  position: absolute; inset: 0; overflow: hidden; background: var(--base);
}
.hero-band { position: relative; height: min(78vh, 820px); min-height: 540px; }
```
(The band owns the height; the stage fills it. The existing measure() reads clientWidth/Height so no JS change is needed for sizing.)

- [ ] **Step 2: Tighten the boot.** In `src/index.css` set power-on duration `.95s` → `.7s` (in `.screen-surface .screen-inner`), and in `Home.jsx` change `pon` values: center `0.45` → `0.2`, left `1.5` → `0.75`, right `1.65` → `0.9`.

- [ ] **Step 3: Restructure `Home.jsx` render.** Replace the current `<main>` return of `Home` with:

```jsx
export default function Home() {
  return (
    <main id="main" tabIndex={-1} aria-label="Second Nature home">
      <section className="hero-band">
        <Stage />
        <MobileHome />
        <div className="hero-overlay">
          <span className="mono-label hero-eyebrow">Second Nature · AI Systems</span>
          <h1 className="serif-display hero-h1">We build AI systems that work with&nbsp;you.</h1>
          <p className="hero-sub">
            Custom agents that carry your schedule, your follow-ups, your admin, and your
            operations, calmly, in the background, every day.
          </p>
          <div className="hero-actions">
            <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
            <a className="hero-secondary" href="#how" onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}>See how it works ↓</a>
          </div>
        </div>
      </section>
      {/* Task 4 sections mount here */}
    </main>
  )
}
```
Delete the `home-quiet-nav` and `home-instruction` JSX. Import `CALENDLY_URL`. Remove the sr-only h1 (the hero h1 is now real).

- [ ] **Step 4: MobileHome becomes a band variant.** In `MobileHome`, remove the bottom action stack and tagline (the overlay now carries copy) — keep the picture + scrim + screen-logo; change `.mobile-home` CSS `min-height: 100vh/100dvh` to `height: 100%` and `justify-content: flex-end` stays harmless. The three media blocks that show/hide `.mobile-home` / `.stage-viewport` remain the switch.

- [ ] **Step 5: Overlay CSS** (add to `src/index.css`):

```css
.hero-overlay {
  position: absolute; left: clamp(1.25rem, 5vw, 4rem); bottom: clamp(1.6rem, 5vh, 3.2rem);
  right: clamp(1.25rem, 5vw, 4rem); z-index: 6; max-width: 44rem;
  text-shadow: 0 1px 14px rgba(0,0,0,.85);
}
.hero-band::after {
  content: ""; position: absolute; inset: 40% 0 0 0; z-index: 5; pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(5,5,5,.82) 78%, var(--base) 100%);
}
.hero-eyebrow { color: var(--gold); }
.hero-h1 { font-size: clamp(2.4rem, 4.6vw, 4.2rem); margin: .9rem 0 1rem; }
.hero-sub { color: var(--ink-dim); max-width: 36rem; margin: 0 0 1.6rem; }
.hero-actions { display: flex; align-items: center; gap: 1.6rem; flex-wrap: wrap; }
.hero-cta { border-color: var(--gold); color: var(--gold); }
.hero-cta:hover { background: var(--gold); color: var(--base); }
.hero-secondary {
  font-family: var(--mono); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--ink-dim); text-decoration: none;
}
.hero-secondary:hover { color: var(--ink); }
```

- [ ] **Step 6: Verify**

`npm run build` → 0. Preview `/#/`: hero band ~70vh with headline/sub/CTA over the scene, screens boot fast, page scrolls past the band (blank below until Task 4). Narrow window: poster variant fills band with same overlay.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: compressed hero band with clear headline and Calendly CTA"
```

---

### Task 4: Home pitch sections (reframe, tracks, steps, proof band, truths, close)

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `HOME_COPY`, `CALENDLY_URL`; existing `BusinessScreenUI` for the proof band, plus a new small `DailyBriefUI` defined here.

- [ ] **Step 1: Add `DailyBriefUI`** (personal live screen for the proof band) in `Home.jsx`:

```jsx
function DailyBriefUI() {
  const rows = [
    ['07:30', 'Morning check-in call', 'done'],
    ['09:00', 'Deep work: proposal draft', 'now'],
    ['12:30', 'Follow-up: 2 replies drafted', 'queued'],
    ['17:00', 'Day review + carry-over', 'queued'],
  ]
  return (
    <div className="sui" aria-hidden="true">
      <div className="sui-pad">
        <div className="sui-title"><span className="sui-dot" style={{ background: 'var(--gold)' }} />TODAY · PERSONAL SYSTEM</div>
        <div className="sui-hr" />
        {rows.map(([t, label, st]) => (
          <div className="sui-row" key={label}><span>{t} · {label}</span><b>{st.toUpperCase()}</b></div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Append sections after the hero band** (inside `<main>`; import `HOME_COPY`, `Link`, `motion`, `useReducedMotion`):

```jsx
      <div className="home-body">
        <section className="hb-section hb-reframe" aria-label="The idea">
          <p className="serif-display hb-line">{HOME_COPY.reframe.line}</p>
          <p className="hb-body">{HOME_COPY.reframe.body}</p>
        </section>

        <section className="hb-section" aria-label="What we build">
          <span className="mono-label hb-eyebrow">What we build</span>
          <div className="hb-tracks">
            {[HOME_COPY.tracks.life, HOME_COPY.tracks.business].map((t) => (
              <div className="hb-track" key={t.title}>
                <h2>{t.title}</h2>
                <ul>{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <Link className="crosslink" to={t.to}>Explore {t.title === 'For your life' ? 'personal' : 'business'} →</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="hb-section" aria-label="How it works">
          <span className="mono-label hb-eyebrow">How it works</span>
          <div className="hb-steps">
            {HOME_COPY.steps.map(([title, body], i) => (
              <div className="hb-step" key={title}>
                <span className="hb-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hb-section" aria-label="Proof">
          <span className="mono-label hb-eyebrow">{HOME_COPY.proof.title}</span>
          <p className="hb-body hb-proof-body">{HOME_COPY.proof.body}</p>
          <div className="hb-proof-screens" aria-hidden="true">
            <div className="hb-screen"><DailyBriefUI /></div>
            <div className="hb-screen"><BusinessScreenUI /></div>
          </div>
        </section>

        <section className="hb-section" aria-label="Why Second Nature">
          <span className="mono-label hb-eyebrow">Why Second Nature</span>
          <div className="hb-truths">
            {HOME_COPY.truths.map(([title, body]) => (
              <div className="hb-truth" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="hb-section hb-close" aria-label="Get started">
          <p className="serif-display hb-line">Technology that becomes second&nbsp;nature.</p>
          <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </section>
      </div>
```
(Step numbers are a real sequence — the process has an order — so numbering is meaningful here.)

- [ ] **Step 3: Section CSS** (add to `src/index.css`):

```css
.home-body { position: relative; z-index: 2; max-width: 1460px; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 4.5rem) 4rem; }
.hb-section { padding: clamp(3rem, 7vh, 5rem) 0; border-top: 1px solid rgba(240,240,236,.08); }
.hb-section:first-child { border-top: 0; }
.hb-eyebrow { color: var(--gold); display: block; margin-bottom: 1.6rem; }
.hb-line { font-size: clamp(1.9rem, 3.6vw, 3rem); margin: 0 0 1rem; }
.hb-body { color: var(--ink-dim); max-width: 40rem; margin: 0; }
.hb-tracks { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 5rem); }
.hb-track h2 { font-size: 1.35rem; margin-bottom: 1rem; }
.hb-track ul { list-style: none; margin: 0 0 1.4rem; padding: 0; }
.hb-track li { padding: .55rem 0; border-top: 1px solid rgba(240,240,236,.08); color: var(--ink-dim); }
.hb-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1.6rem, 4vw, 3.5rem); }
.hb-step-num { font-family: var(--mono); font-size: .72rem; color: var(--gold); letter-spacing: .14em; }
.hb-step h3 { font-size: 1.08rem; margin: .5rem 0 .5rem; }
.hb-step p { color: var(--ink-dim); font-size: .93rem; margin: 0; }
.hb-proof-body { margin-bottom: 2rem; }
.hb-proof-screens { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.4rem, 3vw, 2.5rem); }
.hb-screen { aspect-ratio: 16/9; border: 1px solid rgba(232,168,76,.28); position: relative; overflow: hidden; }
.hb-truths { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6rem clamp(2rem, 5vw, 5rem); }
.hb-truth { border-top: 1px solid rgba(240,240,236,.08); padding-top: 1rem; }
.hb-truth h3 { font-size: 1.02rem; margin-bottom: .35rem; }
.hb-truth p { color: var(--ink-dim); font-size: .92rem; margin: 0; }
.hb-close { text-align: center; }
.hb-close .cta-button { margin-top: 1.6rem; }
@media (max-width: 880px) {
  .hb-tracks, .hb-steps, .hb-proof-screens, .hb-truths { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Verify** — build passes; preview `/#/` scrolls: reframe → tracks → steps → live proof screens running → truths → close CTA. "See how it works ↓" scrolls to #how.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home pitch sections — reframe, tracks, process, live proof, truths, close"
```

---

### Task 5: Simplify Personal page

**Files:**
- Modify: `src/pages/Personal.jsx` (major deletion)
- (CSS retirement happens in Task 7)

**Interfaces:**
- Consumes: `CATEGORIES` (existing), `CALENDLY_URL`, existing `.feature-row`, `.pp-*` text styles, `Reveal` helper (kept).

- [ ] **Step 1: Rewrite `src/pages/Personal.jsx`** to exactly:

```jsx
import { motion, useReducedMotion } from 'framer-motion'
import { CATEGORIES, CALENDLY_URL } from '../data/content.js'

function Reveal({ i = 0, className, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Personal() {
  return (
    <main id="main" tabIndex={-1} className="page page-quiet" style={{ '--accent': 'var(--nebula)' }}>
      <div className="page-inner detail-inner">
        <Reveal i={0}>
          <span className="pp-eyebrow mono-label">Personal Systems</span>
        </Reveal>
        <Reveal i={1}>
          <h1 className="serif-display pp-headline">What&rsquo;s creating the most friction in your&nbsp;life?</h1>
        </Reveal>
        <Reveal i={2}>
          <p className="pp-lead">
            Maybe it&rsquo;s the schedule that never quite holds. The follow-through that slips.
            The admin that eats your evenings, or the money questions that stay unanswered.
            Wherever the friction lives, we build personal AI systems that reduce it, so you
            stay on top of your time, follow through on what matters, and get more room to
            be human.
          </p>
        </Reveal>

        {CATEGORIES.map((c, idx) => (
          <Reveal key={c.slug} className="detail-block" i={idx + 3}>
            <span className="mono-label detail-label">{c.label}</span>
            <h2 className="detail-headline">{c.headline}</h2>
            <p className="detail-body">{c.narrative}</p>
            <div>
              {c.features.map(([name, desc]) => (
                <div className="feature-row" key={name}>
                  <strong>{name}</strong>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="page-transition" i={7}>
          <hr className="thin-rule page-transition-rule" />
          <p className="serif-display page-transition-headline">Your life needs a&nbsp;system.</p>
          <p className="page-transition-body">
            Thirty minutes is enough to map where yours should start.
          </p>
          <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
        </Reveal>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add detail-page CSS** (in `src/index.css`, after `.page-transition-body` rules):

```css
.page-quiet { background: radial-gradient(800px 560px at 90% -4%, rgba(232,168,76,.05), transparent 70%); }
.detail-inner { max-width: 860px; }
.detail-block { margin-top: clamp(2.6rem, 6vh, 4rem); padding-top: clamp(1.8rem, 4vh, 2.6rem); border-top: 1px solid rgba(240,240,236,.09); }
.detail-label { color: var(--gold); }
.detail-headline { font-size: clamp(1.5rem, 2.6vw, 2rem); margin: .7rem 0 .8rem; }
.detail-body { color: var(--ink-dim); max-width: 42rem; margin: 0 0 1.2rem; }
```

- [ ] **Step 3: Verify** — build passes; `/#/personal` shows headline → four flat system sections → Book a call. No orbit, no starfield.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Personal page simplified to linear ruled sections"
```

---

### Task 6: Simplify Business page

**Files:**
- Modify: `src/pages/Business.jsx`

**Interfaces:**
- Consumes: `BIZ`, `CALENDLY_URL`; keeps `Counter`, `WorkflowRail`, `CommThread`, `Pillar` (simplified: no live/setLive props).

- [ ] **Step 1: Edit `src/pages/Business.jsx`:**
  - Delete `import leafBg ...`, the `VEINS` array, `VeinSystem`, and the `<div className="bz-leaf" ... />`, `<div className="grid-bg" ... />`, `<VeinSystem />` elements.
  - Simplify `Pillar`: remove `live`, `setLive`, the four mouse/focus handlers, and the `state` class logic (`className={`bz-pillar bz-${flavor}`}`). Remove `const [live, setLive] = useState(null)` and the props at both call sites.
  - `<main>` gains `className="page page-quiet"` (accent stays `var(--pulse)`).
  - Replace the leaf-metaphor paragraph with:

```jsx
        <p className="bz-dim">
          Everything in a business flows through two networks: the operational side that keeps
          work moving, and the people side that keeps teams, clients, and communication aligned.
          Explore both, then tell us where it hurts most.
        </p>
```
  - Instruction line text: `Follow both veins of the system` → `Explore both sides of the system`.
  - Replace the transition CTA:

```jsx
          <a className="cta-button hero-cta" href={CALENDLY_URL} target="_blank" rel="noopener">Book a call</a>
```
   and change the transition body's last sentence to: `That's where we start on a call.` (keep the rest).

- [ ] **Step 2: Verify** — build passes; `/#/business` shows plain dark page (warm bloom only), two pillars with live modules, no veins/leaf, Book a call at the end.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: Business page simplified — modules kept, atmosphere retired"
```

---

### Task 7: CSS retirement sweep + responsive fixes

**Files:**
- Modify: `src/index.css`
- Delete: `src/assets/leaf-bg-1456.webp`, `public/leaf-bg*.{jpg,webp}` (no longer referenced)

- [ ] **Step 1: Delete now-unused CSS blocks** (verify each selector has no remaining JSX reference first with `grep -rn "<name>" src/`): `.cosmos-bg`, `.stars`, `.orbit-*`, `.node-dot/.node-label/.node-hint`, `.category-card`, `.card-close`, `.pp-spine*`, `.pp-cue*`, `.pp-section/.pp-prompt/.pp-instruction/.pp-pulse` (Business keeps prompt+instruction — KEEP those three), `.pp-rows/.pp-row*`, `.pp-dim/.pp-support/.pp-close*` (Personal no longer renders them), `.bz-veins/.bz-vein-*`, `.bz-leaf`, `.grid-bg*`, `.bz-pillar.is-rest`, `.bz-ops.is-live/.bz-team.is-live` rules, `.home-quiet-nav`, `.home-instruction*`, `.home-footnote`, `.screen-caption` keep (still in stage), `.mh-actions/.mh-action/.mh-quiet/.mh-tagline/.mh-bottom` (MobileHome no longer renders them), keyframes `sn-vein-flow`, `sn-spine-run`, `sn-cue-*`, `sn-twinkle`, `sn-drift`, `sn-stream-*`.
- [ ] **Step 2: Update the three responsive blocks** (≤880px, 881–1024px, portrait-aspect): remove references to deleted classes (`.orbit-cell`, `.pp-spine`, `.mh-actions`, `.mh-tagline`, `.home-instruction`, `.home-footnote`, `.biz-columns::before` vein), keep the `.stage-viewport` ↔ `.mobile-home` switching intact.
- [ ] **Step 3: Verify** — `npm run build` passes; run `grep -c "orbit-\|cosmos\|bz-vein\|pp-spine\|leaf-bg" dist/assets/*.css dist/assets/*.js` → 0; click through all four routes at 1440px and 375px in preview; no visual gaps or unstyled elements.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: retire orbit/cosmos/leaf/vein styles and dead assets"
```

---

### Task 8: Full verification + deploy

- [ ] **Step 1:** `npm run build` → 0.
- [ ] **Step 2:** Preview checks — Desktop 1440×860: hero band (screens seated + boot), all six home sections, nav, footer. Mobile 375×812: poster hero with overlay CTA, stacked sections, tap targets ≥44px. `/#/personal`, `/#/business`, `/#/build` all render with Book a call.
- [ ] **Step 3:** Confirm every `cta-button`/`topnav-cta` href = `https://calendly.com/mlamarfinley/30min` via DOM query.
- [ ] **Step 4:** Deploy: `rm -rf docs && cp -r dist docs && git add -A && git commit -m "release: simplified site" && git push`. Then curl the live bundle for `calendly.com` (≥1 hit) and the homepage HTML for HTTP 200.
