/* Standalone and bonus experiences: the Gauntlet mastery layer, the bonus GM
   simulations, the analytics lab, and two capstone-adjacent builds. */
import { add, gh, liveRun, repoRun, SELF_CONTAINED, LOCAL_ONLY, TODAY } from "./seed-registry.mjs";

const GAUNTLET = { family: "gauntlet", ...SELF_CONTAINED, data: LOCAL_ONLY, tech: "single-file HTML/CSS/JS", pillar: "economics" };
const gauntletRun = (sub) => [
  { kind: "live-url", label: "Play (GitHub Pages)", url: `https://braydenokley13-ux.github.io/GAUNTLET/${sub}/`, verified: TODAY },
  repoRun("GAUNTLET"),
];

add({
  ...GAUNTLET,
  id: "gauntlet-l1-market-master", title: "Gauntlet L1: Market Master",
  summary: "Five rounds of pricing and production against a moving market.",
  does: "Students run a stand for five rounds, setting price and how much to make while covering fixed and variable costs, and absorbing a market event each round. The goal is total profit, and pricing too high or producing too much both cost them.",
  concepts: ["econ.price-elasticity", "econ.pricing-strategy", "econ.law-of-demand", "econ.marginal-value", "econ.fan-engagement"],
  purpose: ["PRACTICE"], pattern: ["market-and-pricing", "business-operator"],
  duration: { minutes: 15, basis: "stated-in-source" },
  source: gh("GAUNTLET", "gauntlet-l1/index.html"), run: gauntletRun("gauntlet-l1"),
  health: "needs-attention",
  healthBasis: "Reachable and playable, but its results-submission endpoint is still the placeholder string, so nothing is ever recorded.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "The game loop is complete but the submission integration was never finished, so the level cannot produce the evidence it is designed to produce.",
  blockers: ["The submission endpoint is still 'YOUR_WEB_APP_URL_HERE' — student results go nowhere."],
  output: "none", docs: "missing",
  confidence: "VERIFIED",
  evidence: "GAUNTLET/gauntlet-l1/index.html sets webAppUrl: 'YOUR_WEB_APP_URL_HERE' and states the goal is to 'maximize profit over 5 rounds'. The GAUNTLET landing card lists 15 minutes and 50–100 XP.",
});

add({
  ...GAUNTLET,
  id: "gauntlet-l2-supply-chain-crisis", title: "Gauntlet L2: Supply Chain Crisis",
  summary: "Six rounds running a store across three products with different elasticities and supply risks.",
  does: "Students order inventory and set prices for basketballs, jerseys and water bottles, each with its own cost, storage footprint, demand elasticity and supply reliability, working inside cash-flow and storage limits as supply becomes unreliable.",
  concepts: ["econ.supply-chain", "econ.price-elasticity", "econ.pricing-strategy", "econ.operations-tradeoffs", "econ.marginal-value"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["business-operator", "market-and-pricing"],
  duration: { minutes: 25, basis: "stated-in-source" },
  source: gh("GAUNTLET", "GauntletL2/index.html"), run: gauntletRun("GauntletL2"),
  health: "healthy",
  healthBasis: `Reachable, and the only Gauntlet level with a live results endpoint wired in. Probed ${TODAY}.`,
  maturity: "PLAYABLE",
  maturityBasis: "The richest mechanics in the Gauntlet and the only level whose evidence path actually works end to end. No student-run evidence exists.",
  output: "scored-outcomes",
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: ["Google Apps Script"], notes: "Posts student email, score, tier, XP and full financial results to a Google Apps Script endpoint. This is the only Gauntlet level that transmits student data. Descriptive only." },
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "GAUNTLET/GauntletL2/index.html carries a real deployed Apps Script webAppUrl and a submitResults function posting email, score, tier, XP and game data.",
});

add({
  ...GAUNTLET,
  id: "gauntlet-l3-economic-policy-simulator", title: "Gauntlet L3: Economic Policy Simulator",
  summary: "Eight quarters of fiscal, monetary and trade policy for a city in crisis.",
  does: "Students advise a city whose largest factory has closed, choosing fiscal, monetary and trade policy each quarter across two in-game years and balancing unemployment, inflation, growth and public approval. Policies take effect on a delay, and the engine models the trade-off between unemployment and inflation directly.",
  concepts: ["econ.fiscal-policy", "econ.monetary-policy", "econ.inflation", "econ.gdp-and-growth", "econ.business-cycle", "econ.multiplier-effect", "econ.tradeoffs"],
  purpose: ["APPLY", "SYNTHESIZE"], pattern: ["allocation-under-constraint", "crisis-management"],
  duration: { minutes: 35, basis: "stated-in-source" },
  source: gh("GAUNTLET", "gauntlet-l3/index.html"), run: gauntletRun("gauntlet-l3"),
  health: "healthy", healthBasis: `Reachable via the Gauntlet landing page on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "The deepest macroeconomics in the whole portfolio, complete and reachable, though evidence collection is manual. No student-run evidence exists.",
  output: "completion", docs: "missing",
  confidence: "VERIFIED",
  evidence: "GAUNTLET/gauntlet-l3/index.html: 'You are the Chief Economic Advisor... largest factory just closed, laying off 2,000 workers', with an explicit Phillips-curve relationship in the engine and a manual claim code submitted through a separate BOW form.",
  govNotes: "The only simulation in the account with substantial macroeconomics coverage — fiscal policy, monetary policy, inflation, the business cycle and the multiplier all appear here and almost nowhere else.",
});

add({
  ...GAUNTLET,
  id: "bow-boss-sim-economic-summit", title: "BOW Boss Sim — Economic Summit",
  summary: "Two students negotiate for one city against three AI cities over a recovery budget.",
  does: "A pair of students represent one of five cities across six rounds — opening statements, forming coalitions, allocating a shared recovery budget, and a final negotiation — needing three of four votes to pass their plan while holding public approval above half.",
  concepts: ["econ.negotiation", "econ.stakeholder-management", "econ.fiscal-policy", "econ.leverage", "econ.batna", "econ.public-goods"],
  purpose: ["SYNTHESIZE", "APPLY"], pattern: ["negotiation", "allocation-under-constraint"],
  duration: { minutes: 50, basis: "stated-in-source" },
  grouping: ["pairs"], setting: ["facilitator-led"], groupSize: "2 students sharing one device",
  source: gh("GAUNTLET", "Boss Sim/index.html"), run: gauntletRun("Boss%20Sim"),
  health: "healthy", healthBasis: `Reachable via the Gauntlet landing page on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "The richest negotiation and coalition logic in the account, complete and reachable. No student-run evidence exists.",
  output: "completion", docs: "missing",
  confidence: "VERIFIED",
  evidence: "GAUNTLET/Boss Sim/index.html: 'Five cities in a regional alliance... negotiate with three AI-controlled cities', generating a claim code and a downloadable PDF certificate. The GAUNTLET landing card lists 50 minutes.",
  govNotes: "The only genuinely two-student experience discovered in the account. Both students share one device — there is no networked multiplayer.",
});

/* ── Bonus GM simulations (BSC-anythingelse) ── */

const BONUS = {
  family: "bonus-gm-sims", ...SELF_CONTAINED, data: LOCAL_ONLY,
  grades: ["5", "6", "7", "8"], gradeBasis: "stated-in-source",
  tech: "Next.js 16 + React 19 route, with a grade-band toggle",
  output: "completion",
  health: "unknown",
  healthBasis: "No GitHub Pages deployment (404) and no other live URL found. Requires a build to run.",
  maturity: "PLAYABLE",
  blockers: ["No deployment — an instructor cannot run it today without building the app."],
  docs: "missing",
  confidence: "VERIFIED",
};
const bonus = (id, s) => add({ ...BONUS, id, source: gh("BSC-anythingelse", s.path), run: [repoRun("BSC-anythingelse")], ...s });

bonus("the-blockbuster", {
  title: "The Blockbuster", pillar: "economics", path: "app/blockbuster/page.tsx",
  summary: "Build, negotiate and close a franchise-altering trade.",
  does: "Students assemble a trade from players and picks, then negotiate across rounds against an AI counterpart that counters their offers, and must satisfy salary-matching rules before any deal can close.",
  concepts: ["econ.negotiation", "econ.salary-cap", "econ.asset-valuation", "econ.pick-value-and-decay", "econ.batna"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["negotiation", "trade-and-exchange"],
  duration: { minutes: 15, basis: "stated-in-source" },
  maturityBasis: "A complete multi-stage negotiation state machine with a working grade-band toggle. Not deployed, and no student-run evidence exists.",
  evidence: "BSC-anythingelse/app/blockbuster/page.tsx renders a '5th–6th Grade' and '7th–8th (Hard Mode)' toggle; the landing page lists it at about 15 minutes.",
});

bonus("the-lebron-files", {
  title: "The LeBron Files", pillar: "cross-pillar", path: "app/lebron-files/page.tsx",
  summary: "Five career decisions where each choice narrows the next.",
  does: "Students steer a career through team selection, a contract, endorsements, business investments and a final family decision, with each choice cascading into the options available at the next, ending in a legacy grade.",
  concepts: ["econ.time-horizon", "fin.income-reliability", "econ.capital-and-investment", "econ.sponsorship-and-brand", "econ.reputation-risk", "econ.negotiation"],
  purpose: ["APPLY", "SYNTHESIZE"], pattern: ["business-operator", "investment-and-portfolio"],
  duration: { minutes: 20, basis: "stated-in-source" },
  maturityBasis: "The largest of the bonus simulations and fully built. Not deployed, and no student-run evidence exists.",
  evidence: "BSC-anythingelse/app/page.tsx: '5 career decision points. Every choice cascades into the next.' A legacy grade is computed from a cumulative score.",
});

bonus("the-dumpster-fire", {
  title: "The Dumpster Fire", pillar: "financial-literacy", path: "app/dumpster-fire/page.tsx",
  summary: "Inherit a cap disaster and dig out of it over three years.",
  does: "Students take over a team carrying aging maximum contracts, no draft picks and a luxury-tax bill, and use trades, the stretch provision, buyouts and the mid-level exception across three years to escape the crunch, with random press-conference events between years.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.mid-level-exception", "econ.sunk-cost", "econ.optionality", "fin.contingency-planning"],
  purpose: ["APPLY"], pattern: ["allocation-under-constraint", "shock-and-adapt"],
  duration: { minutes: 15, basis: "stated-in-source" },
  maturityBasis: "Fully built with a three-year turn loop and a grade-band toggle. Not deployed, and no student-run evidence exists.",
  evidence: "BSC-anythingelse/app/dumpster-fire/page.tsx: 'take over a real team's worst financial situation. You have tools: Trade, Stretch, Buyout, MLE... Press conferences between years add random events!'",
});

bonus("ground-zero", {
  title: "Ground Zero", pillar: "economics", path: "app/ground-zero/page.tsx",
  summary: "Build an expansion franchise from nothing and survive year one.",
  does: "Students stock a brand-new team through an expansion draft of unprotected players and free agency, then simulate a first season against an AI rival and see which parts of their build actually produced the wins.",
  concepts: ["econ.roster-construction", "econ.salary-cap", "econ.asset-valuation", "econ.scarcity", "econ.optionality"],
  purpose: ["APPLY"], pattern: ["draft-and-selection", "allocation-under-constraint"],
  duration: { minutes: 15, basis: "stated-in-source" },
  maturityBasis: "Fully built across a draft phase, a free-agency phase and a simulated season. Not deployed, and no student-run evidence exists.",
  evidence: "BSC-anythingelse/app/ground-zero/page.tsx runs an expansion draft of unprotected players and scores on wins, cap flexibility, fan growth and the AI rival's record.",
});

bonus("the-rookie-deal", {
  title: "The Rookie Deal", pillar: "financial-literacy", path: "app/rookie-deal/page.tsx",
  summary: "Agent a top-five pick from draft night to the extension decision.",
  does: "Students represent a high draft pick through the rookie-scale contract, a shoe-deal choice and a development focus, then face the extension against free agency, with a final performance score naming what the player became.",
  concepts: ["econ.negotiation", "fin.income-reliability", "econ.sponsorship-and-brand", "econ.time-horizon", "econ.asset-valuation"],
  purpose: ["APPLY"], pattern: ["negotiation"],
  duration: { minutes: 12, basis: "stated-in-source" },
  gradeBasis: "track-convention",
  maturityBasis: "The most decision-dense of the bonus simulations. Not deployed, and no student-run evidence exists.",
  evidence: "BSC-anythingelse/app/rookie-deal/page.tsx steps through Draft Night, Shoe Deal, Dev Focus, Year 3, Extension and Outcome, grading from a cumulative score.",
  open: ["The grade-band toggle its sibling simulations carry was not directly confirmed in this file."],
});

const MINI = { family: "bonus-gm-sims", ...SELF_CONTAINED, data: LOCAL_ONLY, grades: ["5", "6", "7", "8"], gradeBasis: "stated-in-source", tech: "single-file HTML/CSS/JS with a grade-band toggle", output: "none", health: "unknown", healthBasis: "No deployment found for this repo (GitHub Pages 404).", maturity: "PLAYABLE", blockers: ["No deployment — an instructor cannot run it today."], docs: "missing", confidence: "VERIFIED" };

add({
  ...MINI, id: "endorsement-empire", title: "Endorsement Empire", pillar: "financial-literacy",
  summary: "Three seasons building a personal brand against an AI rival.",
  does: "Students pick endorsement deals across three seasons, manage how their image holds up, survive random events, and try to finish with a stronger brand portfolio than a rival building one at the same time.",
  concepts: ["econ.sponsorship-and-brand", "econ.reputation-risk", "fin.income-reliability", "econ.portfolio-thinking"],
  purpose: ["PRACTICE"], pattern: ["investment-and-portfolio"],
  duration: { minutes: 8, basis: "stated-in-source" },
  maturityBasis: "A complete short-format experience. Not deployed, and no student-run evidence exists.",
  source: gh("BSC-anythingelse", "public/endorsement-empire.html"), run: [repoRun("BSC-anythingelse")],
  evidence: "BSC-anythingelse/public/endorsement-empire.html offers '5th–6th Grade (with hints)' and '7th–8th Grade (Hard Mode)' and runs '3 seasons of brand building'.",
});

add({
  ...MINI, id: "fill-my-building", title: "Fill My Building", pillar: "economics",
  summary: "Price an arena for a season and watch the demand curve answer back.",
  does: "Students set ticket prices, concession markup, parking and special events month by month across a season, watching attendance and revenue respond — raise prices too far and the building empties and revenue falls with it — ending in a season grade.",
  concepts: ["econ.price-elasticity", "econ.law-of-demand", "econ.pricing-strategy", "econ.revenue-management", "econ.fan-engagement"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["market-and-pricing"],
  duration: { minutes: 10, basis: "stated-in-source" },
  maturityBasis: "A complete short-format experience and one of the clearest demonstrations of elasticity in the portfolio. Not deployed, and no student-run evidence exists.",
  source: gh("BSC-anythingelse", "public/fill-my-building.html"), run: [repoRun("BSC-anythingelse")],
  evidence: "BSC-anythingelse/public/fill-my-building.html: 'the demand curve is real: raise prices too much → attendance drops → revenue drops', with a grade-band toggle.",
});

add({
  ...MINI, id: "tank-commander", title: "Tank Commander", pillar: "economics",
  summary: "Compete or tank each month, against lottery odds that barely reward it.",
  does: "Students choose to compete or tank month by month through a rebuilding season while real draft-lottery odds shift, discovering that the worst record buys only a small edge and that tanking too obviously invites investigation.",
  concepts: ["econ.incentives", "econ.expected-value", "econ.uncertainty", "econ.competition-and-market-structure", "econ.risk-and-reward"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["signal-vs-noise"],
  duration: { minutes: 7, basis: "stated-in-source" },
  maturityBasis: "A complete short-format experience built around a genuine incentive-design idea. Not deployed, and no student-run evidence exists.",
  source: gh("BSC-anythingelse", "public/tank-commander.html"), run: [repoRun("BSC-anythingelse")],
  evidence: "BSC-anythingelse/public/tank-commander.html notes the 'worst team only has 14% chance at #1' and 'The difference between 14% and 8% is small. Extreme tanking isn't guaranteed to pay off.'",
});

/* ── Analytics Lab ── */

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "stat-inventor", title: "Stat Inventor", family: "analytics-lab", pillar: "cross-pillar",
  grades: ["5", "6"], gradeBasis: "stated-in-source",
  summary: "Invent a scoring formula, then see who it crowns.",
  does: "Students explore real player statistics across sports, star the players they rate, then build their own weighted formula in plain language and watch it decide a champion — discovering that what you choose to measure decides who wins.",
  concepts: ["econ.analytics-and-war", "econ.asset-valuation", "econ.signal-vs-noise"],
  purpose: ["INTRODUCE", "EXPLORE"], pattern: ["signal-vs-noise"],
  tech: "Alpine.js static site with real season data",
  output: "choices-recorded",
  source: gh("BSC-BUILDANALYTIC", "track101/index.html"), run: [liveRun("BSC-BUILDANALYTIC"), repoRun("BSC-BUILDANALYTIC")],
  health: "healthy", healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "Complete and reachable, with a share-link path into the facilitator collector. No student-run evidence exists.",
  docs: "minimal", confidence: "VERIFIED",
  evidence: "BSC-BUILDANALYTIC/index.html describes the Track 101 lane as 'Explore player data, build your own scoring formula using stars, and crown your champion' for 'Grades 5–6'.",
  facNotes: "Students copy a share link that a teacher pastes into the separate Teacher Collector tool. That collector is a facilitator dashboard, not a student experience, so it is not a Library entry.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "analytics-lab", title: "Analytics Lab", family: "analytics-lab", pillar: "cross-pillar",
  grades: ["7", "8"], gradeBasis: "stated-in-source",
  summary: "Build a weighted metric, test it against the data, and write the scouting report.",
  does: "Students pick a sport, explore a full statistical dataset, build a custom weighted metric with live sliders, examine percentiles, scatter plots and correlations, run what-if changes, then write and export a scouting report defending the metric they built.",
  concepts: ["econ.analytics-and-war", "econ.asset-valuation", "econ.signal-vs-noise", "econ.model-risk"],
  purpose: ["EXPLORE", "EVIDENCE", "SYNTHESIZE"], pattern: ["signal-vs-noise"],
  tech: "Alpine.js static site with charting and PDF export",
  output: "structured-assessment",
  data: { storesStudentData: "no", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "yes", thirdPartyServices: [], notes: "Student name is captured client-side and embedded in a share link and an exported PDF filename. No server storage observed." },
  source: gh("BSC-BUILDANALYTIC", "track201/index.html"), run: [liveRun("BSC-BUILDANALYTIC"), repoRun("BSC-BUILDANALYTIC")],
  health: "healthy", healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "The most sophisticated data-literacy build in the account, reachable and producing an exportable artefact. No student-run evidence exists.",
  docs: "minimal", confidence: "VERIFIED",
  evidence: "BSC-BUILDANALYTIC/index.html describes the Track 201 lane as 'Full dataset · percentile scores · scatter & stacked charts · What-If simulator · share & export' for 'Grades 7–8'.",
});

/* ── Capstone-adjacent standalone builds ── */

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "the-league-in-a-box", title: "The League in a Box", family: "track-101", pillar: "economics",
  summary: "Design the rules of a league, then meet the league you designed.",
  does: "Students set nine governance levers — a spending cap, revenue sharing, a tax on high spenders, contract limits, draft order, rookie pay, expansion pace, player movement and enforcement — then ratify them. The engine profiles the league they built, names its character, and shows a matrix of who wins and who loses under those rules.",
  concepts: ["econ.competition-and-market-structure", "econ.revenue-sharing", "econ.salary-cap", "econ.luxury-tax", "econ.incentives", "econ.stakeholder-management", "econ.market-size"],
  purpose: ["SYNTHESIZE", "EXPLORE"], pattern: ["allocation-under-constraint"],
  tech: "single-file HTML build plus a React/Vite rewrite published from docs/",
  output: "none",
  source: gh("league-in-a-box", "index.html"),
  moreSources: [gh("league-in-a-box", "src/league-in-a-box-advanced.jsx")],
  run: [liveRun("league-in-a-box"), repoRun("league-in-a-box")],
  health: "healthy", healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
  maturity: "PLAYABLE",
  maturityBasis: "Complete and reachable in two implementations, with a committed build output. No student-run evidence exists.",
  docs: "missing", confidence: "VERIFIED",
  evidence: "league-in-a-box/src/league-in-a-box-advanced.jsx labels the intro screen 'Track 101 Capstone' and closes with 'Check out BOW Sports Capital's Track 101 to understand league governance.' Recorded as one experience across two implementations.",
  govNotes: "Its own copy calls it a Track 101 capstone, so it is filed under Track 101 rather than as an unattached standalone — but it appears in no Track 101 lesson list. Worth reconciling against the curriculum.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "the-gms-model", title: "The GM's Model", family: "track-301", pillar: "economics",
  summary: "Build a player-evaluation model, then meet it again three years later.",
  does: "Students choose and weight evaluation factors, rank real players with the model they built, compare it against other GMs' models, then jump forward three years to see what their model could not have known — closing on why models do not know when they have gone stale.",
  concepts: ["econ.model-risk", "econ.asset-valuation", "econ.signal-vs-noise", "econ.uncertainty", "econ.analytics-and-war"],
  purpose: ["APPLY", "EXPLORE"], pattern: ["signal-vs-noise"],
  tech: "single-page React via in-browser Babel",
  output: "completion",
  source: gh("scout-model", "index.html"), run: [liveRun("scout-model"), repoRun("scout-model")],
  health: "needs-attention",
  healthBasis: `GitHub Pages returned 200 on ${TODAY}, but the repository is in poor order — the same application is duplicated across four files and the CI workflow file contains HTML instead of YAML.`,
  maturity: "EXPERIMENTAL",
  maturityBasis: "The experience itself is well built, but the repository around it is disordered enough that no one could safely tell which file is canonical.",
  blockers: ["The same application exists four times over in index.html, INDEX, a .rtf file and TRUE SIM — the canonical file is ambiguous.", "The GitHub Actions workflow file contains HTML rather than YAML and cannot run."],
  docs: "missing", confidence: "VERIFIED",
  evidence: "scout-model defines CLAIM_MASTER with TRACK_ID '301', MODULE_ID '2', LESSON_ID '5' and prefix 'L5-301-M2', which is why it is filed under Track 301 despite the repository name.",
  govNotes: "Its claim code places it at Track 301 Module 2 Lesson 5 — a lesson slot no other repository covers. It teaches evaluation-model bias rather than named economics vocabulary, which puts it at the edge of the inclusion rule; it is included because the decisions and their delayed consequences are genuine.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "entrepreneurship-lab-unit-economics", title: "Entrepreneurship Lab — Unit Economics", family: "entrepreneurship-lab", pillar: "cross-pillar",
  summary: "Set a price and a capacity, then watch ten periods decide whether the business survives.",
  does: "Students set a price and a per-period capacity, then run ten periods in which a demand curve decides how much actually sells, while cash, runway, profit per period and demand against sales chart out. The goal is to reach period ten without running out of cash.",
  concepts: ["econ.pricing-strategy", "econ.marginal-value", "econ.law-of-demand", "econ.entrepreneurship", "fin.viable-budget", "fin.full-cost"],
  purpose: ["PRACTICE"], pattern: ["business-operator", "market-and-pricing"],
  tech: "static HTML/JS with charting",
  output: "none",
  source: gh("entrepuernurship", "entrepeurneurship/index.html"), run: [repoRun("entrepuernurship")],
  health: "broken",
  healthBasis: "The page throws on load: index.html never includes state.js, and the simulation's own dependency guard raises an error when the functions in that file are missing.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "The underlying idea is sound and the engine is written, but the shipped build does not run and only one of three intended simulations was ever built.",
  blockers: ["The page fails on load — state.js is never included, and the dependency check in sim1.js throws without it.", "state.js is a malformed patch dump containing a second copy of index.html pasted in as a comment.", "Only Sim 1 of an intended three-part module exists; sim2 and sim3 are referenced but absent."],
  docs: "missing", confidence: "VERIFIED",
  evidence: "entrepuernurship/entrepeurneurship/index.html contains no script tag for state.js, while sim1.js asserts on load: 'state.js not loaded. Ensure state.js is loaded before sim1.js.' state.js declares sim1Completed, sim2Completed and sim3Completed but no sim2.js or sim3.js exists in the repository.",
  govNotes: "Recorded rather than omitted because entrepreneurship and unit economics are otherwise thinly covered, and this is a repairable build rather than a bad idea.",
});
