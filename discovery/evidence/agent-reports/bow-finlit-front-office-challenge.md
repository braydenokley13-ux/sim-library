# Discovery report — bow-finlit-front-office-challenge

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

I have enough verbatim vocabulary now. Let me compile the final report.

## BOW Financial Literacy — Deep Investigation: `/workspace/bow-finlit`

### 1. Distinct student-facing experiences: **ONE**

A single continuous three-session simulation. Real title in source: **"Front Office Challenge"** (root `README.md` H1; `package.json` description). Internally the "official working title" is **"Bow Sports Agency Challenge"** (`bow-financial-futures-sim-starter/README.md`: *"Official working title: **Bow Sports Agency Challenge**"*; `config/simulation-manifest.json` → `"title": "Bow Sports Agency Challenge"`, `"simulationId": "bow-sports-agency-challenge"`). There is no second app, page, or route with independent content — `docs/handoffs/CODEX_CURRENT_HANDOFF.md` explicitly frames success as "the three-session story read[ing] as one connected challenge rather than three activities." The design-time tool (`tools/balance-simulator`) is an internal dev/QA engine, not student-facing.

### 2. `bow-financial-futures-sim-starter/`

This is **not a starter template or scaffold** — it IS the product, fully wired into the root app. Root `package.json` scripts (`start`, `build`, `typecheck`, `test`) all shell into `bow-financial-futures-sim-starter/app`, and `vercel.json` builds `outputDirectory: bow-financial-futures-sim-starter/app/dist`. The root `api/` imports directly from it (e.g. `api/_lib/run-state.ts` imports `.../bow-financial-futures-sim-starter/app/src/content.ts`, `.../shared/classroom.ts`). `PROJECT_BRIEF.md` inside it just points to `docs/CODEX_MASTER_PROMPT.md` as "the master implementation instruction." Despite the "-starter" name, it is the live, fully implemented codebase — the name is a naming leftover, not a functional signal.

One genuinely orphaned artifact inside it: `bow-financial-futures-sim-starter/src/app/README.md` — a single stray file reading *"Codex should scaffold the actual Next.js application here after Stage 0. Do not treat this planning repository as an existing production app."* This references the original Next.js plan, which was abandoned; the real app was built in `app/` with Vite + React 18, not Next.js. That's dead scaffolding left behind.

### 3. Session model

**Multi-session, facilitator-led, live/synchronous, class-code based.** Quotes:
- `README.md`: *"A founder-led **live online classroom simulation**... every student joins the same class with a short code... running his own sports agency across three connected sessions."*
- `docs/OPERATING_MODEL.md`: *"The founder leads the program live on Zoom... Everyone joins the same class with one short code, read out on the call — `BOW4K7`."*
- Phase gating is server-enforced: 7 phases (`lobby → session1_open → session1_surprise_revealed → session2_open → session3_open → session3_surprise_revealed → completed`), each phase controlled only by the founder — *"a browser can ask for any screen it likes and will be answered with the last one the class actually opened."*
- Not fully synchronous within a session: students work independently once a phase opens, and can leave/resume on another device/day via class code + agency name + 4-digit PIN.

### 4. Mechanical flow (from actual source, not just docs)

35 steps (`shared/classroom.ts` `STEPS`) across `start → s1-* (8 steps) → s2-* (11 steps) → s3-* (12 steps) → results → feedback → done`.

- **Session 1 — "Protect the Client" (LeBron James):** review LeBron's client file → work out real take-home money → place ten $50,000 chips across four buckets (**Cash Now, Safety Net, Future Growth, Community Promise**) → a **$400,000 payment arrives 30 days late** while **$125,000 of bills** still hit → choose a recovery route (funding sources: cash, cushion, flexible credit, fixed loan, contract advance) → see the consequence → write a reasoning/explanation → recap. "Original Plan versus New Reality" is preserved (never overwritten).
- **Session 2 — "Build the Business" (Jalen Brunson):** review Brunson's file → staff research → choose among sponsor contract offers → negotiate → design a camp (mission titles from `config/mission-registry.json`: *"Choose the Contract," "Build the Camp"*) → build an operating budget → find and close a **funding gap** → pitch/reasoning → recap.
- **Session 3 — "Own the Future" (cross-client championship):** mission brief → staff work → investor table (structured negotiation: send up to 2 questions to unlock counters, then choose one investor counter or "no outside money") → opening forecast → a **supply-cost shock** two weeks before opening → revise the plan → opening week → results → "what happens next" (capital) → board-note reasoning → championship report → feedback → done.

Scoring: five public 20-point categories (`config/scoring.json`): **Client Fit, Ready for Surprises, Healthy Business, Future Value, Smart Decisions** — max reachable total is 84, not 100, by explicit design choice (tradeoffs by construction). Facilitator ratings and private metrics (attempts, hints used, time-to-submit) never become public score.

### 5. `supabase/` data

Two migrations, four tables, RLS on with **no policies** (service-role only access):
- `classes` (code, title, phase, paused, joining_open, growth/bonus outcome settings)
- `agency_runs` (agency_name + normalized name, salted-scrypt `pin_hash`, SHA-256 `access_token_hash`, `state` jsonb, current/furthest step, status, progress, score_estimate, final_score, `growth_result_id`/`outcome_slot` added in migration 2 to keep surprises server-side until revealed, `attempt_number`)
- `feedback` (answers jsonb, total_score)
- `run_events` — *"five event types is the whole vocabulary"*: `joined, resumed, phase_reached, surprise_revealed, completed` — no click log, no keystroke log.

Auth/login: **no student accounts**. A "founder" (facilitator) has a single shared passphrase (`FOUNDER_ADMIN_SECRET`) + signed session cookie. Students authenticate via **class code + self-chosen agency name + a 4-digit resume PIN** — explicitly framed as *"a convenience credential... not sized for anything more sensitive than [one classroom run of invented money]"* (`OPERATING_MODEL.md`).

Free text stored: only the agency name a student invents and their end-of-run feedback answers (`feedback.answers` jsonb). `OPERATING_MODEL.md` states explicitly: *"Not stored, ever: an email address, a legal name, an IP-linked identity, a password, or a click-by-click trail."* Neither migration has been applied to a real Supabase project (`supabase/migrations/README.md`: *"Neither migration in this table has been applied to a real Supabase project from this branch"*) — so this data model is built and tested (via `MemoryRepository` in-memory equivalent) but not yet run against live infrastructure. No legal/compliance claims are made here — purely descriptive of what the schema and code do.

### 6. Financial literacy concepts (verbatim)

"take-home money," "Cash Now," "Safety Net," "Future Growth," "Community Promise," "funding gap," "break-even," "financing," "investor," "Agency Strength(s)," "sponsorship," "contract," "obligations" (`pay-full, pay-partial, delay, renegotiate, cancel`), "emergency savings," "long-term investment," "operating budget," "Client Fit," "Ready for Surprises," "Healthy Business," "Future Value," "Smart Decisions," and per `CODEX_MASTER_PROMPT.md` (aspirational headline indicators, not all confirmed built verbatim in-app under those exact labels): "Available Cash," "Monthly Commitments," "Business Value," "Client Trust," "deductions, debt, investments, sponsorships, revenue, fixed and variable costs, contribution margin, break-even, profit/loss, valuation, equity, reputation, risk exposure."

### 7. Grade band: **STATED — grades 5–6**

Quote: `README.md`: *"A founder-led live online classroom simulation for grades 5–6."* Also `config/simulation-manifest.json`: `"audience": "grades-5-6"`. (Not grades 5-8 as the general BOW portfolio framing suggests — this specific repo is narrower.)

### 8. Duration: **STATED, with a conflict between old and current sources**

Current/authoritative: `bow-financial-futures-sim-starter/README.md`: *"three connected 45-minute sessions"*; `config/simulation-manifest.json`: `"instructionalSessions": 3, "instructionalMinutesPerSession": 45`. **Conflicting, superseded** language survives in both root `CODEX_MASTER_PROMPT.md` and its copy at `docs/CODEX_MASTER_PROMPT.md`: *"Two 45-minute sessions."* This is the original aspirational brief; the shipped product moved to three sessions and that document was never updated to match — a clear built-vs-aspired divergence.

### 9. Facilitator materials

**PRESENT, and substantially built** (not just documented):
- Founder dashboard (`app/src/screens/founder.tsx`) implements: create class, phase rail (Open Session 1/2/3, reveal surprises), Pause/Resume class, Close/Open joining, per-agency **Inspect / Repair / Reset**, and **Export results and feedback** (CSV) — confirmed in code (`grep` hits for `Repair`, `Reset`, `Export`, `Pause class`, phase-open labels) and matching `docs/DEPLOYMENT.md`'s "Running a class" walkthrough exactly.
- `docs/implementation/FACILITATOR_EXPERIENCE.md` documents an 8-minute setup, five timed pacing plans, exact reveal scripts, and a private end-of-run report — but this document lives under `docs/implementation/` (Stage 0.6.1, flagged "no production application exists" at the top of its own index) and describes a richer pacing/scripting model than what's verified wired into the live app; treat its pacing-plan detail as design intent, not confirmed shipped UI.
- Original raw facilitator source materials also exist: `source-materials/Bow_Sports_Capital_financial_literacy.pptx` (slide deck), `Financial_Futures_Facilitator_Control.xlsx`, `Financial_Futures_Team_Workbook.xlsx` — but the repo explicitly demotes these: *"The filenames `Financial_Futures_*` remain... because those files are byte-preserved research sources... not current product authority"* and *"The spreadsheets are not the target interface"* (`CODEX_MASTER_PROMPT.md`).

### 10. Maturity / health signals

- **Tests:** real and extensive — 32 app test files, plus 5 balance-simulator, 1 session1-gate, 1 venture-gate test files, plus 8 Playwright e2e specs. QA log states *"309/309 passing"* unit tests and *"12/12 passing"* Playwright+axe-core browser tests (`docs/implementation/SESSION1_QA_LOG.md`).
- **CI:** `.github/workflows/balance-simulator.yml` — 5 real jobs (design-time-gate, student-app, session1-gate, venture-gate, browser-gate: typecheck + test + build + Playwright + axe-core), running on every push/PR.
- **Deployment config:** `vercel.json` deploys the Vite static build (`app/dist`) plus Vercel serverless functions under `api/`, with security headers, SPA fallback, and `no-store` on `/api/*`.
- **Stale/inconsistent docs:** `config/simulation-manifest.json` still says `"status": "stage-00.6-correction-design"`, `"productionApplicationAllowed": false`, content version 0.6.2 — while `package.json` is at 0.7.0 and the actual repo has a fully built live-classroom platform (Supabase, class codes, founder dashboard) that goes well beyond what that manifest describes. `docs/implementation/README.md` opens with *"No production application exists"* — also stale relative to the shipped `app/`.
- **Tech-stack divergence:** `CODEX_MASTER_PROMPT.md` mandates Next.js 16+, React 19.2.4+, Tailwind v4, shadcn/ui, Motion, Zod, Supabase Auth/Realtime. The actual `app/package.json` uses plain Vite + React 18.3.1, hand-rolled SVG art and CSS, no Tailwind/shadcn/Zod/Motion found anywhere in the tree, and Supabase used only as Postgres via service-role key (no Auth, no Realtime — explicitly "polling, not realtime" per `OPERATING_MODEL.md`). This is a large, clean divergence between the aspirational master prompt and the shipped build.
- **Git history:** shallow clone, single visible commit `ebfed08` (2026-08-10, "Merge pull request #8... bow-sports-audit-finish") — no deeper history available locally to judge commit cadence.

### 11. Evidence of real-student use: **NO EVIDENCE — explicitly denied in-repo**

Direct quotes: `docs/implementation/SESSION1_QA_LOG.md`: *"No real student has used this build. Every check above is automated or was run by the person implementing it."* `docs/implementation/SESSION1_READINESS.md`: *"No child has used this build yet... Status: ready for grade 5-6 usability testing. Not... 'validated with students.'"* `supabase/migrations/README.md`: *"the first real deploy is still the first real deploy."* `docs/implementation/KID_PLAYTEST_PLAN.md`: *"Not yet run."* `config/simulation-manifest.json` lists `"grade 5-6 student playtest"` as an unmet "empirical gate pending."

### 12. Dependency on other BOW repos

**None found.** All cross-references are internal (root `api/` importing from `bow-financial-futures-sim-starter/` within this same repo). No package.json dependency, git submodule, or import references any other `bow-*` repository (e.g., no reference to `bow-decision-challenges` or "Plan Under Pressure" anywhere in source).

---

## Per-experience record

**proposedId:** `front-office-challenge`
**canonicalTitle:** Front Office Challenge (root `README.md`)
**aliases:** "Bow Sports Agency Challenge" (official working title, `bow-financial-futures-sim-starter/README.md`, `simulation-manifest.json`); simulationId `bow-sports-agency-challenge`; early/superseded name "BOW Financial Futures Simulator" / "Financial Futures" (`CODEX_MASTER_PROMPT.md` title, `source-materials/Financial_Futures_*` filenames — explicitly demoted to "not current product authority")

- **path:** `bow-financial-futures-sim-starter/app/` (student app + founder dashboard), `api/` (serverless), `supabase/migrations/` (data)
- **whatStudentsDo:** Run a sports agency advising LeBron James (Session 1) then Jalen Brunson (Sessions 2–3): allocate a $500,000 payment as ten $50,000 chips across four purposes, absorb a 30-day-late $400,000 payment plus $125,000 of bills, choose sponsorship/contract and design a camp business, close a funding gap, negotiate one structured investor deal, absorb a pre-opening cost shock, and explain their reasoning at three checkpoints, ending in a scored championship report.
- **pillar:** Financial Literacy
- **conceptTerms (verbatim):** "take-home money," "Cash Now," "Safety Net," "Future Growth," "Community Promise," "funding gap," "break-even," "financing," "investor," "Agency Strength," "sponsorship," "Client Fit," "Ready for Surprises," "Healthy Business," "Future Value," "Smart Decisions"
- **gradeBandEvidence:** VERIFIED — `README.md`: "for grades 5–6"; `config/simulation-manifest.json`: `"audience": "grades-5-6"`
- **purpose:** APPLY / SYNTHESIZE (students apply planning, negotiation, and recovery decisions across a full simulated agency lifecycle, then defend/explain their choices)
- **delivery:** Live/synchronous, founder-led, class-code joined, multi-device, server-phase-gated
- **durationEvidence:** Current: "three connected 45-minute sessions" (`bow-financial-futures-sim-starter/README.md`, `simulation-manifest.json`). Superseded/conflicting: root & docs `CODEX_MASTER_PROMPT.md` says "Two 45-minute sessions"
- **groupSize:** One shared device per agency; `docs/CODEX_MASTER_PROMPT.md` (aspirational) specifies "2–12 agencies," "2–5 students sharing one team device" — not independently confirmed enforced in shipped UI beyond the 2–12 class capacity implied by class/agency schema
- **facilitation:** Facilitator-led (founder dashboard: open sessions, reveal 2 surprises, pause/resume, inspect/repair/reset runs, export CSV) — confirmed built in `app/src/screens/founder.tsx`
- **technology:** Vite + React 18 SPA, Vercel serverless `api/`, Supabase Postgres (service-role only, RLS forced with no policies), localStorage offline queue; NOT Next.js/Tailwind/shadcn/Zod/Motion despite `CODEX_MASTER_PROMPT.md` mandating them
- **evidenceOutput:** Per-run: agency name, decisions/state, current/furthest step, score_estimate, final_score, feedback answers (jsonb), 5-type milestone event log; end-of-class facilitator CSV export; student-facing printable "championship report"
- **studentDataProfile:** No student accounts, no email/legal name/password/IP-identity/click-log stored (explicit in `OPERATING_MODEL.md`). Stored: self-chosen agency name (free text, 2–32 chars), decisions, screen progress, feedback answers (free text jsonb), salted-scrypt PIN hash, SHA-256 access-token hash. Class-code + agency-name + 4-digit PIN join/resume, one shared founder passphrase — no evidence of formal auth provider or student PII collection.
- **maturitySignal:** High code/test maturity (309/309 unit tests, 12/12 Playwright+axe-core, 5-job CI) but zero real-world validation — explicitly "No real student has used this build" and no live Supabase deploy yet; internal docs (manifest, implementation/README.md) are stale relative to the actual 0.7.0 shipped state
- **simulationPattern:** Branching decisions with "Original Plan versus New Reality" preservation (shocks never overwrite the initial plan), carry-forward state between sessions, structured one-round negotiation, reasoning/explanation checkpoints scored 0/50/100% privately by facilitator, luck that never affects public score
- **confidence:** VERIFIED (both the "aspirational master prompt" and "actually built app" are directly readable in source, and the two are explicitly and traceably distinguishable)
- **evidence:**
  - `bow-finlit/README.md:1-11` — "Front Office Challenge... founder-led live online classroom simulation for grades 5–6... three connected sessions"
  - `bow-financial-futures-sim-starter/README.md:36-47` — "Official working title: Bow Sports Agency Challenge... three 45-minute sessions... class code and a resume PIN, no student accounts"
  - `bow-financial-futures-sim-starter/shared/classroom.ts:17-90` — full 35-step id list and phase model
  - `bow-financial-futures-sim-starter/config/scoring.json:20,169,312,455,603` — five category labels
  - `supabase/migrations/20260730120000_classroom_core.sql` — table schema, RLS forced, no policies
  - `bow-financial-futures-sim-starter/docs/implementation/SESSION1_QA_LOG.md:132` — "No real student has used this build."
  - `bow-financial-futures-sim-starter/docs/CODEX_MASTER_PROMPT.md:9,36` — "Two 45-minute sessions" (superseded)
  - `bow-financial-futures-sim-starter/app/package.json` — actual dependency list (React 18, Vite, no Next/Tailwind/shadcn/Zod)
