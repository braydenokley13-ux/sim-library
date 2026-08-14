# Discovery report — track201-lessons-b-and-lineage

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

# BOW Sports Capital — Track 201 Repo Investigation

Author of all commits across these repos: `braydenokley13-ux` (braydenokley13@gmail.com). All timestamps below are commit dates from local git history.

## Headline finding: Front Office lineage

**BSC-201-Capstone and Franchise-Sim are the SAME PRODUCT at different iteration stages — BSC-201-Capstone is canonical.**

Both files share identical `<title>The Front Office | BOW Sports Capital Track 201</title>`, an identical GameState object (`franchise`, `cycleIndex`, `capFlexibility`, `rosterQuality`, `optionality`, `reputationPlayers/Agents/League`, `trustIndex`, `taxExposure` — line-for-line matching field order), identical intro copy ("You are the General Manager of an NBA franchise. Over 4 decision cycles..."), identical screen comment structure (SCREEN 1 INTRO → SCREEN 2 FRANCHISE SELECTION → SCREEN 3 HUB → ROOM MODAL → DOSSIER), and identical `localStorage` key prefix `tfr_*` / class-code format `TFR-XXXXXX`.

Evidence they are different snapshots, not a copy-paste duplicate:
- Both were committed via a single "Rename index-N.html to index.html" commit — evidence of many un-tracked local iterations (`index-8.html`, `index-FIXED-WORKING.html`) collapsed into one commit each.
- **Franchise-Sim**: commit `1cc5a95`, 2026-01-08, 17,565 lines, 71 `function` defs. Ends after "CLAIM CODE DISPLAY" — **has no "Play Again" button, no "Score Breakdown," no "Franchise Philosophy Selection" ending screen, and no Cap Timeline widget** (`CapTimeline.renderWidget()` is referenced nowhere in the file).
- **BSC-201-Capstone**: commit `01117dd`, 2026-01-11 (3 days later), 22,092 lines, 78 `function` defs. Contains everything Franchise-Sim has **plus** the Cap Timeline widget, a richer Trade Puzzle (dedicated "Your Team"/"Their Team"/"Trade Summary" panels), and the full end-game arc (Score Breakdown → Franchise Philosophy Selection → claim code → Play Again).

**Conclusion**: Franchise-Sim is an earlier, incomplete build of the same "The Front Office" game; BSC-201-Capstone is the later, more feature-complete build (canonical). Neither repo shows deploy config (no `netlify.toml`/`vercel.json`/CNAME); both are pure static single-file HTML with no test suite.

## M1-201-FINAL / M2-201-FINAL: NOT "final" versions of T201-M1-L1 / T201-M2-L1

These are a **separate, parallel product family** ("Front Office City," a 3D walk-around Vite app) — not later versions of the Cap Crash / MLB Money Maker lessons, despite folder-name suggestion. Evidence:
- Titles are entirely different: "Front Office City - District A Final" (M1) / "Front Office City: NFL Capital Run" (M2) vs. "Cap Crash — Mission Briefing" (T201-M1-L1) / "BOW Sports Capital Presents - MLB Money Maker" (T201-M2-L1).
- Different sport per module: M1 is NBA (Bird Rights, MLE, apron); M2 is **NFL-only**, locked to Chiefs/49ers — while T201-M2-L1 is **MLB** (30 teams). Different sports = not the same lesson.
- Different tech entirely: M1/M2-201-FINAL are Vite + `three.js`-style 3D worlds with WASD movement, mission zones, a signed server-side "attempt lock" API (`api/attempt-lock.js`), CI test suite (M2 only). T201-M1-L1/L2 and T201-M2-L1 are flat HTML/CSS/JS with no 3D.
- Chronologically, M1/M2-201-FINAL (Feb 12–13, 2026) actually **predate** T201-M1-L1/L2 (June 15, 2026) — so if anything the T-prefixed repos are the *later* rebuilds of the Module 1/2 lesson slots, not the reverse, and the "Front Office City" 3D line appears abandoned/superseded by the simpler flat-HTML "T201" lessons for classroom use.
- **Duplicate-slot suspicion**: M1-201-FINAL and T201-M1-L1 both target "Track 201 Module 1" NBA-salary-cap content but are unrelated implementations — classic parallel-build redundancy, not a lineage.

## Cross-track duplication: "Trade Deadline War Room"

Confirmed real duplication, but **appears to be intentional grade-band differentiation**, not accidental copy:
- **T201-M1-L2**: `<title>Trade Deadline War Room — Bow Sports Capital</title>`, README states "Track 201 · Module 1 · Lesson 2 ... for 7th–8th graders." Real NBA teams (Spurs/Bucks/Cavaliers) tuned to progressive + repeater luxury-tax multipliers. Committed 2026-06-15.
- **T101-M1-L2**: `<title>Trade Deadline War Room · BOW Sports Capital</title>`, `QA-CHECKLIST.md` states explicitly "Audience: 5th–6th grade. Topic: NBA salary cap & luxury tax." Committed 2026-06-16 (one day after T201 version).
- Same title, same core topic (NBA salary cap/luxury tax), different grade band and presumably different complexity — flagged for a human to confirm this is deliberate (Track 101 = simplified sibling of Track 201 lesson) rather than a mis-scoped duplicate commit.

**Additional duplicate-slot found (not asked about but relevant)**: `201-M1-L2-Luxury-Tax-` (commit 2026-01-01, single-file scenario picker with progressive/repeater tax brackets, `localStorage` key `bsc_luxury_tax_scenarios_v2`) occupies the **same** Track 201 / Module 1 / Lesson 2 / Luxury Tax slot as T201-M1-L2, built ~5.5 months earlier with no tests/README. T201-M1-L2 (tests/, README, `scripts/`, `styles/`) is the mature successor.

---

## Per-repo summary

### 201-M4-L1
What it is: Not a simulation — the repo contains only a 40 KB Google Form "Responses" PDF export (survey/quiz results), committed via "Add files via upload." No HTML, no code.
Student-facing sim: **0**. Tech stack: n/a. Deployment: n/a. Duplicate suspicion: none (not comparable content).

### 201-M4-L2
What it is: "NBA Surplus Value Championship" — a single-file HTML/CSS/JS roster-drafting puzzle teaching Surplus Value (Market Value − Salary). Source spreadsheet `Surplus - 201 M4L2.xlsx` is included alongside.
Student-facing sim: **1**. Tech: vanilla HTML/CSS/JS, no build, no tests. Deployment: none found. Duplicate suspicion: none identified.

### 201-M4-L3
What it is: "GM Trade Challenge - The 5-Minute Decision Maker" — a timed, multi-level (Rookie GM+ tiers), 3-round-per-level trade-decision game. Source spreadsheet `Bow 201 M4L3 - Pick Trades.xlsx` included.
Student-facing sim: **1**. Tech: vanilla HTML/CSS/JS, single file (84 KB), countdown timer, no tests. Deployment: none found. Duplicate suspicion: none identified.

### 201-M1-L2-Luxury-Tax-
What it is: "Luxury Tax in Action" scenario lab — students pick a scenario, edit roster moves, watch payroll/tax/wins auto-update against teacher-tunable targets. Earliest of the Module-1/Lesson-2 luxury-tax builds (2026-01-01).
Student-facing sim: **1**. Tech: single-file HTML, `localStorage` autosave, no tests/README. Deployment: none found. **Duplicate suspicion**: same lesson slot as T201-M1-L2 ("Trade Deadline War Room"); T201-M1-L2 is the later (2026-06-15), tested, documented replacement.

### T201-M1-L1
What it is: "Cap Crash" — a mission-briefing → dashboard → pressure-moment → report flow where students act as an NBA GM managing 4 metrics under a $120M cap. Explicitly documented as "Track 201, Grades 7–8" in `game.js` header comment and README.
Student-facing sim: **1**. Tech: modular vanilla JS (`sim-engine.js` pure logic + `game.js` UI + `game.html`), real Jest-style test suite (`tests/dom-smoke.test.js`, `tests/metrics.test.js`, 280 lines), README, source spreadsheet included. Deployment: static, no config found. Duplicate suspicion: shares Module-1/NBA-cap theme with M1-201-FINAL but is a distinct implementation (see lineage discussion above).

### T201-M1-L2
What it is: "Trade Deadline War Room / Luxury Tax In Action" — students compare real NBA trade packages across 3 teams tuned to different tax situations (Spurs under the line, Bucks at the line, Cavaliers deep into repeater tax), with a pressure moment and boardroom defense.
Student-facing sim: **1**. Tech: modular JS (`scripts/engine.js`, `data.js`, `app.js`, `storage.js`), test suite (`tests/engine.test.js`), README, source spreadsheet. Deployment: none found. Duplicate suspicion: **cross-track duplicate title/topic with T101-M1-L2** (see above); also supersedes `201-M1-L2-Luxury-Tax-`.

### T201-M2-L1
What it is: "MLB Money Maker" — a media-rights/revenue-sharing negotiation sim across 4 stakeholder groups (players, owners, networks, fans), driven by sliders (salary share, revenue sharing, game time, streaming), yielding gold/silver/bronze/fail outcomes plus a knowledge-check minigame phase.
Student-facing sim: **1**. Tech: modular vanilla JS (`data.js` w/ all 30 real MLB teams, `calculations.js`, `minigames.js`, `interactions.js`, `ui.js`), `Track201_Activity_Overview.pdf` included, no automated tests. Deployment: none found. Duplicate suspicion: occupies Module-2 slot alongside M2-201-FINAL (NFL) — different sport, unrelated implementation, not a direct duplicate.

### M1-201-FINAL
What it is: "Front Office City - District A Final" — a 3D (Vite/three.js-style) walk-around NBA salary-cap sim: 8 linear mission zones (Bird Rights, MLE, trade exceptions, dead cap), WASD movement, exam-integrity "attempt lock" with signed server verification, tiered claim codes per class period.
Student-facing sim: **1**. Tech: Vite build, ES modules (`src/engine`, `src/3d`, `src/config`, `src/data`), Vercel serverless API stub (`api/attempt-lock.js`), no test suite (only syntax/schema/TODO check scripts). Deployment: `DEPLOY.md` documents a Vercel deploy path with signed-key env vars — no confirmed live deployment. Duplicate suspicion: same Module-1/NBA-cap subject as T201-M1-L1 but a wholly separate, more complex build; NOT a "final" version of it (see lineage above).

### M2-201-FINAL
What it is: "Front Office City: NFL Capital Run" — README states explicitly "NFL-only 3D front-office simulation for middle school learners (7th/8th grade)." Locked to Chiefs vs. 49ers, 2025 snapshot data with cited sources; students rotate through Agent → League Office → Owner roles across missions on cap/trust tradeoffs, compliance, tampering, revenue allocation, franchise valuation.
Student-facing sim: **1**. Tech: modular vanilla JS (no build tool despite complexity: `nfl_game.js`, `nfl_rules.js`, `nfl_ai.js`, `world3d.js`, `audio.js`), real test suite (`tests/csv.test.js`, `tests/nfl-engine.test.js`, 213 lines), GitHub Actions CI (`ci.yml`), `docs/mission-matrix.md`, deterministic balance-simulation harness. Deployment: CI runs tests only, no deploy step found. Duplicate suspicion: shares "Front Office City" 3D lineage/engine pattern with M1-201-FINAL (sibling module build, same claim-code prefix convention `M1-201-NFL-...` despite being the M2 repo — likely a copy-forward naming leftover, worth a human sanity check).

### BSC-201-Capstone
What it is: "The Front Office" — the flagship capstone: students run an NBA franchise (Rebuild/Contender/Young archetypes) across 4 decision cycles, managing Cap Flexibility, Roster Quality, Optionality, Trust Index, Media Narrative, Tax Exposure, etc., through room-based decisions, trade puzzles, draft lottery, press conferences, and a teacher dashboard with CSV/PDF export.
Student-facing sim: **1**. Tech: single-file HTML (1.2 MB, 22,092 lines), `localStorage`-backed class codes (`TFR-XXXXXX`), jsPDF CDN for PDF report export, no automated tests. Deployment: none found. **Duplicate suspicion**: canonical/later version of Franchise-Sim (see lineage above).

### Franchise-Sim
What it is: Earlier build of the identical "The Front Office" capstone product (same title, GameState schema, screens, intro copy) — missing the Cap Timeline widget and the full end-game (Score Breakdown/Play Again/Philosophy Selection) that BSC-201-Capstone has.
Student-facing sim: **1** (same product as BSC-201-Capstone, earlier snapshot). Tech: single-file HTML (948 KB, 17,565 lines), same `localStorage`/jsPDF approach. Deployment: none found. **Duplicate suspicion**: superseded by BSC-201-Capstone; recommend treating Franchise-Sim as archival/non-canonical.

### TRACK201M2-SLIDES
What it is: **Empty repository.** `git log` returns "your current branch 'main' does not have any commits yet"; working tree has only `.git`. No slides, no content of any kind exist locally.
Student-facing sim: **0**.

---

## Distinct student-facing experiences

### the-front-office (canonical: BSC-201-Capstone)
- proposedId: `the-front-office`
- canonicalTitle: "The Front Office | BOW Sports Capital Track 201" (in-app: "THE FRONT OFFICE")
- path: `BSC-201-Capstone/index.html` (Franchise-Sim/index.html = earlier non-canonical build of same experience)
- whatStudentsDo: Students log in with a name + teacher-issued class code, choose a franchise archetype (Contender/High Pressure, Young/Medium Pressure, Rebuild/Messy), then run their NBA front office through 4 decision "cycles." Each cycle presents room-based decisions (trade puzzle, press conference, draft lottery, random events, teaching-moment popups) that move a set of numeric metrics. At the end they get a franchise-philosophy selection, a graded dossier, and a claim code.
- pillar: economics
- conceptTerms (verbatim): "Roster Quality", "Cap Flexibility", "Tax Exposure", "Trust Index", "Optionality", "Economic Mastery Tree", "GM Archetype Analysis", "Economics Concepts Demonstrated"
- gradeBandEvidence: UNKNOWN (only "Track 201 Capstone" badge found; no explicit grade-number text) — TRACK-CONVENTION (per user's stated repo-naming convention, Track 201 = Grades 7–8)
- purpose: SYNTHESIZE (capstone, explicitly labeled "Track 201 Capstone")
- delivery: browser, single HTML file, no login backend (student/teacher role selection stored in `localStorage`)
- durationEvidence: UNKNOWN (no on-screen time estimate found)
- facilitation: teacher dashboard with class codes (`TFR-XXXXXX`), CSV export (`exportCSV`), PDF report generation via jsPDF — "👨🏫 Teacher Dashboard"
- evidenceOutput: PDF report ("BOW Sports Capital Track 201 - GM Performance Report"), CSV of student roster-quality/pressure/concepts/tier, claim code
- studentDataProfile: name, class code, quiz scores, cycle progress, all metric values — persisted in browser `localStorage` under `tfr_*` keys (no server backend observed)
- maturitySignal: no automated tests; large single-file monolith; two divergent local snapshots found (Franchise-Sim, BSC-201-Capstone) suggesting active/unstable iteration
- simulationPattern: multi-cycle (4-cycle) branching-decision career sim with persistent numeric state and archetype-based scenarios
- confidence: VERIFIED (title, mechanics, and code directly read)
- evidence: `BSC-201-Capstone/index.html:2670` "You are the General Manager of an NBA franchise. Over 4 decision cycles..."; `:4320` `GameState` object def; `:3164` `TeacherDashboard.exportCSV()`

### cap-crash (T201-M1-L1)
- proposedId: `cap-crash`
- canonicalTitle: "Cap Crash — Mission Briefing | Bow Sports Capital" (in-app: "🏀 CAP CRASH 🏀")
- path: `T201-M1-L1/index.html` + `game.html` (logic in `sim-engine.js`, `game.js`)
- whatStudentsDo: Students play a GM rebuilding a basketball roster under a "crashed" $120M salary cap. They sign/cut/trade players and use cap exceptions on a Front-Office Dashboard, watching four metrics update live, then face a single trade-deadline "Pressure Moment" (win-now vs. stay-flexible), lock in a final strategy, and write a boardroom memo defending it before getting a Front-Office grade and claim code.
- pillar: economics
- conceptTerms (verbatim): "Cap Space", "Projected Wins", "Chemistry", "Clout", "cap exceptions", "Front-Office grade"
- gradeBandEvidence: VERIFIED — `game.js` header comment: "BOW SPORTS CAPITAL — CAP CRASH (Track 201, Grades 7–8)"; README: "for 7th–8th graders (Track 201)"
- purpose: PRACTICE/APPLY (README: "A standalone, classroom-ready sports front-office operating simulation")
- delivery: browser, static HTML/CSS/JS, no build step ("open index.html in any modern browser")
- durationEvidence: UNKNOWN (no explicit duration stated)
- facilitation: single-player, no teacher dashboard found; README explicitly notes "no shared backend, portal, or database"
- evidenceOutput: on-screen Performance Report (grade, season result), claim code, boardroom memo text
- studentDataProfile: `localStorage` key `bscCapCrash201`, GM name + front-office style; no server transmission
- maturitySignal: real automated tests present (`tests/dom-smoke.test.js`, `tests/metrics.test.js`), separated pure-logic engine (`sim-engine.js`) from UI (`game.js`), README with explicit design rationale — highest engineering maturity signal among single-lesson repos
- simulationPattern: single-session build→pressure-moment→finalize→report state machine (not multi-cycle)
- confidence: VERIFIED
- evidence: `T201-M1-L1/game.js:2` "BOW SPORTS CAPITAL — CAP CRASH (Track 201, Grades 7–8)"; `README.md`: "for 7th–8th graders (Track 201)"

### trade-deadline-war-room-201 (T201-M1-L2)
- proposedId: `trade-deadline-war-room-201`
- canonicalTitle: "Trade Deadline War Room — Bow Sports Capital" (README subtitle: "Luxury Tax In Action")
- path: `T201-M1-L2/index.html` (`scripts/engine.js`, `data.js`, `app.js`, `storage.js`)
- whatStudentsDo: Students act as GM at the NBA trade deadline for one of 3 teams tuned to different luxury-tax exposure (Spurs far under the line, Bucks right at the line, Cavaliers deep past the second apron/repeater). They compare real trade packages, watch Cash/Wins/Chemistry and a computed Luxury Tax Bill change live using real progressive + repeater multipliers, handle a pressure moment, lock a strategy, and defend it.
- pillar: economics
- conceptTerms (verbatim): "Luxury Tax Bill", "tax line", "progressive (and repeater) multipliers", "Cash", "Wins", "Chemistry", "second apron"
- gradeBandEvidence: VERIFIED — README: "a standalone, classroom-ready sports front-office simulation for 7th–8th graders" (Track 201 · Module 1 · Lesson 2)
- purpose: PRACTICE/APPLY
- delivery: browser, static HTML/CSS/JS, no build step
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN (no teacher dashboard evidence found in quick pass)
- evidenceOutput: strategy lock-in, boardroom-style defense (per README flow, same pattern as Cap Crash), claim code (inferred from shared pattern, not independently confirmed)
- studentDataProfile: UNKNOWN persistence details beyond likely `localStorage` (module named `storage.js`, not individually inspected)
- maturitySignal: real test suite (`tests/engine.test.js`), README, modular architecture — comparable maturity to T201-M1-L1
- simulationPattern: single-session trade-comparison → pressure-moment → strategy-lock flow
- confidence: INFERRED for facilitation/evidenceOutput details (not directly read in `engine.js`); VERIFIED for title, grade band, and tax mechanics
- evidence: `T201-M1-L2/README.md`: "for 7th–8th graders", "the Luxury Tax Bill is calculated with the real progressive (and repeater) multipliers"

### trade-deadline-war-room-101 (T101-M1-L2)
- proposedId: `trade-deadline-war-room-101`
- canonicalTitle: "Trade Deadline War Room · BOW Sports Capital"
- path: `T101-M1-L2/index.html` (`src/app.js`, `simulation.js`, `data.js`)
- whatStudentsDo: UNKNOWN in mechanical detail (not deeply read this pass) beyond QA-checklist description: "Learn the NBA salary cap and luxury tax by running a team at the trade deadline."
- pillar: economics
- conceptTerms: UNKNOWN (not extracted this pass beyond "NBA salary cap & luxury tax")
- gradeBandEvidence: VERIFIED — `QA-CHECKLIST.md`: "Audience: 5th–6th grade. Topic: NBA salary cap & luxury tax." Note this is Track 101, outside the assigned Track 201 scope, flagged only because of the title collision with T201-M1-L2.
- purpose: UNKNOWN
- delivery: browser, static HTML/JS
- durationEvidence: UNKNOWN
- confidence: INFERRED (title/grade-band verified; mechanics not deep-read since T101 is outside assigned scope)
- evidence: `T101-M1-L2/QA-CHECKLIST.md:4` "Audience: 5th–6th grade."

### luxury-tax-in-action-scenario-lab (201-M1-L2-Luxury-Tax-)
- proposedId: `luxury-tax-in-action-scenario-lab`
- canonicalTitle: "Luxury Tax in Action — Bow Sports Capital (Scenario Simulation)"
- path: `201-M1-L2-Luxury-Tax-/index.html`
- whatStudentsDo: Students pick a scenario key from a dropdown, then edit only their "moves" (right panel) while scenario targets and league rules stay locked. The app auto-computes payroll, progressive/repeater luxury tax, all-in spend, and projected wins, and flags whether the roster "Meets Scenario" targets.
- pillar: economics
- conceptTerms (verbatim): "Scenario Lab • Luxury Tax + Targets", "all-in spend", "Meets Scenario", tax "brackets" with `nonRepeater`/`repeater` rates
- gradeBandEvidence: TRACK-CONVENTION (repo name "201-M1-L2" implies Track 201/Grades 7–8; no explicit grade text found in source)
- purpose: PRACTICE (earlier prototype for same slot T201-M1-L2 now covers)
- delivery: browser, single HTML file, `localStorage` autosave (key `bsc_luxury_tax_scenarios_v2`)
- durationEvidence: UNKNOWN
- facilitation: teacher-tunable scenario weights/targets mentioned in on-page tip text
- evidenceOutput: on-screen "Meets Scenario" badge only; no export mechanism found
- studentDataProfile: `localStorage` only, no name/class-code capture observed
- maturitySignal: no tests, no README, single commit (2026-01-01) — earliest and least mature of the luxury-tax builds
- simulationPattern: single-round scenario/parameter sandbox (not a multi-step narrative flow)
- confidence: INFERRED for "superseded by T201-M1-L2" claim (based on chronology + topic + repo-naming overlap, not an explicit deprecation note)
- evidence: `201-M1-L2-Luxury-Tax-/index.html:785` `STORAGE_KEY = "bsc_luxury_tax_scenarios_v2"`; `:1119` `function computeTax(scn, payroll)`

### mlb-money-maker (T201-M2-L1)
- proposedId: `mlb-money-maker`
- canonicalTitle: "BOW Sports Capital Presents - MLB Money Maker" (in-app: "MLB MONEY MAKER")
- path: `T201-M2-L1/index.html` (`js/data.js`, `calculations.js`, `minigames.js`, `interactions.js`, `ui.js`)
- whatStudentsDo: Students negotiate a new MLB media-rights/revenue deal using sliders for salary share, revenue sharing, game time, and streaming. The app computes satisfaction scores for four stakeholder groups (players, owners, networks, fans) from those sliders, then grades the deal Gold/Silver/Bronze/Fail based on the lowest stakeholder satisfaction, with an added knowledge-check minigame phase.
- pillar: economics (cross-pillar leaning, given revenue/profit framing)
- conceptTerms (verbatim): "revenue sharing", "owner profits", "Fan Happiness"-style satisfaction categories (players/owners/networks/fans), "streaming"
- gradeBandEvidence: TRACK-CONVENTION (repo name only; no explicit grade text found)
- purpose: APPLY
- delivery: browser, static HTML/CSS/JS, `Track201_Activity_Overview.pdf` companion doc included
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN (no teacher dashboard evidence found)
- evidenceOutput: on-screen outcome tier (gold/silver/bronze/fail) with narrative text; no export mechanism found
- studentDataProfile: UNKNOWN (not confirmed whether state persists to `localStorage`)
- maturitySignal: no automated tests; modular JS across 7 files (2,169 lines total)
- simulationPattern: single-session slider-negotiation → stakeholder-satisfaction scoring, plus a minigame phase
- confidence: VERIFIED for mechanics; UNKNOWN for grade band and facilitation
- evidence: `T201-M2-L1/js/calculations.js:52` `satisfaction.owners = ...`; `:204-207` gold/silver/bronze/fail outcome text

### nba-surplus-value-championship (201-M4-L2)
- proposedId: `nba-surplus-value-championship`
- canonicalTitle: "NBA Surplus Value Championship"
- path: `201-M4-L2/index.html`
- whatStudentsDo: Students browse an NBA player roster showing salary vs. market value and draft exactly 3 players to maximize combined "Surplus Value." A win requires Total Surplus ≥ 25 and a combined Synergy Score ≥ 6.
- pillar: economics
- conceptTerms (verbatim): "Surplus = Market Value − Salary", "Total Surplus", "Synergy Score", "Rookie deals = hidden gems"
- gradeBandEvidence: UNKNOWN (subtitle only: "Module 4 • Lesson 2 — Surplus Value in the NBA")
- purpose: PRACTICE
- delivery: browser, single HTML file (38.8 KB), no build
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN
- evidenceOutput: on-screen win/lose state only; no export found
- studentDataProfile: UNKNOWN (no persistence code inspected)
- maturitySignal: no tests; simple self-contained puzzle; source spreadsheet (`Surplus - 201 M4L2.xlsx`) included alongside, suggesting spreadsheet-to-game conversion (git log: "spreadsheet-to-html-game" branch pattern also seen on 201-M4-L3)
- simulationPattern: single-round optimization/selection puzzle (pick-3 roster build), not a multi-turn sim
- confidence: VERIFIED
- evidence: `201-M4-L2/index.html:687` "Surplus = Market Value − Salary"; `:750` "You need ≥ 25 to win."

### gm-trade-challenge (201-M4-L3)
- proposedId: `gm-trade-challenge`
- canonicalTitle: "GM Trade Challenge - The 5-Minute Decision Maker"
- path: `201-M4-L3/index.html`
- whatStudentsDo: Students play as a GM across multiple difficulty levels (e.g., "Rookie GM"), each with 3 timed rounds. Each round presents a trade scenario with several trade-package options (e.g., "big risk, big reward" packages); a countdown timer pressures the decision, and choices accumulate a running score.
- pillar: economics
- conceptTerms (verbatim): "Marginal upgrade", "Big risk, big reward" (trade framing), round/level scoring
- gradeBandEvidence: UNKNOWN
- purpose: PRACTICE
- delivery: browser, single HTML file (84.1 KB), no build
- durationEvidence: title itself claims "The 5-Minute Decision Maker" but this describes per-decision pacing (timer), not total session length — UNKNOWN for total duration
- facilitation: UNKNOWN
- evidenceOutput: on-screen running score only; no export found
- studentDataProfile: UNKNOWN
- maturitySignal: no tests; source spreadsheet (`Bow 201 M4L3 - Pick Trades.xlsx`) included
- simulationPattern: timed multi-level, multi-round (3 rounds/level) decision game with a countdown mechanic
- confidence: VERIFIED
- evidence: `201-M4-L3/index.html:1121-1123` `levels: {1: {name: "Rookie GM", timer: 90, ...}}`; `:1939` `state.score += roundScore;`

### front-office-city-district-a (M1-201-FINAL)
- proposedId: `front-office-city-district-a`
- canonicalTitle: "Front Office City - District A Final" (in-app `<h1>Front Office City</h1>`)
- path: `M1-201-FINAL/index.html` (Vite app entry `src/main.js`, world in `src/3d/world.js`, missions in `src/data/missions.js`)
- whatStudentsDo: Students choose a team/mode/quality, then walk a 3rd-person avatar (WASD/arrows) through a stylized 3D sports-city world to 8 sequential glowing mission zones, pressing "E" to open each mission's decision modal (e.g., "Mission 1 - Roster Lock-In," "Mission 2 - Bird Rights Call," "Mission 3 - MLE Fork"), each with legality checks (`rule_checks`) and payroll/performance/flexibility trade-offs, culminating in a tier/XP/claim-code result.
- pillar: economics
- conceptTerms (verbatim): "Bird Rights", "MLE" (mid-level exception), "apron", "dead-money", "trade exception", "payroll_delta", "flexibility_delta"
- gradeBandEvidence: UNKNOWN in this repo directly (README: "Track 201 Module 1"); TRACK-CONVENTION otherwise
- purpose: APPLY (README frames it as a graded run: "Press `Start Graded Run`")
- delivery: browser, Vite-built SPA, requires `npm install`/`npm run dev` locally; deploy path documented for Vercel
- durationEvidence: UNKNOWN
- facilitation: exam-integrity "attempt lock" system with signed server verification, teacher strict-lock toggle, per-team audit log, tiered claim codes by class period (`period-1`, `period-2`)
- evidenceOutput: tier/XP/claim code display; teacher panel summary; audit history — README calls out "Data panel with VERIFY BEFORE USE markers"
- studentDataProfile: attempt-lock records keyed by class profile, requiring durable KV storage (Redis-compatible) in production per `DEPLOY.md`; no automated tests to verify this is functioning end-to-end
- maturitySignal: no automated tests (only syntax/schema/TODO-audit scripts), heavy infra scaffolding (signed keys, KV storage) that appears unverified/undeployed — mismatch between infra ambition and test coverage
- simulationPattern: linear 8-mission-zone 3D exploration/decision game with a hard-locked attempt system
- confidence: VERIFIED for mechanics/vocabulary; UNKNOWN for actual classroom deployment status
- evidence: `M1-201-FINAL/README.md`: "8 mission zones in linear unlock order"; `src/data/missions.js`: `title: "Mission 2 - Bird Rights Call"`

### front-office-city-nfl-capital-run (M2-201-FINAL)
- proposedId: `front-office-city-nfl-capital-run`
- canonicalTitle: "Front Office City: NFL Capital Run"
- path: `M2-201-FINAL/index.html` (`main.js`, `nfl_game.js`, `nfl_rules.js`, `nfl_missions.js`, `world3d.js`)
- whatStudentsDo: Students pick a difficulty (Rookie/Pro/Legend — locking mission/event counts to 6/2, 9/3, or 12/4 respectively) and a team (Chiefs or 49ers only, 2025 snapshot data with cited sources), then rotate through 3 fixed roles in order — Agent → League Office → Owner — resolving missions like "Training Camp Holdout Threat," "Contract Compliance Review," and "Trade Approval Window" that trade off cap room, trust, and franchise value, ending in a per-role report with a review checksum and claim code.
- pillar: economics
- conceptTerms (verbatim): "dead-cap", "cap/trust tradeoffs", "compliance checks", "tampering", "Franchise Value Strategy," "Stadium Revenue Allocation"
- gradeBandEvidence: VERIFIED — `README.md`: "NFL-only 3D front-office simulation for middle school learners (7th/8th grade)."
- purpose: APPLY
- delivery: browser, static (no build tool despite complexity), servable via `python3 -m http.server`
- durationEvidence: UNKNOWN
- facilitation: End-of-run report with gate outcomes, per-role summary, AI comparison, teacher review checksum; CSV export with a final summary row
- evidenceOutput: CSV export (`review_checksum` field), claim code format `M1-201-NFL-{DIFF}-{TEAM}-{XXX}` (note: prefix says "M1-201" despite this being the M2 repo — unresolved naming inconsistency, flagged for human review)
- studentDataProfile: per-decision CSV rows + summary row; no explicit PII fields beyond team/difficulty/role/decision observed in this pass
- maturitySignal: real test suite (`tests/csv.test.js`, `tests/nfl-engine.test.js`), GitHub Actions CI (`ci.yml`, runs `npm test` on push/PR), deterministic balance-simulation harness (`scripts/simulate-balance.mjs`), `docs/mission-matrix.md` documentation — highest overall engineering maturity of any repo in this set
- simulationPattern: role-rotation (3 fixed roles) multi-mission decision sim with difficulty-scaled mission/event counts
- confidence: VERIFIED
- evidence: `M2-201-FINAL/README.md`: "NFL-only 3D front-office simulation for middle school learners (7th/8th grade)"; `docs/mission-matrix.md`: mission table with "AGENT-002 | Training Camp Holdout Threat"
