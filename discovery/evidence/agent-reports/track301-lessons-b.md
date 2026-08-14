# Discovery report — track301-lessons-b

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

This confirms a broken image reference (404 on GitHub Pages deploy, since `/301-M2-L2/images/brayden-white.jpg` does not exist in the repo). Now compiling the complete final report.

# BOW Sports Capital — Track 301 (M2–M4) Repo Investigation

Grade band is UNKNOWN for all repos below — no source in any of the 8 repos states a grade level; Track 301 is confirmed executive-level/interest-list only, per the assignment brief.

---

## 301-M2-L2

**What it is:** A Create React App (TypeScript, Zustand, Tailwind, react-scripts 5) NBA front-office management sim living in `sports-management-game/`. Root also has a 1042-line `IMPLEMENTATION_PLAN.md` (a Postgres/Redis/Next.js backend plan that was **never built** — the actual app is 100% client-side) and a companion `Track 301 M2 L2.xlsx` whose sole sheet title is "Track 301 · Module 2 · Lesson 2 — **Strategy Dominance Board**" (an earlier/simpler concept superseded by the React build per the plan doc).
**Student-facing sims:** 1 (multi-screen React app: Intro → Team Selection → Onboarding → Dashboard/Roster/Trades/Free Agency/Draft/Season loop → End Screen).
**Tech stack:** React 19 + TypeScript + Zustand + Tailwind (react-router-dom and framer-motion are installed but unused — dead deps).
**Deployment evidence:** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages; `package.json` `homepage: https://braydenokley13-ux.github.io/301-M2-L2`.
**Duplicate suspicion:** Low — single coherent build; xlsx is a legacy planning artifact, not a parallel delivery.
**Broken/incomplete signals:** Browser tab `<title>` is still the CRA default "React App" (`public/index.html`); the onboarding "tutor" component references a nonexistent image `TeamOnboarding.tsx:6` → `/301-M2-L2/images/brayden-white.jpg`, but no `public/images/` directory exists — this asset will 404 on deploy. Not verified via actual `npm install`/build (static analysis only), but all imports/components referenced in `App.tsx` exist on disk and Tailwind theme colors used in JSX are all defined in `tailwind.config.js`.

**Experience: Risk, Volatility & Rational Aggression (in-app title; app-wide title tag unset)**
- proposedId: `301-m2-l2-risk-volatility-gm-sim`
- canonicalTitle: "Risk, Volatility & Rational Aggression" (IntroPage.tsx h1); subtitle "Track 301 - Module 2 - Lesson 2"
- path: `301-M2-L2/sports-management-game/src/`
- whatStudentsDo: Student picks an NBA team (one of 5 context archetypes: legacy_power, small_market_reset, revenue_sensitive, cash_rich_expansion, star_dependent) and a strategy (`stability_first`/`aggressive_push`/`boom_bust_swing`), then runs the team for 3 simulated seasons — drafting, trading, signing free agents, managing salary cap/luxury tax — before receiving a final evaluation and claim code.
- pillar: economics
- conceptTerms (verbatim): "Risk, Volatility & Rational Aggression"; "Rational Aggression" vs "Rational Caution" vs "Irrational Risk"; "Risk-Context Alignment"; "salary cap"; "luxury tax"; "repeater tax"; "salary floor"; volatility metrics field names `winVariance`, `volatilityRating: 'stable'`
- gradeBandEvidence: UNKNOWN
- purpose: APPLY (multi-season decision practice under an evaluation rubric)
- delivery: single-page React app, GitHub Pages static hosting
- durationEvidence: `IMPLEMENTATION_PLAN.md:967` "Average session: 20-30 minutes" — this is a **planning target in a design doc**, not a confirmed/measured actual duration (INFERRED, not VERIFIED)
- facilitation: UNKNOWN (no teacher-facing material found)
- evidenceOutput: claim code generated client-side in `GameEndScreen.tsx` (`useMemo` `claimCode`) based on weighted score: Risk-Context Alignment 40%, Financial Sustainability 30%, On-Court Results 30% (weights stated in `IntroPage.tsx`)
- studentDataProfile: no name/email capture found in this build (unlike several M3/M4 repos)
- maturitySignal: mid-build — functionally complete state machine and scoring, but unpolished (default page title, broken onboarding photo asset, unused deps)
- simulationPattern: multi-round resource-management/GM sim with branching strategy choice and end-of-run scored evaluation
- confidence: VERIFIED (title, mechanics, scoring formula, deployment workflow all directly read from source)
- evidence: `IntroPage.tsx` ("YOUR GOAL... Demonstrate that you understand when to take risks..."); `GameEndScreen.tsx:5-11` `CONTEXT_RISK_EXPECTATIONS`; `economics.ts:1-14` (`SALARY_CAP=140`, `LUXURY_TAX_THRESHOLD=170`, progressive tax brackets)

---

## 301-M2-L3

**What it is:** A clean, self-contained static site (no build tooling) — "NFL System Stress Test." Three HTML files (`index.html` mode-select landing, `tutorial.html`, `game.html`) plus `css/` and `js/` (scenario DB, scoring, game engine, tutorial logic, UI controller). Companion `Track 301 M2 L3.xlsx` (sheets: System Stress Test / RESULTS / SYSTEM_TRUTH) mirrors the JS content, not a separate delivery mechanism.
**Student-facing sims:** 1 experience with 2 modes (Tutorial Mode and Real Mode share the same scenario/scoring engine and are explicitly described in `README.md` as the practice/assessment pair of one game, not two separate products) — counted as **one** distinct experience.
**Tech stack:** Vanilla HTML/CSS/JS, no dependencies, "Lightweight (~50KB total)" per README.
**Deployment evidence:** README gives explicit GitHub Pages instructions (branch `claude/nfl-stress-test-yNt71` → `https://[username].github.io/301-M2-L3/`); no workflow file, consistent with a no-build static site.
**Duplicate suspicion:** None.
**Broken/incomplete signals:** None found; README explicitly documents "Known Limitations" itself (no backend, static claim codes, no persistence).

**Experience: NFL System Stress Test**
- proposedId: `301-m2-l3-nfl-system-stress-test`
- canonicalTitle: "NFL System Stress Test" (`index.html:6` `<title>`, README H1)
- path: `301-M2-L3/index.html`, `tutorial.html`, `game.html`, `js/nfl-scenarios.js`
- whatStudentsDo: Students read 15 real-NFL stress scenarios across 5 teams (Chiefs, Browns, Patriots, Packers, Ravens), each with a distinct "system profile" (e.g., "Adaptive, Star-Centric"), and classify each as System Needs This / System Absorbs This / System is Strained / System Breaks. Tutorial Mode walks through 3 Chiefs scenarios with answers shown first (ungraded); Real Mode runs all 15 scenarios blind and scored.
- pillar: cross-pillar (economics/systems-thinking framed through sports-org resilience — README calls it "systems thinking," not pure finance)
- conceptTerms (verbatim): "System Needs This" / "System Absorbs This" / "System is Strained" / "System Breaks"; "MATCH / ADJACENT / MISREAD"; "organizational resilience"; "systems thinking"
- gradeBandEvidence: UNKNOWN
- purpose: PRACTICE (Tutorial Mode) feeding into EVIDENCE (Real Mode, scored + claim code)
- delivery: static HTML/CSS/JS, mobile-first responsive, keyboard navigable
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN
- evidenceOutput: tiered claim codes hardcoded in `js/scoring.js`/`js/nfl-scenarios.js`: `L3-301-M2-GOLD-PRESSURE` (9+ matches, 0 critical misreads, 200 XP), `L3-301-M2-SILVER-ANALYST` (150 XP), `L3-301-M2-BRONZE-SYSTEMS` (100 XP) — per README
- studentDataProfile: UNKNOWN from this pass (not grepped for name/email fields; README doesn't mention data collection)
- maturitySignal: polished, documented, complete — most thoroughly self-documented repo in the set
- simulationPattern: scenario-classification / prediction game with tutorial-then-assessment structure, tiered scoring
- confidence: VERIFIED
- evidence: `README.md` full scoring/tier section; `js/nfl-scenarios.js:5-40` (Chiefs scenario data with `actual`, `allowed`, `explanation` fields)

---

## 301-M3-L1

**What it is:** Two co-existing, thematically-linked builds under one lesson code: (1) `html-activity/` — CSS+JS only, **missing its HTML entry point** (git history's sole commit is literally titled "Delete index.html"), and (2) a Google Sheets + Apps Script (`apps script` file) delivery with matching `301 M3L1.xlsx`.
**Student-facing sims:** 1 conceptual experience ("Structural Leverage SIM"), delivered via two channels — the browser channel is currently **broken** (no entry point to load `css/styles.css` or `js/app.js`), the spreadsheet channel appears functionally complete.
**Tech stack:** Vanilla JS/CSS (browser channel, broken) + Google Apps Script/Sheets (spreadsheet channel).
**Deployment evidence:** None for the browser channel (nothing to deploy without an HTML entry point). Spreadsheet channel is self-contained (Apps Script reads/writes the workbook directly); no external hosting needed.
**Duplicate suspicion:** Confirmed same content across two delivery mechanisms — `js/app.js` `ANSWER_KEY` (Phase 1–4, "Harbor"/"Ironclad"/"Summit" companies) matches the xlsx sheet structure (`PHASE_1`…`PHASE_4`, `ANSWER_KEY`, `SCORING_ENGINE`) exactly.
**Broken/incomplete signals:** **Confirmed broken entry point.** `git log --all` shows a single shallow commit `fae8067 Delete index.html`; `git show --stat` on that commit lists only additions (xlsx, apps script, html-activity/css, html-activity/js) — no `index.html` anywhere in the working tree or `git ls-tree -r HEAD`. The `html-activity/` folder cannot currently be opened as a webpage.

**Experience: Structural Leverage SIM / "Structural Leverage Lab"**
- proposedId: `301-m3-l1-structural-leverage-sim`
- canonicalTitle: "Structural Leverage SIM" (`js/app.js:2` comment header; xlsx shared string: "Structural Leverage Lab — Leverage is alternatives, not arguments.")
- path: `301-M3-L1/html-activity/js/app.js` (broken, no HTML entry), `301-M3-L1/apps script`, `301-M3-L1/301 M3L1.xlsx`
- whatStudentsDo: Students read 3 negotiation scenarios (Harbor City, Ironclad, Summit) and, across 4 phases, identify who holds leverage (Team/Player/Balanced), how leverage shifts after market/deadline/shock updates, what drives leverage (replaceability, dependence), and finally complete a "Walk-Away Test" identifying who can credibly say no and the consequence of doing so.
- pillar: economics (negotiation theory / game theory)
- conceptTerms (verbatim): "BATNA" (xlsx: "revisit BATNA and replaceability"); "Leverage is alternatives, not arguments"; "replaceability"; "dependence"; "Walk-Away Test"; "leverage holder"
- gradeBandEvidence: UNKNOWN
- purpose: PRACTICE/APPLY
- delivery: intended as browser HTML/JS/CSS activity backed by Google Sheets scoring; browser delivery currently non-functional
- durationEvidence: UNKNOWN
- facilitation: "Each student uses their own spreadsheet copy" (`apps script` file header comment)
- evidenceOutput: Apps Script computes score out of `TOTAL_POINTS: 23` against Gold/Silver/Bronze thresholds (`GOLD_MIN:21, SILVER_MIN:17, BRONZE_MIN:13`) and writes claim codes to a master spreadsheet tab (`MASTER_CLAIM_CODES_TAB`)
- studentDataProfile: Apps Script requires `STUDENT_NAME_CELL`/`STUDENT_EMAIL_CELL` config keys — collects student name + email into the instructor's master spreadsheet
- maturitySignal: incomplete/regressed — spreadsheet channel is designed and scorable, browser channel is broken (deleted entry point)
- simulationPattern: branching scenario-analysis quiz with phased leverage-tracking and points-based tiering
- confidence: VERIFIED for content/mechanics; INFERRED that browser and sheet channels represent "the same" experience (no direct code linkage found, only structural parallels)
- evidence: `js/app.js:1-62` (ANSWER_KEY, phases); `apps script:1-30`; xlsx shared strings ("BRONZE: Partial understanding; revisit BATNA and replaceability.")

---

## 301-M3-L2

**What it is:** A single 1702-line, self-contained `index.html` — "Signal Engine — Sports Agent Negotiation Sim." Companion `301 M3L2-2.xlsx` (sheets: CONTROL_PANEL, RESULTS, UI_HELP, CONFIG, SIGNAL_CATALOG, TRUE_STATE, BELIEF_STATE, EVENT_LOG) mirrors the HTML's internal data model — appears to be an authoring/design workbook rather than an independent delivery (no `apps script` file present to run it standalone).
**Student-facing sims:** 1.
**Tech stack:** Vanilla HTML/CSS/JS, single file, no dependencies.
**Deployment evidence:** No workflow file; static single-file page, GitHub Pages-ready by nature. Git history: one squashed commit "Merge pull request #2 from .../convert-script-to-html" — implies this was previously a script/spreadsheet concept converted into the current HTML build.
**Duplicate suspicion:** Low — xlsx appears to be a content-authoring source, not a parallel student delivery.
**Broken/incomplete signals:** None found; code is internally consistent (all referenced DOM ids/functions defined).

**Experience: Signal Engine — Sports Agent Negotiation Sim**
- proposedId: `301-m3-l2-signal-engine-negotiation-sim`
- canonicalTitle: "Signal Engine — Sports Agent Negotiation Sim" (`index.html:6` `<title>`; in-game h1 "SIGNAL ENGINE")
- path: `301-M3-L2/index.html`
- whatStudentsDo: Student plays a rookie sports agent representing client "Marcus Chen," a restricted free agent, across 5 negotiation rounds (opening, positioning, pivot, pressure, close). Each round they select from 24 signals (across OPEN/ADVANCED/RESTRICTED/ELITE tiers) that shift the opposing GM's beliefs about Alternatives/Urgency/Fairness while spending Credibility and risking Backlash; contradictory signal sequences and unsupported bluffs are penalized. Ends with a turn-by-turn "Postgame Film Review," a scorecard, and a tiered verdict.
- pillar: economics (negotiation/game theory — asymmetric information and signaling)
- conceptTerms (verbatim): "leverage"; "BATNA perception" (category comment: "create urgency and BATNA perception"); "credibility"; "backlash"; "momentum"; "Hidden Intel"; "Net leverage utility"; "in negotiation, leverage is about managing what the other side believes, not what's actually true"
- gradeBandEvidence: UNKNOWN
- purpose: APPLY/EVIDENCE (scored sequence with claim-code tier)
- delivery: single-page vanilla JS app
- durationEvidence: UNKNOWN (only in-fiction time references like "30-minute meeting" — these are scenario flavor text, not real session duration)
- facilitation: UNKNOWN
- evidenceOutput: "Sequence Scorecard" (rounds played, credibility spent, max backlash, contradictions, strong plays, backfires, synergies, net leverage utility) + tiered verdict box (Gold/Silver/Bronze/None classes in CSS)
- studentDataProfile: captures `nameInput` ("Your full name") and `emailInput` ("Your school email") client-side before play; no network submission code found (`fetch`/`XMLHttpRequest`/Apps Script URL) — data stays in-browser only
- maturitySignal: high — most mechanically sophisticated single-file sim in the set (belief-state modeling, synergy/conflict detection, counterfactual "better alternative" generation)
- simulationPattern: multi-round signaling/negotiation game with hidden-state belief tracking and postgame counterfactual analysis
- confidence: VERIFIED
- evidence: `index.html:355-364` (feature list: "24 Signals... Live Opponent... Random Events... Momentum... Hidden Intel"); `index.html:516` comment "PRESSURE (create urgency and BATNA perception)"; `index.html:1509` "leverage is about managing what the other side believes, not what's actually true"

---

## 301-M3-L3

**What it is:** **Xlsx-only repo** — `301 M3L3-2.xlsx`, no HTML/JS/CSS/Apps Script code at all. Sheets: START_HERE, ROUND_1, ROUND_2, CONFIG, ROUNDS_DB, OPTIONS_DB, ACTIVE_OPTIONS, STATE, SUBMISSIONS_LOG, COPY, RESULTS + named ranges. A shared string states explicitly: **"Simulator Workbook (2 rounds, 3 scenario packs). Content + data model; automation is added later via Apps Script."**
**Student-facing sims:** 1, but **not currently automated/playable** — this is a content/data-model package awaiting an Apps Script layer that isn't in this repo.
**Tech stack:** Google Sheets workbook only.
**Deployment evidence:** None — no Apps Script to deploy.
**Duplicate suspicion:** None (unique content).
**Broken/incomplete signals:** **Confirmed incomplete by the source's own text** ("automation is added later via Apps Script" — not present here). Single commit "Add files via upload." The workbook also contains what appears to be live test data (`Student Name: Brayden White`, `Student Email: braydenokley13@gmail.com`) already filled in on START_HERE.

**Experience: Reputation & the Long Game**
- proposedId: `301-m3-l3-reputation-long-game`
- canonicalTitle: "Track 301 · Module 3 · Lesson 3 — Reputation & the Long Game" (xlsx shared string, START_HERE sheet)
- path: `301-M3-L3/301 M3L3-2.xlsx`
- whatStudentsDo: Student picks a role (Agent or Team/Owner), a horizon (One-Deal Maximize or Long Game), and a scenario pack (NBA Extension / NFL Holdout / MLB Arbitration). In Round 1 they choose a strategy and a signal (COOP/DEADLINE/ALTERNATIVES/NONE) and, if bluffing, decide whether to follow through; the round shifts Trust/Credibility/Access/Friction meters. Round 2 opens with a new negotiation whose starting position is shaped by Round 1's reputation outcome (e.g., "your prior stance affects whether teams engage early, share structure, and believe your walkaway").
- pillar: economics (reputation economics / repeated-game negotiation)
- conceptTerms (verbatim): "Reputation Snapshot"; "Trust / Credibility / Access / Friction"; "follow through" vs. bluff; "BLUFF_EXTRA_CRED_PENALTY" / "FOLLOW_THROUGH_CRED_BONUS"; "WIN_TOO_MUCH_EXTRA_FRICTION"; "Threats are not believed; deadlines get ignored and bluffs are called"
- gradeBandEvidence: UNKNOWN
- purpose: EXPLORE/APPLY (as designed) — but not executable as delivered since automation is absent
- delivery: Google Sheets workbook (planned Apps Script automation not present)
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN
- evidenceOutput: `RESULTS` sheet and `nr_result_claim_code`/`nr_result_scores`/`nr_result_reputation`/`nr_result_postmortem` named ranges exist in the schema but have no automation to populate them in this repo
- studentDataProfile: `nr_student_name`/`nr_student_email` named ranges present, and this specific copy already contains real name/email test data in cells
- maturitySignal: **low/incomplete** — explicitly self-described as pre-automation ("content + data model" only)
- simulationPattern: two-round repeated-negotiation / reputation-carryover design (data model only, not yet playable)
- confidence: INFERRED for the intended student experience (mechanics reconstructed from schema/labels, not from a running scoring engine, since none exists in this repo); the "not yet automated" status itself is VERIFIED (quoted directly from source)
- evidence: xlsx shared strings: "Simulator Workbook (2 rounds, 3 scenario packs). Content + data model; automation is added later via Apps Script."; "Track 301 · Module 3 · Lesson 3 — Reputation & the Long Game"

---

## 301-M4-L1

**What it is:** Two distinctly different builds under one lesson slot: (1) `index.html` — a polished, gamified single-page app, "WAR ROOM | NBA Decision Simulator," and (2) `301_M4_L1-2.xlsx` + `apps script` — a reflective, text-based Google Sheets exercise whose own title string is **"Track 301 · Module 4 · Lesson 1 — Decision Room"**.
**Student-facing sims:** 2 distinct experiences (different titles, different mechanics — one is a clickable scenario-card game with XP/streaks, the other is a memo-annotation/assumption-tagging worksheet scored by free-text keyword detection in Apps Script). Both share the claim-code prefix `BOW-301-M4L1-`, suggesting they're meant to be interchangeable/complementary deliveries of the same lesson slot, not accidental duplicates — but the exact relationship is unclear from source (flag: duplicate suspicion).
**Tech stack:** Vanilla HTML/CSS/JS (game) + Google Apps Script/Sheets (memo exercise, 934-line script with regex-based text analysis functions like `detectInsight_`, `narrateAssumptionAwareness_`, `interpretPrecisionStance_`).
**Deployment evidence:** No workflow file; git history shows a merged PR branch named `claude/fun-html-learning-activity-iz8d5`, implying the HTML game was an added/alternate build ("fun" activity) layered onto an existing lesson.
**Duplicate suspicion:** High — two materially different pedagogical designs coexist for the same lesson code and share a claim-code namespace.
**Broken/incomplete signals:** None found in either build individually; both appear functionally complete.

**Experience A: WAR ROOM | NBA Decision Simulator**
- proposedId: `301-m4-l1-war-room-nba-decision-simulator`
- canonicalTitle: "WAR ROOM | NBA Decision Simulator" (`index.html:6` `<title>`); in-app: "Make The Calls. Beat The Model."
- path: `301-M4-L1/index.html`
- whatStudentsDo: Student enters name/email, then works through a library of 15 real-NBA analytics scenarios (e.g., "The Luka Variance," playoff performance projections), completing at least 3 to unlock a claim code. Per scenario: view the model's confidence-scored projection, flag at least 2 weak "fragility" assumptions in a grid, then choose to FOLLOW THE MODEL / ADJUST THE MODEL / OVERRIDE THE MODEL with a typed rationale, and see the real outcome plus XP/streak feedback.
- pillar: economics (predictive-model risk / decision theory)
- conceptTerms (verbatim): "Analytics just dropped their projection. The numbers say one thing. The situation says another."; "modelConfidence"; "fragility"; "Hot Streak Regression"; "High Variance"; "FOLLOW THE MODEL / ADJUST THE MODEL / OVERRIDE THE MODEL"
- gradeBandEvidence: UNKNOWN
- purpose: PRACTICE/APPLY
- delivery: single-page vanilla JS app
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN
- evidenceOutput: claim code `BOW-301-M4L1-${dateStr}-${rand}` generated client-side after 3 completions; XP/streak counters
- studentDataProfile: collects Name + Email ("for your completion code") client-side at start screen
- maturitySignal: high — 15 fully-authored real-player scenarios with individualized outcome text
- simulationPattern: scenario-library "beat the model" decision game with assumption-flagging and rationale capture
- confidence: VERIFIED
- evidence: `index.html:1234-1240` hero copy; `index.html:1492-1503` scenario data structure (`modelConfidence: 72`, fragility-scored factors)

**Experience B: Decision Room (reflective spreadsheet exercise)**
- proposedId: `301-m4-l1-decision-room-memo`
- canonicalTitle: "Track 301 · Module 4 · Lesson 1 — Decision Room" (xlsx shared string, START_HERE)
- path: `301-M4-L1/301_M4_L1-2.xlsx`, `301-M4-L1/apps script`
- whatStudentsDo: Student works through an "Analytics Group" internal memo: reviews a Leadership Alignment Check ("This model reduces cognitive overload... Good models help people decide under complexity"), tags 2–3 fragile model assumptions with "where the risk lives," diagnoses "Why It Worked Before" via stability-signal checkboxes, responds to an "UPDATE: REALITY MOVES" prompt ("The model output stays the same. The environment does not.") by picking a leadership action and naming which assumption "snapped first," then writes a decision rationale before claiming completion.
- pillar: economics (model risk / epistemics of forecasting)
- conceptTerms (verbatim): "Models are maps, not reality. Your job is to notice when the terrain moves."; "Models cannot remove uncertainty; they compress it."; "A precise output is not automatically a more accurate output... Decimals can create false confidence."; "No extreme tails overwhelm EV" (expected value); "WHAT THIS MODEL IS QUIETLY BETTING ON"
- gradeBandEvidence: UNKNOWN
- purpose: PRACTICE/APPLY, closer to a structured reflection than a clickable game
- delivery: Google Sheets + Apps Script (text-response scoring via keyword/phrase detection, not multiple choice)
- durationEvidence: UNKNOWN
- facilitation: "This model reduces cognitive overload..." framed as an internal-memo role-play; single-student self-paced copy model implied by ADMIN_CONFIG/STATE separation
- evidenceOutput: Apps Script computes a completion tier and claim code with prefix `BOW-301-M4L1-`, written to `SUBMISSIONS_LOG`; a `RESULTS_DASHBOARD`-style "FINISH_AND_CLAIM" sheet shows "Mastery tier" and "Claim code"
- studentDataProfile: this specific xlsx copy already contains filled-in real test data — `Student Name: Brayden White`, `Student Email: braydenokley13@gmail.com`
- maturitySignal: complete and highly polished prose/pedagogy, but a fundamentally different UX register (reflective writing) from Experience A
- simulationPattern: single-pass reflective case-study/memo-annotation exercise with free-text scoring, not a round-based game
- confidence: VERIFIED for content; INFERRED regarding its relationship to Experience A (same claim-code prefix and lesson slot, but no code cross-reference found connecting them)
- evidence: xlsx shared strings ("Models are maps, not reality...", "No extreme tails overwhelm EV."); `apps script:1-15` header comment; `apps script` function list (`detectAssumptionAwareness_`-style analysis functions)

---

## 301-M4-L2

**What it is:** Two parallel implementations of the same simulator: `index.html` (single-file, "Decision Room Simulator | BOW 301-M4-L2") and a Google Sheets + Apps Script backend (`Copy of 301_M4_L2.xlsx` + `apps script`, 1120 lines) whose sheet names (`SIM_VIEW`, `DECISION_CARD`, `FINAL_RESULTS`, `CLAIM_CODE_TERMINAL`, `PHASE_DB`, `MODEL_DB`, `SIGNALS_DB`, `SHOCKS_DB`) match the Apps Script's `SHEETS` constant map exactly, and whose vocabulary (Model A/B objective/confidence, Signal 1-3 classification, sensitivity/rigidity/confidence-trap) mirrors the HTML's own JS state variables almost 1:1.
**Student-facing sims:** 1 distinct experience delivered via two separate technical builds (unlike M4-L1, the mechanics/vocabulary genuinely match, so this reads as the same simulator re-implemented for a spreadsheet-native context, not two different pedagogical designs).
**Tech stack:** Vanilla HTML/CSS/JS (game) + Google Apps Script/Sheets (parallel backend build).
**Deployment evidence:** No workflow file; git history: merged PR branch `claude/educational-game-html-ITEQj`.
**Duplicate suspicion:** High (same simulator, two independent full implementations — unclear which is canonical/deployed; the filename "Copy of..." on the xlsx suggests it may be a working/test copy).
**Broken/incomplete signals:** None found in the HTML build; internally consistent.

**Experience: Decision Room Simulator**
- proposedId: `301-m4-l2-decision-room-simulator`
- canonicalTitle: "Decision Room Simulator" (`index.html:6` `<title>Decision Room Simulator | BOW 301-M4-L2</title>`; in-app h1)
- path: `301-M4-L2/index.html` (primary; companion `apps script` + xlsx implement an alternate delivery)
- whatStudentsDo: Student picks one of two levels — "The Trade Deadline" (NBA, medium, GM of the Thunder deciding on a Trae Young trade with analytics vs. scouting in conflict) or "Draft Day War Room" (NFL, hard, GM of the Patriots on the clock at pick #3 with two conflicting scouting models). Across 5 phases, the student reads competing model outputs (each shown with a numeric confidence like 93%/91%), evaluates flagged statements by type (objective/timeline/risk/fragility/optionality), and picks a posture (push/hold/hybrid/reframe) that shifts sensitivity/rigidity/confidence meters, ending in a posture judgment and level-specific claim code.
- pillar: economics (model risk / decision-making under conflicting expert opinion)
- conceptTerms (verbatim): "Confidence Trap"; "sensitivity"; "rigidity"; "fragility"; "optionality"; "Both models still show 90%+ confidence despite using the same injury data to reach opposite conclusions" — "the clearest sign that the disagreement is philosophical, not analytical"
- gradeBandEvidence: UNKNOWN
- purpose: APPLY/EVIDENCE (2 scenario levels, each yields a claim code)
- delivery: single-page vanilla JS app; parallel Google Sheets/Apps Script build also exists
- durationEvidence: "The clock is at 10 minutes" / "48 hours until the deadline" (in-fiction scenario framing, not real session duration — do not treat as actual timed constraint) — UNKNOWN for real duration; note: the Confidence Trap meter countdown timer in-code uses `duration = state.phase === 5 ? 45 : 60` (seconds), a UI animation timing, not lesson duration
- facilitation: UNKNOWN
- evidenceOutput: `CLAIM_CODES[state.level][posture.code]` lookup table drives a level-specific claim code shown on the posture/judgment screen
- studentDataProfile: xlsx schema includes `StudentEmail`/`StudentName` fields (STATE sheet), implying the Sheets build collects name/email; the HTML build was not checked for a name/email capture field in this pass
- maturitySignal: high — dual full implementations both complete
- simulationPattern: dual-scenario (NBA/NFL) "conflicting-model arbitration" decision game with meter-based posture scoring
- confidence: VERIFIED for HTML build mechanics/title; INFERRED that the Sheets/Apps Script build is "the same" experience rather than a distinct one (based on strong structural/vocabulary overlap, no direct code linkage)
- evidence: `index.html:407-422` (title screen + two level cards); `index.html:621,708` ("Both models still show 90%+ confidence... the disagreement is philosophical, not analytical"); `apps script:1-33` (SHEETS map matching xlsx sheet names)

---

## 301-M4-L3

**What it is:** A single self-contained `index.html` (no xlsx, no Apps Script, no other files at all in the repo besides `.git`) — "Model Risk & False Confidence."
**Student-facing sims:** 1 experience with 3 internal levels.
**Tech stack:** Vanilla HTML/CSS/JS, single file, no dependencies.
**Deployment evidence:** No workflow file; static single-file page. Git history: single commit "Add Model Risk & False Confidence interactive game activity" (not a merged PR, unlike the other repos).
**Duplicate suspicion:** None — simplest/most self-contained repo in the set.
**Broken/incomplete signals:** None found; code is internally consistent.

**Experience: Model Risk & False Confidence**
- proposedId: `301-m4-l3-model-risk-false-confidence`
- canonicalTitle: "Model Risk & False Confidence" (`index.html:6` `<title>`, in-app h1)
- path: `301-M4-L3/index.html`
- whatStudentsDo: Student progresses through 3 quiz-style levels — "The Precision Trap" (spot false precision in real player projections), "The Overfitting Detective" (identify models that "explain the past too well—and the future terribly"), and "The Executive Decision Room" (choose the correct executive response to a model output everyone in the room already agrees with, e.g., a 94.7/100 draft-grade with an "87% Mahomes match" and "8.3% bust probability"). Each answer gives immediate feedback text explaining the reasoning.
- pillar: economics (forecasting/model epistemics, executive decision-making)
- conceptTerms (verbatim): "false confidence"; "overfitting"; "confidence with correctness" ("never confuses confidence with correctness"); "Composite grade," "bust probability," "Expected career AV" (expected value proxy); "base case" vs. "best case disguised as a base case"; "sample size"
- gradeBandEvidence: UNKNOWN ("Composite grade: 94.7/100" and "finalGrade" in code refer to in-game score percentages, not a student grade level — do not confuse)
- purpose: PRACTICE/EVIDENCE (3-level scored quiz)
- delivery: single-page vanilla JS app
- durationEvidence: UNKNOWN
- facilitation: UNKNOWN
- evidenceOutput: `CLAIM_CODES` object keyed by level; per-level score displayed as `score / total` and a `finalGrade` percentage
- studentDataProfile: no name/email capture found — most privacy-minimal build in the set
- maturitySignal: polished; realistic, well-written scenario prose ("the model's confidence became the organization's trap")
- simulationPattern: 3-level branching multiple-choice quiz with worked-explanation feedback per question (not a round/turn simulation loop like the other repos — more diagnostic/quiz-pattern than sim-pattern)
- confidence: VERIFIED
- evidence: `index.html:335` ("This game trains you to spot false confidence, resist overfitting traps, and think like an executive who never confuses confidence with correctness."); `index.html:656,665,670` (draft-grade scenario and feedback text)

---

## Cross-repo notes

- **Recurring architecture pattern (M3-L1, M4-L1, M4-L2):** each pairs a standalone HTML/JS/CSS browser game with an independent Google Sheets + Apps Script implementation carrying the *same* lesson code and (for M4-L1/M4-L2) a shared claim-code prefix. Only M4-L1's two builds diverge sharply in pedagogy (clickable game vs. reflective memo); M3-L1 and M4-L2's pairs appear to be the same design re-implemented, not different designs. Recommend treating these as "same experience, dual delivery" except where flagged otherwise (M4-L1).
- **301-M3-L1 is the only confirmed-broken repo** — its browser delivery has no HTML entry point at all.
- **301-M3-L3 is the only confirmed-incomplete-by-design repo** — its own text states automation "is added later via Apps Script," and that script is absent.
- Several xlsx copies (M3-L3, M4-L1) contain real filled-in test data — `Brayden White` / `braydenokley13@gmail.com` — indicating these are working/test copies rather than blank templates; relevant to studentDataProfile and to treating any embedded "results" in those copies as test data, not live student submissions.
- No repo in this assignment set contains any grade-band, age, or school-level statement anywhere in HTML, JS, README, or xlsx shared strings — consistent with the brief's framing of Track 301 as an interest-list, executive-level track with grade band not yet established.
