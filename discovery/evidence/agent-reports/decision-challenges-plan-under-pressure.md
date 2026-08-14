# Discovery report — decision-challenges-plan-under-pressure

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

This confirms `challengeVersion: "2.1.0-mvp"` is embedded directly in state — reinforcing that the shipped product is at the V2.1 spec revision, not V3. I have all evidence needed. Here is the full report.

---

# BOW Decision Challenges — Deep Investigation Report

## 1. THE UNIT QUESTION

**Recommendation: ONE Library entry.** The unit is the **challenge** ("Plan Under Pressure"), not the world ("basketball"). A future second world (e.g., Fashion) should be a **variant of the same entry**, not a new one.

Evidence:
- `src/domain/scenario/registry.ts`: `PLAN_UNDER_PRESSURE_LAUNCH.challengeId = "plan-under-pressure"` is the top-level identity; `WORLD_REGISTRY` is a swappable map keyed by `WorldId` underneath it. Comment: *"The registry stays world-neutral so a second story can be added without touching the finance, evidence, or scoring layers."*
- `src/domain/core/ids.ts`: `WorldId = "basketball" | "fashion"` — the type system already reserves a second world, confirming worlds are enumerable variants of one challenge, not separate products.
- README: *"This MVP ships one complete world... The finance, evidence, and scoring layers are world-neutral, so a second story can be added without touching them."*
- V2 spec §15.2: `ChallengeDefinition` (id `plan-under-pressure`) is the "versioned academic and interaction container"; `WorldVariant` is explicitly a subordinate entity ("supplies authentic surface context") inside it.
- V2 spec §15.6: stable IDs are `skill`, `concept`, `microSkill`, `challenge`, `world`, `version` — `challenge` and `world` are distinct axes by design, `challenge` being the higher one.
- e2e test explicitly guards against a second world leaking into the shipped single-world product (`"no stale Fashion or coming-soon copy appears..."`), confirming Fashion is a planned *variant*, not a separate shipped product.

## 2. STABLE IDS (already owned — never reinvent)

- **challengeId**: `"plan-under-pressure"` (`registry.ts`, also embedded in persisted state as `meta.challengeId`)
- **challengeVersion**: `"2.1.0-mvp"` (`state.ts`, matches `package.json` version)
- **WorldId**: `"basketball"` (shipped/registered) and `"fashion"` (reserved in type, unregistered) — `core/ids.ts`
- **Concept ids (6)**: `income-reliability` (C1), `full-cost` (C2), `viable-budget` (C3), `contingency` (C4), `adaptation` (C5), `financial-defense` (C6) — `blueprint/concepts.ts`
- **Micro-skill ids (18, structured)**: C1.1, C1.2, C1.3, C2.1, C2.2, C3.1, C3.2, C3.3, C4.1, C4.2, C4.3, C4.4, C5.1, C5.2, C5.3, C5.4, C5.5, C5.6 — `blueprint/microSkills.ts`
- **CalcIds**: `setup-middle-total`, `setup-lowest-total`, `essentials-total`, `reliable-floor`, `week5-change` — `core/ids.ts`
- **NYSED objective ids**: `1.1`, `1.2`, `1.3`, `4.1`, `5.1` (`verifiedOn: "2026-08-11"`) — `blueprint/standards.ts`

## 3. STUDENT FLOW (stage by stage)

`src/domain/machine/stages.ts` `STAGE_ORDER` (16 states) grouped into 5 progress chapters (`Setup`, `First Plan`, `Backup Check`, `Week 5`, `Explain It`).

- **Entry/Setup**: Opening screen combines Avery's story + class code + seat code entry (`OpeningStage`) → contract terms showing safe vs conditional income (`DealStage`) → choose one of three housing setups, calculating full 8-week cost for two of them (`SetupStage`).
- **Weeks 1–4 (First Plan)**: `WorkingStage` — calculate the reliable income floor ($5,000) and 8-week essentials ($1,600), decide whether to count each of two conditional bonuses ($800/$1,000), then build a 3-category plan (goal/reserve/flexibleCash) on the Plan Board.
- **Backup Check**: if any conditional income was counted, student must build a `fallback-version` plan that works without it; then `Week5TransitionStage` replays weeks 1–4 as an in-voice feed showing the plan they built, un-alterable.
- **Week 5 shock**: `Week5EventStage` — the regional showcase is canceled (losing the $1,000 "Making the Cut" bonus if counted) and a required $700 brace/rehab cost lands, plus a setup-dependent travel cost ($0/$150/$350). Student selects which "gap tiles" hit their own plan and calculates the total change.
- **Repair**: `first-response` — repair using only existing (adjustable) money, no new income yet. Then `FinalRepairStage` presents two decisions — accept $500 optional Saturday clinic work (costing rest time) and whether to still count the $800 attendance bonus — before opening the final Plan Board (`opportunity-final-repair`). `remaining-risk-preview` then stress-tests the plan with the $800 removed if it was counted.
- **Defense**: `DefenseStage` — student picks 2–3 of their own numbers as evidence and writes 2–4 sentences (min 40 chars) using sentence starters, explaining workability, priority, and opportunity cost. `SubmittedStage` recaps the season in Avery's voice from the student's own choices.

## 4. EVIDENCE MODEL (`src/domain/evidence/`)

- **Recorded**: every stage emits typed `EvidenceEvent`s (`SESSION_STARTED`, `CALCULATION_SUBMITTED`, `PLAN_SAVED`, `LOCKED_MOVE_ATTEMPTED`, `GAP_TILE_TOGGLED`, `SCAFFOLD_OPENED`, `DEFENSE_SUBMITTED`, etc.) into an append-only log with a `SupportLevel` (`standard_access` → `natural_consequence` → `direct_scaffold` → `answer_supplied`) attached to each.
- **Derivation pipeline**: `facts.ts` (log → `AssessmentFacts`) → `observe.ts` (`observeStructured`, one deterministic rule per micro-skill) → `concepts.ts` (`summarizeConcepts`: rolls 18 observations into 6 `ConceptResult`s with `MasteryStatus` and `Trajectory`) → `grade.ts` (`deriveGrade`: sums to `GradeResult`).
- **Scoring** (`support.ts`): quality (`first_opportunity`=5, `corrected`=4, `partial`=2, `none`=0) is capped by support level (`answer_supplied`→0 max, `direct_scaffold`→3 max, else 5 max). 18 skills × 5 pts = **90 structured points**, fully automatic, traceable to `evidenceRefs`.
- **Educator-only**: C6 "financial-defense" (10 pts, 4-criterion rubric: workability/priority/tradeoff/numbers) is scored by a human in `ReasoningReview` and stored in `localStorage` (`bow.educator.v1.review`), separately from structured evidence — README: *"Nothing is graded by AI... only whether the resulting plan holds together is observed."*
- **Preference-neutrality is tested**, not just claimed: `neutrality.test.ts` and `adversarial.test.ts` assert no points depend on housing choice, saving more, taking/declining optional work, or which category a student cut.
- **Export/report**: no file export or API exists. The "report" is the in-app educator UI (`ClassOverview`, `ConceptDrilldown`, `StudentEvidence`, `ReasoningReview`, `StandardsView`) reading from a `localStorage`-backed review overlay plus a hardcoded 28-record fixture (`fixtures/demoClass.ts`) explicitly labeled `DEMO_LABEL` = hypothetical.

## 5. EDUCATOR SURFACE

Routes (confirmed in `App.tsx` and e2e tests): `/educator/guide`, `/educator/teaching-companion`, `/educator/class`, `/educator/class/concepts/:conceptId`, `/educator/class/students/:seatCode`, `/educator/class/students/:seatCode/reasoning`, `/educator/class/standards`.

- **Educator Guide** (`/educator/guide`): a standalone brief — grade band, duration, prerequisites, 5-step launch instructions, standards alignment block, and links into live evidence. Quote: *"How do I launch it? Share the challenge link with a class code and give each student a seat number. No accounts, no roster, no student data."*
- **Class Overview**: concept-status matrix across the 28 demo records, a "Teach next" insight, four C4 "route" groupings, and a review worklist.
- **Concept Drilldown**: per-concept micro-skill breakdown, deterministic misconception rules (explicitly stated as non-AI: *"These are fixed rules applied to the financial states a student saved... nothing here is inferred or AI-generated"*), and a copyable 4-minute reteach script.
- **Reasoning Review**: the human-scoring UI for C6, persisted to `localStorage`.
- What an instructor must actually *do* to run it (per the guide's "Five simple steps"): confirm prerequisites were taught, hand out the challenge link + class code + seat code, allow ~15 minutes without coaching strategy, open the top concept gap, then score reasoning and decide what to reteach. There is no account creation, no roster upload, no LMS integration.

## 6. GRADE BAND — CORROBORATED

Yes, in source, in multiple places:
- `index.html`: `"An applied financial-literacy challenge for Grades 6–8."`
- `App.tsx` `Home`: `<span>Grades 6–8</span>`
- `EducatorPages.tsx`: `"Educator challenge brief · Grades 6–8"` and `guide-meta`: `<span>Grades 6–8</span>`

## 7. DURATION / SESSIONS

Stated explicitly: **"12–15 minutes for most students. One sitting, one device, no sound."** (`EducatorPages.tsx`, `BriefAnswers`), repeated on the home page footer (`<span>12–15 minutes</span>`) and in the guide meta strip. It is single-session by design — persistence exists only to survive an accidental refresh (`ChallengeContext.tsx`, `domain/io/persistence.ts`), not to support a multi-day return.

## 8. STUDENT DATA — VERIFIED FACTS ONLY

- **Storage location**: browser `localStorage` only, keys `bow.student.v1.attempt` (student attempt state) and `bow.educator.v1.review` (educator's C6 scores). No server calls anywhere — confirmed by grepping the whole `src/` tree for `fetch`/`axios`/`supabase`/`XMLHttpRequest`: zero matches. `domain/io/persistence.ts` is the only file touching `localStorage` for the student attempt.
- **Auth**: none. `SESSION_STARTED` generates a random `sessionId` via `crypto.randomUUID()`; no login, no account.
- **Free text**: two free-text fields exist — `classCode` (regex `^[A-Z0-9]{4,8}$`) and `seatCode` (`^\d{1,2}$`) on the opening screen, and the defense `textarea` (student's written reasoning, min 40 characters). Neither is validated against a real roster; both are stored in `localStorage` only.
- **In-app privacy copy** (`content/studentCopy.ts`): *"No name, no email, nothing about your real money. These codes stay on this computer."*
- Corroborating spec language (V2 spec §15.5, not shipped code but stated design intent): *"This is not a production roster or privacy architecture. Before any real classroom pilot, BOW must conduct formal privacy, security, data-retention, accessibility, procurement, and legal review..."* — no legal claim is made here beyond quoting the source; I make none myself.

## 9. HEALTH / MATURITY

- **Vitest** (12 files, `npm test`): domain arithmetic invariants (`assessmentInvariants.test.ts`), NYSED mapping coverage (`standards.test.ts`), adversarial blueprint checks (`adversarial.test.ts` — e.g. *"18 micro-skills at 5 points reconcile to the 90 structured maximum"*), micro-skill independence (`microSkill.independence.test.ts`), preference-neutrality (`neutrality.test.ts`), support-level suppression of credit (`supportSuppression.test.ts`), the "golden case" Seat 14 reconciling to 85/90 structured, 94/100 final (`seat14.reconciliation.test.ts`), finance formulas, reducer, persistence, registry, and the 28-record demo fixture's internal consistency (`demoClass.test.ts`).
- **Playwright e2e** (`e2e/bow.spec.ts`, 17 named tests): both income routes to submission, both `$800` branches, accepting/declining optional work, refresh/resume, keyboard-only operation, axe accessibility scans (`@axe-core/playwright`) on key screens including the plan board and season review, educator deep-link fresh-navigation checks, per-housing narration differences, a "no stale Fashion/coming-soon copy" guard, and no horizontal overflow at 640px.
- **CI config**: none found — no `.github/workflows` directory exists in the repo.
- **Walkthrough script**: `scripts/walkthrough.mjs` drives the full flow in real Chromium and screenshots every stage at 1366×768, 1024×600, and 640px, flagging horizontal overflow and console errors.
- **Real student run**: **NO EVIDENCE.** All references to "pilot," "real classroom," or "real students" in the spec docs describe *future required work before* any real classroom use (e.g., V2 §16.5: *"Small classroom pilot... Formal approval process... before advancing"*; V3 §23: *"World equivalence is provisional by design, not proven... Before any scored classroom use, BOW must pilot both..."*). The only class data in the running app is the fixture explicitly labeled "Hypothetical demo data."
- **Git history**: a single merge commit is visible in this local clone (`5b73004`, PR #5 from a Claude-authored branch) — no deeper commit history is present locally to assess iteration count.

## 10. DEPLOYMENT

`vercel.json`: `framework: "vite"`, `buildCommand: "npm run build"`, `outputDirectory: "dist"`, and a catch-all rewrite (`"/(.*)" → "/index.html"`) so client-side deep links resolve on refresh, plus long-cache headers for `/assets/*`. No live URL is present anywhere in the repo (no deployed domain string, no README link). Deployment target is Vercel, but whether it is actually deployed/live is **UNKNOWN** from the repo alone.

## 11. SPEC DOCS — SHIPPED vs PLANNED

Three docs exist, superseding in order V2 → V2.1 → V3 (V3 explicit: *"where V2.1 changes V2, V2.1 wins"*). **The shipped `package.json`/state version is `"2.1.0-mvp"`** — i.e., the running code identifies itself with the V2.1 spec generation, not V3.

**SHIPPED** (matches running code, verified directly):
- Single world (Basketball) end-to-end, all 16 stages, all 5 major problems (setup comparison, working plan, fallback, Week 5 event/repair, defense).
- 6 concepts / 18 structured micro-skills / 90 structured + 10 reasoning points, event-sourced evidence, deterministic misconception rules, Teach Next insight.
- Educator guide, class overview, concept drilldown, student evidence, reasoning review, standards view — all live routes.
- 28-record hypothetical demo fixture, Seat 14 golden case.
- localStorage-only persistence, no backend.
- Full vitest + Playwright + axe + walkthrough tooling.

**PLANNED, NOT SHIPPED** (present only in spec docs, absent from `src/`):
- **Fashion world** ("Maya Chen," Lumen Row campaign) — fully specced in both V2 §10 and V3 §13 with parallel numbers, but `WORLD_REGISTRY` contains only `basketball`; no `worlds/fashion.ts` file exists. `WorldId` type reserves `"fashion"` but it is unregistered — an e2e test actively asserts no Fashion copy leaks into the UI.
- **Student-chosen world** — V3's explicit "override" (*"Each student chooses the interest world they personally enter"*) is moot with one world; `registry.ts` comment confirms: *"Students pick a world only once more than one is finished... the challenge opens directly in that world."*
- **V3's more granular file architecture** — planned modules `domain/scenario/worlds/fashion.ts`, `domain/evidence/observe/{c1..c5}.ts`, `domain/aggregate/classAggregate.ts`, `fixtures/seat14.ts`, `components/student/*`, `components/educator/*`, `domain/machine/handlers/*.ts` do not exist; the actual repo uses flatter single-file modules (one `observe.ts`, one `reducer.ts`, educator UI inline in `EducatorPages.tsx`). Functionally equivalent goals were met via a simpler shape.
- Everything both V2 §16.3 and V3 explicitly list as out of scope remains unbuilt: backend/database, auth/SSO, rosters, LMS/gradebook integration, AI grading/generation, data export, district analytics, a "challenge library" CMS, additional worlds/topics, payments, notifications, telemetry, and any psychometric validity claim.

## 12. CANONICAL HOME FOR FUTURE DECISION CHALLENGES?

Evidence is **mixed/soft**, not a firm claim. The repo is literally named `bow-decision-challenges` (plural) and the README title is "BOW Decision Challenges," but the content is scoped to one challenge. The strongest textual signal is architectural intent rather than an explicit statement:
- V2 §16.3 lists *"Full challenge library or additional worlds"* explicitly as **not to build yet** — implying a library is a deliberately deferred future state of *this same product line*, not ruled out.
- V2 §15.6: *"A production evolution can replace local session storage with a service that stores the same versioned events and derived results. Stable IDs for skill, concept, microSkill, challenge, world, and version allow later longitudinal tracking."* — this frames the current app as the seed of a longer-lived, ID-stable system.
- V2 §16.5 roadmap table has a "Reusable NYC product" stage requiring "Challenge library, longitudinal concept model, controlled configuration."
- Nothing in the repo says "this repo is the canonical home for all future BOW Decision Challenges" in so many words — that is an inference from the roadmap language and stable-ID design, not a direct quote. **Treat as a reasonable but unconfirmed inference**, not established fact.

---

# LIBRARY CANDIDATE RECORD

```yaml
proposedId: bow-plan-under-pressure
canonicalTitle: "Plan Under Pressure"
aliases:
  - "BOW Decision Challenges: Plan Under Pressure"
  - "Plan Under Pressure — Basketball: Eight Weeks to the Showcase"
path: /workspace/acct/bow-decision-challenges
whatStudentsDo: >
  Students plan Avery Reyes's eight-week basketball season budget: read a contract
  distinguishing reliable from conditional income, choose and cost out housing, build
  a viable plan across a course-savings goal / backup reserve / flexible cash, absorb
  a Week 5 shock (a canceled event that removes conditional income plus a new required
  cost), repair the plan first with existing resources and then with two new decisions
  (optional paid work, whether to still count a remaining conditional bonus), stress-test
  the repaired plan without that bonus, and defend the final plan in 2-4 sentences citing
  their own numbers.
pillar: Financial Literacy (applied/adaptive budgeting under uncertainty)
conceptTerms: # verbatim from src/domain/blueprint/concepts.ts
  - "C1 income-reliability: Use income by reliability"
  - "C2 full-cost: Calculate and compare full cost"
  - "C3 viable-budget: Construct a viable budget"
  - "C4 contingency: Build an executable contingency"
  - "C5 adaptation: Adapt after conditions change"
  - "C6 financial-defense: Defend a financial strategy"
gradeBandEvidence: >
  "Grades 6–8" — index.html meta description; App.tsx Home footer <span>Grades 6–8</span>;
  EducatorPages.tsx "Educator challenge brief · Grades 6–8" and guide-meta chip.
purpose: >
  Post-instruction application assessment, not a lesson: "After you have taught the
  concepts... It is an application task, not a lesson." (EducatorPages.tsx BriefAnswers)
delivery: Single-page web app (React SPA), browser-only, one link per class/seat code, no accounts.
durationEvidence: >
  "12–15 minutes for most students. One sitting, one device, no sound."
  (EducatorPages.tsx BriefAnswers; repeated in App.tsx Home footer "12–15 minutes")
groupSize: Individual (one student per seat code); no team/group mechanic in the flow.
facilitation: >
  Teacher shares one challenge link + a class code + per-student seat number; no roster
  upload, no account creation. Guide's own "Five simple steps": confirm prerequisites
  taught, distribute link/codes, allow ~15 min without coaching strategy, open the top
  concept gap in the dashboard, score the written defense (10 pts) and decide what to reteach.
technology: >
  Vite + React 18 + react-router-dom SPA; zero backend, zero database, zero env vars
  (README, vercel.json). Deployed as static assets; vercel.json rewrites all routes to
  index.html for client-side deep links. No live URL found in repo — deployment status UNKNOWN.
evidenceOutput: >
  Event-sourced: every interaction logged as a typed EvidenceEvent with a SupportLevel.
  Deterministically derives 18 structured micro-skill observations (5 pts each, capped
  by support level) rolling up into 6 concept results (MasteryStatus + Trajectory) =
  90 automatically-scored points, plus a 10-point human-scored written-reasoning rubric
  (workability/priority/tradeoff/numbers) = 100 total. "Nothing is graded by AI... every
  point traces to a recorded event." (README) No export/API; reporting is in-app only
  (educator dashboard reading a hypothetical 28-record demo fixture + localStorage review
  overlay). This is a materially deeper evidence model than a typical BOW simulation and
  should be described on its own terms, not treated as a template to impose elsewhere.
studentDataProfile: >
  No auth, no name/email fields. Free-text: classCode (regex ^[A-Z0-9]{4,8}$) and seatCode
  (^\d{1,2}$) on entry, plus a defense free-text response (min 40 chars). All state persists
  to browser localStorage only (bow.student.v1.attempt, bow.educator.v1.review); confirmed
  no fetch/axios/XHR calls anywhere in src/. In-app copy: "No name, no email, nothing about
  your real money. These codes stay on this computer." No legal/compliance claim is made here.
maturitySignal: >
  12 vitest suites (domain invariants, NYSED-mapping coverage, adversarial/neutrality/
  independence/support-suppression scoring tests, a "golden case" reconciliation test,
  finance/reducer/persistence/registry/fixture tests) + 17-test Playwright e2e suite with
  axe accessibility scans, Chromebook-width checks, and refresh/resume coverage, plus a
  standalone visual walkthrough script. No CI workflow file found in repo (no .github/).
  NO EVIDENCE of any real classroom/student run — all spec references to "pilot" describe
  required future work before real use; the only in-app class data is explicitly labeled
  hypothetical demo data.
simulationPattern: >
  Single branching-state "plan → shock → repair → defend" arc with a world-neutral
  finance/evidence engine and a swappable "world" content layer (only one world,
  Basketball, is shipped; a second world "fashion" is reserved in the type system and
  specced in both product docs but not implemented).
confidence: high (all claims traced to specific source files read directly; no field invented)
evidence:
  - src/domain/scenario/registry.ts
  - src/domain/core/ids.ts
  - src/domain/blueprint/concepts.ts
  - src/domain/blueprint/microSkills.ts
  - src/domain/blueprint/standards.ts
  - src/domain/machine/stages.ts
  - src/stages/StudentChallenge.tsx
  - src/domain/evidence/{types,observe,concepts,grade,support,result}.ts
  - src/educator/EducatorPages.tsx
  - src/app/ChallengeContext.tsx
  - src/domain/io/persistence.ts
  - src/App.tsx, index.html
  - README.md, package.json, vercel.json, playwright.config.ts, vitest.config.ts
  - e2e/bow.spec.ts, scripts/walkthrough.mjs
  - BOW_Decision_Challenges_V2_Master_Product_Spec.md (§15.2, §15.6, §16, §10)
  - BOW_Decision_Challenges_V2.1_Interaction_Design_Review.md (header)
  - BOW_Decision_Challenges_V3_Architecture_and_Implementation_Plan.md (§6, §12–13, Context)
```
