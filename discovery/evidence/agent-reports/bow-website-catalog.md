# Discovery report — bow-website-catalog

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

# BOW Sports Capital — Repo Investigation Report

## Summary table

| Repo | BOW-related | Category | Embedded sims | Recommendation |
|---|---|---|---|---|
| Bow-Platform | definitely | ADMIN/OPS platform (LMS shell) | 0 (links out only) | EXCLUDE |
| bow-universe | definitely | Student-facing platform | 1 (economic policy sandbox) | INCLUDE-IN-LIBRARY |
| Bow-Sports-Capital-Full-APP | definitely | Student-facing platform (LMS shell) | 0 (links out only) | EXCLUDE (platform), lineage evidence noted |
| CourtIQ | possibly (same founder, sibling brand) | Pre-MVP basketball-IQ product, not econ/finlit | 0 (no code yet) | EXCLUDE |
| bow-scheduler | definitely | ADMIN/OPS (booking tool) | 0 | EXCLUDE |
| Advantage-Portal | unrelated | Newsroom OS for "The Advantage" student paper | 0 | EXCLUDE |
| advantage-calendar | unrelated | Booking/scheduling tool for "The Advantage" | 0 | EXCLUDE |
| Advantage-Apps-Script | unrelated | Google Apps Script pipeline for "The Advantage" | 0 | EXCLUDE |
| upticklocal | unrelated | Local-ad-network marketing site | 0 | EXCLUDE |
| Adaptability-Model-NBA | possibly (BOW Research brand) | NBA analytics/ML dashboard | 0 | EXCLUDE |
| Regression-Trap-Model-NBA | possibly (BOW Research brand) | NBA analytics/ML CLI | 0 | EXCLUDE |
| Rookie-Performance-Prediction-Model | possibly | NBA ML predictor web form | 0 | EXCLUDE |
| SDO-MODEL-BOW | possibly (BOW Research brand) | NBA scouting ML/Streamlit | 0 | EXCLUDE |
| TPHM-MODEL | unclear | Raw CSV data dump only, no code | 0 | EXCLUDE |
| Touch-Dependency-Model | possibly (BOW Research brand) | NBA scouting ML/Streamlit+Next | 0 | EXCLUDE |
| Volatility_Model_NBA | possibly (BOW Research brand) | NBA volatility ML/Streamlit | 0 | EXCLUDE |

---

## Detailed findings

### Bow-Platform
**What it is:** The original/legacy BOW Sports Capital backend — a huge Google Apps Script (`Code.gs`, `PortalActions.gs`, 335KB combined) running on Google Sheets as the database, paired with a Next.js "portal" frontend (`portal/`) with 40+ student pages (dashboard, badges, quests, leaderboard, arcade, pods, etc.) and an admin curriculum builder.
**bowRelated:** definitely — header comment: "BOW Sports Capital — Platform Core v3 (Stabilized)"; admin emails `braydenokley13@gmail.com`, `bowsportscapitalpodcast@outlook.com`.
**Category:** ADMIN/OPS/LMS platform — excluded from Library.
**Embedded simulations:** None found. It orchestrates simulations hosted elsewhere: `PortalActions.gs` defines `activity_type: 'SIMULATION'` records with a `sim_url`/`activity_url` field pulled from a Google Sheet ("Activities_Draft" / catalog), and the student `activities` page (`app/(student)/activities/page.tsx`) renders `item.activity_url` as an outbound `<a href>` link (opens in new tab), not an iframe of actual sim code. `portal/components/bow-arcade.tsx` contains generic mini-games (Simon, reflex, word blitz, math) — filler/reward games, not economics simulations.
**Tech stack:** Google Apps Script (Sheets DB) + Next.js/TypeScript portal, GitHub Actions "Portal Quality Gates" CI.
**Deployment evidence:** CI workflow only; no Vercel config seen; Apps Script deploys as a web app inside Google Workspace.
**Lineage:** Earliest of the three main app iterations (last touched 2026-03-01). Superseded in spirit by Bow-Sports-Capital-Full-APP, which re-implements the same Track 101/201/301 + Gauntlet + XP model on Supabase/Drizzle instead of Sheets/Apps Script.
**Recommendation:** EXCLUDE — pure admin/ops/curriculum-orchestration backend; no simulation code lives here, only links to simulations hosted in other repos.

### bow-universe
**What it is:** "BOW Universe" — a from-scratch Next.js/Prisma/PostgreSQL rewrite pitched explicitly as a *research-first* alternative to the arcade-style BOW products. Students investigate a fictional pro sports league's economic issues, build projects across four lanes (Tool Builders, Policy Reform Architects, Strategic Operators, Economic Investigators), draft formal rule-change proposal memos, and can **run a sandbox economic model** to see the consequences of their proposed rule changes before submitting.
**bowRelated:** definitely — README: "BOW Universe is a research-first fictional sports-economy league for grades 5 through 8."
**Category:** Student-facing learning platform — INCLUDE.
**Embedded simulations (1):** A genuine decision → consequence economic simulator lives at `src/app/api/sandbox/route.ts` + `src/lib/sim.ts`. Students submit a JSON "rule diff" (e.g., change `revenueSharingRate`) against the league's active `RuleSet`; the engine (`compareRuleOutcomes`/`simulateSeason`) computes salary-cap growth, luxury-tax brackets, team revenue, valuation, parity index, tax concentration, and small-vs-big-market competitiveness for baseline vs. proposed rules, and surfaces an "Impact Report" with plain-language deltas. This gates the "Sandbox evidence" step of the proposal wizard (`proposal-step-sandbox.tsx`).
**Tech stack:** Next.js 16 App Router, TypeScript, Prisma/PostgreSQL, NextAuth credentials auth, Vitest.
**Deployment evidence:** README documents Vercel deployment steps (Neon/Vercel Postgres); no live URL found in repo.
**Grade band evidence:** `prisma/schema.prisma` — `enum GradeBand { GRADE_5_6, GRADE_7_8 }`. Directly matches BOW's Grades 5-8 mandate.
**Concept terms (verbatim from `prisma/seed-glossary.ts`):** Salary Cap, Hard Cap, Soft Cap, Luxury Tax, Payroll, Cap Space, Revenue, Revenue Sharing, Valuation, Profit, Market Size, Competitive Balance, Parity, Dynasty, Performance Proxy, Ruleset, Proposal, Amendment, Rule Diff, Issue, Evidence, Sandbox, Simulation, Impact Report, Roster, Rebuild, Tax Bill.
**Facilitation:** "Commissioner" role manages class codes and student invites (teacher-analog); no explicit class-period/duration data found (UNKNOWN).
**Lineage:** Middle of the three (last touched 2026-03-12, between Bow-Platform and Bow-Sports-Capital-Full-APP). README explicitly frames itself as *not* a duplicate but a deliberate pedagogical pivot: "The app is intentionally research-first and avoids arcade-style presentation." Unclear whether it is active or was superseded — no cross-links found between bow-universe and the other two apps' codebases.
**Recommendation:** INCLUDE-IN-LIBRARY — real interactive economics/policy simulation embedded in a larger research platform, grade-band-verified.

**Proposed library entry:**
- proposedId: `bow-universe-sandbox-impact-model`
- canonicalTitle: "Sandbox Impact Model" (Proposal Coach step: "Sandbox evidence" / "Run sandbox model")
- path: `/workspace/acct/bow-universe/src/lib/sim.ts`, `src/app/api/sandbox/route.ts`, `src/components/proposal-step-sandbox.tsx`
- whatStudentsDo: Draft a JSON "rule diff" to a league RuleSet (e.g., change salary cap growth rate, luxury tax brackets, or revenue-sharing rate), run the sandbox model, read the resulting Impact Report (parity index, tax concentration, revenue inequality, small-vs-big competitiveness deltas), then write an interpretation and submit as part of a formal proposal memo.
- pillar: Economics (salary cap / luxury tax / revenue sharing / market parity policy)
- conceptTerms (verbatim): Salary Cap, Luxury Tax, Revenue Sharing, Market Size, Competitive Balance, Parity, Valuation, Ruleset, Rule Diff, Impact Report, Sandbox
- gradeBandEvidence: `enum GradeBand { GRADE_5_6, GRADE_7_8 }` in `prisma/schema.prisma`; README "grades 5 through 8"
- purpose: Teach consequences of economic policy design (cap rules, tax policy, revenue distribution) via a testable rule-diff → simulated outcome loop
- delivery: Web app (Next.js), authenticated (NextAuth), server-computed simulation
- durationEvidence: UNKNOWN (no explicit time estimates found)
- facilitation: "Commissioner" role (teacher/admin) manages class codes, invites, and reviews proposals; commissioner "decisions" model exists (`CommissionerDecision`)
- evidenceOutput: JSON Impact Report with baseline vs. proposed metrics + plain-language explanation array; feeds into a proposal memo workflow
- studentDataProfile: Requires account creation (NextAuth credentials); demo accounts documented in README (`riya-patel@bow.local`, `taylor-west@bow.local`)
- maturitySignal: Single-commit history locally (last touch 2026-03-12); has Vitest unit tests (`sim.test.ts`) — moderate maturity, feature-complete backend logic
- simulationPattern: parameterize-rules → run-model → compare-baseline-vs-proposed → interpret-evidence
- confidence: high
- evidence: `src/lib/sim.ts` (full simulation engine: `simulateSeason`, `calculateLuxuryTax`, `compareRuleOutcomes`, `deriveIssueAlerts`); `prisma/schema.prisma` GradeBand enum; `prisma/seed-glossary.ts` term list

### Bow-Sports-Capital-Full-APP
**What it is:** The newest (2026-04-23) and most polished BOW app — a full gamified "unified web app" (Next.js 15/Supabase/Drizzle) with XP, levels, streaks, BFC wallet currency, credentials/passes, badges, leaderboards, pods, quests, Gauntlet tiers, and a lesson player that combines slide deck + Spotify podcast + an **embedded iframe of an externally-hosted activity**.
**bowRelated:** definitely — public landing page copy: "Bow Sports Capital teaches middle schoolers to think like front-office executives — contracts, salary caps, trades, drafts, ownership..."; README: "The official home of Bow Sports Capital."
**Category:** Student-facing gamification/LMS *platform* — excludes as a Library entry itself (it is the delivery shell, not a simulation), but it is the load-bearing lineage evidence for other repos' simulations.
**Embedded simulations found directly in-repo:** 0. It does not contain simulation logic itself — it hosts external simulations via `iframe`/postMessage claim shim (`scripts/bsc-shim.js`, `/shim/bsc-shim.js`) and lesson `activityUrl` fields.
**Exact github.io links referenced (lineage evidence), from `lib/data/mock.ts`:**
  - `T201-M1-L2` — lesson title "NBA GM Crisis Manager" — `activityUrl: "https://braydenokley13-ux.github.io/T201-M1-L2/"`, `activityRepo: "braydenokley13-ux/T201-M1-L2"` — matching local repo `/workspace/acct/T201-M1-L2` exists (not in my assignment; belongs to another agent).
  - Gauntlet Level 1 (`T201-M4-G1`) — `activityUrl: "https://braydenokley13-ux.github.io/gauntlet-l1/"`
  - Gauntlet Level 2 (`T201-M4-G2`) — `activityUrl: "https://braydenokley13-ux.github.io/gauntlet-l2/"`
  - Gauntlet Level 3 (`T201-M4-G3`) — `activityUrl: "https://braydenokley13-ux.github.io/gauntlet-l3/"`
  - A local repo named `GAUNTLET` exists at `/workspace/acct/GAUNTLET` (likely source for one/all Gauntlet levels; not confirmed which — outside my assignment).
  - All other lessons (T101-M1-L1, T101-M1-L2, T101-M2-L1, T101-M2-L2, T201-M1-L1, T201-M1-L3, etc.) have `activityUrl: null` — slide deck + podcast only, no interactive component.
**Tech stack:** Next.js 15 App Router + TypeScript, Tailwind + Framer Motion, shadcn/Radix, Supabase (Postgres/Auth/Storage/Realtime), Drizzle ORM, Zod, TanStack Query, Vercel hosting.
**Deployment evidence:** README states "Hosting: Vercel"; runs in `BSC_USE_MOCK_DATA=1` mock mode by default (no live Supabase wiring confirmed in repo).
**Lineage:** Newest of the three core BOW apps (last commit 2026-04-23, "Refocus on content: hide gamification nav, elevate lesson + tracks" — notably a move to de-emphasize arcade/gamification chrome in favor of lesson content, converging somewhat with bow-universe's "avoids arcade-style presentation" philosophy). Reuses the exact same Track 101/201/301 + Module + Gauntlet structure as Bow-Platform, strongly suggesting it is Bow-Platform's intended successor/rewrite (Sheets+Apps Script → Supabase+Drizzle), not an unrelated product.
**Recommendation:** EXCLUDE as a Library item (it's the delivery platform/LMS shell) — but its `lib/data/mock.ts` is the single most useful lineage document in the whole account for locating where the *actual* embedded simulations live (external github.io repos).

### CourtIQ
**What it is:** A separate, pre-MVP youth basketball-IQ training product ("Duolingo + Basketball IQ Academy + Interactive Film Room + Gamified Progression") for ages 11-15. README states explicitly: "Current Status: Pre-MVP. Planning phase. This repo currently contains the full strategy, architecture, and build plan. No code yet."
**bowRelated:** possibly — same GitHub owner (`braydenokley13-ux`), similar "operating system for X" branding voice and gamification vocabulary (XP, streaks, badges) as BOW products, but no BOW mention anywhere in the repo and it targets basketball skill/decision-making, not economics/financial literacy.
**Category:** Not BOW's subject domain (basketball IQ, not Econ/FinLit) — even if launched, would be a sibling venture, not a BOW Library item.
**Embedded simulations:** 0 shippable code. The planning docs describe a planned "Scenario Engine" ("an interactive decision simulator that puts players in realistic situations") as the core future product, and `courtiq/project/` contains Claude-Design HTML/JSX mockups (`scenario.jsx`, `court.jsx`) of that concept — but this is a design handoff bundle, not a working simulation.
**Tech stack (planned):** Not yet implemented; design prototypes in HTML/CSS/JS/JSX.
**Deployment evidence:** None (pre-MVP).
**Recommendation:** EXCLUDE — wrong subject domain (basketball decision-making, not economics/financial literacy) and no functioning product exists yet.

### bow-scheduler
**What it is:** "BOW Story Scheduler" — a standalone Next.js booking app for scheduling "Share Your BOW Story" sessions (parent/student testimonial interviews), with Google Sheets/Calendar backend and an admin staff area.
**bowRelated:** definitely — README: "A premium standalone scheduling experience for BOW Sports Capital."
**Category:** ADMIN/OPS tool (booking/scheduling), not a learning experience.
**Embedded simulations:** 0.
**Tech stack:** Next.js, Tailwind, shadcn/ui, Framer Motion, Google Sheets/Calendar APIs, Vercel KV.
**Deployment evidence:** Designed for Vercel per README.
**Recommendation:** EXCLUDE — pure scheduling/ops tool, no student learning content.

### Advantage-Portal
**What it is:** "Advantage Portal" — a newsroom operating system for "The Advantage," described as "a student publication." Runs an editorial pipeline (pitches → assignments → submissions → reviews → issues), essay competitions, messaging, moderation.
**bowRelated:** unrelated — no mention of BOW/Bow Sports Capital anywhere in README, code, or docs searched. It is a self-contained student-journalism CMS. (Same account owner `braydenokley13-ux`, but a distinct venture — "The Advantage" newspaper, not BOW economics simulations.)
**Category:** ADMIN/OPS (newsroom CMS) — not a BOW learning product at all.
**Embedded simulations:** 0.
**Tech stack:** Next.js 16, React 19, TypeScript, Supabase, Tailwind/shadcn, Zod, Vitest, Nodemailer.
**Deployment evidence:** GitHub Actions CI present; Supabase-only backend.
**Recommendation:** EXCLUDE — unrelated venture (student journalism operations), not BOW Economics/FinLit content.

### advantage-calendar
**What it is:** "The Advantage Calendar" — a simple Next.js slot-booking/signup calendar with an admin table, almost certainly a companion booking tool for "The Advantage" publication (same naming pattern, same "slots/signup" domain as bow-scheduler but for a different brand).
**bowRelated:** unrelated — no BOW references found anywhere in the repo.
**Category:** ADMIN/OPS booking tool.
**Embedded simulations:** 0.
**Tech stack:** Next.js 15, React 19, Google APIs (`googleapis`), Framer Motion, Tailwind.
**Recommendation:** EXCLUDE — unrelated venture, pure scheduling tool.

### Advantage-Apps-Script
**What it is:** A single large Google Apps Script file, "THE ADVANTAGE — WRITING PIPELINE v3," managing writer onboarding, deadline reminders, recognition/leaderboards, Hall of Fame, and analytics dashboards for the "The Advantage" student writing program via Google Forms/Sheets. Config includes article types like "Economic Analysis," "Economic Explainer" — a journalism club with an economics-writing bent, not a BOW simulation.
**bowRelated:** unrelated — no BOW mentions; admin email is the same person (`braydenokley13@gmail.com`) but the product is journalism-workflow automation, not BOW Sports Capital.
**Category:** ADMIN/OPS (Google Apps Script backend automation).
**Embedded simulations:** 0.
**Tech stack:** Google Apps Script + Google Forms/Sheets.
**Recommendation:** EXCLUDE — unrelated venture, pure ops automation, no student-facing interactive simulation.

### upticklocal
**What it is:** A marketing/business website for "Uptick Local" — pages for `networks`, `locations`, `partners`, `advertisers`. README is a Claude-Design handoff bundle instructing an agent to implement HTML/CSS/JS mockups pixel-perfect. This looks like a local advertising/media-network product, unrelated to education.
**bowRelated:** unrelated — no BOW or education references found anywhere.
**Category:** Marketing site for an unrelated local-ad-network business.
**Embedded simulations:** 0.
**Tech stack:** Next.js, TypeScript.
**Recommendation:** EXCLUDE — confirmed unrelated venture (local advertising business), no education or BOW content whatsoever.

### Adaptability-Model-NBA
**What it is:** A Random Forest classifier predicting whether NBA players "THRIVE/SURVIVE/FADE" after age 35, with a Streamlit app (`app.py`) and a separate Next.js "web" dashboard (`web/app/predict`, `web/app/rankings`, `web/app/insights`) for browsing predictions and rankings.
**bowRelated:** possibly — no direct "BOW" mention found in this repo, but it is one of a family of NBA analytics repos by the same account that other repos in this set explicitly brand "BOW Research" (see SDO/Touch-Dependency below); likely a sibling in that same content pipeline, unconfirmed for this specific repo.
**Category:** Data-science / analyst dashboard for adults (front-office/scouting use case), not a classroom simulation.
**Interactive loop check:** The "predict" page is a single input-form → single ML-inference-output tool (select a player or input stats → get a THRIVE/SURVIVE/FADE tier). No sequence of decisions with escalating consequences, no narrative, no economics/finlit teaching concept, no grade-band targeting — requires advanced basketball stats (PER, WS/48, BPM) implying an adult/analyst audience.
**Tech stack:** Python (scikit-learn, pandas), Streamlit + a separate Next.js/TypeScript static dashboard.
**Deployment evidence:** Merge PR "frontend-vercel-deployment" in git log — deployed to Vercel.
**Recommendation:** EXCLUDE — single-shot ML prediction tool for basketball scouting, not an interactive economics/finlit decision simulation, no grade-band evidence.

### Regression-Trap-Model-NBA
**What it is:** An ML system (`scripts/train_model.py`, `scripts/predict.py`) predicting whether an NBA player's breakout season will regress, "designed for NBA front office decision-making," producing GM-ready text reports.
**bowRelated:** possibly — `REGRESSION_TRAP_MODEL_PLAN.md` labels the work "BOW Research Model #004," tying it to the same "BOW Research" internal-analytics/podcast brand referenced in other repos.
**Category:** CLI-driven data-science tool, no web UI at all — furthest from a student-facing product of any repo checked.
**Interactive loop check:** None — command-line only (`python scripts/predict.py --player "..."`), single-shot output, no persistent state, no decisions/consequences loop.
**Tech stack:** Python, scikit-learn, argparse CLI.
**Deployment evidence:** None (no web app, no hosting).
**Recommendation:** EXCLUDE — CLI analytics tool for adult front-office use, not a classroom simulation.

### Rookie-Performance-Prediction-Model
**What it is:** "NBA Rookie Bust Predictor" — a Flask API (`app.py`, `api/predict.py`) + static `index.html` form where a user enters a rookie's basic and advanced stats (Age, PER, TS%, USG%, WS, BPM, VORP, etc.) and receives a predicted Win-Shares tier ("Bust → Below Average → Average Starter → Quality Starter → Star").
**bowRelated:** possibly — same account family, no explicit BOW brand mention found in this specific repo.
**Category / interactivity check (explicitly requested by task):** The HTML title is indeed "NBA Rookie Bust Predictor" and it has a live deployment path (`vercel.json` configures `api/predict.py`/`api/health.py` as serverless functions with the trained `.pkl` model bundled, `rewrites` serving `index.html` at `/`). However, examining the actual page: it is a data-entry form (20 numeric stat fields: Age, G, GS, MP, PTS, TRB, AST, STL, BLK, TOV, PER, TS%, USG%, WS, WS/48, BPM, VORP) with preset buttons (LeBron, Durant, "bust" examples) that fill the form, then a single "predict" call returns a bust probability and tier. This is a **single-shot classifier demo**, not an interactive decision simulation — there is no sequence of choices, no consequences that compound, no narrative/role, and no economics or financial-literacy concept being taught. The stat vocabulary (PER, VORP, BPM, USG%) is well beyond a 5th-8th-grade audience and assumes analyst-level basketball-stats literacy.
**Tech stack:** Python/Flask/scikit-learn backend; HTML/CSS/JS frontend; deployed on Vercel (serverless functions).
**Deployment evidence:** `vercel.json` present and configured with real function settings — this one genuinely is live/deployable, unlike several siblings.
**Recommendation:** EXCLUDE — confirmed live and interactive in the narrow sense of "enter data, get a prediction," but it is not a decisions-and-consequences learning simulation and teaches no economics/financial-literacy concept; audience is analysts, not Grade 5-8 students. Honest exclude per task guidance.

### SDO-MODEL-BOW
**What it is:** "Shot Diet Optimization Model" — a Streamlit scouting tool that scores NBA players' shooting efficiency relative to their "shot diet" (3PT/2PT/FT mix) and generates natural-language scouting reports and GM recommendations. Repo also contains `podcast_script.md`, an extended-edition script for "BOW Research Podcast — Episode 2."
**bowRelated:** possibly/probably — `podcast_script.md` opens "I'm [Your Name], and this is the BOW Research Podcast... BOW Research, where economics meets the game" — confirms this feeds the same "BOW Research" content/podcast pipeline associated with BOW Sports Capital, but the repo itself is a scouting-analytics tool, not classroom content, and "BOW" here denotes the research/podcast brand rather than the Grade 5-8 curriculum brand.
**Category:** Analyst dashboard (Streamlit), content-production tool for a podcast — not a learning experience.
**Embedded simulations:** 0 — it's a scoring/report generator, single input → single scouting report output, no decision/consequence loop, no student audience.
**Tech stack:** Python, Streamlit, ML clustering + NLG for report text.
**Deployment evidence:** `streamlit run app.py` local-only; no hosting config found.
**Recommendation:** EXCLUDE — adult-audience scouting/analytics tool that feeds BOW's research podcast content, not a student simulation.

### TPHM-MODEL
**What it is:** Contains only three raw CSV data files (`Players.csv`, `Seasons_Stats.csv`, `player_data.csv`) — no source code, no README content, single git commit "Add files via upload."
**bowRelated:** unclear — name suggests "Touch/Possession Handling Model" or similar, matches the naming convention of the other NBA *-MODEL repos, but there's no code or documentation to confirm anything about its purpose or BOW affiliation.
**Category:** Raw dataset only, not a product of any kind.
**Embedded simulations:** 0.
**Tech stack:** N/A (data files only).
**Recommendation:** EXCLUDE — incomplete/data-only repo; no application, no simulation, nothing to evaluate. UNKNOWN as to intended purpose.

### Touch-Dependency-Model
**What it is:** A production-styled ML system ("Touch Dependency Model") evaluating how much an NBA player's efficiency depends on high offensive touches, shipped as a Python package + CLI + Streamlit web app + a separate Next.js `app/` frontend, plus `PODCAST_SCRIPT.md`.
**bowRelated:** probably — `PODCAST_SCRIPT.md` explicitly opens "BOW Research Podcast — Episode 3," host line "I'm your host from BOW Research, and this is the podcast where we use data science and economics to understand why markets—even ones run by experts—still get things wrong," closing line "This is BOW Research—where economics meets the game." Same "BOW Research" content-pipeline brand as SDO-MODEL-BOW.
**Category:** Analyst tool + podcast-content generator, not a classroom product.
**Embedded simulations:** 0 — single-input scouting report generator (touch dependency score, archetype classification), no decision/consequence loop, adult scouting audience.
**Tech stack:** Python (scikit-learn), Streamlit, Next.js 14 (separate lightweight frontend), Vercel config present (`vercel.json`, `.vercelignore`).
**Deployment evidence:** `vercel.json` present, suggesting a hosted deployment exists/existed.
**Recommendation:** EXCLUDE — adult-audience analytics tool supporting the "BOW Research" podcast, not a student-facing simulation.

### Volatility_Model_NBA
**What it is:** An XGBoost model predicting player "volatility/consistency" (0-100 score) via CLI (`cli/predict.py`, with `--interactive` and `--batch` modes) and a Streamlit dashboard (`dashboard/streamlit_app.py`).
**bowRelated:** possibly — same account/family and naming convention as the other *-Model repos; no explicit "BOW Research" mention found in this specific repo (unlike SDO and Touch-Dependency), so slightly weaker evidence of brand tie-in.
**Category:** Data-science CLI + dashboard, analyst tool.
**Embedded simulations:** 0 — prediction tool only, no decision/consequence loop, no economics/finlit teaching content, no grade-band targeting.
**Tech stack:** Python, XGBoost, Streamlit, argparse CLI.
**Deployment evidence:** None found (local Streamlit only).
**Recommendation:** EXCLUDE — NBA analytics tool, not a classroom simulation.

---

## Lineage summary (Bow-Platform / bow-universe / Bow-Sports-Capital-Full-APP)

All three are genuinely distinct codebases (no shared git history, no forked lineage), but strong product/content overlap confirms they are successive/parallel iterations of the "BOW Sports Capital" gamified curriculum brand:

1. **Bow-Platform** (last touch 2026-03-01) — Google Apps Script + Sheets backend, Next.js portal frontend. Oldest, most operationally mature (huge Apps Script codebase, admin curriculum tooling, claim/verification/pass system). Same Track/Module/Gauntlet/XP vocabulary as Full-APP.
2. **bow-universe** (last touch 2026-03-12) — A parallel, pedagogically distinct rewrite explicitly rejecting the "arcade-style" approach of the other two, in favor of research/proposal-writing with an embedded rules sandbox. Not obviously a successor to Bow-Platform — reads as a separate experimental direction under the same brand.
3. **Bow-Sports-Capital-Full-APP** (last touch 2026-04-23) — Newest, modern Next.js/Supabase/Drizzle rewrite reproducing the same Track 101/201/301 + Gauntlet + XP structure as Bow-Platform, but built to embed/link externally-hosted simulation activities via iframe + postMessage claim shim rather than storing curriculum in Google Sheets. Its most recent commit message ("hide gamification nav, elevate lesson + tracks") suggests movement toward content-first presentation — converging somewhat with bow-universe's philosophy.

No definitive "abandoned" signal exists in local git history for any of the three (all show only a single squashed merge commit locally, so full history/deprecation notices aren't visible) — dating is based on last-touch timestamps only. I did not find any repo explicitly declaring another deprecated; this should be treated as inferred lineage, not confirmed fact.

## Simulation location note
None of my 16 assigned repos contain the actual GM/Gauntlet simulation gameplay code. That code lives in separate repos referenced by Bow-Sports-Capital-Full-APP's `activityUrl` fields — `T201-M1-L2` and (likely) `GAUNTLET` — both of which exist locally at `/workspace/acct/T201-M1-L2` and `/workspace/acct/GAUNTLET` but were **not** in my assignment list, so I did not investigate their contents. Flagging them for whichever agent owns that portion of the sweep.
