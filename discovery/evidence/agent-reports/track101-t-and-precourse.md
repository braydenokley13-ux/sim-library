# Discovery report — track101-t-and-precourse

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

Good, that's sufficient. Now compiling the final structured report.

# BOW Sports Capital — Repo Investigation Report

All 5 assigned repos read directly from `/workspace/acct/*` (local git clones). No GitHub API used.

---

## REPO 1: `T101-M1-L1`

**What it is:** A single self-contained `index.html` (~75KB) browser game, "Front Office: Build the Roster," plus a companion `plan.md` spec and an interactive `.xlsx` workbook. No build step, framework-free JS.

- **Student-facing simulations: 2 distinct**
  1. The HTML/JS game (primary)
  2. `Copy of Be The GM(Salary Cap)-101M1L1.xlsx` — a real interactive spreadsheet sim (not static): contains live formulas (`SUMIF`, `COUNTIF`, nested `IF`) that sum checked players' salaries against a cap and reveal `"Claim Code: L1-101-M1-67"` — the **exact same claim code** as the HTML game's "Win Now" style. This is a paper/Sheets-native parallel version of the same lesson, using generic placeholder players ("⭐ Star Player A/B", "Role Player C–H") rather than the HTML game's real NBA names.
- **Tech stack:** vanilla HTML/CSS/JS, Google Fonts (Bebas Neue/Poppins), `localStorage` (try/catch-wrapped), in-browser self-tests via `?selftest=1` query param.
- **Deployment evidence:** none found (no CI, no vercel/netlify config); `plan.md` says "Open `index.html` in any modern browser."
- **Duplicate suspicion:** Shares its exact 4-metric architecture (`cash/wins/chemistry/clout`), claim-code pattern, curveball-event pattern, and `buildCompletionResult()`/`window.BowSportsCapital` manifest shape with `T101-M1-L2` — strongly suggests a shared internal template reused lesson-to-lesson (not accidental duplication, but a repeated pattern).

### Simulation: `front-office-build-the-roster`
- **canonicalTitle:** "Front Office: Build the Roster" (`<title>` tag; also `SIMULATION.title`)
- **path:** `index.html` (root)
- **whatStudentsDo:** Student picks a GM name (optional) and one of 3 "GM Styles" (Win Now $140M / Balanced Builder $130M / Smart Spender $115M), then drafts from a 16-player pool (Superstars/Starters/Role Players/Bench) tapping cards to sign/release. Four live meters (Cash, Wins, Chemistry, Clout) update per pick. Once locked in, one random "Owner's Curveball" fires (budget cut, fan-pressure clout target, depth demand, or wins target) forcing adjustment. Student submits, gets a 0–100 GM Score and rank, picks a strategy-type chip, writes an optional 1–2 sentence memo, and reveals a claim code. One round of drafting + one pressure event; not multi-round.
- **pillar:** economics (with a financial-literacy budgeting flavor — salary cap/spending trade-offs)
- **conceptTerms (verbatim):** "Salary Cap Challenge", "Cap (M)", "budget", "Projected Wins", "Chemistry", "Clout", "Minimum Contract", "over budget"
- **gradeBandEvidence:** `plan.md` line 3: "A single-file (`index.html`), framework-free sports-business simulation for 5th–6th graders." (also repo name convention T101 = Grades 5–6)
- **purpose:** PRACTICE (applies a single cap-budgeting decision loop; not an intro lecture, not a capstone)
- **delivery:** individual, self-guided (no login, no team join code)
- **durationEvidence:** UNKNOWN (plan.md gives no time estimate)
- **facilitation:** `plan.md` exists as a dev/spec document (not a teacher-facing guide); no separate facilitator guide found. Quote: "## The student experience (8-step flow)" — this reads as build documentation, not classroom facilitation notes.
- **evidenceOutput:** `buildCompletionResult()` builds a result object {metrics, score, rank, strategyType, memo, claimCode, timestamp} logged to console and exposed at `window.BowSportsCapital.getResult()`; no server call — local only. `localStorage` autosaves in-progress roster.
- **studentDataProfile:** no login, no class code; optional free-text GM name and memo; `localStorage` only; no third-party APIs.
- **maturitySignal:** Polished — in-code self-tests (`runSelfTests()`, 6 named test groups, ~15 assertions) runnable via `?selftest=1`; try/catch around storage; text-escaping noted in plan.md; no TODOs found.
- **simulationPattern:** Draft-under-budget resource allocation with a single mid-game shock event and a weighted multi-metric composite score.
- **confidence:** VERIFIED
- **evidence:** `/workspace/acct/T101-M1-L1/index.html` lines 628-635 (`SIMULATION` manifest), 667-677 (`STYLES`), 729-746 (`CURVEBALLS`), 775-807 (`computeMetrics`), 815-845 (`gradeTeam`), 1269-1287 (`buildCompletionResult`); `/workspace/acct/T101-M1-L1/plan.md` (full doc).

### Spreadsheet sim: `t101-m1-l1-cap-sheet-xlsx`
- **canonicalTitle:** "🏀 Be the GM — Salary Cap Challenge (Track 101 · Lesson 1 · Module 1)" (from cell text in `sharedStrings.xml`)
- **path:** `Copy of Be The GM(Salary Cap)-101M1L1.xlsx`
- **whatStudentsDo:** Check boxes ("Include?") next to 8 players with salaries to build a roster under a stated cap ("stay under $136M... must have 8+ players"); formulas compute total spend, a YES/NO cap-legality check, and reveal a claim code string when conditions are met.
- **pillar:** economics
- **conceptTerms:** "Cap (M)", "Salary(M)", "Minimum Contract", "Total(M)", "Status"
- **gradeBandEvidence:** "Track 101 · Lesson 1 · Module 1" (cell text) — TRACK-CONVENTION
- **purpose:** PRACTICE (companion/backup worksheet version of the same cap-fitting exercise)
- **delivery:** individual/self-guided
- **durationEvidence:** UNKNOWN
- **facilitation:** none found
- **evidenceOutput:** in-sheet claim code reveal formula only; no export
- **studentDataProfile:** local spreadsheet file; no accounts
- **maturitySignal:** functional formulas present but generic placeholder player names; filename literally "Copy of..." suggesting a duplicated/derivative file
- **simulationPattern:** checkbox-driven budget-fit calculator with pass/fail gate
- **confidence:** VERIFIED (formulas and claim code confirmed by direct inspection)
- **evidence:** `xl/sharedStrings.xml` and `xl/worksheets/sheet1.xml` formulas including `IF(B15="YES","Claim Code: L1-101-M1-67","")`.

---

## REPO 2: `T101-M1-L2`

**What it is:** A well-architected multi-file static site — "Trade Deadline War Room" — split into `src/simulation.js` (pure logic), `src/data.js` (content), `src/app.js` (DOM controller), plus `styles/tokens.css` + `styles/main.css`, a `tests/` unit-test suite, a `QA-CHECKLIST.md`, and a 5MB companion `Luxury Tax Basics Simulation-2.pptx`.

- **Student-facing simulations: 2 distinct**
  1. The HTML/JS/CSS app
  2. The `.pptx` — inspected via raw XML and confirmed to be a genuine **branching PowerPoint simulation** (not a static slide deck): slide-to-slide hyperlinks (e.g. `slide10.xml.rels` links to `slide29.xml`, `slide19.xml`, `slide12.xml`), scenario slides with clickable choices ("Choose your next move: Cut Salary / Add Depth / Coach Boost / PR Hype"), live payroll/tax/wins readouts per slide, and a final "Claim Code: CLAIM-C47WIN" on the victory ending. No facilitator notes found in any `notesSlideN.xml` (checked — empty).
- **Tech stack:** vanilla JS/CSS (no framework), BOW design-token CSS system (`styles/tokens.css`), Node-runnable unit tests (no test framework, plain `assert`).
- **Deployment evidence:** QA-CHECKLIST.md: "It works by opening `index.html` directly in a browser... no server, no network call, and no build step." No CI config found.
- **Duplicate suspicion:** Same 4-metric/claim-code/curveball architecture family as `T101-M1-L1` (shared internal template, see above). The `.pptx` and the HTML app cover the exact same "luxury tax" topic in parallel media — likely a deliberate dual-delivery (in-class slides vs. self-guided web) rather than accidental duplication, but functionally overlapping content.

### Simulation: `t101-m1-l2-trade-deadline-war-room`
- **canonicalTitle:** "Trade Deadline War Room" (`<title>Trade Deadline War Room · BOW Sports Capital</title>`)
- **path:** `index.html` + `src/simulation.js`, `src/data.js`, `src/app.js`
- **whatStudentsDo:** Runs one of 3 NBA franchises (Lakers/Bucks/Spurs, each with a "cornerstone star") through a 12-screen flow: cold open → brief → intel (4 readable source files) → Decision Round 1 (pick 1 of several trades, live scoreboard updates) → Reveal 1 (animated meter deltas + tax-line crossing note) → ownership Pressure moment (raises one metric's weight ×2) → Decision Round 2 (3 closing moves) → Reveal 2 (buzzer) → Front Page (generated headline, GM score, "defend your move" memo) → Debrief → Economics explainer. Manages 4 metrics: Cap Space, Wins, Chemistry, Buzz, with a hard "Luxury Tax Line" at 40.
- **pillar:** economics
- **conceptTerms (verbatim):** "salary cap", "luxury tax", "Cap Space", "Luxury Tax Line", "tax", "Buzz", "Chemistry"
- **gradeBandEvidence:** `QA-CHECKLIST.md` line 3: "BOW Sports Capital · Track 101 · Module 1 · Lesson 2 / Audience: 5th–6th grade. Topic: NBA salary cap & luxury tax."
- **purpose:** PRACTICE (single concept, two-round applied decision loop)
- **delivery:** individual, self-guided
- **durationEvidence:** QA-CHECKLIST.md: "Acceptable for a ~5-minute activity."
- **facilitation:** `QA-CHECKLIST.md` is a developer/QA doc, not a teacher-facing facilitator guide, but it is detailed and screen-by-screen.
- **evidenceOutput:** `window.BSC_LAST_RESULT` completion object, described in QA-CHECKLIST as "local-only... not yet wired to any external platform." `localStorage` autosave each screen transition (with Resume banner).
- **studentDataProfile:** optional GM name (truncated to 40 chars), optional memo (truncated to 600 chars); `localStorage` only; no accounts.
- **maturitySignal:** High polish — `tests/simulation.test.js` runs 28 named unit tests, **verified passing** (ran `node tests/simulation.test.js` → "28 tests passed. All tests passed."); `prefers-reduced-motion` support; ARIA attributes present; detailed manual QA checklist covering edge cases (rapid clicks, blocked localStorage, long names).
- **simulationPattern:** Two-round trade/negotiation decision tree with a mid-game ownership-priority pivot and a live threshold (tax line) crossing mechanic.
- **confidence:** VERIFIED
- **evidence:** `/workspace/acct/T101-M1-L2/src/simulation.js` lines 1-43 (header comment, METRIC_LABELS, TAX_LINE); `/workspace/acct/T101-M1-L2/QA-CHECKLIST.md` (full); test run output (28/28 passing).

### PPTX branching sim: `t101-m1-l2-luxury-tax-basics-pptx`
- **canonicalTitle:** "Luxury Tax Basics Simulation" (slide 1 text: "Luxury Tax Basics Simulation", "Track 101 -M1L2", "Bow Sports Capital")
- **path:** `Luxury Tax Basics Simulation-2.pptx`
- **whatStudentsDo:** Starting from "Initial Decision Point" (Cap $136M, Budget Limit $150M, Payroll $134M, Wins 40, target "Reach at least 46 Wins without spending more than $150M total"), student clicks one of several labeled choices per slide (e.g. "Sign Star Player," "Add Depth," "Cut Salary," "Coach Boost," "PR Hype"); each click hyperlinks to a different scenario slide with updated Cap/Payroll/Over/Tax/Wins figures. Confirmed 29 slides total, with at least one "Victory" ending revealing a claim code.
- **pillar:** economics
- **conceptTerms:** "Cap", "Budget Limit", "Payroll", "Over", "Tax", "dollar-for-dollar tax"
- **gradeBandEvidence:** "Track 101 -M1L2" (slide 1) — TRACK-CONVENTION
- **purpose:** PRACTICE (parallel/alternate-medium version of the same web sim's topic)
- **delivery:** individual or facilitator-led (PPTX can be run by a teacher on a projector with student input, or self-clicked)
- **durationEvidence:** UNKNOWN
- **facilitation:** Notes slides checked (`notesSlides/notesSlide1.xml` etc.) — empty; no facilitator guide found in the deck.
- **evidenceOutput:** in-slide claim code text only (e.g. "Claim Code: CLAIM-C47WIN"); no digital export.
- **studentDataProfile:** N/A (offline file, no data capture)
- **maturitySignal:** Functional branching structure confirmed via slide relationship XML; no test/QA process evident (this is a content file, not code).
- **simulationPattern:** Choose-your-own-adventure branching slide deck with running numeric state (payroll/tax/wins) carried in slide text.
- **confidence:** INFERRED for full branch-graph completeness (only spot-checked ~6 of 29 slides + relationship files); VERIFIED that branching hyperlinks and scenario/claim-code mechanics exist.
- **evidence:** `ppt/slides/slide1.xml`, `slide2.xml`, `slide3.xml`, `slide29.xml` text extracts; `ppt/slides/_rels/slide10.xml.rels` (internal slide-to-slide relationships).

---

## REPO 3: `T101-M2-L1`

**What it is:** A single `index.html` (~10KB) that loads CSS/JS from a subfolder confusingly named `mlb-redesign-game/` even though the current content is a basketball ("Bow City Hoopers") ticket-pricing/sponsorship case study. No package manifest, no tests, no facilitator doc.

- **Student-facing simulations: 1**
- **Tech stack:** vanilla HTML/CSS/JS, Google Fonts, no `localStorage`, no persistence of any kind.
- **Deployment evidence:** none found.
- **Duplicate suspicion — high:** `mlb-redesign-game/css/style.css` opens with the comment block:
  > `/* MLB MONEY MAKER - OVERHAULED UI / Premium Sports Negotiation Experience */`
  
  This is leftover styling/scaffolding from an unrelated, presumably-earlier "MLB Money Maker" negotiation game that has been reskinned/repurposed for this basketball attendance-and-sponsorship case study. The folder name itself (`mlb-redesign-game`) is a strong tell that this repo began life as a copy of a different sim and was redirected, rather than built fresh for T101-M2-L1's actual content.

### Simulation: `t101-m2-l1-front-office-the-homestand`
- **canonicalTitle:** "BOW Sports Capital Presents — Front Office: The Homestand" (`<title>` tag)
- **path:** `index.html` + `mlb-redesign-game/js/front-office.js`, `mlb-redesign-game/css/*.css`
- **whatStudentsDo:** Plays "President" of the fictional Bow City Hoopers across a fixed, deterministic 3-round choose-your-own-adventure ("no randomness: every outcome comes from fixed business logic" — code comment). Reads a starting situation panel (attendance 71%, avg ticket $38, fan satisfaction 6/10, sponsor interest high, budget "tight"), then makes exactly 3 decisions: Round 1 fan strategy (lower prices / giveaway night / experience upgrade), Round 2 sponsor strategy (big national sponsor / trusted local partner / youth night), Round 3 ownership pitch (fan-first / revenue-first / balanced plan). Each choice applies named deltas to 4 metrics (Fan Energy, Budget, Revenue, Trust) with a "recap" screen of consequences after each round, plus a synergy note connecting Round 1 and Round 2 choices, and a final recap naming a strategy and "what ownership would ask next."
- **pillar:** economics (with light cross-pillar business-tradeoff framing)
- **conceptTerms (verbatim):** "Attendance," "Ticket Price," "Fan Satisfaction," "Sponsor Interest," "Budget Room," "Fan Energy," "Revenue," "Trust"
- **gradeBandEvidence:** TRACK-CONVENTION only (repo name T101-M2-L1 = Track 101, Module 2, Lesson 1); no explicit grade text found in code or comments.
- **purpose:** PRACTICE (single-pass applied decision case, no intro/teach screens beyond the briefing)
- **delivery:** individual, self-guided (no login, no persistence at all — refreshing loses all progress)
- **durationEvidence:** `index.html`: "About a 60-minute case." (case-footnote text on the briefing screen)
- **facilitation:** none found — no plan.md, no QA checklist, no teacher notes in this repo.
- **evidenceOutput:** none — no `localStorage`, no claim code, no completion object, no console export of any kind found in `front-office.js`.
- **studentDataProfile:** no data capture whatsoever; purely in-memory JS state (`var state = { metrics, picks }`), lost on refresh.
- **maturitySignal:** Functionally complete but noticeably less mature than the two Module 1 lessons — no tests, no self-tests, no persistence, no claim code/evidence mechanism, and visible copy-paste residue from an unrelated MLB negotiation game in the CSS.
- **simulationPattern:** Fixed 3-round choose-your-own-adventure with deterministic (non-random) deltas to 4 business metrics and a synergy callback between rounds.
- **confidence:** VERIFIED
- **evidence:** `/workspace/acct/T101-M2-L1/index.html` (all 8 screens); `/workspace/acct/T101-M2-L1/mlb-redesign-game/js/front-office.js` lines 1-5 ("deterministic choose-your-own-adventure. No randomness"), 9-22 (METRICS/START), 39-205 (ROUNDS); `/workspace/acct/T101-M2-L1/mlb-redesign-game/css/style.css` lines 1-3 ("MLB MONEY MAKER - OVERHAULED UI").

---

## REPO 4: `101-pre-course`

**What it is:** A full-stack Next.js 14 app — "BOW Sports Capital Zoom Game" — a teacher-hosted, team-based synchronous classroom game (designed to be run live over Zoom). File-based JSON store (`data/store.json`), REST API routes, teacher dashboard with CSV/txt exports.

- **Student-facing simulations: 1**
- **Tech stack:** Next.js 14.2.5, React 18.3.1, TypeScript, no database (flat-file `DataStore` via `lib/store.ts`, `BOW_STORE_MODE=memory` fallback), a shell-driven smoke test (`scripts/run-smoke.sh` / `scripts/smoke.mjs`).
- **Deployment evidence:** README: "For large production usage on Vercel, swap storage to a managed database... On Vercel, default file storage path is `/tmp/bow-sports-capital-store.json`." This reads as an early/prototype deployment posture (file storage acknowledged as non-production-durable).
- **Duplicate suspicion — very high, superseded by `BSC-pre-course`:** Both repos are "BOW Sports Capital [Zoom Game / Pre-Course]," both use identical route names (`/join`, `/lobby`, `/play`, `/catalog`, `/complete`, `/teacher`), identical core data model (Session/Team/Student/Vote/MissionProgress/CatalogAttempt/FinalSubmission), and — critically — the **exact same 8 mission IDs in the exact same order**: `cap-crunch, contract-choice, revenue-mix, expense-pressure, stats-lineup, matchup-adjust, draft-table, final-gm-call` (confirmed identical in `101-pre-course/lib/constants.ts` MISSIONS array and `BSC-pre-course/lib/missionGraph.ts` MISSION_ORDER). `BSC-pre-course` expands each mission from a ~20-line 2-choice object here into hundreds of lines with 4 asymmetric student roles, private info per role, multi-round branching, and a real Postgres/Prisma backend with bcrypt teacher auth. This strongly indicates `101-pre-course` is an earlier, simpler prototype that `BSC-pre-course` supersedes/evolves.

### Simulation: `101-pre-course-zoom-discovery-game`
- **canonicalTitle:** "BOW Sports Capital Zoom Game" (README title / `app/layout.tsx` title); students see missions under generic session titles like "BOW Sports Capital Zoom Intro."
- **path:** `app/*` (Next.js routes), core logic in `lib/game.ts`, content in `lib/constants.ts`
- **whatStudentsDo:** Teacher creates a session (2–12 teams) at `/teacher`, gets per-team join codes. Students join at `/join` with sessionId + team code + nickname, wait in `/lobby`, then play 8 sequential missions at `/play` (Cap Crunch → Contract Choice → Revenue Mix → Expense Pressure → Stats Lineup → Matchup Adjust → Draft Table → Final GM Call). Each mission presents 2 options; **all active team members must vote** on an option (majority resolves the team's move; a tie triggers one tie-break re-vote round); team state (`budget, cash, fans, wins, rosterSlots, draftPicks, sideQuestPoints`) updates from the winning option's effects, and a running numeric `score` accrues. 4 of the 8 missions "unlock" a concept-check gate (Caps & Contracts, Money in Motion, Analytics, Draft Strategy) that every team member must individually pass (2/2 questions correct) before the team can proceed. On finishing all missions + all badges, the team gets a generated claim code to submit at `/complete`.
- **pillar:** cross-pillar (economics concepts — salary cap, revenue/expense flow, draft trade-offs — delivered as team business decisions; light financial-literacy framing via "money in motion")
- **conceptTerms (verbatim):** "Caps and contracts," "Money in motion / league as a business," "Analytics," "Draft strategy," "salary cap," "cap budget," "cap room," "revenue," "payroll," "sponsor deal," "flexibility" — plus mission-level terms "Cap Crunch," "Contract Choice," "Revenue Mix," "Expense Pressure"
- **gradeBandEvidence:** UNKNOWN in this repo's own text (no explicit grade found); TRACK-CONVENTION via repo name `101-pre-course`.
- **purpose:** INTRODUCE (README frames it as a discovery/intro Zoom activity: "students in teams discover: Caps and contracts, Money in motion...")
- **delivery:** teams, facilitator-led (explicitly built for live Zoom sessions with a teacher dashboard)
- **durationEvidence:** UNKNOWN (no time stated); code has `STUCK_TEAM_WINDOW_MS = 3 * 60 * 1000` (3-minute stuck-team flag) and `ACTIVE_STUDENT_WINDOW_MS = 8 * 60 * 1000`, which imply a fast-paced session but aren't a stated total duration.
- **facilitation:** README's "Teacher Flow" (10 numbered steps: create session → share codes → watch dashboard → track submissions → export CSV → export vote log → export reteach report → archive → delete). This is real facilitator documentation, not just dev notes.
- **evidenceOutput:** Rich — per-vote records, per-mission progress with resulting team state, concept-check attempts with pass/fail + misconception tags, final claim-code submissions; teacher can export team/student CSV, a vote-log CSV, and a `.txt` "reteach report" (concept difficulty, top misconceptions, per-team stuck flags).
- **studentDataProfile:** nickname only (free text, normalized/deduped per team), joins via session ID + team join code (no account/login); server-side JSON file store; no third-party APIs; `teacherKey` (plain random string, not hashed) gates teacher endpoints.
- **maturitySignal:** Functional and thoughtfully instrumented (misconception tagging, stuck-team detection, CSV/report exports) but architecturally simple — flat-file storage, unhashed teacher key, a shell-based smoke test rather than a real test suite. `.eslintrc.json` present but minimal (42 bytes).
- **simulationPattern:** Synchronous team-vote mission chain with concept-check knowledge gates between missions and a teacher-facing live analytics dashboard.
- **confidence:** VERIFIED
- **evidence:** `/workspace/acct/101-pre-course/README.md` (full); `/workspace/acct/101-pre-course/lib/constants.ts` lines 25-230 (MISSIONS, CONCEPT_CATALOG); `/workspace/acct/101-pre-course/lib/game.ts` lines 385-448 (`recordVote`), 450-567 (`resolveMission`), 762-1017 (`getTeacherFeed`, `exportTeacherReteachReport`).

---

## REPO 5: `BSC-pre-course`

**What it is:** A much larger, production-oriented Next.js 14 app (Prisma + PostgreSQL, bcrypt teacher auth, iron-session, framer-motion) titled "BOW Sports Capital: Pre-Course" — the evolved successor to `101-pre-course`'s mission-vote game — PLUS an entirely separate, undocumented single-player static game (`index.html` + `game.js` [3,586 lines] + `styles.css`) at the repo root that the README never mentions.

- **Student-facing simulations: 2 distinct**
  1. The Next.js multiplayer team mission game (evolved from `101-pre-course`)
  2. The standalone `game.js`/`index.html`/`styles.css` single-player "Pregame" cap-sheet season simulator
- **Tech stack:** Next.js 14, React 18, TypeScript, Prisma 5.16 + PostgreSQL, `bcryptjs`, `iron-session`, `framer-motion`, `nanoid`; separately, the root game is plain vanilla JS/CSS with no dependencies.
- **Deployment evidence:** README gives explicit, detailed Vercel + Neon deploy steps including build command `prisma generate && prisma db push && next build`, an `/api/health` check step, and a `npm run check:prod` "Production Preflight" script that validates env vars, confirms the DB URL is Postgres (not sqlite), and checks password/pepper strength. This is real, mature deployment documentation — clearly more production-ready than `101-pre-course`.
- **Duplicate suspicion — very high (direct successor relationship):**
  - The Next.js app's `lib/missionGraph.ts` `MISSION_ORDER` is byte-identical in ID sequence to `101-pre-course`'s `lib/constants.ts` MISSIONS list (`cap-crunch, contract-choice, revenue-mix, expense-pressure, stats-lineup, matchup-adjust, draft-table, final-gm-call`), with content expanded roughly 20x (each mission now has 4 named private roles, staged info-card reveals, and hundreds of lines of scenario/outcome text).
  - The Prisma `Session` model defaults `track String @default("201")`, and `app/teacher/setup/page.tsx` explicitly offers a **Curriculum Track selector** with the two buttons: "Track 201 — High School / Advanced" and "Track 101 — 5th–6th Grade," with helper text "Full detail - cap terms and multi-step choices" (201) vs. "Simple language, daily examples, grade 6 reading level" (101). `lib/track101Content.ts` header states: "Track 101 is designed for 5th–6th grade students... Target reading level: Flesch-Kincaid Grade 6" and documents specific simplifications (e.g. "salary cap" → "team spending limit"). **This repo's default/underlying mission content is written at the Track 201 (high-school/advanced) level, with Track 101 as a simplification overlay** — i.e., despite the repo name pattern, this single app spans two tracks by design.
  - The root `game.js`/`index.html`/`styles.css` trio is completely unreferenced by the README (which documents only the Next.js app) and unreferenced by the Next.js `app/` code — it appears to be an orphaned or intentionally-separate single-player companion, not integrated with the multiplayer product at all.

### Simulation A: `bsc-pre-course-front-office-multiplayer`
- **canonicalTitle:** "BOW Sports Capital: Pre-Course" (README title); UI shows mission titles like "Cap Crunch"
- **path:** `app/*`, `lib/missions.ts`, `lib/missionGraph.ts`, `lib/track101Content.ts`, `prisma/schema.prisma`
- **whatStudentsDo:** Teacher creates a session at `/teacher/setup`, choosing Track 101 or 201 and team count. Students join with a code, get assigned an avatar/team color, and navigate an "HQ floor map" (`/hq`) of front-office "rooms" (Salary Cap Dept's "Cap Room," etc.) tied to the 8 missions. Within each mission, up to 4 team members are assigned asymmetric roles (e.g. Capologist, Team President, Head Scout, Marketing Director) each holding private info cards revealed on a timer; the team votes across multiple rounds per mission (not just one binary choice) with tag-driven consequence mutations, rival-team "counter" events, and status effects that carry forward and inject new scenario text into later missions (e.g. repeater-tax risk from Mission 1 echoes into later missions). Concept-check "adaptive bank" quizzes gate progress; recovery codes let students rejoin if disconnected; final claim code submitted at `/complete`.
- **pillar:** cross-pillar (deep economics content — salary cap, luxury tax, Bird Rights, BRI, escrow — bundled with cross-functional business-role decision-making)
- **conceptTerms (verbatim, Track 201 default content):** "luxury tax line," "repeater," "Second Apron," "Bird Rights," "Mid-Level Exception (MLE)," "Bi-Annual Exception (BAE)," "Dead Cap / Dead Money," "Cap Hold," "BRI (Basketball Related Income)," "Escrow," "rookie scale," "trade matching"; Track 101 override layer swaps in: "team spending limit," "extra fee," "high-spending penalty zone."
- **gradeBandEvidence:** Direct quote, `lib/track101Content.ts` line 4: "Track 101 is designed for 5th–6th grade students." Direct quote, `app/teacher/setup/page.tsx`: "Track 201 ... High School / Advanced" vs "Track 101 ... 5th–6th Grade." (VERIFIED for both bands, in the same file.)
- **purpose:** APPLY / SYNTHESIZE (multi-role deliberation across chained missions with carried-forward consequences goes well beyond single-decision practice — reads as a capstone-style applied exercise, more so at Track 201 default depth)
- **delivery:** teams, facilitator-led (teacher dashboard, live session monitoring, alerts, analytics)
- **durationEvidence:** UNKNOWN (no stated duration found)
- **facilitation:** README section "5) Project Structure" plus a 10-step local setup and a distinct "Exact Deploy Steps" section function as operator/facilitator documentation; teacher-side pages (`/teacher/dashboard`, `/teacher/history`, `/teacher/setup`) with alerts, analytics, action logs, and force-resolve/reset controls indicate a facilitator-in-the-loop design, though no plain-language pedagogical facilitator guide (lesson-plan style) was found.
- **evidenceOutput:** Extensive — `app/api/teacher/export`, `/api/teacher/sessions/[sessionId]/export`, `/api/teacher/analytics`, `/api/teacher/alerts`, `/api/teacher/actions/recent`; Prisma persists Session/Team/Student/Vote/MissionProgress/CatalogAttempt/AdaptiveAssessment/FinalSubmission/AdminActionLog/TeamEvent — durable database storage, not just local/console output.
- **studentDataProfile:** nickname + avatarId, a per-student `token` and `recoveryCodeHash` (hashed recovery code) for reconnecting — no email/real-name fields seen in `prisma/schema.prisma` `Student` model; teacher auth uses bcrypt-hashed `teacherKeyHash` + `iron-session`; Postgres-backed (not local-only); no third-party API integration found.
- **maturitySignal:** High — content-quality tooling exists as real npm scripts: `check:glossary`, `check:readability`, `check:adaptive:coverage`, `check:adaptive:balance`, `check:adaptive:readability`, `check:adaptive:duplicates`, plus `check:prod` preflight and a `teacher:hash` utility. This is meaningfully more mature tooling than either `101-pre-course` or the T101 lesson repos.
- **simulationPattern:** Multi-round, multi-role (asymmetric information) team deliberation chained across 8 story missions with persistent status effects and a dual-track (grade-band) content layer.
- **confidence:** VERIFIED
- **evidence:** `/workspace/acct/BSC-pre-course/README.md`; `/workspace/acct/BSC-pre-course/lib/track101Content.ts` lines 1-11; `/workspace/acct/BSC-pre-course/app/teacher/setup/page.tsx` lines 190-220; `/workspace/acct/BSC-pre-course/lib/missionGraph.ts` lines 1-10; `/workspace/acct/BSC-pre-course/lib/missions.ts` lines 85-156 (Cap Crunch mission with roles/info cards); `/workspace/acct/BSC-pre-course/prisma/schema.prisma` (Session/Team/Student models).

### Simulation B: `bsc-pregame-standalone`
- **canonicalTitle:** "BOW Sports Capital: Pregame" (`<title>` tag, `index.html` line 6); tagline "Cap & Contracts — Front Office Simulator"
- **path:** `index.html`, `game.js`, `styles.css` (repo root — separate from the Next.js `app/`)
- **whatStudentsDo:** Single-player, picks a fictional NBA-style team, then runs a fixed 12-week season (`CONFIG.totalWeeks = 12`) as front-office president, managing Cap Space ($M), Team Rating, Franchise Value ($B), and Owner Patience via major weekly decision events (60+ scripted events per code header comment) plus periodic minor decisions, a Trade Deadline week, and a Week-12 Finale/draft. A running glossary panel defines real NBA CBA terms (Salary Cap $141M, Luxury Tax Line $171M, Second Apron $178M, Bird Rights, MLE, BAE, Dead Cap, Cap Hold, BRI, Escrow) as they become relevant. If Owner Patience hits zero, the player is fired (implied game-over condition). Best score (franchise value) is tracked locally across replays.
- **pillar:** economics (very deep salary-cap/CBA mechanics; not financial-literacy per se, more like applied managerial economics)
- **conceptTerms (verbatim):** "Salary Cap," "Soft Cap vs Hard Cap," "Luxury Tax Line," "Second Apron," "Dead Cap / Dead Money," "Cap Hold," "BRI (Basketball Related Income)," "Escrow," "Bird Rights," "Mid-Level Exception (MLE)," "Bi-Annual Exception (BAE)"
- **gradeBandEvidence:** UNKNOWN in this file specifically — no grade text found in `index.html`/`game.js`; given the CBA-term density (escrow, BRI, second apron, repeater tax) this reads far above a 5th–6th-grade level, but no explicit grade band is stated anywhere in this file, so UNKNOWN rather than inferring Track 201/301.
- **purpose:** EXPLORE (open-ended season-long sandbox with a glossary reference layer, framed as a "simulator" rather than a single lesson exercise)
- **delivery:** individual, self-guided
- **durationEvidence:** UNKNOWN (a 12-week/60-event season implies a longer play session than the lesson-length sims, but no stated duration was found)
- **facilitation:** none found — not mentioned in README at all; no accompanying guide.
- **evidenceOutput:** `localStorage` only: `bestScore`, `lastRun`, `tutorialSeen`, `bscSettings`, `bscConceptsSeen` keys (confirmed in code) — no server/API call, no CSV export, no claim code mechanism found.
- **studentDataProfile:** no login, no session/class code; browser `localStorage` only; no third-party APIs.
- **maturitySignal:** A `Polish Checklist` TODO block sits at the very top of `game.js` (unresolved checkboxes): "Animations feel smooth...", "Responsive checks...", "localStorage tests...", "Event variety check: 60+ unique major events" — i.e., the file's own header documents itself as **not fully verified/polished**, an explicit maturity signal of incompleteness.
- **simulationPattern:** Long-horizon (12-week) single-player season sim with a large scripted event bank, an in-game glossary/reference system, and a lose condition (owner patience depletion).
- **confidence:** VERIFIED for mechanics/structure; the "60+ unique major events" count is a self-reported code comment, not independently tallied — treat that specific number as INFERRED.
- **evidence:** `/workspace/acct/BSC-pre-course/index.html` lines 1-60; `/workspace/acct/BSC-pre-course/game.js` lines 1-24 (Polish Checklist, CONFIG, STORAGE), lines 60-95+ (GLOSSARY_TERMS), lines 2000-2210 (`renderWeek12Finale`, `finalizeWeekAndAdvance`, `applyWeeklyDriftAndSystems`), lines 2425-2437 (`localStorage.setItem(STORAGE.lastRun, ...)`, bestScore comparison).

---

## Cross-Repo Duplicate/Lineage Summary

| Relationship | Evidence |
|---|---|
| `T101-M1-L1` ↔ `T101-M1-L2` | Shared architecture template (4-metric object shape, claim-code pattern, curveball/pressure event, `buildCompletionResult()`), not content duplication — same lesson-building pattern reused. |
| `T101-M1-L1` HTML sim ↔ its own `.xlsx` | Same lesson, two media, **same claim code string** (`L1-101-M1-67`) confirmed by direct formula inspection. |
| `T101-M1-L2` HTML sim ↔ its own `.pptx` | Same lesson ("luxury tax basics"), two media (web app vs. branching PowerPoint), independently built, both end in a claim code. |
| `T101-M2-L1` | Contains leftover CSS/scaffolding literally commented "MLB MONEY MAKER" — evidence this repo began as a copy of an unrelated MLB negotiation game later repurposed for a basketball ticket-pricing case. |
| `101-pre-course` → `BSC-pre-course` (Simulation A) | Near-certain direct lineage: identical 8-mission-ID sequence, identical core route names and data-model shape; `BSC-pre-course` is a materially more mature/production rebuild (Postgres/Prisma, bcrypt auth, dual grade-track content, adaptive question bank, content-quality CI scripts) of the same product concept. |
| `BSC-pre-course` internal | Contains a second, wholly separate, undocumented single-player game (`game.js`) unconnected to and unmentioned by the Next.js app's own README — likely an orphaned prototype/companion rather than part of the same delivered product. |
