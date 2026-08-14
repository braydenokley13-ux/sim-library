# Discovery report — standalone-games

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

# BOW Sports Capital — Repo Investigation Report

## Repo-Level Summaries

### 1. `/workspace/acct/GAUNTLET`
Landing page ("BOW Mastery Layer") linking to 4 fully-built standalone HTML sims plus one locked/unbuilt placeholder ("NBA Team Manager — SEE", `class="coming-soon"`, button reads "🔒 Coming Soon" — **not implemented, exclude**). Pure vanilla HTML/CSS/JS, no framework, no build step. **4 distinct student-facing sims.** Deployment: L2 has a live Google Apps Script `webAppUrl` wired for auto-submission; L1's `webAppUrl` is still the placeholder `'YOUR_WEB_APP_URL_HERE'` (unfinished integration); L3 and Boss Sim use a manual claim-code / "BOW Finish Form" pattern instead of a fetch call. Single squashed commit, no grade-band text anywhere in the repo.

### 2. `/workspace/acct/BSC-anythingelse`
Next.js 16 / React 19 / Tailwind app titled "Advanced GM Simulations — BOW SPORTS CAPITAL — BONUS ACTIVITIES." **Contains far more than the 3 titles flagged** — the landing `app/page.tsx` explicitly enumerates "7 new activities" (actually 8): 5 full React route-based "MAIN_SIMS" (Blockbuster, LeBron Files, Dumpster Fire, Ground Zero, Rookie Deal) each 600–1100+ lines, plus 3 static "MINI_GAMES" HTML files in `/public` (Endorsement Empire, Fill My Building, Tank Commander — the ones named in the task brief). All 8 have a working `'5-6' | '7-8'` grade-band toggle. Completion tracked only in `localStorage` (`lib/gradeStorage.ts`) — no server, no email capture, no README, no CI config found.

### 3. `/workspace/acct/BSC-BUILDANALYTIC`
"Sports Analytics Lab" (Alpine.js) with a landing page cleanly separating two grade-banded tracks plus a facilitator tool. **2 distinct student-facing sims** ("Stat Inventor" = track101, "Analytics Lab" = track201) **+ 1 facilitator-only tool** ("Teacher Collector" — confirmed NOT student-facing, see below). Real 2024-25 season player data hardcoded in `assets/js/players.js`. Latest commit: "BSC-BUILDANALYTIC v2 — full upgrade across all pillars." No server backend; student work exported via base64-encoded share-link the student copies and the teacher manually pastes into Teacher Collector.

### 4. `/workspace/acct/league-in-a-box`
**ONE simulation duplicated across two implementations**: a self-contained 61KB `index.html` (vanilla JS) and a React/Vite rewrite (`src/league-in-a-box-advanced.jsx`, 991 lines) built to `docs/` (committed build output — GitHub Pages convention = real deployment evidence). Not tied to any backend; runs entirely client-side. **Important contradiction of the "standalone, not tied to a numbered Track" framing**: the source itself labels the intro screen "Track 101 Capstone" (`src/league-in-a-box-advanced.jsx` line ~587).

### 5. `/workspace/acct/entrepuernurship`
"BOW — Step 3 — Entrepreneurship Lab (Sim 1): Unit Economics." **Appears BROKEN as checked out.** `entrepeurneurship/index.html` does not load `state.js` (`grep -c "state.js" index.html` → 0), yet `sim1.js` calls `assertDeps()` on `DOMContentLoaded`, which explicitly `throw new Error("state.js not loaded...")` if `loadModuleProgress`/`saveModuleProgress` aren't defined — they live only in the unloaded `state.js`. `state.js` itself is malformed: it's literally an LLM patch dump containing a JS module followed by an entire second copy of `index.html` pasted as a code comment (`// ==============================\n// entrepreneurship/index.html (REPLACE FILE CONTENT)`), never split out. Progress-tracking references `sim2Completed`/`sim3Completed` but no `sim2.js`/`sim3.js` exist anywhere in the repo — **only Sim 1 of an intended 3-part module was ever built.**

### 6. `/workspace/acct/bow-prospect-builder`
Single 166-line static HTML **form** that POSTs to a Google Forms `formResponse` endpoint (prospect name, position, strengths/weaknesses, "calling-card skill"). Copy promises "BOW's Scouting Engine will generate a real Draft Combine Report, NBA Comparison, projected draft slot, and your claim code" — **but no such engine exists anywhere in this repo**: no scoring code, no decision loop, no consequence logic, no game state. It is a data-collection widget, not a simulation.

### 7. `/workspace/acct/scout-model`
"The GM's Model" (single-page React-via-Babel-standalone app). **Duplicated 4x** in the repo: `index.html`, `INDEX`, `Bow Simulation.rtf`, and `TRUE SIM` are all near-identical copies of the same ~800-line app (confirmed via `diff` and matching `CLAIM_PREFIX` strings). `.github/workflows/static.yml` is **broken/mis-saved**: its contents are HTML (a 5th copy of the app), not valid YAML, so any GitHub Actions deploy workflow relying on it would fail. **Contradicts the "standalone, not numbered-Track" framing**: `CLAIM_MASTER = { TRACK_ID: "301", MODULE_ID: "2", LESSON_ID: "5", CLAIM_PREFIX: "L5-301-M2" }` explicitly ties this to Track 301 / Module 2 / Lesson 5.

### 8. `/workspace/acct/what-counts-as-best`
"What Counts as Best? — Student Ranking Investigation" — a polished 7-page React/Babel single-file app (`index.html` is just a meta-refresh redirect to the real file). Explicitly self-labeled **"Theory of Knowledge · Culminating Investigation"** (IB TOK — typically an 11th/12th-grade IB Diploma assignment, not Grade 5-8). Mechanic: students weight 8 criteria (championships, scoring, playmaking, defense, efficiency, longevity, peak dominance, cultural impact) via sliders to rank NBA GOATs, watch rankings shift live, then reflect on subjectivity/objectivity. **No economics or financial-literacy vocabulary anywhere in the source.**

### 9. `/workspace/acct/bernath-test-5`
"Sabrina's Math Dungeon" — an RPG battle-engine trigonometry/pre-calc practice game (Law of Sines, Law of Cosines, parametric equations, polar coordinates — see `data/world1-sines.js` formula reference block). Zero references to BOW, sports, economics, or financial literacy anywhere in the codebase (`grep -rni "BOW|sports capital|NBA|NFL|MLB"` → no hits). This is a completely different product in a completely different subject domain that happens to sit in this account.

---

## Distinct Student-Facing Experiences

### GAUNTLET repo

**1.**
- proposedId: `gauntlet-l1-market-master`
- canonicalTitle: "Gauntlet L1: Market Master" (also "🎯 MARKET MASTER" in-app)
- path: `GAUNTLET/gauntlet-l1/index.html`
- whatStudentsDo: Students run a lemonade stand for 5 rounds, setting price and production while managing fixed/variable costs and reacting to random "Market Event" banners; the goal is "maximize profit over 5 rounds."
- pillar: economics
- conceptTerms: "Price elasticity", "Elasticity", "Reputation", "Revenue" (verbatim from stat labels/headings)
- gradeBandEvidence: UNKNOWN (no grade text found in file)
- purpose: skill-building ("Master economic fundamentals through progressive challenges" — repo `index.html`)
- delivery: solo, browser, single HTML file
- durationEvidence: "15" min / "50–100" XP / "4/10" diff (from `GAUNTLET/index.html` card)
- facilitation: `CONFIG.webAppUrl: 'YOUR_WEB_APP_URL_HERE'` — placeholder, **not deployed/wired**
- evidenceOutput: intended fetch POST to Apps Script (non-functional as configured)
- studentDataProfile: none captured (backend not wired)
- maturitySignal: functionally complete UI/game loop but backend submission unconfigured
- simulationPattern: round-based single-player resource/pricing loop (5 rounds)
- inclusionArgument: INCLUDE — genuine decisions (price/production) with quantified consequences (profit, reputation) and real supply/demand vocabulary; flag the unwired backend as a known gap
- confidence: VERIFIED (mechanics/vocab), INFERRED (deployment status)
- evidence: `GAUNTLET/gauntlet-l1/index.html:6` `<title>BOW Mastery - Gauntlet L1: Market Master</title>`; line 356: "maximize profit over 5 rounds"; line 495: `webAppUrl: 'YOUR_WEB_APP_URL_HERE'`

**2.**
- proposedId: `gauntlet-l2-supply-chain-crisis`
- canonicalTitle: "Gauntlet L2: Supply Chain Crisis"
- path: `GAUNTLET/GauntletL2/index.html`
- whatStudentsDo: Students manage a sporting-goods store selling 3 products (basketballs, jerseys, water bottles) across 6 rounds, each with its own cost, storage footprint, demand elasticity, and supply reliability; they order inventory, set prices, and navigate cash flow and storage-limit constraints.
- pillar: economics
- conceptTerms: "Supply Chain", "Elasticity", "Revenue", "profit margin", "priceElasticity" (code var)
- gradeBandEvidence: UNKNOWN
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "25" min / "60–150" XP / "6/10" diff
- facilitation: automated — real deployed `webAppUrl: 'https://script.google.com/macros/s/AKfycbyZ8QJTy4Wdr_ds211hB8GEEz6CRbhsqp2EGiQDW7CK6X6tGHd0EO-eLLIQF15RavrK/exec'`
- evidenceOutput: POSTs `{email, simulationType:'GAUNTLET', level:2, score, tier, xp, timestamp, gameData:{finalCash,totalProfit,totalRevenue,totalCosts,...}}` to Google Apps Script
- studentDataProfile: student email + score/tier/xp/full financial gameData sent to a school-owned Sheet
- maturitySignal: fully deployed and wired, most production-ready of the four
- simulationPattern: round-based multi-SKU inventory/pricing loop (6 rounds)
- inclusionArgument: INCLUDE — richest mechanics of the set and only one with confirmed live backend
- confidence: VERIFIED
- evidence: `GAUNTLET/GauntletL2/index.html:6` `<title>BOW Mastery - Gauntlet L2: Supply Chain Crisis</title>`; line 667 `webAppUrl`; line 1233-1249 `submitResults`

**3.**
- proposedId: `gauntlet-l3-economic-policy-simulator`
- canonicalTitle: "Gauntlet L3: Economic Policy Simulator"
- path: `GAUNTLET/gauntlet-l3/index.html`
- whatStudentsDo: As "Chief Economic Advisor" for a city in crisis, students choose fiscal, monetary, and trade policy options each quarter across 8 quarters (2 in-game years), balancing unemployment, inflation, GDP growth, and public approval; the engine applies a Phillips-curve relationship and pending/delayed policy effects.
- pillar: economics
- conceptTerms: "unemployment", "Inflation", "GDP", "Deficit", "fiscal", "monetary", "trade policy" (from mission text: "fiscal, monetary, and trade policy decisions")
- gradeBandEvidence: UNKNOWN
- purpose: skill-building (highest difficulty tier in the Gauntlet)
- delivery: solo, browser
- durationEvidence: "35" min / "100–200" XP / "8/10" diff
- facilitation: manual claim-code — "Submit this code in the BOW Finish Form to claim your XP!" (no automated fetch)
- evidenceOutput: on-screen completion code + downloadable results
- studentDataProfile: none captured automatically; relies on student self-reporting a code into a separate form
- maturitySignal: fully built, most economically sophisticated logic (explicit Phillips curve comment), but not backend-integrated
- simulationPattern: turn/quarter-based policy-selection loop with delayed/future impacts
- inclusionArgument: INCLUDE — deepest macro concept coverage in the Library candidate set
- confidence: VERIFIED
- evidence: `GAUNTLET/gauntlet-l3/index.html:441` "You are the Chief Economic Advisor... largest factory just closed, laying off 2,000 workers"; line 1184 `// PHILLIPS CURVE: Low unemployment tends to increase inflation`; line 601 "Submit this code in the BOW Finish Form"

**4.**
- proposedId: `bow-boss-sim-economic-summit`
- canonicalTitle: "BOW Boss Sim - Economic Summit"
- path: `GAUNTLET/Boss Sim/index.html`
- whatStudentsDo: Two students (paired) role-play one city among five in a "Regional Economic Recovery" negotiation against 3 AI-controlled cities over 6 rounds — opening statements, coalition formation, a $100M budget allocation, and final negotiation — needing 3 of 4 votes to pass a plan while keeping approval above 50%.
- pillar: economics
- conceptTerms: "Coalition", "Budget Allocation", "tariff", "unemployment", "GDP"
- gradeBandEvidence: UNKNOWN
- purpose: assessment/capstone ("Multiplayer Challenge... negotiate with AI opponents")
- delivery: 2-student partner mode, browser, no server multiplayer sync (both play on one device)
- durationEvidence: "50" min / "125–250" XP / "9/10" diff
- facilitation: manual claim-code, e.g. `BOSS-SIM-${tier}-${initials}-${random}`, plus a **jsPDF-generated PDF** (`BOW_BossSim_${claimCode}.pdf`)
- evidenceOutput: downloadable PDF certificate with claim code; no server call
- studentDataProfile: player names/initials entered locally, embedded in PDF filename/content only
- maturitySignal: fully built, richest negotiation/coalition logic of the whole set
- simulationPattern: round-based multiplayer negotiation with AI opponents and coalition/vote mechanics
- inclusionArgument: INCLUDE — the only true 2-student negotiation experience in the assigned repos
- confidence: VERIFIED
- evidence: `GAUNTLET/Boss Sim/index.html:6` `<title>BOW Boss Sim - Economic Summit</title>`; line 623 "Five cities in a regional alliance... negotiate with three AI-controlled cities"; line 1619 `claimCode = \`BOSS-SIM-${tier}-${initials}-${random}\``

*(Excluded: "NBA Team Manager / SEE" — `class="coming-soon"`, button is a locked placeholder, no implementation exists.)*

---

### BSC-anythingelse repo

**5.**
- proposedId: `the-blockbuster`
- canonicalTitle: "The Blockbuster"
- path: `BSC-anythingelse/app/blockbuster/page.tsx`
- whatStudentsDo: Students act as a GM building a trade: pick a scenario, select outgoing/incoming players and picks, negotiate with an AI counterparty across negotiation rounds, and must satisfy salary-matching rules to close a deal.
- pillar: economics
- conceptTerms: "Trade Mechanics", "Salary Matching", "AI Negotiation" (from `MAIN_SIMS` tags)
- gradeBandEvidence: "5th–6th Grade" / "7th–8th (Hard Mode)" toggle — `app/blockbuster/page.tsx` line 132
- purpose: skill-building
- delivery: solo, browser (Next.js route)
- durationEvidence: "~15 min" (`app/page.tsx`)
- facilitation: none automated
- evidenceOutput: `saveCompletion('/blockbuster', grade)` to `localStorage` only
- studentDataProfile: none (no name/email fields found)
- maturitySignal: fully built (624 lines), multi-stage negotiation state machine
- simulationPattern: stage-based negotiation loop with AI counter-offers
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `app/page.tsx` MAIN_SIMS entry "Build a franchise-altering trade from scratch. Propose, negotiate, and close deals. AI GMs counter your offers."; `app/blockbuster/page.tsx:132` `{t === '5-6' ? '5th–6th Grade' : '7th–8th (Hard Mode)'}`

**6.**
- proposedId: `the-lebron-files`
- canonicalTitle: "The LeBron Files"
- path: `BSC-anythingelse/app/lebron-files/page.tsx`
- whatStudentsDo: 5 sequential career decision points — team selection, contract, endorsements, business/investments, "the Bronny Decision" — where each choice cascades into the next and produces a final "legacy grade."
- pillar: cross-pillar (career/contract economics + endorsement/investment financial literacy)
- conceptTerms: "Contracts", "Endorsements", "Investments", legacy scoring bands (A+/A/B+/B/C)
- gradeBandEvidence: "5th–6th Grade" / "7th–8th (Hard)" — `app/lebron-files/page.tsx` line 204
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~20 min"
- facilitation: none automated
- evidenceOutput: `saveCompletion` to `localStorage`; `GradeRevealPrompt` component
- studentDataProfile: none
- maturitySignal: largest file in the repo (1043 lines), fully built
- simulationPattern: 5-stage branching career-decision cascade
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `app/page.tsx` "5 career decision points. Every choice cascades into the next."; line 958 `legacyGrade = career.legacyScore >= 85 ? 'A+' : ...`

**7.**
- proposedId: `the-dumpster-fire`
- canonicalTitle: "The Dumpster Fire"
- path: `BSC-anythingelse/app/dumpster-fire/page.tsx`
- whatStudentsDo: Students inherit a team's "cap nightmare" (aging max contracts, no draft picks, over the luxury tax) and must use rebuild tools (Trade, Stretch Provision, Buyout, Mid-Level Exception) across 3 in-game years to escape the cap crunch, with random "press conference" events between years.
- pillar: financial-literacy (debt/cap-constraint management) with sports framing
- conceptTerms: "Stretch Provision", "Luxury Tax", "MLE" / "Mid-Level Exception", "cap space"
- gradeBandEvidence: "5th–6th Grade" / "7th–8th (Hard)" — line 377
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~15 min", "3-Year Arc"
- facilitation: none automated
- evidenceOutput: `localStorage` via `saveCompletion`
- studentDataProfile: none
- maturitySignal: fully built (877 lines)
- simulationPattern: 3-year turn loop with tool-based decisions and random events
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `app/dumpster-fire/page.tsx:389` "take over a real team's worst financial situation. You have tools: Trade, Stretch, Buyout, MLE... Press conferences between years add random events!"

**8.**
- proposedId: `ground-zero`
- canonicalTitle: "Ground Zero"
- path: `BSC-anythingelse/app/ground-zero/page.tsx`
- whatStudentsDo: Students build a brand-new expansion franchise via an expansion draft (picking unprotected players) plus free agency, simulate Year 1 against an AI rival team, and are shown a "win formula" breakdown at the end.
- pillar: economics
- conceptTerms: "Expansion Draft", "Free Agency", "Roster Building", "cap space"
- gradeBandEvidence: "5th–6th Grade" / "7th–8th (Hard)" — line 148
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~15 min"
- facilitation: none automated
- evidenceOutput: `localStorage`
- studentDataProfile: none
- maturitySignal: fully built (835 lines)
- simulationPattern: draft phase → free agency phase → simulated season vs AI
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `app/ground-zero/page.tsx:165` "1. ... 2. ... 3. Expansion Draft — pick unprotected players from existing teams"; `finalScore:{wins, capFlexibility, fanGrowth, aiWins}`

**9.**
- proposedId: `the-rookie-deal`
- canonicalTitle: "The Rookie Deal"
- path: `BSC-anythingelse/app/rookie-deal/page.tsx`
- whatStudentsDo: Students act as an agent for a top-5 draft pick, navigating a rookie-scale contract, a shoe-deal choice, a development-focus choice, and eventually an extension-vs-free-agency decision; a final performance score maps to a letter grade/label (e.g., "Franchise Cornerstone").
- pillar: financial-literacy (contract/negotiation economics)
- conceptTerms: "Rookie Scale", "Shoe Deals", "Extension vs. FA"
- gradeBandEvidence: UNKNOWN in this specific file check (toggle present in sibling sims; not explicitly grepped as "5-6"/"7-8" text in this file, but `Phase`/`gradeFromScore` present — INFERRED consistent pattern)
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~12 min"
- facilitation: none automated
- evidenceOutput: `gradeRevealed` UI reveal, no server
- studentDataProfile: none
- maturitySignal: fully built (1138 lines, largest by decision count)
- simulationPattern: linear multi-phase negotiation (Draft Night → Shoe Deal → Dev Focus → Year 3 → Extension → Outcome)
- inclusionArgument: INCLUDE
- confidence: VERIFIED (mechanics), INFERRED (grade toggle presence — file confirmed to have phases named identically to siblings but grade-band string not directly quoted in my grep)
- evidence: `app/rookie-deal/page.tsx:56` `function gradeFromScore(score)`; steps array `['Draft Night','Shoe Deal','Dev Focus','Year 3','Extension','Outcome']`

**10.**
- proposedId: `endorsement-empire`
- canonicalTitle: "Endorsement Empire"
- path: `BSC-anythingelse/public/endorsement-empire.html`
- whatStudentsDo: Students build a personal brand over 3 seasons, picking endorsement deals, managing "image," surviving random events, and trying to beat an AI rival's brand portfolio.
- pillar: financial-literacy
- conceptTerms: "brand value", "3 seasons of brand building"
- gradeBandEvidence: "5th–6th Grade (with hints)" / "7th–8th Grade (Hard Mode)" — `public/endorsement-empire.html:113-114`
- purpose: skill-building, quick-play
- delivery: solo, browser (static HTML, not React)
- durationEvidence: "~8 min" (landing card); "3 seasons" in-app
- facilitation: none automated
- evidenceOutput: none found beyond in-page score card
- studentDataProfile: none
- maturitySignal: fully built single-file HTML
- simulationPattern: season-based deal-selection loop vs AI rival
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `public/endorsement-empire.html:6` `<title>Endorsement Empire — BSC</title>`; line 71 "📅 3 seasons of brand building"

**11.**
- proposedId: `fill-my-building`
- canonicalTitle: "Fill My Building"
- path: `BSC-anythingelse/public/fill-my-building.html`
- whatStudentsDo: Students run an NBA arena for a season, setting ticket prices, concessions markup, parking, and special events via sliders while watching a real demand curve — "raise prices too much → attendance drops → revenue drops" — ending in a "Season Grade."
- pillar: economics
- conceptTerms: "demand curve", "Season Grade", price sensitivity ("Fans hate over $50")
- gradeBandEvidence: "5th–6th Grade (with hints)" / "7th–8th Grade (Hard Mode)" — lines 98-99
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~10 min"
- facilitation: none automated
- evidenceOutput: in-page "Season Grade" only
- studentDataProfile: none
- maturitySignal: fully built
- simulationPattern: month-by-month pricing-slider loop with real-time revenue/attendance feedback
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `public/fill-my-building.html:70` "the demand curve is real: raise prices too much → attendance drops → revenue drops"

**12.**
- proposedId: `tank-commander`
- canonicalTitle: "Tank Commander"
- path: `BSC-anythingelse/public/tank-commander.html`
- whatStudentsDo: Students manage a rebuilding season, each month choosing to COMPETE or TANK, watching real NBA-style draft-lottery odds shift (worst team only 14% for #1 pick) while risking an "NBA investigation" for over-tanking.
- pillar: economics (incentive design / probability under constraint)
- conceptTerms: "lottery odds", "competitive balance", "anti-tanking rules"
- gradeBandEvidence: "5th–6th Grade (with hints)" / "7th–8th Grade (Hard Mode)" — lines 88-89
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: "~7 min"
- facilitation: none automated
- evidenceOutput: none found beyond in-page
- studentDataProfile: none
- maturitySignal: fully built
- simulationPattern: month-based binary decision loop (compete/tank) with probabilistic lottery resolution
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `public/tank-commander.html:66` "worst team only has 14% chance at #1"; line 82 "Notice: The difference between 14% and 8% is small. Extreme tanking isn't guaranteed to pay off."

---

### BSC-BUILDANALYTIC repo

**13.**
- proposedId: `stat-inventor`
- canonicalTitle: "Stat Inventor"
- path: `BSC-BUILDANALYTIC/track101/index.html`
- whatStudentsDo: Students explore real player stats (NBA/NFL QB-WR/MLB Hitter-Pitcher), star/favorite players, then invent their own weighted scoring formula ("Build Your Stat") to crown a champion, expressed in plain-English formula language.
- pillar: cross-pillar (data-literacy/analytics with economic-adjacent "what makes value" framing)
- conceptTerms: "Formula: " (formula-english label), "star" weighting
- gradeBandEvidence: "Grades 5–6" — `BSC-BUILDANALYTIC/index.html:162`
- purpose: skill-building
- delivery: solo, browser
- durationEvidence: UNKNOWN (no time estimate found)
- facilitation: student generates a "Copy Share Link" consumed by the separate Teacher Collector tool
- evidenceOutput: base64-encoded share link (client-side only)
- studentDataProfile: no explicit name field confirmed in track101 (grade/name capture confirmed only in track201)
- maturitySignal: fully built
- simulationPattern: explore → build weighted formula → leaderboard reveal
- inclusionArgument: INCLUDE — real decision (what to weight) with a visible consequence (who wins)
- confidence: VERIFIED
- evidence: `BSC-BUILDANALYTIC/index.html:160-166` "Explore player data, build your own scoring formula using stars, and crown your champion" / "Grades 5–6"

**14.**
- proposedId: `analytics-lab`
- canonicalTitle: "Analytics Lab"
- path: `BSC-BUILDANALYTIC/track201/index.html`
- whatStudentsDo: A 4-panel flow (Pick Sport → Explore → Build Stat → Report) where students explore a full stat dataset, build a weighted custom metric with live weight sliders, view percentile/scatter/correlation visualizations, run a "What-If" simulator, and write/export a scouting report as a PDF with their name.
- pillar: cross-pillar
- conceptTerms: "percentile scores", "scatter & stacked charts", "What-If simulator", "weight-bar", "diversity badge"
- gradeBandEvidence: "Grades 7–8" — `BSC-BUILDANALYTIC/index.html:171`
- purpose: skill-building/assessment (produces exportable artifact)
- delivery: solo, browser
- durationEvidence: UNKNOWN
- facilitation: "Copy Share Link" workflow feeding the Teacher Collector dashboard
- evidenceOutput: PDF export (`fname = studentName + '_' + statName + '.pdf'`) + base64 share-link state
- studentDataProfile: student name captured client-side, embedded in shareable URL hash and exported PDF filename; no server storage
- maturitySignal: most sophisticated file in the repo (56KB)
- simulationPattern: 4-panel guided-inquiry pipeline (explore data → build weighted model → analyze/compare → report)
- inclusionArgument: INCLUDE
- confidence: VERIFIED
- evidence: `BSC-BUILDANALYTIC/index.html:169-174` "Full dataset · percentile scores · scatter & stacked charts · What-If simulator · share & export" / "Grades 7–8"; `assets/js/track201.js:718` `btoa(unescape(encodeURIComponent(JSON.stringify(state))))`

*(Excluded: "Teacher Collector" — `BSC-BUILDANALYTIC/teacher/index.html`. This is a facilitator dashboard: "Paste student share links — see class-wide analytics instantly," textarea for pasting up to 30 student links, CSV export. No student ever operates this screen as a learner; it consumes the output of track101/track201. Confirmed NOT a student-facing simulation.)*

---

### league-in-a-box repo

**15.**
- proposedId: `the-league-in-a-box`
- canonicalTitle: "The League in a Box"
- path: `league-in-a-box/index.html` (standalone HTML build) and `league-in-a-box/src/league-in-a-box-advanced.jsx` (React/Vite rewrite, built output in `docs/`) — **same experience, two implementations, treat as one Library entry**
- whatStudentsDo: Students configure 9 league-governance "levers" (salary cap, revenue sharing, luxury tax, contract limits, draft order, rookie scale, expansion pace, revenue source, player mobility, enforcement) on a 3-position slider each, then "Ratify" the rules; the engine computes a 6-axis profile (owner_control, player_power, parity_focus, growth_priority, market_freedom, stability_focus), assigns a league "archetype identity," and shows a "Stakeholder Consequence Matrix" of who wins/loses under their design.
- pillar: economics
- conceptTerms: "Wage Constraint Architecture" (salary cap), "Interclub Revenue Redistribution" (revenue sharing), "Progressive Spending Penalties" (luxury tax), "Labor Mobility Constraints", "Competitive Integrity Governance"
- gradeBandEvidence: UNKNOWN (no grade text found)
- purpose: capstone/assessment — self-labeled "Track 101 Capstone" in the source itself (see repo note above; contradicts "standalone" framing)
- delivery: solo, browser
- durationEvidence: UNKNOWN
- facilitation: none automated; share text references "BOW Sports Capital's Track 101"
- evidenceOutput: none server-side; on-screen "identity" + "Stakeholder Consequence Matrix" only
- studentDataProfile: none captured
- maturitySignal: fully built, real deployment evidence (`docs/` committed Vite build output, GitHub Pages pattern)
- simulationPattern: single-pass configuration → computed-consequence reveal (not round-based)
- inclusionArgument: INCLUDE as a Library entry BUT flag for review — source text explicitly frames it as tied to numbered "Track 101," conflicting with the "standalone, not tied to a numbered Track" assumption given for this batch; may belong to the Track 101 lesson catalog instead of (or in addition to) the standalone Library.
- confidence: VERIFIED
- evidence: `src/league-in-a-box-advanced.jsx:587` "Track 101 Capstone"; line 973 "Check out BOW Sports Capital's Track 101 to understand league governance."; `docs/` build output present in git, not gitignored

---

### entrepuernurship repo

**16.**
- proposedId: `entrepreneurship-lab-sim1-unit-economics`
- canonicalTitle: "BOW — Step 3 — Entrepreneurship Lab (Sim 1)" / subtitle "Sim 1: Unit Economics"
- path: `entrepuernurship/entrepeurneurship/index.html`
- whatStudentsDo: Students set a Price ($5-50) and per-period Capacity (10-200 units) for a business, then "Start Run" and watch 10 simulated periods tick by, where a linear demand curve determines units sold, and Cash/Runway/Profit-per-Period/Demand-vs-Sold charts update; the goal is to "survive 10 periods without cash hitting $0."
- pillar: financial-literacy (cash runway, burn rate) / economics (unit margin, demand curve) — cross-pillar
- conceptTerms: "unit economics" (subtitle), "fixedCost", "variableCost", "demandSlope", "runway", "marginPerUnit", "Break-even" (preset button)
- gradeBandEvidence: UNKNOWN
- purpose: skill-building, described as one of an intended 3-sim module ("Sim 1" of `sim1Completed/sim2Completed/sim3Completed`)
- delivery: solo, browser
- durationEvidence: UNKNOWN (10 periods, no minute estimate)
- facilitation: intended `state.js`-based localStorage module-progress + generated "ENT-M1-" completion code — **not functional as wired**
- evidenceOutput: intended completion code, currently broken
- studentDataProfile: none (no name/email field)
- maturitySignal: **appears broken/abandoned** — `index.html` never loads `state.js`, so `sim1.js`'s own `assertDeps()` guard will throw `"state.js not loaded. Ensure state.js is loaded before sim1.js."` on page load; the "howto" card with strategy-preset buttons (High Margin/High Volume/Balanced/Break-even) present in the live `index.html` has no corresponding event listeners in `sim1.js` (dead UI); only 1 of an intended 3 sims exists (no `sim2.js`/`sim3.js` anywhere in repo)
- simulationPattern: fixed 10-period tick loop against a static linear demand function
- inclusionArgument: INCLUDE with a strong caveat — the underlying mechanic (unit economics/runway) is real and pedagogically sound, but the shipped build is currently non-functional and only 1/3 of the intended module was built; recommend excluding until fixed, or including with an explicit "broken" maturity flag
- confidence: VERIFIED (breakage), VERIFIED (mechanics)
- evidence: `entrepeurneurship/index.html` — no `state.js` script tag present; `entrepeurneurship/sim1.js:44-48` `function assertDeps(){ if (typeof Chart === "undefined") {...} if (typeof loadModuleProgress !== "function" ...) { throw new Error("state.js not loaded. Ensure state.js is loaded before sim1.js."); } }`; `entrepeurneurship/state.js:6` `const MODULE_ID = "entrepreneurship_m1";` with `sim1Completed, sim2Completed, sim3Completed` fields but no sim2/sim3 files exist

---

## Excluded (Not Library Entries)

**`bow-prospect-builder`** (`bow-prospect-builder/index.html`) — EXCLUDE. This is purely a Google Forms intake widget (`<form action="https://docs.google.com/forms/.../formResponse">`) collecting freeform prospect text (name, position, strengths, weaknesses). No decision mechanics, no scoring, no consequence logic, no game state exist anywhere in the repo. The promised "Draft Combine Report, NBA Comparison, projected draft slot" generation is not implemented in this codebase — whatever engine would produce it (if any) lives outside this repo. This is a data-collection tool, not a learning experience.

**`scout-model`** (`scout-model/index.html` "The GM's Model") — Judgment call, leaning INCLUDE with flags. The core interaction (select 3-5 weighted evaluation factors → rank real players → compare against peer "GM" models → jump forward to "Three Years Later (2029)" and confront the model's blind spots → closing lesson "Models Don't Know When They're Obsolete") is a genuine, well-built decision/consequence experience about evaluation bias and model limitations. However: (1) the repo is riddled with duplicate-content pathology — the same app is pasted 4-5 times across `index.html`, `INDEX`, `Bow Simulation.rtf`, `TRUE SIM`, and even `.github/workflows/static.yml` (which contains HTML, not YAML, breaking any CI deploy); (2) it is explicitly tied to a numbered track via `CLAIM_MASTER = {TRACK_ID:"301", MODULE_ID:"2", LESSON_ID:"5", CLAIM_PREFIX:"L5-301-M2"}`, contradicting the "standalone, not tied to a numbered Track" premise for this batch. Recommend the reviewer confirm whether this belongs in the standalone Library or should be filed under Track 301 instead, and clean up the duplicate files before cataloging.
- conceptTerms if included: none explicitly economics-labeled — the taught concept is *model bias/evaluation methodology*, applied to basketball scouting rather than to finance/econ vocabulary directly.

**`what-counts-as-best`** (`What Counts as Best.html`) — EXCLUDE (pillar mismatch). This is a well-built, 7-page interactive investigation (weighted-criteria sliders re-rank NBA GOAT candidates live), but it is explicitly self-labeled "Theory of Knowledge · Culminating Investigation" — an IB TOK critical-thinking exercise, not an economics or financial-literacy lesson. No economics/finlit vocabulary appears anywhere in the source; the taught content is epistemology (subjectivity vs. objectivity in ranking systems). Grade-band evidence also points away from Grade 5-8 middle school (TOK is normally an IB Diploma Programme course for grades 11-12). Recommend excluding from the BOW Economics/FinLit Library as out-of-scope for the stated pillars, even though it is technically a strong, non-broken simulation.

**`bernath-test-5`** ("Sabrina's Math Dungeon") — EXCLUDE (wrong subject entirely). Confirmed via full-repo grep to contain zero references to BOW, sports, economics, or financial literacy. It is a trigonometry/pre-calculus RPG practice game (Law of Sines, Law of Cosines, parametric equations, polar coordinates). This repo does not belong in a BOW Economics/FinLit Library under any pillar.

---

## Cross-Repo Notes for the Reviewer
- **Grade-band pattern**: BSC-anythingelse and BSC-BUILDANALYTIC both implement an explicit "5th–6th Grade" / "7th–8th Grade" toggle/split, giving strong, verifiable evidence of Grade 5-8 targeting. GAUNTLET, league-in-a-box, entrepuernurship, and scout-model have **no grade-band text at all** — do not infer grade bands for these; report UNKNOWN.
- **Two repos contradict the "not tied to a numbered Track" premise** with hard evidence: `scout-model` (`TRACK_ID:"301", MODULE_ID:"2", LESSON_ID:"5"`) and `league-in-a-box` ("Track 101 Capstone" in-app copy). Both should probably be cross-checked against the Track 101/301 lesson catalogs before final Library placement.
- **BSC-anythingelse under-scoped in the task brief**: the assignment description called out only 3 titles ("Endorsement Empire," "Fill My Building," "Tank Commander"), but the repo actually ships 8 distinct, fully-built student experiences (5 additional full React sims). Worth flagging upstream in case the cataloging brief needs updating.
- **One confirmed broken build**: `entrepuernurship` will throw a JS error on page load in its current committed state due to a missing script include.
- **One confirmed broken CI file**: `scout-model/.github/workflows/static.yml` contains HTML instead of YAML.
