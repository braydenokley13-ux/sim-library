/* Track 201 (Grades 7–8) and the Front Office / Front Office City families. */
import { add, gh, liveRun, repoRun, SELF_CONTAINED, LOCAL_ONLY, TODAY } from "./seed-registry.mjs";
import { lesson } from "./seed-data.mjs";

const T201 = { grades: ["7", "8"], gradeBasis: "track-convention" };
const SHEETS_DATA = { storesStudentData: "yes", requiresLogin: "yes", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: ["Google Workspace"], notes: "The Apps Script build writes to a StudentData sheet and identifies the student by Google account or a typed email, and emails a claim code. The browser build of the same experience stores nothing. Descriptive only." };

/* ── Track 201 module finals (browser build primary, Sheets build alongside) ── */

lesson("201-M1-ECON", {
  id: "candlecart-business-strategy", title: "BOW Business Strategy Simulator — CandleCart.com", family: "track-201", pillar: "economics",
  grades: ["8", "9", "10"], gradeBasis: "stated-in-source",
  summary: "Run an online candle store across five months, with a knowledge gate between each.",
  does: "Students choose a launch plan that sets demand and marginal cost, then run each month against randomised demand — ordering inventory, setting ad spend and price, absorbing a progressive tax in month five — and must pass a five-question check before the next month opens.",
  concepts: ["econ.marginal-value", "econ.pricing-strategy", "econ.law-of-demand", "econ.fiscal-policy", "econ.optionality", "econ.opportunity-cost"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["business-operator", "market-and-pricing"],
  setting: ["facilitator-led"], mode: ["online"], founder: "bow-certified-instructor", facRequired: true,
  prep: "Apps Script must be bound to a copy of the workbook. The bound sheet is not in the repo.",
  tech: "Google Apps Script + Google Sheets", output: "educator-report", data: SHEETS_DATA,
  source: gh("201-M1-ECON", "apps script"), run: [repoRun("201-M1-ECON")],
  health: "unknown", healthBasis: "No GitHub Pages deployment (404). Not verifiable without the bound Google Sheet.",
  maturity: "PLAYABLE",
  maturityBasis: "2,211 lines implementing all five chapters, checks and email delivery. Cannot be launched from the repo alone.",
  blockers: ["The bound Google Sheet is not in the repository."],
  confidence: "VERIFIED",
  evidence: "201-M1-ECON/apps script header: 'BOW BUSINESS STRATEGY SIMULATOR v5.0 — Online Candle Store: CandleCart.com · Grades 8–10'. Collects student email and name via ui.prompt and emails a claim code from a CLAIM_CODES array.",
  govNotes: "Its own header states Grades 8–10, which sits outside the Track 201 convention of Grades 7–8. Recorded as stated rather than reconciled.",
});

lesson("201-M2-ECON", {
  id: "creative-business-simulation", title: "Bow Sports Capital — Creative Business Simulation", family: "track-201", pillar: "cross-pillar", ...T201,
  summary: "A young creative chooses between a salaried job, a contract, and going independent.",
  does: "Students play a freelance creative choosing among a startup job, a six-month agency contract, or independence with a hire. Five chapters each lock in a strategy, show the consequence, and gate progress behind a quiz, ending in a ten-question final check.",
  concepts: ["econ.opportunity-cost", "econ.expected-value", "econ.leverage", "econ.capital-and-investment", "fin.income-reliability", "econ.entrepreneurship"],
  purpose: ["APPLY", "EVIDENCE"], pattern: ["business-operator"],
  moreSources: [gh("201-M2-ECON", "apps script")],
  facNotes: "Ships as one experience in two media: a browser build and a Google Apps Script build of the same five-chapter narrative. The Sheets build is facilitator-run and records evidence; the browser build does not.",
  maturityBasis: "Both builds are complete and the browser build is publicly reachable. No student-run evidence exists.",
  output: "choices-recorded",
  confidence: "VERIFIED",
  evidence: "201-M2-ECON/index.html <title>Bow Sports Capital - Creative Business Simulation</title>. The 'apps script' file implements the same five-chapter freelance/agency narrative as a Sheets state machine.",
  open: ["The browser build asks for a school email but no network call was found, so where that email goes is unresolved."],
});

lesson("201-M3-ECON", {
  id: "bow-sports-empire", title: "Bow Sports Empire", family: "track-201", pillar: "economics", ...T201,
  summary: "Five seasons of building a sports business, ending in an adaptive final round.",
  does: "Students name an empire and play five seasons — First Recruit through Championship Run — each choosing one of three strategy cards that move revenue, morale, efficiency and risk, reading an insight that names the concept behind the result, then spending earned coins. A five-question adaptive round closes it out.",
  concepts: ["econ.expected-value", "econ.marginal-value", "econ.opportunity-cost", "econ.risk-and-reward", "econ.uncertainty", "econ.principal-agent"],
  purpose: ["SYNTHESIZE", "APPLY"], pattern: ["business-operator", "investment-and-portfolio"],
  moreSources: [gh("201-M3-ECON", "apps script")],
  facNotes: "One experience in two media. The Sheets build records evidence and emails claim codes; the browser build keeps state in the session only.",
  maturityBasis: "Both builds complete; browser build is polished and publicly reachable. No student-run evidence exists.",
  output: "choices-recorded",
  confidence: "VERIFIED",
  evidence: "201-M3-ECON/js/game-data.js season titles ('First Recruit', 'Scaling Up', 'Building the Machine', 'Storm Season', 'Championship Run') match CHAPTER_NARRATIVES in the repo's 'apps script' verbatim.",
});

add({
  ...SELF_CONTAINED,
  id: "final-mastery-simulation-201", title: "BOW Sports Capital — Final Mastery Simulation", family: "track-201", pillar: "economics", ...T201,
  summary: "A planned Track 201 capstone that exists only as configuration.",
  does: "Not established. The file defines a six-year structure with pass thresholds, a 65/35 knowledge-to-simulation weighting and grade bands, but no gameplay of any kind is implemented.",
  concepts: ["econ.tradeoffs"],
  purpose: ["SYNTHESIZE"],
  setting: ["facilitator-led"], tech: "Google Apps Script (configuration only)", output: "none",
  data: { storesStudentData: "unknown", requiresLogin: "unknown" },
  source: gh("201-M4-ECON", "apps script"), run: [repoRun("201-M4-ECON")],
  health: "broken",
  healthBasis: "The file contains 154 lines of constants and zero functions. Opening it in a spreadsheet produces no menu and no runnable activity.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "Scaffolding only. Nothing a student could run exists.",
  blockers: ["No onOpen, no menu, no chapter content, no scoring logic — the simulation was never implemented.", "Leaves Track 201 Module 4 without a working module final."],
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "201-M4-ECON/apps script defines YEARS, PASS_REQUIRED_BY_YEAR, CLAIM_CODES, SHEET_* and MCQ_CONFIG constants; a count of function declarations returns 0.",
  govNotes: "Recorded rather than omitted because a named, referenced capstone that does not exist is exactly the kind of gap the Library should make visible.",
});

/* ── Track 201 lessons ── */

lesson("201-M2-L2", {
  id: "mlb-agent-simulator", title: "MLB Player Economics — Agent Simulator", family: "track-201", pillar: "economics", ...T201,
  summary: "Take the guaranteed money, or bet on performance — eight times over.",
  does: "Students agent for eight real MLB players, each carrying a guaranteed base, performance incentives and an injury risk. For each they take the guarantee or bet on performance; injury resolves at random, and a gold, silver or bronze rating compares their call to a model value.",
  concepts: ["econ.expected-value", "econ.risk-and-reward", "econ.uncertainty", "fin.income-reliability", "econ.asset-valuation"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["negotiation", "investment-and-portfolio"],
  moreSources: [gh("201-M2-L2", "apps script"), gh("201-M2-L2", "Contract Engine Track 201 M2 L2 .xlsx")],
  facNotes: "One experience in three artefacts: a browser build, an Apps Script build, and the workbook the script reads. All three share the claim code L2-201-M2-PLAYER.",
  maturityBasis: "Both builds complete, browser build publicly reachable, README matches the implemented rating thresholds. No student-run evidence exists.",
  output: "choices-recorded", docs: "partial",
  confidence: "VERIFIED",
  evidence: "201-M2-L2/game.js line 2 carries claim code 'L2-201-M2-PLAYER'; the repo's 'apps script' writes outcomes into the Scenarios sheet of the bundled workbook using the same eight players.",
});

lesson("201-M3-L1", {
  id: "front-office-dashboard", title: "The Front Office Dashboard — Data to Decisions", family: "track-201", pillar: "economics", ...T201,
  summary: "Draft nine players under a cap and an owner mandate, then simulate the season.",
  does: "Students draft a nine-player roster under a cap with a luxury-tax trigger, spending eight scout tokens to reveal hidden data, while a randomly assigned owner mandate re-weights what the efficiency score rewards. A season then simulates with injuries and breakouts and economics questions interleaved.",
  concepts: ["econ.analytics-and-war", "econ.surplus-value", "econ.luxury-tax", "econ.opportunity-cost", "econ.sunk-cost", "econ.scarcity", "econ.roster-construction"],
  purpose: ["APPLY", "SYNTHESIZE"], pattern: ["draft-and-selection", "allocation-under-constraint"],
  maturityBasis: "The most feature-dense single-file lesson in the account, publicly reachable, with a persistent leaderboard. No student-run evidence exists.",
  output: "choices-recorded",
  confidence: "VERIFIED",
  evidence: "201-M3-L1/index.html carries the header badge 'Track 201 · Module 3 · Lesson 1' and an efficiency score weighted WAR 30% / Value 25% / Risk 20% / Age 15% / Chemistry 10%, re-weighted per owner mandate.",
});

lesson("201-M3-L2", {
  id: "sports-analytics-team-builder", title: "Sports Analytics Team Builder", family: "track-201", pillar: "economics", ...T201,
  summary: "Three struggling franchises, one mission — rebuild each within its budget using the numbers.",
  does: "Students rebuild an MLB roster within budget against stated statistical thresholds, then unlock an NBA scenario, then an NFL one, each with its own metrics and cap. One progress bar tracks all three, and finishing all three opens a shared victory screen.",
  concepts: ["econ.analytics-and-war", "econ.market-inefficiency", "econ.surplus-value", "econ.roster-construction", "econ.scarcity"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["draft-and-selection", "allocation-under-constraint"],
  moreSources: [gh("201-M3-L2", "Track 201 Module 3 Lesson 2- Analytics Matrix.xlsx")],
  tech: "multi-page static site with shared JS state, seeded from a spreadsheet via a Python extraction script",
  maturityBasis: "Complete and publicly reachable, with an earlier prototype retained in-repo showing a finished refactor. No student-run evidence exists.",
  output: "choices-recorded", docs: "partial",
  confidence: "VERIFIED",
  evidence: "201-M3-L2/league-select.html gates NBA behind MLB completion ('🔒 Complete MLB First') and NFL behind NBA; all three share js/game-state.js and redirect to one victory.html. Recorded as one experience, not three.",
});

lesson("201-M3-L3", {
  id: "front-office-draft", title: "Front Office Draft", family: "track-201", pillar: "economics", ...T201,
  summary: "Build an analytics department for ten million dollars.",
  does: "Students hire from seven candidates and buy from three tools inside a fixed budget. Score combines the analytics value added, a culture multiplier, a risk penalty and a scalability bonus, and clearing the threshold reveals a claim code.",
  concepts: ["econ.opportunity-cost", "econ.marginal-value", "econ.capital-and-investment", "econ.operations-tradeoffs"],
  purpose: ["APPLY", "EVIDENCE"], pattern: ["allocation-under-constraint"],
  moreSources: [gh("201-M3-L3", "BOW_201_M3_L3_Front_Office_Draft.xlsx")],
  facNotes: "The README directs students to submit the claim code through a BOW Finish Form, which is not in this repo.",
  maturityBasis: "Complete and publicly reachable, with a genuine v2 engineering plan whose first item is already implemented in the shipped code. No student-run evidence exists.",
  output: "completion", docs: "complete",
  confidence: "VERIFIED",
  evidence: "201-M3-L3/js/data.js SUCCESS_THRESHOLD 7.0 and claim code 'BOW-201-M3-EDGE-01', which the bundled xlsx also carries — the workbook is a parallel implementation of the same activity.",
});

lesson("201-M4-L2", {
  id: "nba-surplus-value-championship", title: "NBA Surplus Value Championship", family: "track-201", pillar: "economics", ...T201,
  summary: "Pick three players to maximise value received above value paid.",
  does: "Students read a roster showing each player's salary against market value and draft exactly three to maximise total surplus, needing both a surplus threshold and a combined synergy score to win — so the cheapest bargains alone are not enough.",
  concepts: ["econ.surplus-value", "econ.asset-valuation", "econ.market-inefficiency", "econ.roster-construction"],
  purpose: ["PRACTICE"], pattern: ["draft-and-selection"],
  moreSources: [gh("201-M4-L2", "Surplus - 201 M4L2.xlsx")],
  maturityBasis: "A small, complete, publicly reachable puzzle converted from a spreadsheet. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "201-M4-L2/index.html states 'Surplus = Market Value − Salary' and 'You need ≥ 25 to win.'",
});

lesson("201-M4-L3", {
  id: "gm-trade-challenge", title: "GM Trade Challenge — The 5-Minute Decision Maker", family: "track-201", pillar: "economics", ...T201,
  summary: "Timed trade calls across escalating difficulty tiers.",
  does: "Students work three rounds per difficulty level against a countdown, choosing among trade packages that trade certainty for upside, with a running score across levels.",
  concepts: ["econ.expected-value", "econ.risk-and-reward", "econ.pick-value-and-decay", "econ.marginal-value"],
  purpose: ["PRACTICE"], pattern: ["trade-and-exchange"],
  moreSources: [gh("201-M4-L3", "Bow 201 M4L3 - Pick Trades.xlsx")],
  maturityBasis: "Complete and publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "201-M4-L3/index.html defines levels with per-level timers (e.g. 'Rookie GM', timer 90) and three rounds each. The title's '5-Minute' refers to decision pacing, not session length, so no duration is recorded.",
});

lesson("201-M1-L2-Luxury-Tax-", {
  id: "luxury-tax-in-action", title: "Luxury Tax in Action — Scenario Simulation", family: "track-201", pillar: "economics", ...T201,
  summary: "A scenario lab where roster moves recompute payroll, tax and wins live.",
  does: "Students pick a scenario whose targets and league rules are locked, then edit only their own roster moves while payroll, progressive and repeater tax, all-in spend and projected wins recompute, with a badge showing whether the scenario's targets are met.",
  concepts: ["econ.luxury-tax", "econ.salary-cap", "econ.tradeoffs"],
  purpose: ["PRACTICE"], pattern: ["allocation-under-constraint"],
  visibility: "superseded", supersededBy: "trade-deadline-war-room-201",
  maturity: "EXPERIMENTAL",
  maturityBasis: "An early, untested prototype of the Module 1 Lesson 2 luxury-tax slot, superseded five months later by a tested, documented build.",
  docs: "missing",
  confidence: "INFERRED",
  evidence: "201-M1-L2-Luxury-Tax-/index.html uses storage key 'bsc_luxury_tax_scenarios_v2' and computeTax with non-repeater and repeater brackets. Committed 2026-01-01; T201-M1-L2 covers the same slot with tests and a README from 2026-06-15.",
  open: ["No deprecation notice exists in either repo. The supersession is inferred from chronology, identical lesson slot and materially greater maturity in the successor."],
});

lesson("T201-M1-L1", {
  id: "cap-crash", title: "Cap Crash", family: "track-201", pillar: "economics",
  grades: ["7", "8"], gradeBasis: "stated-in-source",
  summary: "Rebuild a roster after the cap crashes, then defend the plan to a boardroom.",
  does: "Students sign, cut and trade under a reduced cap while four meters move, hit a single trade-deadline pressure moment forcing a win-now or stay-flexible call, lock a strategy, then write a boardroom memo defending it before receiving a front-office grade.",
  concepts: ["econ.salary-cap", "econ.scarcity", "econ.tradeoffs", "econ.time-horizon", "econ.roster-construction"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["allocation-under-constraint", "shock-and-adapt"],
  maturityBasis: "Pure logic separated from UI with two passing test suites and a README explaining the design rationale — the strongest engineering of any single-lesson repo. No student-run evidence exists.",
  output: "choices-recorded", docs: "complete",
  confidence: "VERIFIED",
  evidence: "T201-M1-L1/game.js header: 'BOW SPORTS CAPITAL — CAP CRASH (Track 201, Grades 7–8)'. README: 'for 7th–8th graders (Track 201)' and 'no shared backend, portal, or database'.",
});

lesson("T201-M1-L2", {
  id: "trade-deadline-war-room-201", title: "Trade Deadline War Room (Track 201)", family: "track-201", pillar: "economics",
  grades: ["7", "8"], gradeBasis: "stated-in-source",
  summary: "The same deadline, priced with real progressive and repeater tax multipliers.",
  does: "Students take one of three teams positioned differently against the tax line — comfortably under, right at it, and deep into repeater territory — compare real trade packages, watch the tax bill recompute with actual multipliers, absorb a pressure moment, then defend the call.",
  concepts: ["econ.luxury-tax", "econ.salary-cap", "econ.tradeoffs", "econ.marginal-value"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["trade-and-exchange", "shock-and-adapt"],
  maturityBasis: "Modular build with a passing engine test suite and a README. No student-run evidence exists.",
  output: "choices-recorded", docs: "complete",
  confidence: "VERIFIED",
  evidence: "T201-M1-L2/README.md: 'a standalone, classroom-ready sports front-office simulation for 7th–8th graders' and 'the Luxury Tax Bill is calculated with the real progressive (and repeater) multipliers'.",
  govNotes: "Shares a title with trade-deadline-war-room-101. The two are pitched at different grade bands and are recorded as deliberate siblings, not duplicates — worth a human confirmation.",
});

lesson("T201-M2-L1", {
  id: "mlb-money-maker", title: "MLB Money Maker", family: "track-201", pillar: "economics", ...T201,
  summary: "Negotiate a media-rights deal that four stakeholder groups can all live with.",
  does: "Students move sliders for salary share, revenue sharing, game time and streaming, and watch satisfaction move for players, owners, networks and fans. The deal is graded on the least satisfied group, so an average that looks good can still fail.",
  concepts: ["econ.media-rights", "econ.revenue-sharing", "econ.stakeholder-management", "econ.negotiation", "econ.fan-engagement"],
  purpose: ["APPLY"], pattern: ["negotiation"],
  moreSources: [gh("T201-M2-L1", "Track201_Activity_Overview.pdf")],
  maturityBasis: "Complete, modular and publicly reachable, but without tests. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "T201-M2-L1/js/calculations.js computes satisfaction per stakeholder group and grades gold/silver/bronze/fail from the lowest of the four.",
});

/* ── Front Office City (3D) ── */

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "front-office-city-district-a", title: "Front Office City — District A", family: "front-office-city", pillar: "economics", ...T201,
  summary: "A 3D walk-around city where eight mission zones each hold a cap decision.",
  does: "Students steer an avatar through a stylised 3D city to eight sequential mission zones, opening each to make a decision on Bird Rights, the mid-level exception, trade exceptions or dead money, with legality checks and payroll and flexibility consequences, ending in a tier and claim code.",
  concepts: ["econ.salary-cap", "econ.bird-rights", "econ.mid-level-exception", "econ.luxury-tax", "econ.optionality", "econ.roster-construction"],
  purpose: ["APPLY"], pattern: ["world-exploration", "allocation-under-constraint"],
  devices: "browser with WebGL; needs a build step to run",
  tech: "Vite + 3D world, with a serverless attempt-lock API",
  output: "choices-recorded",
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "yes", freeTextEntry: "no", thirdPartyServices: ["Vercel KV or Redis-compatible store"], notes: "An exam-integrity attempt lock keys records by class profile and needs durable storage in production. Descriptive only." },
  source: gh("M1-201-FINAL"), run: [repoRun("M1-201-FINAL"), { kind: "doc", label: "Deploy guide", path: "DEPLOY.md" }],
  health: "needs-attention",
  healthBasis: "No GitHub Pages deployment (404) and no confirmed live instance. Requires a build and a signed-key deployment to run.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "Substantial infrastructure — signed attempt locks, teacher strict-lock, audit history — with no automated tests behind it. Ambition outruns verification.",
  blockers: ["No deployment, so an instructor cannot run it today.", "Attempt-lock infrastructure requires durable KV storage and is unverified end to end.", "No automated test suite."],
  docs: "partial",
  confidence: "VERIFIED",
  evidence: "M1-201-FINAL/README.md: '8 mission zones in linear unlock order'; src/data/missions.js includes 'Mission 2 - Bird Rights Call'. Only syntax, schema and TODO-audit scripts exist — no tests.",
  govNotes: "Despite the name, this is not a 'final' version of T201-M1-L1. It is a separate 3D product line that predates the T201 lessons, which appear to have superseded it for classroom use.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "front-office-city-nfl-capital-run", title: "Front Office City: NFL Capital Run", family: "front-office-city", pillar: "economics",
  grades: ["7", "8"], gradeBasis: "stated-in-source",
  summary: "The same 3D city, rebuilt for the NFL and rotated across three roles.",
  does: "Students pick a difficulty and one of two teams, then rotate through agent, league office and owner roles across missions on holdouts, compliance, tampering, revenue allocation and franchise valuation, trading cap room against trust, and finish with a per-role report and a review checksum.",
  concepts: ["econ.salary-cap", "econ.stakeholder-management", "econ.principal-agent", "econ.revenue-sharing", "econ.asset-valuation", "econ.negotiation"],
  purpose: ["APPLY", "SYNTHESIZE"], pattern: ["world-exploration", "negotiation"],
  devices: "browser with WebGL; served statically",
  tech: "modular vanilla JS with a 3D world, no build step",
  output: "educator-report",
  source: gh("M2-201-FINAL"), run: [repoRun("M2-201-FINAL")],
  health: "needs-attention",
  healthBasis: "No GitHub Pages deployment (404); CI runs tests but does not publish. No live instance found.",
  maturity: "PLAYABLE",
  maturityBasis: "Two passing test suites, GitHub Actions CI, a documented mission matrix and a deterministic balance harness — the strongest engineering in the Front Office City family. No student-run evidence exists.",
  blockers: ["No deployment, so an instructor cannot run it today.", "Claim codes are prefixed 'M1-201-NFL-' in the Module 2 repo, an unresolved naming carry-over."],
  docs: "complete",
  confidence: "VERIFIED",
  evidence: "M2-201-FINAL/README.md: 'NFL-only 3D front-office simulation for middle school learners (7th/8th grade).' docs/mission-matrix.md lists missions such as 'AGENT-002 | Training Camp Holdout Threat'. CI at .github/workflows/ci.yml runs npm test on push.",
});

/* ── The Front Office capstone ── */

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "the-front-office", title: "The Front Office", family: "track-201", pillar: "economics", ...T201,
  summary: "The Track 201 capstone: run a franchise through four decision cycles.",
  does: "Students enter a class code, pick a franchise archetype — contender, young, or rebuilding — and run four cycles of room-based decisions covering trades, the draft lottery, press conferences and random events, moving cap flexibility, roster quality, optionality, trust and tax exposure. They finish by choosing a franchise philosophy and receiving a graded dossier.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.roster-windows", "econ.optionality", "econ.time-horizon", "econ.stakeholder-management", "econ.asset-valuation", "econ.reputation-risk"],
  purpose: ["SYNTHESIZE", "APPLY"], pattern: ["business-operator", "trade-and-exchange", "crisis-management"],
  setting: ["facilitator-led"], grouping: ["individual"], mode: ["online"],
  facRequired: true, founder: "any-instructor",
  prep: "Teacher issues class codes from the built-in dashboard.",
  tech: "single-file HTML (~22,000 lines) with jsPDF for report export",
  output: "educator-report",
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "yes", freeTextEntry: "yes", thirdPartyServices: [], notes: "Name, class code, quiz scores and metrics persist in browser localStorage under tfr_* keys. No server was observed, so records live only on the device that produced them." },
  source: gh("BSC-201-Capstone", "index.html"), run: [liveRun("BSC-201-Capstone"), repoRun("BSC-201-Capstone")],
  health: "healthy", healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "The most complete capstone in the account, publicly reachable, with a teacher dashboard and PDF and CSV export. No tests, and no student-run evidence exists.",
  blockers: ["Teacher records live only in the browser that created them — clearing storage or changing device loses the class.", "A 22,000-line single file with no automated tests."],
  docs: "minimal",
  confidence: "VERIFIED",
  evidence: "BSC-201-Capstone/index.html: 'You are the General Manager of an NBA franchise. Over 4 decision cycles...'; TeacherDashboard.exportCSV(); class codes formatted TFR-XXXXXX.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "the-front-office-early-build", title: "The Front Office (early build)", family: "track-201", pillar: "economics", ...T201,
  summary: "An earlier snapshot of The Front Office, kept for history.",
  does: "The same franchise capstone as the canonical build, but missing the cap timeline, the richer trade puzzle and the whole end-game arc of score breakdown, philosophy selection and replay.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.roster-windows", "econ.optionality"],
  purpose: ["SYNTHESIZE"], pattern: ["business-operator"],
  tech: "single-file HTML (~17,500 lines)",
  source: gh("Franchise-Sim", "index.html"), run: [liveRun("Franchise-Sim"), repoRun("Franchise-Sim")],
  health: "healthy", healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachable, but superseded.`,
  maturity: "EXPERIMENTAL", visibility: "superseded", supersededBy: "the-front-office",
  maturityBasis: "An incomplete earlier snapshot of a product that has a finished successor. Retained for history, not for classroom use.",
  blockers: ["Ends at the claim code with no score breakdown, philosophy selection or replay."],
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "Franchise-Sim/index.html and BSC-201-Capstone/index.html share an identical title, GameState field order, intro copy, screen structure and tfr_* storage keys. Franchise-Sim was committed 2026-01-08 with 17,565 lines and 71 functions; BSC-201-Capstone on 2026-01-11 with 22,092 lines and 78 functions, adding the cap timeline and the full ending.",
  govNotes: "Both remain publicly reachable on GitHub Pages, so a student could still land on the incomplete build. Deciding whether to retire that deployment is a BOW call.",
});
