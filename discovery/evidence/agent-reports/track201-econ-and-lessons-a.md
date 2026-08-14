# Discovery report — track201-econ-and-lessons-a

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

# BOW Sports Capital — Repo Investigation Findings

All 8 repos live under `/workspace/acct/`, each a standalone git repo with origin `github.com/braydenokley13-ux/<name>`, single commit history (one "Create..." or one squashed PR-merge commit) — no CI workflows, no CNAME, no test files, no facilitator-guide/plan.md files found anywhere except one `V2_PLAN.md`.

---

## Repo-by-repo summary

### `201-M1-ECON`
One file: `apps script` (2211 lines, Google Apps Script, no HTML). Title: **"BOW BUSINESS STRATEGY SIMULATOR v5.0 — Online Candle Store: CandleCart.com"**. Sheet-driven, menu-operated 5-chapter sim + Final Completion check. One student-facing simulation. Tech: Google Apps Script + Spreadsheet UI (`onOpen`, custom menu, `ui.prompt`, `MailApp`/`GmailApp`). Deployment: none evident (no bound spreadsheet file in repo, no web app `doGet`). Duplicate suspicion: none — sole implementation.

### `201-M2-ECON`
`apps script` (Google Apps Script) + `index.html` (single-file browser game). **Both implement the identical narrative** — a young creative choosing between a startup job, a 6-month agency contract, or going independent/hiring a junior designer, across 5 chapters + 10-Q Final Check, same claim-code pattern. This is one simulation delivered twice in two tech stacks (spreadsheet MCQ engine vs. polished dark-themed browser game). Strong duplicate.

### `201-M3-ECON`
`apps script` (Google Apps Script, "MODULE 3 FINAL SIMULATION") + `index.html`/`js/*` (browser game "Bow Sports Empire"). Season titles in the Apps Script (`CHAPTER_NARRATIVES`) — "First Recruit," "Scaling Up," "Building the Machine," "Storm Season," "Championship Run" — **match verbatim** the season titles in `js/game-data.js`. Same narrative content, two tech implementations (spreadsheet MCQ vs. RPG-styled browser game with XP/coins/shop/championship). Strong duplicate.

### `201-M4-ECON`
One file: `apps script`, only 154 lines / 0 functions — purely `const` configuration (`YEARS`, `PASS_REQUIRED_BY_YEAR`, `CLAIM_CODES`, `SHEET_*` names, `MCQ_CONFIG`). **No `onOpen`, no menu, no doGet, no chapter/MCQ content, no scoring logic exists.** This is scaffolding only — not a working, playable simulation as committed. Titled "FINAL MASTERY SIMULATION" (Years 1–5 + Final Synthesis Year 6, MCQ 65%/SIM 35% weighting) but unimplemented.

### `201-M2-L2`
`index.html` + `game.js` + `styles.css` (browser game) + `apps script` (Google Apps Script) + `Contract Engine Track 201 M2 L2 .xlsx` + `README.md`. Both code implementations run the **same** "MLB Player Economics – Agent Simulator" (8 real MLB players, Take-the-Guarantee vs. Bet-on-Performance), sharing claim code `L2-201-M2-PLAYER`. The `.xlsx` contains sheets `Scenarios` (visible), `Reference Table`, `Agent Dashboard`, `RNGLog` (hidden) — it is the **live backing workbook the Apps Script reads/writes**, not a standalone static handout. Two parallel implementations of one simulation.

### `201-M3-L1`
One file: `index.html` (175KB, largest in the set). Title: **"The Front Office Dashboard | Data to Decisions"**, header explicitly reads "Track 201 · Module 3 · Lesson 1." Single, rich roster-draft simulation. No apps script, no xlsx. Most technically mature file in the set (leaderboard, achievements, random "Owner Mandates," localStorage persistence).

### `201-M3-L2`
`index.html` (hub) → `league-select.html` → `mlb.html`/`nba.html`/`nfl.html` → `victory.html`, plus `index-old.html` (superseded single-page prototype), `game_data.json`/`extract_data.py` (data pipeline from the `.xlsx`), shared `js/game-state.js`, `js/validation.js`, `js/navigation.js`. **Verdict: ONE experience, not three.** Evidence: all three league pages share the same `game-state.js`/`validation.js`; `league-select.html` gates NBA behind MLB-completion and NFL behind NBA-completion ("🔒 Complete MLB First"); a single overall progress bar tracks "X/3 Franchises Saved"; completing all three auto-redirects to one shared `victory.html`; the intro page frames a single continuous GM narrative ("Three struggling franchises. One mission."). The three sport pages are sequential levels/skins of one sim, not independent experiences.

### `201-M3-L3`
`index.html` + `css/styles.css` + `js/data.js` + `js/app.js` + `BOW_201_M3_L3_Front_Office_Draft.xlsx` + `README.md` + `V2_PLAN.md`. Title: **"Front Office Draft — 201 · M3 · L3"**. One browser-based budget/draft simulation. The `.xlsx` contains `Instructions`, `Activity`, `Claim_Codes`, and a hidden `Engine` sheet, and shares the exact same claim code (`BOW-201-M3-EDGE-01`) as the JS app — a parallel spreadsheet-formula implementation of the same activity (no `.gs` Apps Script file present, so it's formula-driven, not script-driven). `V2_PLAN.md` is a genuine engineering roadmap (v1 self-assessed as "~1,900-line vanilla HTML/CSS/JS... It works"); at least item #1 of that plan (replace `alert()`/`confirm()` with in-page two-step confirm) is already implemented in `js/app.js` — evidence of real iterative refinement.

---

## Distinct student-facing experiences

### 1. CandleCart.com Business Strategy Simulator (201-M1-ECON)
- **proposedId**: `candlecart-business-strategy-sim`
- **canonicalTitle**: "BOW BUSINESS STRATEGY SIMULATOR v5.0 — Online Candle Store: CandleCart.com" (file header comment)
- **path**: `apps script` (whole file)
- **whatStudentsDo**: Runs an online candle store across 5 monthly chapters. Chapter 1 is a launch decision (plan A/B/C affecting demand/marginal cost); Months 2–5 combine a "Run Month" numeric simulation (inventory vs. randomized demand, bulk-discount marginal costs, ad spend, pricing, a progressive tax in Month 5) with a separate 5-question "Check Chapter" MCQ gate (needs passing score to advance) and random events shifting demand.
- **pillar**: economics
- **conceptTerms**: "budget constraint", "opportunity cost", "incentives", "marginal cost", "fixed cost", "option value", "progressive tax", "binding constraints"
- **gradeBandEvidence**: quote — `"Online Candle Store: CandleCart.com · Grades 8–10"` (file header). NOTE: this contradicts the stated Track-201 convention of Grades 7–8; reporting as found, not reconciled.
- **purpose**: PRACTICE/APPLY (chapter-gated MCQs directly test the concepts just applied in the numeric sim)
- **delivery**: individual, facilitator-led (runs inside a Google Sheet via custom menu; requires teacher/student to open the bound spreadsheet)
- **durationEvidence**: UNKNOWN (no time references found)
- **facilitation**: UNKNOWN — no separate guide file found; onboarding is embedded in-sheet only
- **evidenceOutput**: YES — writes to a `StudentData` sheet (`Email`, `Name`, per-chapter score/passed/attempts/timestamps) and emails a `FinalClaimCode` on completion (`CLAIM_CODES` array, e.g. `BOW2025-ALPHA`)
- **studentDataProfile**: collects real email + name via `ui.prompt`, stored in spreadsheet; sends via `GmailApp.sendEmail`; no third-party APIs; Google Workspace only
- **maturitySignal**: single commit, no tests, but functionally complete (2211 lines, full onOpen menu, 5 chapters + explanations for every answer)
- **simulationPattern**: sequential monthly resource-allocation sim gated by MCQ mastery checks, with random demand shocks
- **confidence**: VERIFIED
- **evidence**: `/workspace/acct/201-M1-ECON/apps script` lines 1–13, 429, 545–581, 2138–2151

### 2. Bow Sports Capital Creative Business Simulation (201-M2-ECON, browser)
- **proposedId**: `creative-business-empire-browser`
- **canonicalTitle**: "Bow Sports Capital - Creative Business Simulation" (`<title>`)
- **path**: `index.html` (single file)
- **whatStudentsDo**: Student plays a young freelance creative choosing among 3 career paths (full-time startup job, 6-month agency contract, or independent + hire a junior designer) across 5 narrative chapters, each with a locked-in strategy choice, an outcome, and an embedded quiz gate before advancing; finishes with a 10-question Final Check (need "at least 7/10 to pass").
- **pillar**: cross-pillar (career/business economics with financial-literacy elements — contracts, equity, income stability)
- **conceptTerms**: "stability", "expected value", "bargaining power", "revenue sharing", "labor costs", "opportunity cost", "asset valuation", "marginal revenue", "scalability", "business asset value", "equity & investment", "compounding growth"
- **gradeBandEvidence**: TRACK-CONVENTION (no explicit grade text found in this file)
- **purpose**: APPLY/EVIDENCE (choice → consequence → quiz → Final Check assessment)
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN — no external guide
- **evidenceOutput**: collects a school email at start (`"Enter your school email..."`, "Your email is used for progress tracking only"); local claim-code screen shown at completion — no visible network call in this file, so tracking is implied but not confirmed sent anywhere from this HTML alone
- **studentDataProfile**: free-text email captured client-side; no visible fetch/XHR in this file (cannot confirm where email data goes — INFERRED it's cosmetic/local only based on absence of network calls)
- **maturitySignal**: polished dark UI, animated backgrounds, no TODOs found
- **simulationPattern**: linear chapter-based branching-narrative sim with concept tooltips and knowledge checks
- **confidence**: INFERRED (mechanics verified; data-destination unverified)
- **evidence**: `/workspace/acct/201-M2-ECON/index.html` lines 6, 388–420, 517, 560, 603, 642

### 3. Bow Sports Capital Econ Simulation, spreadsheet edition (201-M2-ECON, apps script)
- **proposedId**: `creative-business-empire-sheets`
- **canonicalTitle**: "Bow Sports Capital – Econ Simulation" / "Bow Sports Capital — Module 2: Economics Simulation" (in-code strings)
- **path**: `apps script` (whole file)
- **whatStudentsDo**: Same 5-chapter freelance/agency narrative and choices as the browser version, delivered as sheet cells (choice cell B6, narrative area, 5 MCQs per chapter at fixed rows), run via custom "Bow Sports Simulation" menu (Run Chapter N / Check Chapter N).
- **pillar**: cross-pillar
- **conceptTerms**: same as above (verified overlapping text — "revenue sharing," "risk," "marginal revenue," "fixed labor cost," "profit margin")
- **gradeBandEvidence**: TRACK-CONVENTION
- **purpose**: PRACTICE/EVIDENCE
- **delivery**: individual, facilitator-led (Google Sheet)
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: writes to `StudentData` sheet, sends completion/chapter-pass emails via `MailApp`, issues a claim code from `CLAIM_CODES` array
- **studentDataProfile**: sheet-based, presumably Google-account-identified (no explicit `Session.getActiveUser()` found in this file, unlike M2-L2/M3-ECON — email capture mechanism for this file not directly confirmed by grep)
- **maturitySignal**: complete menu system, chapter build/run/check functions implemented
- **simulationPattern**: identical branching narrative to #2, reimplemented as a spreadsheet MCQ/state machine
- **confidence**: VERIFIED (duplicate relationship to #2); INFERRED on data profile specifics
- **evidence**: `/workspace/acct/201-M2-ECON/apps script` lines 115, 420–443, 620–639, 2180–2272

### 4. Bow Sports Empire (201-M3-ECON, browser)
- **proposedId**: `bow-sports-empire-browser`
- **canonicalTitle**: "Bow Sports Empire" (`<title>`); in-app: "BOW SPORTS EMPIRE" / "Module 3 Final Activity"
- **path**: `index.html` + `js/game-data.js`, `js/game-engine.js`, `js/game-ui.js`, `js/app.js`
- **whatStudentsDo**: Names their "empire," then plays 5 seasons ("First Recruit," "Scaling Up," "Building the Machine," "Storm Season," "Championship Run"), each: read narrative → pick one of 3 strategy cards affecting 4 tracked stats (revenue, morale, efficiency, risk, starting at 20/50/30/20) → see outcome + stat deltas + an "insight" line teaching the underlying concept → answer 1–2 questions → spend earned coins in an "Empire Shop." Ends with a 5-question adaptive-difficulty "Championship" round (quote: `"5 adaptive questions. Difficulty adjusts to YOUR level."`) producing a final empire rating and claim code.
- **pillar**: economics
- **conceptTerms**: "information asymmetry", "expected value", "diminishing returns", "optimization under uncertainty", "opportunity cost", "volatility", "downside risk", "variance"
- **gradeBandEvidence**: TRACK-CONVENTION
- **purpose**: SYNTHESIZE (explicitly billed "Module 3 Final Activity" / championship capstone)
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: in-browser only in this file set — no `fetch`/`localStorage` write to email/server confirmed by grep beyond in-memory `state`; claim code displayed on-screen at end
- **studentDataProfile**: no login/email field found; appears session-local
- **maturitySignal**: high polish — adaptive difficulty engine, achievement toasts, confetti, XP-based title progression (Intern → Legend, 10 tiers)
- **simulationPattern**: 5-round strategy-choice-plus-consequence RPG loop feeding an adaptive-difficulty capstone quiz
- **confidence**: VERIFIED
- **evidence**: `/workspace/acct/201-M3-ECON/index.html` lines 6, 185; `/workspace/acct/201-M3-ECON/js/game-data.js` lines 9, 14–17, 365–374

### 5. Bow Sports Capital Module 3 Final Simulation (201-M3-ECON, apps script)
- **proposedId**: `bow-sports-empire-sheets`
- **canonicalTitle**: "BOW SPORTS CAPITAL — MODULE 3 FINAL SIMULATION" (file header); menu "Bow Sports Simulation"
- **path**: `apps script`
- **whatStudentsDo**: Same 5-chapter narrative/titles as #4 ("First Recruit" etc.), delivered as spreadsheet chapters with A/B/C strategy choice + 5 MCQs per chapter (need 4/5 to pass) + a 10-question Final Check.
- **pillar**: economics
- **conceptTerms**: overlapping with #4 (e.g., "Diminishing returns", "Information asymmetry", "Opportunity cost")
- **gradeBandEvidence**: TRACK-CONVENTION
- **purpose**: EVIDENCE/SYNTHESIZE
- **delivery**: individual, facilitator-led
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: `StudentData`/`SystemLog` sheets, email on chapter pass and full completion (`sendFinalCompletionEmail_`), claim code
- **studentDataProfile**: `Session.getActiveUser().getEmail()` used directly (line 1913) — tied to the student's logged-in Google identity
- **maturitySignal**: complete 10-part structure per file header comment (menu, layout engine, content engine, run/scoring/logging/email engines)
- **simulationPattern**: identical branching narrative to #4, reimplemented as spreadsheet MCQ/state machine
- **confidence**: VERIFIED (duplicate of #4)
- **evidence**: `/workspace/acct/201-M3-ECON/apps script` lines 1–20, 249–265, 816–826, 1913

### 6. BOW Sports Capital Final Mastery Simulation (201-M4-ECON) — NOT FUNCTIONAL
- **proposedId**: `final-mastery-simulation-stub`
- **canonicalTitle**: "BOW SPORTS CAPITAL — FINAL MASTERY SIMULATION" (file header, `00_Config.gs`)
- **path**: `apps script`
- **whatStudentsDo**: **UNKNOWN / NOT BUILT.** The file is exclusively configuration constants (Years 1–5 + a Final Synthesis "Year 6", pass thresholds per year, MCQ 65%/SIM 35% final weighting, grade bands A–F, claim codes per grade, a bounded randomness/shock engine, sheet-name constants). It defines **zero functions** — no `onOpen`, no menu, no chapter builder, no scoring logic, no MCQ bank content. As committed, opening this in a spreadsheet produces no menu and no runnable game.
- **pillar**: UNKNOWN (design intent suggests economics, given "Final Synthesis" and prior track pattern, but no content exists to classify)
- **conceptTerms**: none present in code (only structural constants)
- **gradeBandEvidence**: UNKNOWN
- **purpose**: UNKNOWN — appears intended as SYNTHESIZE/capstone based on naming, unconfirmed
- **delivery**: UNKNOWN
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: UNKNOWN (headers reference `AttemptLog`/`StudentState`/`SystemLog` sheets but no code writes to them)
- **studentDataProfile**: UNKNOWN
- **maturitySignal**: **incomplete/broken** — 154 lines, 0 functions, explicitly commented "Constants only... Safe to edit without breaking logic," implying later parts were planned but never committed to this repo
- **simulationPattern**: UNKNOWN (config only)
- **confidence**: VERIFIED that it is non-functional as committed; everything about intended gameplay is UNKNOWN
- **evidence**: `/workspace/acct/201-M4-ECON/apps script` (entire 154-line file; `grep -c "^function"` = 0)

### 7. MLB Player Economics – Agent Simulator (201-M2-L2, browser)
- **proposedId**: `mlb-agent-simulator-browser`
- **canonicalTitle**: "MLB Player Economics - Agent Simulator v2" (`<title>`)
- **path**: `index.html` + `game.js` + `styles.css`
- **whatStudentsDo**: Acts as a sports agent for 8 real MLB players (Judge, Ohtani, Trout, Betts, Acuña Jr., Rodríguez, Cole, Witt Jr.), each with Base Guaranteed salary, Performance Incentives, and an Injury Risk %. For each player, chooses "Take the Guarantee" (safe) or "Bet on Performance" (risky, upside if healthy, base-only if injured — injury resolved randomly). Earns a Gold/Silver/Bronze rating per player vs. a model value; unlocks a claim code at average rating ≥1.9.
- **pillar**: economics (risk/expected value) with financial-literacy overtones (guaranteed vs. contingent contracts)
- **conceptTerms**: "Base Guaranteed", "Performance Incentives", "Injury Risk %", "expected value" (per README), "risk management"
- **gradeBandEvidence**: TRACK-CONVENTION
- **purpose**: PRACTICE/APPLY (repeated decisions under identical mechanic, no facilitator gate before/after)
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN
- **facilitation**: README only (`/workspace/acct/201-M2-L2/README.md`) — developer-facing, not a teacher guide
- **evidenceOutput**: on-screen claim code (`L2-201-M2-PLAYER`, `game.js` line 2); localStorage-based best-run tracking, no server/email
- **studentDataProfile**: localStorage only (`bestEarnings`, `bestAvgRating`, `totalPlays`); no login, no email field found in this file pair
- **maturitySignal**: README documents rating thresholds precisely and matches code; no TODOs
- **simulationPattern**: 8-round independent binary risk-choice sequence with randomized injury outcome per round
- **confidence**: VERIFIED
- **evidence**: `/workspace/acct/201-M2-L2/README.md` lines 1–19, 71–78; `/workspace/acct/201-M2-L2/game.js` lines 2, 48, 175–193, 704–715

### 8. Player Economics simulation, spreadsheet edition (201-M2-L2, apps script + xlsx)
- **proposedId**: `mlb-agent-simulator-sheets`
- **canonicalTitle**: inferred from code — `runPlayerEconomics()` operating on the "Scenarios" sheet; no in-file display title, claim code identical to #7: `L2-201-M2-PLAYER`
- **path**: `apps script` + `Contract Engine Track 201 M2 L2 .xlsx` (workbook it's bound to: sheets `Scenarios`, `Reference Table`, `Agent Dashboard`, `RNGLog`-hidden)
- **whatStudentsDo**: Identical Take/Bet decision for the same 8 player rows, read from/written to the `Scenarios` sheet (columns for Base Guaranteed, Incentives, Risk %, Model Value, Agent Decision, Outcome, Rating, Feedback); randomized injury via `Math.random() < risk`.
- **pillar**: economics
- **conceptTerms**: "Risk Factor", "Expected Value", "Perceived Undervaluation (%)" (from workbook shared strings)
- **gradeBandEvidence**: TRACK-CONVENTION
- **purpose**: PRACTICE/APPLY
- **delivery**: individual, facilitator-led (spreadsheet)
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN (no guide beyond the shared README, which describes the browser game specifically)
- **evidenceOutput**: writes Outcome/Rating/Feedback back into the `Scenarios` sheet rows; identifies student via `Session.getActiveUser().getEmail()`
- **studentDataProfile**: Google-identity-linked (real email via `Session.getActiveUser()`), not anonymous — contrast with browser version's localStorage-only anonymity
- **maturitySignal**: functionally complete for its scope (RNG, rating logic, feedback strings all present)
- **simulationPattern**: same 8-round risk-choice sim as #7, reimplemented in a bound spreadsheet
- **confidence**: VERIFIED (duplicate relationship to #7 confirmed via identical claim code + mechanic)
- **evidence**: `/workspace/acct/201-M2-L2/apps script` lines 1–13, 40–58; xlsx shared strings (`Scenarios`, `Agent Decision`, `Risk`, `Rating`)

### 9. The Front Office Dashboard (201-M3-L1)
- **proposedId**: `front-office-dashboard`
- **canonicalTitle**: "The Front Office Dashboard | Data to Decisions" (`<title>`); in-app "The Front Office Dashboard"
- **path**: `index.html` (single file, 175KB)
- **whatStudentsDo**: Drafts a 9-player roster under a salary cap (luxury tax triggers over $160M), balancing WAR, "value," risk, and age against a weighted Efficiency Score (`WAR 30% + Value 25% + Risk 20% + Age 15% + Chemistry 10%`, weights change per random "Owner Mandate" — e.g. Moneyball, Win Now, Build the Brand, Youth Movement). Has 8 Scout Tokens to reveal hidden player data, fills required position slots (SP/C/OF/IF/DH), then runs a "Season Simulation" with injury/breakout events and interleaved economics quiz questions (concept-tagged: `valueOverReplacement`, `opportunityCost`, `luxuryTax`), aiming for a 75+ ("Green Zone") efficiency score; results post to a persistent per-mandate leaderboard.
- **pillar**: economics
- **conceptTerms**: "value" (per-dollar production), "sunk cost fallacy", "opportunity cost", "luxury tax", "expected WAR", "regression to the mean", "positional scarcity", "diversifying risk"
- **gradeBandEvidence**: TRACK-CONVENTION — quote: `"Track 201 · Module 3 · Lesson 1"` (in-app header badge)
- **purpose**: APPLY/SYNTHESIZE (draft → live season simulation → scored outcome vs. threshold)
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: localStorage leaderboard (`gm_leaderboard`) and achievements (`gm_achievements`); no email/server submission found
- **studentDataProfile**: localStorage only; no login/email captured in this file
- **maturitySignal**: most feature-dense file in the set — random mandate system, rival GM AI, tooltips explaining every stat formula, achievement system; no TODOs found; single file, no external assets
- **simulationPattern**: constrained-optimization roster draft (budget + position + score-weight constraints) feeding a stochastic season-outcome simulation with embedded knowledge checks
- **confidence**: VERIFIED
- **evidence**: `/workspace/acct/201-M3-L1/index.html` lines 1391–1403, 1967–2024, 2125–2129, 2456–2457, 3421–3464

### 10. Sports Analytics Team Builder (201-M3-L2) — ONE experience, three sequential scenarios
- **proposedId**: `sports-analytics-team-builder`
- **canonicalTitle**: "Sports Analytics Team Builder | BOW Sports Capital" (`index.html` `<title>`)
- **path**: `index.html`, `league-select.html`, `mlb.html`, `nba.html`, `nfl.html`, `victory.html` + shared `js/game-state.js`, `js/validation.js`, `js/navigation.js`, `js/data.js`, `js/player-selection.js`, `js/main.js`
- **whatStudentsDo**: Player enters a "GM Name," then completes 3 sequentially-unlocked scenarios sharing one save state: MLB ("The Lost Star" — replace a departed hitter, 2–4 players, $40M budget, OBP≥0.330/wRC+≥105/WAR per $M≥0.12), then NBA ("The Playoff Push" — 3–5 players, $75M, TS%/BPM/ORtg/DRtg thresholds), then NFL ("The Offensive Overhaul" — 3–5 players, $80M, EPA/play/CPOE/Success Rate thresholds). Completing one unlocks the next on the shared hub; completing all three auto-redirects to a single `victory.html`.
- **pillar**: economics (budget-constrained resource allocation using real-world-style performance metrics)
- **conceptTerms**: "OBP", "SLG", "OPS", "WAR", "wRC+", "TS%", "Usage%", "BPM", "ORtg", "DRtg", "EPA/play", "CPOE", "Success Rate", "DVOA", "budget"
- **gradeBandEvidence**: TRACK-CONVENTION — quote: `"Track 201 · Module 3 · Lesson 2"` (index.html footer text)
- **purpose**: PRACTICE→APPLY (progressive difficulty/scope across 3 gated scenarios)
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN
- **facilitation**: UNKNOWN
- **evidenceOutput**: "Auto-save Progress" via localStorage per README; no email/server capture found
- **studentDataProfile**: localStorage only (GM name + scenario completion state via `gameState` object); no login
- **maturitySignal**: `index-old.html` (an earlier single-page prototype titled "Build Your Dream Team") retained in-repo alongside the current multi-page version — clear evidence of a completed refactor, with `extract_data.py`/`game_data.json` documenting the data pipeline from the source `.xlsx`
- **simulationPattern**: sequential, gated multi-scenario budget/roster-building puzzle sharing one persistent game state and narrative frame
- **confidence**: VERIFIED (single-experience determination based on shared state module, explicit lock/unlock gating, and single shared victory screen)
- **evidence**: `/workspace/acct/201-M3-L2/index.html` lines 6, 56–121; `/workspace/acct/201-M3-L2/league-select.html` lines 6, 68–123, 205–211; `/workspace/acct/201-M3-L2/README.md` lines 1–3, 14–18

**Materials (not a distinct experience)**: `Track 201 Module 3 Lesson 2- Analytics Matrix.xlsx` — source player-stat workbook (`Analytics Activity` sheet + hidden `Claim_Codes`), consumed by `extract_data.py` → `game_data.json` to seed `js/data.js`.

### 11. Front Office Draft (201-M3-L3, browser)
- **proposedId**: `front-office-draft-browser`
- **canonicalTitle**: "Front Office Draft — 201 · M3 · L3" (`<title>`); in-app "Front Office Draft"
- **path**: `index.html` + `js/app.js` + `js/data.js` + `css/styles.css`
- **whatStudentsDo**: Builds an analytics/performance department by selecting from 7 "Hires" (e.g., Elite Data Scientist $3.0M, Sports Scientist $2.5M, Veteran Scout $1.2M) and 3 "Tools" (Tech Stack Upgrade $2.3M, Real-Time Data Pipeline $1.8M, Wearable Tracking System $2.0M) within a $10M budget. Score = `(Total AWA × Culture Multiplier) + Risk Penalty + Scalability Bonus`; meeting `SUCCESS_THRESHOLD: 7.0` reveals claim code `BOW-201-M3-EDGE-01`.
- **pillar**: economics (budget allocation, opportunity cost across competing hires) — README also frames it as "Front Office Foundations"
- **conceptTerms**: "AWA (Analytics Wins Added)", "Culture Multiplier", "Risk Penalty", "Scalability Bonus", "budget"
- **gradeBandEvidence**: TRACK-CONVENTION — quote: `"Course: 201 - Front Office Foundations · Module: M3 - Analytics & Performance · Lesson: L3 - Building Your Team"` (README credits section)
- **purpose**: APPLY/EVIDENCE
- **delivery**: individual, self-guided
- **durationEvidence**: UNKNOWN (README states "Fast load time (< 1s)" — that is load time, not activity duration)
- **facilitation**: README states: `"Copy the claim code and submit it in the BOW Finish Form to earn XP"` — implies an external Google Form is the actual facilitation/grading mechanism, but that form itself is not in this repo
- **evidenceOutput**: claim code shown on success; localStorage persistence (`frontOfficeDraft`, `frontOfficeDraftPersistent`) for resuming a build
- **studentDataProfile**: localStorage only; no login/email in this file set
- **maturitySignal**: highest documented maturity in the set — `V2_PLAN.md` is a real architecture review (accessibility, performance, code-quality items) and at least one item (alert/confirm → two-step confirm-button pattern) is already implemented in the shipped code
- **simulationPattern**: single-round constrained-selection budget puzzle (draft-and-evaluate, not multi-turn)
- **confidence**: VERIFIED
- **evidence**: `/workspace/acct/201-M3-L3/index.html` line 6; `/workspace/acct/201-M3-L3/js/data.js` lines 41–52 (per README), 274–275; `/workspace/acct/201-M3-L3/js/app.js` lines 660–672; `/workspace/acct/201-M3-L3/README.md` lines 1–37, 115–116; `/workspace/acct/201-M3-L3/V2_PLAN.md` lines 1–13

**Materials (parallel spreadsheet, unconfirmed as script-driven)**: `BOW_201_M3_L3_Front_Office_Draft.xlsx` — sheets `Instructions`, `Activity`, `Claim_Codes`, hidden `Engine`; shares identical claim code `BOW-201-M3-EDGE-01` and identical hire/tool list with the browser app, so it is almost certainly a parallel spreadsheet-formula implementation of the same activity — but **no companion Apps Script (`.gs`) file exists in this repo**, so whether "Engine" is live formula logic or a static leftover could not be verified (INFERRED, not VERIFIED).

---

## Cross-repo duplicate/parallel-implementation pattern

A consistent pattern across the `*-ECON` and `201-M2-L2` repos: **the same narrative/mechanic is built twice** — once as a Google Apps Script + Sheets state machine (identity-linked via `Session.getActiveUser()`, email notifications, StudentData logging) and once as a standalone, mostly-anonymous browser game (localStorage only). Confirmed duplicate pairs: M2-ECON (creative-business narrative), M3-ECON ("Bow Sports Empire" 5-season narrative), M2-L2 (MLB Agent Take/Bet). M3-L3's `.xlsx` is a probable third instance of this pattern but unconfirmed as script-driven. M4-ECON is the outlier: its Apps Script half of this pattern was apparently never finished — only the config stub exists, with no corresponding browser build in this repo either.
