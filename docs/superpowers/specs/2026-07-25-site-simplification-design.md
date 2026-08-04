# Second Nature — Site Simplification Design
2026-07-25 · Approved direction: "Clear pitch, cinematic crown" (Approach A)

## Problem
The site is beautiful but opaque: the home page explains nothing before forcing a
Personal/Business choice, interiors are metaphor-heavy, and there is no visible CTA.
Research (Morningside AI, Lindy, current agency-site patterns) shows the converging
formula: offer stated in one hero sentence → proof → services in plain language →
process → CTA repeated. We adopt that skeleton while keeping the identity.

## Decisions (from Miles)
- Primary CTA: **Book a call** → https://calendly.com/mlamarfinley/30min (new tab)
- Structure: **one-page pitch home + simplified Personal/Business detail pages**
- Sacred: forest+monitors hero (compressed, with headline/CTA), live screen demos
- Retired: orbit interface, cosmos starfield, leaf background, vein SVG systems,
  data streams, implode cards, page-slide transitions, home quiet-nav/instruction layer
- USP: all four truths (fully custom · life+business one philosophy · calm human-first ·
  we run on our own systems). Slogan register: "We build AI systems that work with you."
  Dogfooding is a proof point, never the slogan.
- Proof layer: our own systems as the living case study. No invented client logos.

## Home (new) — seven beats
1. **Nav** (all pages): fixed thin bar. Wordmark → home; Personal · Business links;
   gold "Book a call" button. Scrim retained.
2. **Hero ~70vh**: compressed stage (cover, letterbox logic retained), boot sequence
   tightened (~1.2s total). Overlay bottom-left: eyebrow `SECOND NATURE · AI SYSTEMS`;
   H1 serif "We build AI systems that work with you."; sub: "Custom agents that carry
   your schedule, your follow-ups, your admin, and your operations, calmly, in the
   background, every day."; [Book a call] + quiet "See how it works ↓" anchor.
   Monitors stay clickable; desk captions stay.
3. **Reframe strip**: serif line "You don't need more apps. You need a system." +
   two sentences naming scattered tools / dropped balls.
4. **What we build**: two ruled columns (no boxes). For your life (planner, check-in
   calls, inbox triage, money reporting) → Explore personal. For your business (ops
   automation, AI support like an extra employee, client follow-up) → Explore business.
5. **How it works**: three steps — Map the friction → We build your system →
   It runs with you. One sentence each.
6. **Proof band "Running right now"**: two live screens (ops dashboard UI + personal
   daily-brief UI) self-running, with copy: "We're our own first client. The systems on
   this page run our own days — the morning check-in call, the task carry-over, the
   follow-ups." Honest, qualitative; no invented metrics beyond the existing
   illustrative-labeled ones.
7. **Why Second Nature**: four ruled rows for the four truths. Then close: serif
   "Technology that becomes second nature." + Book a call. Footer (existing).

## Personal page (simplified)
Keep pain-point H1 + lead. Then four systems as flat ruled sections: label, headline,
one-liner narrative, four features (existing copy, flattened from orbit cards).
End: Book a call. Background: quiet dark + warm bloom only. Mobile spine layout no
longer needed (page is already linear); keep type floors and tap targets.

## Business page (simplified)
Keep H1 "Your business runs on two things: systems and people." + leads (drop the
vein metaphor sentence in favor of the plain version). Two pillars as clean ruled
side-by-side columns (stack on mobile). KEEP live modules (KPI counters, workflow
rail, comm thread) as the demo layer, gold bezels intact. End: Book a call.

## Build page
Teaser retained; CTA becomes Book a call (Calendly), email link remains in footer.

## Global
- All CTAs → Calendly link, target _blank, rel noopener.
- Page transitions: simple 250ms fades (no slides).
- Accessibility/perf work from remediation retained (landmarks, skip link, WebP,
  contrast, footers). Home now scrolls: footer appears in flow at page end
  (home-footnote corner version retired).
- Type/color systems unchanged (Playfair/Space Grotesk/Schibsted/Martian Mono;
  gold-led accents).

## Testing / verification
- Desktop 1440 + laptop 1280: hero alignment (screens still seated), nav overlap,
  section rhythm.
- Mobile 375/390: poster hero variant keeps headline+CTA overlay (poster already
  has buttons — replace their labels/targets to match new IA: Book a call primary,
  Personal/Business secondary), sections stack cleanly, tap targets ≥44px.
- Calendly link opens correct event.
- Production build + deployed-bundle spot check (assets referenced via bundler).

## Out of scope
Real client case studies, the full intake experience (Miles building later),
logo vectorization.
