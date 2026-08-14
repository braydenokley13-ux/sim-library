#!/usr/bin/env node
/* Seed data for the BOW Simulation Library. Run: node scripts/seed-data.mjs */
import { add, gh, liveRun, repoRun, SELF_CONTAINED, LOCAL_ONLY, RECORDS, OUT, TODAY } from "./seed-registry.mjs";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

// A lesson simulation that is one self-contained page, deployed on GitHub Pages.
const lesson = (repo, s) =>
  add({
    ...SELF_CONTAINED,
    data: LOCAL_ONLY,
    source: gh(repo, s.path ?? "index.html"),
    run: [liveRun(repo), repoRun(repo)],
    health: "healthy",
    healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
    maturity: "PLAYABLE",
    tech: s.tech ?? "single-file HTML/CSS/JS, no build step",
    output: s.output ?? "none",
    ...s,
  });

/* ─────────────────────────────  TRACK 101 · Grades 5–6  ───────────────────────────── */

const T101 = { grades: ["5", "6"], gradeBasis: "track-convention" };

lesson("101-M1-ECON", {
  id: "mega-city-tycoon", title: "Mega City Tycoon", family: "track-101", pillar: "economics", ...T101,
  summary: "A city-building economics game where students balance a municipal budget against growth.",
  does: "Students run a growing city, choosing where to spend a limited budget across services and development, and watch the trade-offs land as the city's needs change around them.",
  concepts: ["econ.scarcity", "econ.tradeoffs", "econ.opportunity-cost", "econ.cost-benefit-analysis"],
  purpose: ["APPLY", "PRACTICE"], pattern: ["allocation-under-constraint", "business-operator"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  moreSources: [gh("101-M1-ECON", "apps script")],
  confidence: "INFERRED",
  evidence: "101-M1-ECON/index.html <title>MEGA CITY TYCOON - Economics Adventure!</title>. Repo also holds a Google Apps Script ('BOW MODULE 1 — FINAL ECON SIMULATION v2.0') and 'Copy of BSC- Module 1 Econ Final - 101.xlsx'.",
  open: ["The Apps Script in this repo may be a separate spreadsheet simulation rather than a second delivery of this one. Recorded as one entry to avoid inflating the portfolio; needs a human read to split."],
  docs: "missing",
});

lesson("101-M2-ECON", {
  id: "deliverempire", title: "DeliverEmpire — Build Your Food Delivery Dynasty", family: "track-101", pillar: "economics", ...T101,
  summary: "Students build a food-delivery business and meet supply, demand and pricing through running it.",
  does: "Students operate a delivery company, setting prices, managing capacity and responding to demand, then see revenue and customer response move against their choices.",
  concepts: ["econ.law-of-demand", "econ.law-of-supply", "econ.pricing-strategy", "econ.operations-tradeoffs"],
  purpose: ["APPLY", "PRACTICE"], pattern: ["business-operator", "market-and-pricing"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  moreSources: [gh("101-M2-ECON", "apps script")],
  confidence: "INFERRED",
  evidence: "101-M2-ECON/index.html <title>DeliverEmpire - Build Your Food Delivery Dynasty!</title>. Repo also holds a Google Apps Script (Module 2) and a Track 101 xlsx workbook.",
  open: ["Whether the Apps Script version is the same experience in a second medium was not verified."],
  docs: "missing",
});

lesson("101-M3-ECON", {
  id: "delivery-empire-strategy", title: "Delivery Empire — Economic Strategy Game", family: "track-101", pillar: "economics", ...T101,
  summary: "A strategy-layer sequel to the delivery business, focused on competition and scale.",
  does: "Students make repeated strategic calls running a delivery operation — pricing against rivals, investing in capacity, absorbing demand shifts — and see the cumulative effect across rounds.",
  concepts: ["econ.competition-and-market-structure", "econ.pricing-strategy", "econ.marginal-value", "econ.operations-tradeoffs"],
  purpose: ["APPLY", "SYNTHESIZE"], pattern: ["business-operator", "market-and-pricing"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  moreSources: [gh("101-M3-ECON", "apps script")],
  confidence: "INFERRED",
  evidence: "101-M3-ECON/index.html <title>DELIVERY EMPIRE | Economic Strategy Game</title>. Repo also holds a 7-section Google Apps Script and a Track 101 xlsx.",
  open: ["Relationship to deliverempire (101-M2-ECON) is unconfirmed — same business theme, possibly a deliberate sequel."],
  docs: "missing",
});

add({
  ...SELF_CONTAINED,
  id: "module-4-econ-final-101", title: "Module 4 Econ Final — Track 101", family: "track-101", pillar: "economics", ...T101,
  summary: "A spreadsheet-delivered end-of-module economics simulation, run from inside a Google Sheet.",
  does: "Students work through a multi-section economics simulation delivered as a Google Sheet driven by Apps Script, making choices in cells and passing checks to advance.",
  concepts: ["econ.scarcity", "econ.tradeoffs", "econ.cost-benefit-analysis"],
  purpose: ["EVIDENCE", "SYNTHESIZE"],
  setting: ["facilitator-led"], grouping: ["individual"], mode: ["online"],
  devices: "Google account and access to the bound spreadsheet",
  founder: "bow-certified-instructor",
  facRequired: true,
  prep: "The Apps Script must be bound to a copy of the workbook; the bound sheet is not in the repo.",
  tech: "Google Apps Script + Google Sheets",
  output: "choices-recorded",
  data: { storesStudentData: "yes", requiresLogin: "yes", usesClassCodes: "no", freeTextEntry: "unknown", thirdPartyServices: ["Google Workspace"], notes: "Apps Script simulations in this family write to a StudentData sheet and identify students by Google account. Descriptive only." },
  source: gh("101-M4-ECON", "apps script"),
  moreSources: [gh("101-M4-ECON", "Module 4 Econ Final - Track 101-2.xlsx")],
  run: [repoRun("101-M4-ECON")],
  health: "unknown",
  healthBasis: "No GitHub Pages deployment (404). Cannot be verified without the bound Google Sheet, which is not in the repo.",
  maturity: "EXPERIMENTAL",
  maturityBasis: "Cannot be confirmed runnable from the repo alone — the workbook it drives is not present.",
  blockers: ["The bound Google Sheet is not in the repository, so the simulation cannot be launched or verified from source."],
  docs: "missing",
  confidence: "INFERRED",
  evidence: "101-M4-ECON contains only 'apps script' (Module 4, sections 0/8 onward) and 'Module 4 Econ Final - Track 101-2.xlsx'. No index.html; GitHub Pages 404.",
});

lesson("101-M2-L2", {
  id: "small-markets-big-money", title: "Small Markets, Big Money", family: "track-101", pillar: "economics", ...T101,
  summary: "How market size shapes what a team can spend and earn.",
  does: "Students run a small-market front office and make spending and revenue decisions that a big-market team would make differently, seeing where market size helps and where it constrains.",
  concepts: ["econ.market-size", "econ.revenue-sharing", "econ.competition-and-market-structure", "econ.tradeoffs"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["allocation-under-constraint"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED",
  evidence: "101-M2-L2/index.html <title>Small Markets, Big Money — Bow Sports Capital Front Office</title>.",
});

lesson("101-M3-L1", {
  id: "moneyball-draft-challenge", title: "Moneyball Draft Challenge", family: "track-101", pillar: "economics", ...T101,
  summary: "Drafting on measured value rather than reputation.",
  does: "Students draft players using performance data instead of name recognition, discovering that the cheapest productive player often beats the famous expensive one.",
  concepts: ["econ.analytics-and-war", "econ.market-inefficiency", "econ.surplus-value", "econ.asset-valuation"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["draft-and-selection"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED", evidence: "101-M3-L1/index.html <title>⚾ Moneyball Draft Challenge</title>.",
});

lesson("101-M3-L2", {
  id: "stats-vs-scouts", title: "Stats vs Scouts — Basketball Decision Lab", family: "track-101", pillar: "economics", ...T101,
  summary: "Weighing measured evidence against expert judgement.",
  does: "Students decide between what the numbers say and what a scout says on a series of player calls, then see which source was right and why neither is right every time.",
  concepts: ["econ.signal-vs-noise", "econ.analytics-and-war", "econ.uncertainty"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["signal-vs-noise", "draft-and-selection"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED", evidence: "101-M3-L2/index.html <title>Stats vs Scouts - Basketball Decision Lab</title>.",
});

lesson("101-M3-L3", {
  id: "process-vs-results-lab", title: "Process vs Results Lab — Football Edition", family: "track-101", pillar: "economics", ...T101,
  summary: "A good decision can still lose; judge the reasoning, not only the scoreboard.",
  does: "Students make football calls where the right decision sometimes loses and the wrong one sometimes wins, then separate the quality of the choice from the outcome it happened to get.",
  concepts: ["econ.process-vs-results", "econ.expected-value", "econ.uncertainty", "econ.risk-and-reward"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["signal-vs-noise"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED", evidence: "101-M3-L3/index.html <title>🏈 Process vs Results Lab v2 - Football Edition</title>.",
});

lesson("101-M4-L1", {
  id: "why-the-draft-isnt-a-ranking", title: "Why the Draft Isn't a Ranking", family: "track-101", pillar: "economics", ...T101,
  summary: "Draft position reflects fit and need, not a pure ordering of talent.",
  does: "Students run a draft where the best available player is often the wrong pick, and work out how team need, position scarcity and cost change what 'best' means.",
  concepts: ["econ.pick-value-and-decay", "econ.roster-construction", "econ.opportunity-cost", "econ.scarcity"],
  purpose: ["INTRODUCE", "PRACTICE"], pattern: ["draft-and-selection"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED", evidence: "101-M4-L1/index.html <title>Module 4 Lesson 1 — Why the Draft Isn't a Ranking</title>.",
});

lesson("101-M4-L3", {
  id: "draft-room-fit-vs-bpa", title: "Draft Room Challenge — Fit vs BPA", family: "track-101", pillar: "economics", ...T101,
  summary: "The recurring draft-room argument: best player available, or the one who fits.",
  does: "Students work a draft board choosing between the highest-rated player and the one who fills a real roster need, and live with the roster they end up holding.",
  concepts: ["econ.roster-construction", "econ.pick-value-and-decay", "econ.opportunity-cost", "econ.tradeoffs"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["draft-and-selection"],
  maturityBasis: "Runs end-to-end and is publicly reachable. No student-run evidence exists.",
  confidence: "VERIFIED", evidence: "101-M4-L3/index.html <title>Draft Room Challenge — Fit vs BPA</title>.",
});

lesson("T101-M1-L1", {
  id: "front-office-build-the-roster", title: "Front Office: Build the Roster", family: "track-101", pillar: "economics",
  grades: ["5", "6"], gradeBasis: "stated-in-source",
  summary: "Build a team under a salary cap, then absorb an owner's curveball.",
  does: "Students pick a GM style that sets their budget, sign and release from a 16-player pool while four meters move, then a random Owner's Curveball changes the target mid-build and forces a repair. They finish with a GM score and a short written memo.",
  concepts: ["econ.salary-cap", "econ.scarcity", "econ.opportunity-cost", "econ.roster-construction", "econ.tradeoffs"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["allocation-under-constraint", "shock-and-adapt"],
  output: "choices-recorded",
  facNotes: "plan.md is a build spec, not a teacher-facing guide. The repo also ships an interactive xlsx carrying the same claim code, so the lesson can run without browsers.",
  moreSources: [gh("T101-M1-L1", "Copy of Be The GM(Salary Cap)-101M1L1.xlsx")],
  maturityBasis: "Runs end-to-end, publicly reachable, and carries in-browser self-tests. No student-run evidence exists.",
  docs: "partial",
  confidence: "VERIFIED",
  evidence: "T101-M1-L1/plan.md: 'A single-file (index.html), framework-free sports-business simulation for 5th–6th graders.' Companion xlsx reveals the same claim code 'L1-101-M1-67' as the browser build, so the two are one experience in two media.",
});

lesson("T101-M1-L2", {
  id: "trade-deadline-war-room-101", title: "Trade Deadline War Room (Track 101)", family: "track-101", pillar: "economics",
  grades: ["5", "6"], gradeBasis: "stated-in-source",
  summary: "Two rounds of deadline trades against a luxury-tax line, pitched at Grades 5–6.",
  does: "Students run one of three franchises through a 12-screen deadline: read intel, pick a trade, watch four meters and the tax line move, absorb an ownership pressure moment that re-weights what matters, make a closing move, then defend it.",
  concepts: ["econ.luxury-tax", "econ.salary-cap", "econ.tradeoffs", "econ.time-horizon"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["trade-and-exchange", "shock-and-adapt"],
  duration: { minutes: 5, basis: "stated-in-source" },
  output: "choices-recorded",
  facNotes: "QA-CHECKLIST.md is a developer QA document, not a facilitator guide. A branching PowerPoint covering the same topic ships alongside and can be run on a projector.",
  moreSources: [gh("T101-M1-L2", "Luxury Tax Basics Simulation-2.pptx")],
  maturityBasis: "28 unit tests pass, accessibility and reduced-motion handled, documented QA pass. No student-run evidence exists.",
  docs: "partial",
  confidence: "VERIFIED",
  evidence: "T101-M1-L2/QA-CHECKLIST.md: 'Audience: 5th–6th grade. Topic: NBA salary cap & luxury tax.' and 'Acceptable for a ~5-minute activity.' tests/simulation.test.js reports 28 passing.",
  govNotes: "Shares a title with trade-deadline-war-room-201. Evidence points to deliberate grade-band differentiation rather than accidental duplication, but this was never confirmed by a human.",
});

lesson("T101-M2-L1", {
  id: "front-office-the-homestand", title: "Front Office: The Homestand", family: "track-101", pillar: "economics", ...T101,
  summary: "Price a homestand and choose a sponsor, balancing fans against revenue.",
  does: "Students act as team president over three fixed rounds — a fan strategy, a sponsor strategy, then a pitch to ownership — with every outcome driven by stated business logic rather than chance, and a synergy note linking the first two choices.",
  concepts: ["econ.pricing-strategy", "econ.law-of-demand", "econ.sponsorship-and-brand", "econ.fan-engagement", "econ.revenue-management"],
  purpose: ["PRACTICE", "APPLY"], pattern: ["market-and-pricing", "business-operator"],
  duration: { minutes: 60, basis: "stated-in-source" },
  maturityBasis: "Runs end-to-end and is publicly reachable, but is noticeably less finished than the Module 1 lessons: no tests, no persistence, and no completion record.",
  blockers: ["No persistence — a refresh loses all student progress.", "Stylesheet still carries 'MLB MONEY MAKER' scaffolding from a different game it was reskinned from."],
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "T101-M2-L1/index.html states 'About a 60-minute case.' front-office.js: 'deterministic choose-your-own-adventure. No randomness.' mlb-redesign-game/css/style.css opens '/* MLB MONEY MAKER - OVERHAULED UI */'.",
});

/* ─────────────────────────  Pre-course · team, live  ───────────────────────── */

add({
  id: "bsc-pre-course-front-office", title: "BOW Sports Capital: Pre-Course", family: "pre-course", pillar: "cross-pillar",
  grades: ["5", "6", "7", "8"], gradeBasis: "stated-in-source",
  summary: "A live, team-based front-office mission chain with asymmetric roles, built for two grade bands.",
  does: "A teacher opens a session and students join in teams. Across eight missions the team navigates an HQ floor map; within each mission up to four students hold different private information as Capologist, Team President, Head Scout or Marketing Director, and must vote across multiple rounds. Consequences carry forward and rewrite later missions, and concept checks gate progress.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.bird-rights", "econ.mid-level-exception", "econ.revenue-sharing", "econ.roster-construction", "econ.stakeholder-management", "econ.tradeoffs"],
  purpose: ["APPLY", "SYNTHESIZE"],
  setting: ["facilitator-led", "whole-class"], grouping: ["teams"], mode: ["online", "synchronous"],
  devices: "one device per team, plus a teacher device",
  groupSize: "up to 4 students per team",
  facRequired: true, founder: "bow-certified-instructor",
  prep: "Teacher creates a session, selects Track 101 or 201 content, and distributes join codes. Requires a deployed instance with Postgres.",
  pattern: ["allocation-under-constraint", "negotiation", "shock-and-adapt"],
  tech: "Next.js 14, Prisma + PostgreSQL, bcrypt teacher auth, iron-session",
  output: "structured-assessment",
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "yes", freeTextEntry: "yes", thirdPartyServices: ["PostgreSQL"], notes: "Stores nickname, avatar, a per-student token and a hashed recovery code in Postgres. No email or legal-name field observed in the Prisma schema. Descriptive only, not a compliance assessment." },
  source: gh("BSC-pre-course"),
  run: [repoRun("BSC-pre-course"), { kind: "doc", label: "Deploy and run guide (README)", path: "README.md" }],
  health: "unknown",
  healthBasis: "Requires a deployed Postgres instance; no live URL found. GitHub Pages serves the unrelated standalone game in this repo, not this app.",
  maturity: "PLAYABLE",
  maturityBasis: "Substantial content-quality tooling (glossary, readability, adaptive-coverage and balance checks) and a documented production preflight. Not verifiable as running without a deployment, and no student-run evidence exists.",
  blockers: ["No live deployment found, so an instructor cannot run it today without standing up Postgres."],
  docs: "complete",
  confidence: "VERIFIED",
  evidence: "BSC-pre-course/lib/track101Content.ts: 'Track 101 is designed for 5th–6th grade students... Target reading level: Flesch-Kincaid Grade 6.' app/teacher/setup/page.tsx offers 'Track 201 — High School / Advanced' and 'Track 101 — 5th–6th Grade'. lib/missionGraph.ts MISSION_ORDER matches 101-pre-course exactly.",
  govNotes: "Spans both Track 101 and Track 201 from one codebase via a content-simplification overlay — the only BOW product that does this.",
});

add({
  id: "bow-zoom-discovery-game", title: "BOW Sports Capital Zoom Game", family: "pre-course", pillar: "cross-pillar", ...T101,
  summary: "The earlier, simpler team-vote Zoom game that BSC-pre-course grew out of.",
  does: "Teams join a teacher-run session and vote their way through eight missions, with concept-check gates every second mission and a teacher dashboard tracking votes, misconceptions and stuck teams.",
  concepts: ["econ.salary-cap", "econ.revenue-sharing", "econ.analytics-and-war", "econ.pick-value-and-decay"],
  purpose: ["INTRODUCE"],
  setting: ["facilitator-led", "whole-class"], grouping: ["teams"], mode: ["online", "synchronous"],
  facRequired: true, founder: "bow-certified-instructor",
  pattern: ["allocation-under-constraint"],
  tech: "Next.js 14 with a flat-file JSON store",
  output: "educator-report",
  data: { storesStudentData: "yes", requiresLogin: "no", usesClassCodes: "yes", freeTextEntry: "yes", thirdPartyServices: [], notes: "Nickname only, stored in a server-side JSON file. Teacher endpoints gated by an unhashed key." },
  source: gh("101-pre-course"),
  run: [repoRun("101-pre-course")],
  health: "needs-attention",
  healthBasis: "No deployment found; flat-file storage is documented by its own README as unsuitable for production use.",
  maturity: "EXPERIMENTAL", visibility: "superseded", supersededBy: "bsc-pre-course-front-office",
  maturityBasis: "A working prototype superseded by a materially more mature rebuild. Kept for history, not for classroom use.",
  blockers: ["Teacher key is stored unhashed.", "Flat-file storage is not durable on the documented hosting target."],
  docs: "partial",
  confidence: "VERIFIED",
  evidence: "101-pre-course/lib/constants.ts MISSIONS carries the identical eight mission ids in identical order to BSC-pre-course/lib/missionGraph.ts, which expands each from a two-choice object into a multi-role branching mission.",
});

add({
  ...SELF_CONTAINED, data: LOCAL_ONLY,
  id: "bsc-pregame-cap-simulator", title: "BOW Sports Capital: Pregame", family: "pre-course", pillar: "economics",
  summary: "A twelve-week single-player front-office season with a running CBA glossary.",
  does: "Students take a team through a twelve-week season as club president, making a major decision each week plus minor ones, working a trade deadline and a finale, while a glossary panel defines each cap term as it becomes relevant. Owner patience running out ends the run.",
  concepts: ["econ.salary-cap", "econ.luxury-tax", "econ.bird-rights", "econ.mid-level-exception", "econ.roster-windows", "econ.time-horizon"],
  purpose: ["EXPLORE"], pattern: ["business-operator", "allocation-under-constraint"],
  source: gh("BSC-pre-course", "index.html"),
  run: [liveRun("BSC-pre-course"), repoRun("BSC-pre-course")],
  health: "healthy",
  healthBasis: `GitHub Pages returned 200 on ${TODAY}. Reachability only.`,
  maturity: "EXPERIMENTAL",
  maturityBasis: "The file's own header carries an unfinished polish checklist, and the product is undocumented — its own repo README never mentions it.",
  blockers: ["Undocumented: not referenced by the repo README or by the Next.js app it sits beside.", "Its own header checklist lists animation, responsive and storage verification as outstanding."],
  docs: "missing",
  confidence: "VERIFIED",
  evidence: "BSC-pre-course/game.js opens with an unresolved 'Polish Checklist'. index.html <title>BOW Sports Capital: Pregame</title>. Uses vocabulary (BRI, escrow, second apron, repeater tax) well above the repo's stated Grade 5-6 reading target, and states no grade band of its own.",
  open: ["Sits in the BSC-pre-course repo but is unconnected to that app. Its audience is unclear — the CBA vocabulary is far above the repo's stated Grade 5-6 target."],
});

export { lesson, T101 };
