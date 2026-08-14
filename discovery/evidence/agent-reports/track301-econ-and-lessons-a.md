# Discovery report — track301-econ-and-lessons-a

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

Now I have all the evidence needed. Let me write the final structured report.

# BOW Sports Capital — Track 301 Repo Investigation

**Method**: local read of `/workspace/acct/{repo}` via Read/Grep/Bash only (no GitHub API). All 8 repos are **shallow git clones (depth 1, single commit)** — no deeper history available locally.

---

## Repo-Level Summaries

### 301-M1-ECON
Single self-contained `index.html` (52KB) implementing **"Venture Capital Tycoon."** One student-facing simulation. Vanilla HTML/CSS/JS, no external libs, `.nojekyll` present (GH Pages evidence). Git: 1 commit, "Add Venture Capital Tycoon - economics concepts game." No duplication suspected.

### 301-M2-ECON
Three-file app (`index.html`+`script.js`+`styles.css`) titled **"Business Economics Challenge."** One simulation. Vanilla JS, README.md documents local-server and GH Pages deployment steps explicitly. **Anomaly**: sole git commit is literally titled "Delete 301-M2-ECON directory" yet it *adds* all 4 files — strongly suggests this repo was split out of a former monorepo/parent directory (migration artifact), not an authored feature commit. Flag as possible duplicate-of-origin, though content itself is unique among the 8.

### 301-M3-ECON
Single `index.html` (66KB), **"Deal Dynasty — Business Strategy Game."** One simulation, vanilla JS, no README/.nojekyll. Git: 1 commit "Add Deal Dynasty: interactive business strategy game." No duplication suspected.

### 301-M4-ECON
Single `index.html` (70KB), **"Startup Tycoon: Data-Driven Decisions."** One simulation composed of 7 distinct data-literacy mini-rounds under one shell/scoreboard — treated as ONE experience (shared state, single results screen, single title). Vanilla JS. Git: 1 commit "Build Startup Tycoon: 7-round business game teaching data concepts."

### 301-M1-L1
Multi-file (`index.html`+`js/game.js`+`js/teams-data.js`+`css/`), **"BOW Sports Capital - GM Decision Game."** One simulation. Includes `bow_301_activity_overview.pdf` — a **design/spec document** (not evidence of grade band) describing the intended mechanic, which the code faithfully implements (3 teams × 3 branching scenarios, Accelerate/Smooth/Rebuild framework, hidden efficiency score, claim-code unlock at threshold 33). Vanilla JS. Git: 1 commit (merged PR "dynamic-claim-choices").

### 301-M1-L2
Multi-file (`index.html`+`js/{data-loader,game-engine,ui-controller}.js`+`data/teams.json`+Chart.js via CDN), **"The Curve Room 2.0 - Salary Cap Simulation."** One simulation. Contains 5 planning/verification markdown docs plus `curve_room_explainer.pdf` (a **legacy v1 design spec** describing a different, Google-Forms-based, 3-simultaneous-franchise mechanic). **Note**: the actual shipped code lets the student pick **one** team at a time (`currentTeam` singular) across a 5-year curve — the "2.0" web rebuild diverged from the v1 PDF concept; this is evolution, not duplication. `VERIFICATION_REPORT.md` explicitly states target audience "9th-10th graders" — real, if secondary/planning-doc, evidence for Track 301's grade band.

### 301-M1-L3
Multi-screen app: `index.html` (hub/landing) → `activity.html` (Draft) → `results.html` (per-league results) → `completion.html` (final), sharing state via URL params + `js/storage.js` (localStorage session). **Verdict: ONE multi-screen experience, not several.** Confirmed by explicit `window.location.href` navigation chaining across all four files and shared `js/config.js`/`js/draft-engine.js`/`js/calculator.js` logic. Title (from `index.html`): **"The GM Challenge - Master the Efficiency Frontier."** Uses real historical salary/WAR data (`mlb-2019-players.json`, `nfl-2020-players.json`, `nba-2018-players.json`) plus Chart.js. Git: 1 commit (merged PR "gm-challenge-overhaul").

### 301-M2-L1
Two files, **byte-identical** (`diff` confirmed): `index.html` and `espn-leak-activity.html`, both titled **"ESPN Crisis Manager: The Salary Cap Leak."** This is a **confirmed intra-repo duplicate** — same content under two filenames, treated as ONE student-facing simulation (not two). Vanilla JS, single-page. Git: 1 commit "Implement full path branching for contextual coherence."

---

## Distinct Student-Facing Experiences

### 1. Venture Capital Tycoon
- **proposedId**: `venture-capital-tycoon`
- **canonicalTitle**: "Venture Capital Tycoon" (verbatim `<title>`/`<h1>`)
- **path**: `301-M1-ECON/index.html`
- **whatStudentsDo**: Students run a $50M VC fund over 5 in-game years. Each year they review a "Deal Flow" of AI/SaaS/Fintech/Biotech/CleanTech/E-Commerce startups (variable valuation, team quality, health) and choose to invest or pass; in "Portfolio Review" they can add follow-on capital or cut underperformers; in "Exit Opportunities" they choose to sell now or hold for a riskier future payout; a "Market News" event each year shifts sector valuations. Final score blends fund return multiple with an "Economic Concept Scorecard."
- **pillar**: economics
- **conceptTerms**: "Opportunity Cost", "Time Value", "Option Value", "Diminishing Returns", "Sunk Cost Fallacy" ("Sunk Cost Fallacy... classic sunk cost trap"), "Present Value", "Market Timing"
- **gradeBandEvidence**: UNKNOWN (no grade/audience text in source)
- **purpose**: PRACTICE (repeated concept-tagged decisions with immediate "insight" feedback each round; no evidence of formal assessment/certification output)
- **delivery**: single-page browser game, self-contained, client-side only
- **durationEvidence**: UNKNOWN (only structural "5 years"; no stated real-world minutes)
- **facilitation**: self-directed, no login/teacher gate found
- **evidenceOutput**: end-of-run "Fund Closed" screen with letter grade (`gradeFor()`), fund-return grade + economic-thinking grade combined; no export/claim-code mechanism found
- **studentDataProfile**: none persisted (no localStorage/network calls found)
- **maturitySignal**: polished, feature-complete single build, no plan/verification docs, no iteration history visible (1 commit)
- **simulationPattern**: round-based portfolio-management sim (5 rounds/years), branching investment decisions, randomized deal generation
- **confidence**: VERIFIED
- **evidence**: `301-M1-ECON/index.html:6` `<title>Venture Capital Tycoon</title>`; line 280 `<p class="subtitle">Learn economics by running a $50M startup fund over 5 years</p>`; line 486 `$('stat-year').textContent = G.year + ' / 5';`; lines 283-289 concept chips.

### 2. 301-M2-ECON Business Economics Challenge
- **proposedId**: `301-m2-econ-business-economics-challenge`
- **canonicalTitle**: "301-M2-ECON | Business Economics Challenge" (verbatim `<title>`)
- **path**: `301-M2-ECON/index.html` + `script.js`
- **whatStudentsDo**: Per README, students "play as a strategy leader and make economic decisions across 14 rounds," answering scenario questions (drawn from a shuffled `questionBank`) covering topics like principal-agent contracts, risk-adjusted return comparisons, portfolio diversification, moral hazard, expected-value asset purchases, capital structure, and revenue-recognition timing. Live metrics (cash, growth, trust, compliance, risk) respond to choices; timed rounds, difficulty levels, streak multipliers, and three lifelines (50/50, hint, skip) are used; ends in a board report with achievements.
- **pillar**: economics (with light financial-literacy overlap via capital structure/asset valuation)
- **conceptTerms**: "Principal-Agent Problems", "Risk-Adjusted Return" ("Sharpe style"), "Portfolio Theory", "Moral Hazard in Contracts", "Asset Valuation Under Uncertainty", "Expected Value", "Capital Structure Decisions", "Revenue Recognition Timing"
- **gradeBandEvidence**: VERIFIED quote — README.md: *"Interactive business simulation game for 9th-10th graders."*
- **purpose**: PRACTICE/EVIDENCE (scored quiz-style rounds feeding an "end-of-run board report with achievements and study plan")
- **delivery**: 3-file static site (HTML/CSS/JS), documented for `python3 -m http.server` local run and GitHub Pages deploy
- **durationEvidence**: UNKNOWN (14 rounds stated structurally; no stated real-world minutes)
- **facilitation**: self-directed
- **evidenceOutput**: "end-of-run board report with achievements and study plan" (per README); score computed from `maxPerRound=220 * questions.length`
- **studentDataProfile**: UNKNOWN (not verified in this pass — state object not inspected for persistence)
- **maturitySignal**: has a README with deployment instructions, but the repo's single commit is anomalously titled "Delete 301-M2-ECON directory" while adding all files — suggests extraction from a prior monorepo rather than fresh authorship; treat provenance as uncertain
- **simulationPattern**: 14-round scored scenario/quiz sim with resource meters and lifelines
- **confidence**: VERIFIED (title/mechanics/grade band all directly quoted)
- **evidence**: `301-M2-ECON/README.md` ("9th-10th graders", "14 rounds"); `301-M2-ECON/script.js:3,50,95,140,186-187,225,270` (concept labels); `301-M2-ECON/index.html:<title>`.

### 3. Deal Dynasty
- **proposedId**: `deal-dynasty`
- **canonicalTitle**: "Deal Dynasty — Business Strategy Game" (`<title>`); on-screen logo "DEAL DYNASTY"
- **path**: `301-M3-ECON/index.html`
- **whatStudentsDo**: Students play 7 rounds, each teaching one negotiation/game-theory concept via a narrative scenario: pitching investors (signaling/screening), choosing between competing offers (BATNA), buying a food truck with hidden seller info (information asymmetry), a repeated 5-week pricing standoff with a rival coffee shop (repeated games/tit-for-tat), reputation-building choices, a partnership requiring a credible commitment, and a 3-party mall deal requiring 2-of-3 coalition agreement (game-theoretic "core"). Each round ends with a "What You Learned" recap.
- **pillar**: economics (game theory / strategic economics)
- **conceptTerms**: "Signaling & Screening", "BATNA Analysis" / "BATNA & Outside Options", "Information Asymmetry", "Repeated Games" / "Repeated Game Dynamics", "Reputation Strategy" / "Reputation as Strategic Asset", "Commitment Devices", "Multi-Party Bargaining", "the 'core' in game theory"
- **gradeBandEvidence**: UNKNOWN (no grade/audience text found)
- **purpose**: EXPLORE/PRACTICE (each round pairs a decision with an explicit "teach:" explainer text, i.e., concept-first mini-lessons embedded in gameplay)
- **delivery**: single-page browser game, vanilla JS
- **durationEvidence**: UNKNOWN (structural "7 high-stakes rounds" only)
- **facilitation**: self-directed
- **evidenceOutput**: round-by-round money/reputation score + letter-style grades (`great/ok/bad`) per round; no claim code / export mechanism found
- **studentDataProfile**: none persisted found
- **maturitySignal**: single complete build, 1 commit, no supporting docs
- **simulationPattern**: 7-round scenario-based negotiation/strategy sim, each round a distinct mechanic (2-party negotiation, repeated game, multi-party coalition)
- **confidence**: VERIFIED
- **evidence**: `301-M3-ECON/index.html:<title>`; lines 548-550 (subtitle "Build your business empire in 7 high-stakes rounds"); lines 628-671 (`rounds` object with `concept`/`teach` fields); line 1394 (game-theoretic "core" explanation).

### 4. Startup Tycoon: Data-Driven Decisions
- **proposedId**: `startup-tycoon-data-driven-decisions`
- **canonicalTitle**: "Startup Tycoon: Data-Driven Decisions" (`<title>`)
- **path**: `301-M4-ECON/index.html`
- **whatStudentsDo**: 7 distinct data/statistics mini-games under one scoreboard: (1) "The Deal Room" — pick among 5 risky business deals shown with probability/win/lose, teaching Expected Value with an in-game "EV Calculator"; (2) "Forecast Frenzy" — confidence intervals/prediction ranges; (3) "Curve Crafter" — overfitting vs. out-of-sample performance; (4) "The Mole" — Bayesian updating with new clues; (5) "Fantasy Analysts" — model ensemble approaches; (6) "Alien Market" — decision-making under ambiguity (Earth vs. Mars markets); (7) "CEO Hot Seat" — expert judgment calibration. Ends with a rank and a list of "Concepts You Practiced."
- **pillar**: economics (statistical/data-decision economics; borderline cross-pillar given emphasis on modeling over classic econ vocabulary)
- **conceptTerms**: "Expected Value Under Uncertainty", "Confidence Intervals & Prediction Ranges", "Overfitting & Out-of-Sample Performance", "Bayesian Updating With New Information", "Model Ensemble Approaches", "Decision-Making Under Ambiguity", "Expert Judgment Calibration"
- **gradeBandEvidence**: UNKNOWN (no grade/audience text found)
- **purpose**: EXPLORE/PRACTICE (each round is a self-contained concept-tagged exercise with a "results" explainer)
- **delivery**: single-page browser game, vanilla JS, no external libs
- **durationEvidence**: VERIFIED quote — `index.html:126`: *"7 rounds • ~15 minutes • Can you make Business Legend?"*
- **facilitation**: self-directed
- **evidenceOutput**: final rank + per-round earnings + "Concepts You Practiced" chip list; no claim-code/export found
- **studentDataProfile**: none persisted found
- **maturitySignal**: single complete build, 1 commit ("Build Startup Tycoon: 7-round business game teaching data concepts")
- **simulationPattern**: 7 distinct mini-game rounds unified by one shell/scoring system (single experience, not 7 separate ones — same title screen, same running score, same final results screen)
- **confidence**: VERIFIED
- **evidence**: `301-M4-ECON/index.html:6` (`<title>`); line 126 (duration quote); lines 271,417,559,760,882,1039,1185 (`<h2>Round N: ...</h2>` headings).

### 5. BOW Sports Capital - GM Decision Game
- **proposedId**: `bow-sports-capital-gm-decision-game`
- **canonicalTitle**: "BOW Sports Capital - GM Decision Game" (`<title>`)
- **path**: `301-M1-L1/index.html` + `js/game.js` + `js/teams-data.js`
- **whatStudentsDo**: Student plays GM for three real-team-styled franchises in sequence (Lakers/NBA, Red Sox/MLB, Chiefs/NFL — `TEAM_ORDER = ["lakers","redsox","chiefs"]`), facing 3 dynamically-branching scenarios per team (9 total) about contracts, trades, cap space, arbitration, and free agency. Each choice is tagged `type: "accelerate" | "smooth" | "rebuild"` with a hidden numeric score; the next scenario is chosen based on the prior choice type (true branching, not fixed order). A cumulative score ≥33 (~73% "efficiency") unlocks a randomly-drawn claim code worth XP.
- **pillar**: economics (with sports-finance/financial-literacy overlap via salary cap and free agency mechanics)
- **conceptTerms**: "Accelerate", "Smooth", "Rebuild in Motion" (from source PDF spec — *"Accelerate = Pay now + compress the competitive window... Smooth = Maintain optionality... Rebuild in Motion = Sell high + reset"*); "salary cap", "free agency", "cap space", "efficiency score" (PDF also names "intertemporal decision-making, marginal analysis, opportunity cost" as design intent, though these exact phrases were not confirmed verbatim inside `game.js`/`teams-data.js` themselves)
- **gradeBandEvidence**: UNKNOWN in the shipped app; the companion `bow_301_activity_overview.pdf` is a design/spec doc addressed to "Claude" for future modification (*"Claude may adjust... alter the cognitive load for different age groups"*) — this is a build instruction, not an established grade band, and should not be read as audience confirmation.
- **purpose**: PRACTICE (branching decisions with an in-game "efficiency rating" i.e. formative scoring) leading to an unlockable reward, plus an explicit "📚 The Framework" recap screen
- **delivery**: multi-file static site, vanilla JS, no external libs
- **durationEvidence**: UNKNOWN
- **facilitation**: self-directed
- **evidenceOutput**: "🏆 Game Complete!" screen with "📊 Your Decisions" summary + "📚 The Framework" + claim-code unlock at threshold (score ≥ `SCORING.unlockThreshold = 33`)
- **studentDataProfile**: UNKNOWN (not verified for persistence in this pass)
- **maturitySignal**: iterated product — git history (even though only 1 visible commit due to shallow clone) is a **merged PR** titled "dynamic-claim-choices," and code explicitly implements dynamic/branching scenario selection matching the PDF spec closely — indicates at least one prior design→implementation iteration
- **simulationPattern**: branching decision-tree sim, 3 franchises × 3 sequential branching scenarios = 9 decisions total
- **confidence**: VERIFIED for mechanics/title; INFERRED for design intent (opportunity cost/marginal analysis phrasing comes from the PDF's stated goals, not confirmed as literal in-game text)
- **evidence**: `301-M1-L1/index.html:<title>`; `301-M1-L1/js/teams-data.js:712` (`TEAM_ORDER`), `:719` (`unlockThreshold: 33`); `301-M1-L1/js/game.js:289` (`totalScenarios = TEAM_ORDER.length * 3`), `:356` ("Show choice type (Accelerate/Smooth/Rebuild)"); `301-M1-L1/bow_301_activity_overview.pdf` (framework quote).

### 6. The Curve Room 2.0 - Salary Cap Simulation
- **proposedId**: `curve-room-2-salary-cap-simulation`
- **canonicalTitle**: "The Curve Room 2.0 - Salary Cap Simulation" (`<title>`)
- **path**: `301-M1-L2/index.html` + `js/{data-loader,game-engine,ui-controller}.js` + `data/teams.json`
- **whatStudentsDo**: Student picks one of six real-branded NBA/MLB/NFL teams (each with a "situation" like Knicks "Win-Now Window" or Nets "Rebuild Phase," per `CURVE_ROOM_2.0_PLAN.md`), then allocates payroll spending across a 5-year cycle relative to a salary cap and luxury-tax threshold, aiming to hit an ideal "Build → Peak → Reset" curve shape rather than a flat line (flatline is explicitly penalized). A "League Health Meter" and a payroll-curve chart (Chart.js) give live feedback; final tiers (Gold/Silver/Bronze XP) generate a claim code.
- **pillar**: economics / financial literacy (cross-pillar — cap-management timing plus real salary/tax figures)
- **conceptTerms**: "payroll curve", "luxury tax", "salary cap", "Build-Peak-Reset cycle"; supporting explainer PDF adds "nonlinear arbitration inflation," "asymmetric rookie-QB surplus," "convex luxury tax," "apron penalties," "supermax leverage" (design-doc language, not confirmed verbatim in shipped JS)
- **gradeBandEvidence**: VERIFIED quote (planning doc, not in-app UI) — `VERIFICATION_REPORT.md:105`: *"### ✅ Educational Design (9th/10th Grade Audience)"*; `CURVE_ROOM_2.0_PLAN.md`: *"Target Audience: 9th/10th graders learning sports management through salary cap timing/sequencing education."*
- **purpose**: PRACTICE/EVIDENCE (scored 5-year run producing a tiered claim code — see `VERIFICATION_REPORT.md`: *"successfully teaches 9th/10th grade students about payroll curve management"*)
- **delivery**: multi-file static site + Chart.js CDN
- **durationEvidence**: VERIFIED quote — `DEPLOYMENT.md:255`: *"Time: 10-15 minutes"* (in a section titled with target tier "Silver tier or higher (175+ XP)")
- **facilitation**: self-directed
- **evidenceOutput**: claim code by tier (Gold/Silver/Bronze) tied to XP threshold; "What You Learned" summary screen
- **studentDataProfile**: UNKNOWN (not verified for persistence)
- **maturitySignal**: highest documentation maturity of the 8 repos — 5 markdown planning/verification docs (`CURVE_ROOM_2.0_PLAN.md`, `DECISIONS_IMPLEMENTATION_PLAN.md`, `DEPLOYMENT.md`, `PAYROLL_STRATEGY_IMPLEMENTATION.md`, `VERIFICATION_REPORT.md`) plus a legacy explainer PDF describing an earlier, different (Google-Forms, 3-simultaneous-team) version — evidence of a genuine v1→v2 rebuild, not just a single pass
- **simulationPattern**: single-team, 5-year resource-allocation/timing sim against a target curve shape
- **confidence**: VERIFIED for mechanics; VERIFIED (quoted) for grade band and duration, though both come from planning docs rather than in-app copy — flagged accordingly, not upgraded past what's quoted
- **evidence**: `301-M1-L2/index.html:<title>`; `js/game-engine.js:93-269` (5-year curve logic), `:677,778` (luxury tax); `VERIFICATION_REPORT.md:105`; `DEPLOYMENT.md:255`; `301-M1-L2/curve_room_explainer.pdf` (v1 design spec, superseded).

### 7. The GM Challenge - Master the Efficiency Frontier
- **proposedId**: `gm-challenge-efficiency-frontier`
- **canonicalTitle**: "The GM Challenge - Master the Efficiency Frontier" (`<title>` of `index.html`; sub-titles "Draft - The GM Challenge" / "Results - The GM Challenge" / "Challenge Complete - The GM Challenge" confirm it is ONE experience across 4 screens)
- **path**: `301-M1-L3/index.html` (hub) → `activity.html` (draft) → `results.html` → `completion.html`, sharing state via URL query params (`?league=`) and `js/storage.js` localStorage session
- **whatStudentsDo**: For each of 3 real historical league contexts in sequence (MLB 2019, NFL 2020, NBA 2018/2019 — real player salary + performance/WAR data loaded from JSON), the student drafts one player per required position within a budget/cap (MLB uncapped, NFL hard-capped, NBA with luxury tax), receiving real-time efficiency-frontier chart feedback that visualizes diminishing returns as spend rises. After each league's draft, `results.html` shows performance metrics and either advances to the next league or to `completion.html`, which shows final score, badges, and a claim code.
- **pillar**: economics
- **conceptTerms**: "Diminishing Returns" ("additional spending yields decreasing marginal benefits"), "Efficiency Frontier" ("visualize the frontier... optimal spending levels... on, near, or past the efficiency frontier"), "Resource Constraints" (no cap / hard cap / soft cap with tax), "Opportunity Cost" ("Understand opportunity cost through concrete player comparisons"), "WAR" (statName), "efficiency" per-position weighting
- **gradeBandEvidence**: UNKNOWN (no grade/audience text found in `index.html`, `PLAN.md`, or config files)
- **purpose**: PRACTICE/APPLY (applies quantitative efficiency-frontier reasoning across 3 real historical datasets, each function as an "Easy/Medium/Hard" difficulty tier per `index.html` badges)
- **delivery**: multi-page static site (4 HTML files) + Chart.js CDN + local JSON player datasets
- **durationEvidence**: UNKNOWN
- **facilitation**: self-directed
- **evidenceOutput**: `completion.html` — final score, tiered badges (🥇🥈🥉🎓 per `js/config.js`), claim code, "Scenario Results" breakdown
- **studentDataProfile**: session persisted client-side via `js/storage.js` (localStorage) across the 3-league sequence; no server/network calls found
- **maturitySignal**: git history shows a merged PR "gm-challenge-overhaul" plus a 38KB `PLAN.md`, indicating iterative design; real historical datasets (`mlb-2019-players.json`, `nfl-2020-players.json`, `nba-2018-players.json`, `optimal-rosters.json`) suggest deliberate data-accuracy investment
- **simulationPattern**: 3-league sequential draft-under-budget sim (5 positions per MLB league draftOrder observed) unified by one session/progress state — **treated as ONE distinct experience**, not 3-4 separate ones, because navigation, scoring, and completion state are all shared across the 4 HTML files
- **confidence**: VERIFIED
- **evidence**: `301-M1-L3/index.html:<title>` and lines 124-148 (Learning Objectives: Diminishing Returns/Efficiency Frontier/Resource Constraints/Opportunity Cost); `js/draft-engine.js:420` (`results.html?league=...`); `results.html:162,181-188` (league sequencing + advance-to-completion logic); `js/config.js:7-45` (LEAGUE_CONFIG budgets/positions).

### 8. ESPN Crisis Manager: The Salary Cap Leak
- **proposedId**: `espn-crisis-manager-salary-cap-leak`
- **canonicalTitle**: "ESPN Crisis Manager: The Salary Cap Leak" (`<title>`, identical in both `index.html` and `espn-leak-activity.html` — confirmed byte-identical duplicate files, counted as ONE experience)
- **path**: `301-M2-L1/index.html` (= `espn-leak-activity.html`)
- **whatStudentsDo**: Student is Executive VP of a fictional NBA franchise (Phoenix Thunder) managing an 8-round branching crisis after a leak reveals $2.3M in undisclosed payments made outside the team's stated $136M salary cap. Each round's choice adjusts four meters — Trust, Legal, Revenue, Control — and the story branches along a "transparency vs. legal defense" path, with consequences including fines, draft-pick forfeitures, sponsor reactions (e.g., Nike), and league discipline; ends with "Key Takeaways" and a completion claim code.
- **pillar**: cross-pillar (economics/business-finance mechanics — salary cap, fines, sponsor revenue — delivered through a crisis-management/PR narrative rather than classic econ-concept labeling)
- **conceptTerms**: "salary cap" ("$136M team cap, 2024-25 season"), "Trust", "Legal", "Revenue", "Control" (named meters); "stakeholder pressure"; no formal named-concept tags (e.g., no "concept:" field) unlike the other 7 repos
- **gradeBandEvidence**: UNKNOWN
- **purpose**: APPLY (single scenario-run applying cap/PR/stakeholder tradeoffs; ends in reflective "Key Takeaways")
- **delivery**: single-page browser game, vanilla JS
- **durationEvidence**: VERIFIED quote — `index.html`: *"Time to complete: 8-10 minutes"*
- **facilitation**: self-directed
- **evidenceOutput**: "Key Takeaways" list + "Your Completion Code" (claim code)
- **studentDataProfile**: none persisted found
- **maturitySignal**: 1 commit, "Implement full path branching for contextual coherence" — suggests at least one branching-logic revision pass; but the file duplication (`index.html` == `espn-leak-activity.html`) suggests unresolved repo cleanup/dual-entry-point cruft
- **simulationPattern**: 8-round branching crisis-management sim with 4 resource/reputation meters, two major strategic paths (transparency vs. legal)
- **confidence**: VERIFIED
- **evidence**: `301-M2-L1/index.html:<title>`; lines 447-467 (mission text, "$136M salary cap," "Time to complete: 8-10 minutes"); lines 524-531 (`meters: {trust, legal, revenue, control}`); `diff index.html espn-leak-activity.html` → no differences (confirmed duplicate).

---

## Cross-Repo Notes

- **Grade band for Track 301**: The task brief states BOW's website calls 301 "executive level" with an unestablished grade band. Locally, the *only* grade-band evidence found is in **301-M2-ECON** (README.md, in-repo) and **301-M1-L2** (planning docs, not in-app copy) — both say **"9th-10th graders."** This conflicts with an "executive level"/uncertain framing from the website and should be flagged as a discrepancy rather than resolved — do not generalize it to the other 6 repos, which have zero grade-band text.
- **Duplicate suspicion summary**: 301-M2-L1 has a confirmed byte-identical duplicate file within the repo (`index.html` = `espn-leak-activity.html`). 301-M2-ECON has a suspicious commit-message/content mismatch suggesting monorepo extraction. No cross-repo content duplication was found among the 8 (each has a distinct title and distinct mechanics).
- **Tech stack pattern**: 6 of 8 repos are pure vanilla HTML/CSS/JS with zero dependencies; 301-M1-L2 and 301-M1-L3 add Chart.js via CDN for data visualization (payroll curve / efficiency frontier charts respectively) — consistent with their more explicitly "advanced/data-driven" positioning.
- **Deployment evidence**: Only 301-M1-ECON has `.nojekyll` (GH Pages signal); only 301-M2-ECON and 301-M1-L2 have explicit README/DEPLOYMENT docs describing GitHub Pages steps and live URL patterns (`https://braydenokley13-ux.github.io/<repo>/`). No CI/CD workflow files (`.github/workflows`) exist in any of the 8 repos.
- **Git history limitation**: All 8 repos are shallow clones showing exactly 1 commit each; no way to verify actual iteration count, test history, or authorship timeline locally — treat any "maturity" claims about iteration as bounded by what's visible (PR-merge commit messages, planning docs), not full history.
