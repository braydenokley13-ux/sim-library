/* Track 301 — BOW's advanced track. Grade band is contested: two repos state
   Grades 9–10, the website calls it "executive level", most repos state nothing. */
import { add, gh, liveRun, repoRun, SELF_CONTAINED, LOCAL_ONLY, TODAY } from "./seed-registry.mjs";
import { lesson } from "./seed-data.mjs";

const G910 = { grades: ["9", "10"], gradeBasis: "stated-in-source" };
const T301 = { family: "track-301" };

lesson("301-M1-ECON", {
  id: "venture-capital-tycoon", title: "Venture Capital Tycoon", ...T301, pillar: "economics",
  summary: "Run a fifty-million-dollar venture fund across five years.",
  does: "Students review deal flow each year and choose to invest or pass, then in portfolio review add follow-on capital or cut losers, then decide whether to sell now or hold for a riskier payout, while market news shifts sector valuations. The final score blends fund return with a scorecard of the economic reasoning used.",
  concepts: ["econ.capital-and-investment", "econ.portfolio-thinking", "econ.opportunity-cost", "econ.sunk-cost", "econ.optionality", "econ.marginal-value", "econ.risk-and-reward"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["investment-and-portfolio"],
  maturityBasis: "Complete and publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "301-M1-ECON/index.html <title>Venture Capital Tycoon</title>, subtitle 'Learn economics by running a $50M startup fund over 5 years', with concept chips naming opportunity cost, time value, option value, diminishing returns and the sunk cost fallacy.",
});

lesson("301-M2-ECON", {
  id: "business-economics-challenge", title: "Business Economics Challenge", ...T301, pillar: "economics", ...G910,
  summary: "Fourteen timed rounds of business economics under live company metrics.",
  does: "Students lead strategy across fourteen rounds, answering scenario questions on contracts, risk-adjusted return, diversification, moral hazard and capital structure while cash, growth, trust, compliance and risk respond, using three lifelines and a streak multiplier, ending in a board report.",
  concepts: ["econ.principal-agent", "econ.risk-and-reward", "econ.portfolio-thinking", "econ.expected-value", "econ.asset-valuation", "econ.capital-and-investment"],
  purpose: ["PRACTICE", "EVIDENCE"], pattern: ["business-operator"],
  maturityBasis: "Complete, documented and publicly reachable. No student-run evidence exists.",
  docs: "partial", output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M2-ECON/README.md: 'Interactive business simulation game for 9th-10th graders' and '14 rounds'.",
  open: ["The repo's only commit is titled 'Delete 301-M2-ECON directory' while adding every file, suggesting extraction from a former monorepo. Provenance is unresolved."],
});

lesson("301-M3-ECON", {
  id: "deal-dynasty", title: "Deal Dynasty — Business Strategy Game", ...T301, pillar: "economics",
  summary: "Seven rounds, each teaching a different negotiation or game-theory idea.",
  does: "Students pitch investors under signalling pressure, weigh competing offers against their walk-away, buy from a seller who knows more than they do, run a five-week pricing standoff with a rival, build a reputation, make a credible commitment, and close a three-party deal needing two of three to agree.",
  concepts: ["econ.negotiation", "econ.batna", "econ.leverage", "econ.reputation-risk", "econ.competition-and-market-structure", "econ.stakeholder-management", "econ.entrepreneurship"],
  purpose: ["EXPLORE", "PRACTICE"], pattern: ["negotiation", "auction-and-bidding"],
  maturityBasis: "Complete and publicly reachable, with an explicit teaching note closing each round. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "301-M3-ECON/index.html subtitle 'Build your business empire in 7 high-stakes rounds'; each round object carries concept and teach fields covering signalling and screening, BATNA, information asymmetry, repeated games, reputation, commitment devices and multi-party bargaining.",
});

lesson("301-M4-ECON", {
  id: "startup-tycoon", title: "Startup Tycoon: Data-Driven Decisions", ...T301, pillar: "economics",
  summary: "Seven data-reasoning rounds under one startup scoreboard.",
  does: "Students work through seven linked exercises — pricing risky deals by expected value, giving forecast ranges, avoiding an overfitted curve, updating on new evidence, combining models, choosing under ambiguity, and calibrating their own confidence — with one running score and a closing list of what they practised.",
  concepts: ["econ.expected-value", "econ.uncertainty", "econ.model-risk", "econ.signal-vs-noise", "econ.entrepreneurship", "econ.risk-and-reward"],
  purpose: ["EXPLORE", "PRACTICE"], pattern: ["signal-vs-noise", "investment-and-portfolio"],
  duration: { minutes: 15, basis: "stated-in-source" },
  maturityBasis: "Complete and publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "301-M4-ECON/index.html states '7 rounds • ~15 minutes • Can you make Business Legend?' Rounds carry headings for expected value, confidence intervals, overfitting, Bayesian updating, ensembles, ambiguity and calibration. Recorded as one experience: shared shell, running score and single results screen.",
});

lesson("301-M1-L1", {
  id: "gm-decision-game", title: "BOW Sports Capital — GM Decision Game", ...T301, pillar: "economics",
  summary: "Nine branching front-office calls across three franchises.",
  does: "Students run three franchises in turn, each presenting three scenarios on contracts, trades, cap space, arbitration and free agency. Every choice is tagged accelerate, smooth or rebuild, and the next scenario is picked from what they chose last, so the path genuinely branches.",
  concepts: ["econ.time-horizon", "econ.roster-windows", "econ.salary-cap", "econ.opportunity-cost", "econ.optionality"],
  purpose: ["PRACTICE"], pattern: ["business-operator"],
  moreSources: [gh("301-M1-L1", "bow_301_activity_overview.pdf")],
  maturityBasis: "Complete and publicly reachable, implementing a design spec that ships alongside it. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "301-M1-L1/js/teams-data.js defines TEAM_ORDER of three franchises and an unlock threshold of 33; js/game.js computes nine total scenarios and branches on choice type.",
  open: ["The bundled PDF is a build instruction addressed to an AI assistant, not a statement of audience. It is not evidence of a grade band."],
});

lesson("301-M1-L2", {
  id: "curve-room-2", title: "The Curve Room 2.0 — Salary Cap Simulation", ...T301, pillar: "cross-pillar", ...G910,
  summary: "Shape a five-year payroll curve instead of spending evenly.",
  does: "Students pick a team with its own competitive situation, then allocate payroll across five years against the cap and the tax line, aiming for a build-peak-reset shape rather than a flat line — which the scoring explicitly penalises — with a live curve chart and league health meter.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.roster-windows", "econ.time-horizon", "econ.optionality"],
  purpose: ["PRACTICE", "EVIDENCE"], pattern: ["allocation-under-constraint"],
  duration: { minMinutes: 10, maxMinutes: 15, basis: "stated-in-source" },
  tech: "multi-file static site with Chart.js from a CDN",
  maturityBasis: "The best-documented lesson repo in the account — five planning and verification documents covering a genuine v1 to v2 rebuild. No student-run evidence exists.",
  docs: "complete", output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M1-L2/VERIFICATION_REPORT.md: 'Educational Design (9th/10th Grade Audience)'; CURVE_ROOM_2.0_PLAN.md names the same audience; DEPLOYMENT.md states 'Time: 10-15 minutes'. Grade band and duration come from planning docs rather than in-app copy.",
  govNotes: "Depends on a CDN for Chart.js, so it will not run on a fully offline classroom network.",
});

lesson("301-M1-L3", {
  id: "gm-challenge-efficiency-frontier", title: "The GM Challenge — Master the Efficiency Frontier", ...T301, pillar: "economics",
  summary: "Draft under three real league cap regimes and watch diminishing returns appear.",
  does: "Students draft one player per required position within budget across three real historical datasets in turn — an uncapped league, a hard-capped one, and one with a soft cap and tax — with a live efficiency-frontier chart showing where extra spending stops buying extra production.",
  concepts: ["econ.marginal-value", "econ.opportunity-cost", "econ.scarcity", "econ.surplus-value", "econ.analytics-and-war", "econ.salary-cap"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["draft-and-selection", "allocation-under-constraint"],
  tech: "multi-page static site with Chart.js and real historical player datasets",
  maturityBasis: "Complete and publicly reachable, with a substantial design plan and real historical data. No student-run evidence exists.",
  docs: "partial", output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M1-L3 spans index.html, activity.html, results.html and completion.html sharing js/storage.js and a league query parameter — recorded as one experience across four screens, not four. Learning objectives name diminishing returns, the efficiency frontier, resource constraints and opportunity cost.",
});

lesson("301-M2-L1", {
  id: "espn-crisis-manager", title: "ESPN Crisis Manager: The Salary Cap Leak", ...T301, pillar: "cross-pillar",
  summary: "Eight rounds of crisis management after undisclosed payments leak.",
  does: "Students act as an executive VP after a leak reveals payments made outside the stated cap. Each of eight rounds moves trust, legal exposure, revenue and control, and the story branches between defending transparency and defending legally, through fines, lost picks and sponsor reactions.",
  concepts: ["econ.crisis-management", "econ.reputation-risk", "econ.stakeholder-management", "econ.salary-cap", "econ.incentives"],
  purpose: ["APPLY"], pattern: ["crisis-management"],
  duration: { minMinutes: 8, maxMinutes: 10, basis: "stated-in-source" },
  maturityBasis: "Complete and publicly reachable with full path branching. No student-run evidence exists.",
  blockers: ["index.html and espn-leak-activity.html are byte-identical duplicates, leaving two entry points for one activity."],
  confidence: "VERIFIED",
  evidence: "301-M2-L1/index.html states 'Time to complete: 8-10 minutes' and tracks trust, legal, revenue and control meters. diff against espn-leak-activity.html returns no differences.",
});

lesson("301-M2-L2", {
  id: "risk-volatility-gm-sim", title: "Risk, Volatility & Rational Aggression", ...T301, pillar: "economics",
  summary: "Three seasons testing whether a team's risk-taking matches its situation.",
  does: "Students pick a team whose circumstances differ — a legacy power, a small-market reset, a cash-rich expansion side — commit to a strategy from stability to boom-or-bust, then run three seasons of drafting, trading and free agency under the cap. Scoring weights whether the risk taken fitted the context, not whether it paid off.",
  concepts: ["econ.risk-and-reward", "econ.uncertainty", "econ.expected-value", "econ.salary-cap", "econ.luxury-tax", "econ.time-horizon", "econ.process-vs-results"],
  purpose: ["APPLY"], pattern: ["business-operator", "investment-and-portfolio"],
  tech: "React + TypeScript + Zustand, deployed by GitHub Actions to Pages",
  maturityBasis: "A complete state machine and scoring model, deployed by CI, but visibly unpolished. No student-run evidence exists.",
  blockers: ["The browser tab still reads 'React App' — the default title was never set.", "The onboarding component references an image that does not exist in the repo, so it will 404 on the deployed site."],
  confidence: "VERIFIED",
  evidence: "301-M2-L2/sports-management-game/src/pages/IntroPage.tsx carries the title and a stated weighting of risk-context alignment 40%, financial sustainability 30%, on-court results 30%. TeamOnboarding.tsx references /301-M2-L2/images/brayden-white.jpg with no public/images directory present.",
  open: ["A 1,042-line implementation plan describes a Postgres and Redis backend that was never built; the shipped app is entirely client-side. Its stated 20–30 minute session is a planning target, not a measurement, so no duration is recorded."],
});

lesson("301-M2-L3", {
  id: "nfl-system-stress-test", title: "NFL System Stress Test", ...T301, pillar: "cross-pillar",
  summary: "Judge whether a shock strengthens, strains or breaks an organisation.",
  does: "Students read fifteen real stress scenarios across five teams, each with its own organisational profile, and classify each as something the system needs, absorbs, is strained by, or breaks under. A tutorial mode walks three scenarios with answers shown; the real mode runs all fifteen blind and scored.",
  concepts: ["econ.operations-tradeoffs", "econ.uncertainty", "econ.reputation-risk", "econ.stakeholder-management", "econ.roster-construction"],
  purpose: ["PRACTICE", "EVIDENCE"], pattern: ["signal-vs-noise", "crisis-management"],
  maturityBasis: "The most thoroughly self-documented repo in the Track 301 set, including its own honest list of limitations. No student-run evidence exists.",
  docs: "complete", output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M2-L3/README.md documents the four classifications, the tutorial and real modes, and tiered claim codes L3-301-M2-GOLD-PRESSURE, SILVER-ANALYST and BRONZE-SYSTEMS. Recorded as one experience with two modes.",
});

add({
  ...SELF_CONTAINED,
  id: "structural-leverage-sim", title: "Structural Leverage SIM", ...T301, pillar: "economics",
  summary: "Leverage is alternatives, not arguments — worked through three negotiations.",
  does: "Students read three negotiation scenarios and, across four phases, identify who holds leverage, how it shifts as the market and the deadline move, what actually creates it, and finally who could credibly walk away and what it would cost them.",
  concepts: ["econ.leverage", "econ.batna", "econ.negotiation", "econ.optionality"],
  purpose: ["PRACTICE", "APPLY"],
  setting: ["facilitator-led"], mode: ["online"], founder: "bow-certified-instructor", facRequired: true,
  prep: "Each student works in their own copy of the spreadsheet.",
  tech: "Google Apps Script + Sheets; a browser build exists but has no entry point",
  output: "scored-outcomes", pattern: ["negotiation"],
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: ["Google Workspace"], notes: "The Apps Script reads configured student name and email cells and writes claim codes to an instructor master sheet. Descriptive only." },
  source: gh("301-M3-L1", "apps script"),
  moreSources: [gh("301-M3-L1", "html-activity"), gh("301-M3-L1", "301 M3L1.xlsx")],
  run: [repoRun("301-M3-L1")],
  health: "broken",
  healthBasis: "The browser build has no HTML entry point — the repo's only commit is titled 'Delete index.html' and none exists in the tree. The spreadsheet build appears complete but cannot be verified without the bound sheet.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "One of two delivery channels is definitively broken; the other cannot be launched from the repo.",
  blockers: ["The browser activity cannot be opened: css and js exist but index.html was deleted.", "The bound Google Sheet is not in the repository."],
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "301-M3-L1 contains html-activity/css and html-activity/js but no HTML file anywhere in git ls-tree. js/app.js header names 'Structural Leverage SIM'; the xlsx carries 'Structural Leverage Lab — Leverage is alternatives, not arguments.'",
});

lesson("301-M3-L2", {
  id: "signal-engine", title: "Signal Engine — Sports Agent Negotiation Sim", ...T301, pillar: "economics",
  summary: "Negotiate by managing what the other side believes, not what is true.",
  does: "Students represent a restricted free agent across five negotiation rounds, choosing from twenty-four signals that shift the opposing GM's beliefs about alternatives, urgency and fairness while spending credibility and risking backlash. Contradictory sequences and unsupported bluffs are penalised, and a film review replays every turn.",
  concepts: ["econ.negotiation", "econ.batna", "econ.leverage", "econ.reputation-risk", "econ.principal-agent", "econ.uncertainty"],
  purpose: ["APPLY", "EVIDENCE"], pattern: ["negotiation"],
  maturityBasis: "The most mechanically sophisticated single-file simulation in the account, modelling opponent belief state and generating counterfactuals. No student-run evidence exists.",
  output: "scored-outcomes",
  data: { storesStudentData: "no", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: [], notes: "Asks for full name and school email before play, but no network call was found — the values stay in the browser." },
  confidence: "VERIFIED",
  evidence: "301-M3-L2/index.html <title>Signal Engine — Sports Agent Negotiation Sim</title>, with the closing line 'in negotiation, leverage is about managing what the other side believes, not what's actually true.'",
});

add({
  ...SELF_CONTAINED,
  id: "reputation-and-the-long-game", title: "Reputation & the Long Game", ...T301, pillar: "economics",
  summary: "A two-round negotiation where round one's reputation sets round two's starting position.",
  does: "Not yet runnable. As designed, students pick a role and a horizon, negotiate one round using a chosen signal and decide whether to follow through on a bluff, then open a second negotiation whose starting position reflects the trust and credibility they built or spent.",
  concepts: ["econ.reputation-risk", "econ.negotiation", "econ.batna", "econ.time-horizon"],
  purpose: ["EXPLORE", "APPLY"], pattern: ["negotiation"],
  setting: ["facilitator-led"], tech: "Google Sheets workbook; the Apps Script automation does not exist",
  output: "none", data: { storesStudentData: "unknown", requiresLogin: "unknown", freeTextEntry: "yes", notes: "The workbook defines student name and email ranges and this copy already contains real test data." },
  source: gh("301-M3-L3", "301 M3L3-2.xlsx"), run: [repoRun("301-M3-L3")],
  health: "broken",
  healthBasis: "The workbook states its own automation is not built. Nothing scores, and the results ranges have nothing to populate them.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "The source describes itself as content and data model only, with automation deferred. It cannot be played.",
  blockers: ["The Apps Script that would run and score this does not exist in the repository.", "The committed workbook contains a real name and email address as leftover test data."],
  docs: "missing",
  confidence: "INFERRED",
  evidence: "301-M3-L3/301 M3L3-2.xlsx: 'Simulator Workbook (2 rounds, 3 scenario packs). Content + data model; automation is added later via Apps Script.' Mechanics reconstructed from sheet schema and labels, not from a running engine.",
  govNotes: "Contains a real name and email address committed as test data. Worth clearing before any wider sharing.",
});

lesson("301-M4-L1", {
  id: "war-room-nba-decision-simulator", title: "WAR ROOM — NBA Decision Simulator", ...T301, pillar: "economics",
  summary: "Follow the model, adjust it, or override it — and find out.",
  does: "Students face real analytics scenarios where a confidence-scored projection meets a situation the model cannot see. For each they must flag at least two fragile assumptions, then follow, adjust or override the model with a typed rationale, before the real outcome and their streak are revealed.",
  concepts: ["econ.model-risk", "econ.expected-value", "econ.uncertainty", "econ.signal-vs-noise", "econ.analytics-and-war"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["signal-vs-noise"],
  maturityBasis: "Fifteen fully authored scenarios with individual outcome text. No student-run evidence exists.",
  output: "choices-recorded",
  data: { storesStudentData: "no", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: [], notes: "Collects name and email client-side for the completion code; no network call observed." },
  confidence: "VERIFIED",
  evidence: "301-M4-L1/index.html hero copy: 'Analytics just dropped their projection. The numbers say one thing. The situation says another.' Scenarios carry modelConfidence and fragility-scored factors.",
});

add({
  ...SELF_CONTAINED,
  id: "decision-room-memo", title: "Decision Room (memo exercise)", ...T301, pillar: "economics",
  summary: "Annotate an analytics memo and name which assumption snapped first.",
  does: "Students work an internal memo: tag two or three fragile assumptions and say where the risk lives, diagnose why the model worked before, then absorb an update where the model's output stays the same but the environment does not, choose a leadership action, and write a decision rationale.",
  concepts: ["econ.model-risk", "econ.uncertainty", "econ.expected-value", "econ.leadership-under-constraints"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["signal-vs-noise"],
  setting: ["facilitator-led"], tech: "Google Apps Script + Sheets with free-text scoring",
  output: "scored-outcomes", founder: "bow-certified-instructor", facRequired: true,
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: ["Google Workspace"], notes: "Writes to a submissions log with student name and email. This committed copy already contains real test data." },
  source: gh("301-M4-L1", "apps script"), moreSources: [gh("301-M4-L1", "301_M4_L1-2.xlsx")],
  run: [repoRun("301-M4-L1")],
  health: "unknown",
  healthBasis: "Not verifiable without the bound Google Sheet, which is not in the repo.",
  maturity: "PLAYABLE",
  maturityBasis: "Complete and carefully written, with a 934-line script scoring free text by phrase detection. No student-run evidence exists.",
  blockers: ["The bound Google Sheet is not in the repository.", "The committed workbook contains a real name and email address as leftover test data."],
  docs: "minimal",
  confidence: "VERIFIED",
  evidence: "301-M4-L1 xlsx: 'Models are maps, not reality. Your job is to notice when the terrain moves.' and 'A precise output is not automatically a more accurate output... Decimals can create false confidence.'",
  govNotes: "Shares a lesson slot and claim-code prefix with the WAR ROOM game but is a materially different design — a reflective writing exercise rather than a clickable game. Recorded separately for that reason. Whether both should occupy the same slot is a BOW call.",
});

lesson("301-M4-L2", {
  id: "decision-room-simulator", title: "Decision Room Simulator", ...T301, pillar: "economics",
  summary: "Two experts, the same data, opposite conclusions — and both are 90% confident.",
  does: "Students take a trade-deadline or draft-day scenario in which two models reach opposite conclusions from the same injury data while both reporting high confidence. Across five phases they classify each model's claims and pick a posture — push, hold, hybrid or reframe — that moves sensitivity, rigidity and confidence.",
  concepts: ["econ.model-risk", "econ.uncertainty", "econ.expected-value", "econ.signal-vs-noise", "econ.optionality"],
  purpose: ["APPLY", "EVIDENCE"], pattern: ["signal-vs-noise", "crisis-management"],
  moreSources: [gh("301-M4-L2", "apps script"), gh("301-M4-L2", "Copy of 301_M4_L2.xlsx")],
  facNotes: "One experience in two builds: a browser build and a parallel Apps Script build whose sheet names and vocabulary match it closely.",
  maturityBasis: "Both builds complete and the browser build is publicly reachable. No student-run evidence exists.",
  output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M4-L2/index.html: 'Both models still show 90%+ confidence despite using the same injury data to reach opposite conclusions' — 'the clearest sign that the disagreement is philosophical, not analytical'.",
});

lesson("301-M4-L3", {
  id: "model-risk-false-confidence", title: "Model Risk & False Confidence", ...T301, pillar: "economics",
  summary: "Spot false precision, catch overfitting, and resist a room that already agrees.",
  does: "Students work three levels: finding false precision in real projections, identifying models that explain the past too well and the future badly, then choosing the right executive response to a confident model output that everyone in the room already believes. Each answer returns a worked explanation.",
  concepts: ["econ.model-risk", "econ.signal-vs-noise", "econ.uncertainty", "econ.expected-value"],
  purpose: ["PRACTICE", "EVIDENCE"], pattern: ["signal-vs-noise"],
  maturityBasis: "Complete, publicly reachable and the most privacy-minimal build in the Track 301 set — it collects nothing. No student-run evidence exists.",
  output: "scored-outcomes",
  confidence: "VERIFIED",
  evidence: "301-M4-L3/index.html: 'This game trains you to spot false confidence, resist overfitting traps, and think like an executive who never confuses confidence with correctness.'",
  govNotes: "Its structure is closer to a worked diagnostic quiz than a turn-based simulation. It is included because the decisions are genuine judgement calls with explained consequences, but it sits at the boundary of the inclusion rule.",
});
