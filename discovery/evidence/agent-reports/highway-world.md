# Discovery report — highway-world

_Verbatim final report from the investigating subagent, preserved as discovery evidence._
_Claims here are the subagent's; the registry records only what survived review._

# Highway World — Deep Investigation Report

## 1. THE UNIT QUESTION — one entry or several?

**Firm recommendation: ONE primary Library entry** (the Episode 1 campaign), **with a distinct optional second entry for Challenge Mode** (a separate, non-narrative facilitated arc). Individual career rooms are **technically** independently addressable but are **not documented, tested, or authored as standalone assignable units**.

Evidence:
- `apps/highway-world/src/router/parseRoute.ts` + `sceneRegistry.tsx`: every room has its own `?scene=` id (e.g. `?scene=ownertower`, `?scene=draftwarroom`) and `App.tsx` renders directly off the URL with **no unlock-flag gate at render time** — a direct link works regardless of progression.
- `apps/highway-world/tests/episode1RouteIntegrity.test.ts` explicitly round-trips every one of the 8 career rooms through the router as a contract test — direct entry is a guarded feature, not an accident.
- BUT `packages/engine/src/world/destinations/episode1RouteDestinations.ts` builds a **strict sequential unlock chain** (`buildEp1RouteChain`): each room's `unlock()` requires the *previous* room resolved; room 1 requires the three-venue "EP0" loop complete. This governs the in-world beacon/recommendation UI, GM Phone "next move," and HQ card — the *intended* path is linear.
- `packages/engine/src/world/story/storyChain.ts`: the game models itself as **one story**, "eleven missions... one registry every 'MISSION N OF 11' label... reads." `docs/HIGHWAY_WORLD_IMPLEMENTATION_PLAYBOOK.md`: *"Highway World is a story-only sports-business game: Episode 1 · Origin District, one 11-mission career chain."*
- Room narrative hooks presuppose prior rooms (e.g. League Office: "An agent saw your name on the **draft call**..."; Trade War Room: "After the **development call** you made..."), so jumping straight to room 5 is technically possible but narratively incoherent.
- The one documented classroom unit is **not** "one room" — it's `docs/60-minute-run-guide.md`'s curated pair (Practice Facility + Cap Strategy Office) plus HQ open/close, with its own Instructor Mode script (`packages/engine/src/state/career/instructorMode.ts`). No per-room instructor guide, duration, or discussion script exists for any of the other 6 rooms individually.
- The ending (**Final GM Review** / GM Identity, `packages/engine/src/state/career/finalReview.ts`) is synthesized from the *whole* session's calls — a single-room play produces a degraded/undefined pedagogical payoff, evidence it's designed as one arc, not modular units.

**Conclusion:** Highway World Episode 1 is architecturally modular (good engineering) but pedagogically and product-wise **one continuous experience**. An instructor *could* technically launch one room via URL, but nothing in the product supports or documents that as an intended workflow — the one supported "shorter" unit is the documented 60-minute two-room session, not a single room.

---

## 2. THE EIGHT CAREER ROOMS (verbatim ids/labels + decision presented)

Source: `packages/engine/src/careerMission/manifest/registry.ts` (`CAREER_MISSION_MANIFESTS`, contract-pinned to exactly 8 by `unification.test.ts`).

| # | missionId | Room (missionLabel) | Decision (`decisionThatTeaches`) |
|---|---|---|---|
| 1 | `owners-tower` | Owner's Tower · Ownership Suite | Set the franchise growth budget: aggressive win-now spend, steady growth, or lean/bank flexibility |
| 2 | `practice-facility` | Practice Facility · Basketball Operations | Split 120 development minutes: push young core, protect/rest roster, build around the star, or load-manage |
| 3 | `trade-war-room` | Trade War Room · Deadline Board | Work the deadline: big swing for a star, quiet value upgrade, stand pat, or sell high |
| 4 | `cap-strategy-office` | Salary Cap / Finance Room · Cap & Finance | Manage the sheet under the tax line: chase upgrade now, preserve flexibility, or restructure |
| 5 | `draft-war-room` | Draft War Room · Scouting Department | Rank the draft board under real disagreement (scouting's ceiling vs. analytics' floor vs. two rival teams) |
| 6 | `league-office` | League Office · Negotiation Suite | Negotiate a core player's agent: protect relationship, protect cap, compromise, or walk away |
| 7 | `arena-revenue-office` | Arena Revenue Office · Business Operations | Price the arena (tickets/sponsorship/concessions) under ownership pressure, dial by dial |
| 8 | `player-development-council` | Player Development Council · Basketball Operations | Settle coach-vs-development fight over a young player's minutes |

These 8 are **preceded** in the one story chain by 3 "venue" rooms (`stadium-ops-fan-experience`, `sponsor-boardroom`, `media-tower-crisis`) — together the "11 missions" (`STORY_MISSION_COUNT`, `storyChain.ts`).

---

## 3. SHIPPED vs. ASPIRED (the most important finding)

**SHIPPED and playable today** (verified against real source + test files, not doc claims):
- The full 11-mission Episode 1 chain (3 venue rooms + 8 career rooms), each with a real scene, HUD, mechanic, store, and consequence system — `apps/highway-world/src/router/sceneRegistry.tsx` (all `available: true`).
- Curriculum spine wired to real in-game options — enforced by `curriculumSpineInvariantsHold()` (`packages/engine/src/curriculum/spine.ts`) and `contentIntegrity.ts`.
- HQ command floor, GM Phone, career ladder/REP progression, "Prediction Beat"/Call-the-Room mechanic (all 8 rooms), stakeholder reaction model, GM Identity ending — all cited with test names in `docs/GAME_DIRECTOR_REPORT.md` (e.g. `predictionBeat.test.ts`, `finalReviewRoomReads.test.ts`).
- In-app **Instructor Mode** panel (`packages/ui/src/career/InstructorPanel.tsx`, wired into `HQHud.tsx` line 628) — real, tested (`instructorGuideInvariantsHold`), not just a doc.
- **Challenge Mode** ("Game Night Pricing Crisis") — a *separate*, standalone two-round facilitated mission with real scoring/result-codes/QA harness (`docs/CHALLENGE_MODE_SESSION_2_REPORT.md`), reachable at `?scene=challengearena`. Shipped code, **but explicitly not playtested with real students** and scoring bands are "provisional" per its own report.
- Facilitator Room / classroom console (`apps/highway-world/src/facilitator/FacilitatorRoom.tsx`, `?scene=facilitatorcompare`) and Student Review Room — real, shipped, but scoped to Challenge Mode, not the core 8-room campaign.
- CI guardrails, versioned saves, crash recovery (`AppErrorBoundary`) — real, per `docs/CTO_REPORT.md`.

**RETIRED (explicitly, not shipped, kept only for provenance):**
- "Episode 0 — The Cap" driving/pit-stop tutorial, Pit Stop Arcade, Power District module — both `docs/EPISODE0_PILOT_NOTES.md` and `docs/PIT_STOP_ARCADE.md` open with **"⚠️ SUPERSEDED — HISTORICAL... describes retired content."** Their scene ids (`pitgame`, `pitstop`, `explorer`, `mission`, `slice`) are hard-redirected to the story drive in `parseRoute.ts`'s `RETIRED_SCENES` set.

**ROADMAP ONLY (documentation/planning, no runtime code, or partial):**
- `docs/MISSION_EXPANSION_ROADMAP.md` — "from 11 missions to 10,000," district mission packs, Episode 2+ — explicitly future ("Now — Episode 1 (shipped). Next — district packs. Later — new episodes").
- `content-studio/` — top-level dir, self-described: **"documentation and content frameworks only (no runtime code)"** — canon bibles, "mission roadmap through Mission 200." Pure planning artifact.
- `research/highway-world-phase-3-*` and `phase-4-*` plans — marked "APPROVED," and cross-checked: their core deliverables (League Book, radio generalization, world facts) **do exist in source** (`packages/engine/src/state/career/leagueBook.ts`, `leagueBookView.ts`, `cityTalk.ts`, `worldFacts.ts`) — these appear substantially implemented, not merely planned.
- "The Drop" (Team Store), "Second Court," "Scenario Night" — authored *beyond* the pinned 8-room arc via `EXTENDED_CAREER_MISSION_MANIFESTS`, explicitly labeled in code comments as **"roadmap Mission 12/13/32"** — real, playable code (`?scene=teamstoredrop` etc.) but outside the README's "eight career rooms" / gold-master claim.
- Challenge Mode Session 3 (facilitator compare-view UI) — the report says the *pure ranking function* shipped in Session 2, but flags the UI as deferred; Session 3 appears to have since shipped a `FacilitatorRoom.tsx`, though it was never run past a facilitator for tone/appropriateness per the Session 2 report's own risk list.

**Do not report as shipped:** anything from `EPISODE0_PILOT_NOTES.md`, `PIT_STOP_ARCADE.md`, `content-studio/roadmap`, or the Mission 200 pipeline.

---

## 4. Economics / financial literacy vs. "sports-business interest"

**It explicitly teaches decision economics/financial literacy, not just sports flavor.** `packages/engine/src/curriculum/concepts.ts` defines 33 `SportsBusinessConceptId`s in 7 groups: decision economics (opportunity cost, expected value, risk-reward, uncertainty, tradeoff analysis, sunk cost, marginal value, scarcity, incentives), strategy & capital, negotiation & leverage, roster/asset management, revenue & fan market, brand/media, operations. Each carries `definition`, `coreTension`, `instructorVocabulary`, `commonMisconception`, `realWorldDomain` — instructor-grade economics metadata (price elasticity, revenue management, marginal value, opportunity cost, etc. — genuinely transferable, not basketball trivia).

**Invisible-during-play / visible-to-instructor claim: VERIFIED.** `concepts.ts` header states the doctrine; `spine.ts`'s `segmentCurriculumFor()` produces the instructor-only projection; it is consumed by `InstructorPanel.tsx` (wired into the real HQ HUD) — **the instructor guide is a real, shipped, tested surface**, not aspirational (see §5).

**Coverage is enforced, not decorative:** `curriculumSpineInvariantsHold()` fails the build if any of the 33 concepts is untaught as a primary objective by some mission — a hard CI contract.

---

## 5. Instructor-facing surface

**Built, shipped, tested.** Three real surfaces:
1. **Instructor Mode panel** — `packages/ui/src/career/InstructorPanel.tsx`, mounted in `packages/ui/src/hq/HQHud.tsx` (line 628), opened from HQ (◰ button / `I` key per `docs/60-minute-run-guide.md`). Renders `InstructorGuide` from `packages/engine/src/state/career/instructorMode.ts` — 10-segment run-of-show with suggested minutes, "what to notice," discussion prompts pulled from the *same* brief data the room shows (never invented copy), and per-segment curriculum concept labels. Guarded by `instructorGuideInvariantsHold()`.
2. **Final GM Review** (post-session) — `packages/engine/src/state/career/finalReview.ts` / `campaignCasebook.ts` — synthesizes a "GM Identity," strongest behavior, blind spot, and a "How you read the building" scorecard from the played session.
3. **Facilitator Room** (`?scene=facilitatorcompare`) + **Student Review Room** (`?scene=challengereview`) — real classroom console (create/join session, alias-tagged result codes, compare view, discussion pairs) — but **scoped to Challenge Mode only**, not the core 8-room campaign. `docs/CHALLENGE_MODE_SESSION_2_REPORT.md` explicitly says its scoring "has not been playtested with real students."

No separate teacher *dashboard* (aggregate class analytics) exists — `docs/CTO_REPORT.md` lists "no teacher dashboard" as a stated future gap ("6 Months" roadmap item).

---

## 6. Grade band

**Stated, consistently, as a reading/copy level — not a formal grade-band product claim.** README.md line 64: *"the audience is 5th–8th graders."* Echoed verbatim in `CONTRIBUTING.md`, `docs/CREATIVE_DIRECTION.md` ("5th–8th grade, basketball vocabulary, no em dashes"), `docs/MISSION_EXPANSION_ROADMAP.md`, `docs/REPO_AUDIT_REPORT.md` ("classroom product for 5th–8th graders"), `docs/day-one-immersion-pass.md`. This is a **copy-style gate** (enforced by content style tests), functioning de facto as the grade band. No separate pedagogical grade-band certification or standards-alignment document exists.

---

## 7. Duration

- **The documented, supported classroom unit is ~60 minutes**, quoted directly in `docs/60-minute-run-guide.md`: *"The whole hour is one loop... ≈63 min of suggested time"* across 10 segments (HQ Opening 5, Morning Brief 5, Drive 5, Mission 1 — 10, Consequence 5, Drive 5, Mission 2 — 10, Consequence 5, Return to HQ 5, Final Review 8).
- This 60-minute run is a **curated 2-of-8-room slice** (Practice Facility + Cap Strategy Office), not the full 11-mission campaign: *"for a 60-minute session, center the two featured rooms."*
- **"60-minute Campaign Casebook" — CONFIRMED as a real internal name**, not invented by the prompt: `packages/engine/src/state/career/campaignCasebook.ts` header: *"Highway World already owns the 60-minute campaign deeply and purely..."*
- **Full 11-mission Episode 1 total duration: UNKNOWN.** No doc states total playtime for the full campaign; only the curated 2-room session has a time budget.
- Per-room duration outside the featured pair: **UNKNOWN** — no other room has a stated suggested-minutes figure.

---

## 8. Delivery / technology / hardware

- **Individual, single-device, browser-based.** No multiplayer for the core campaign. `packages/engine/src/scenes/CapRidge` + R3F/Three.js — this is a **WebGL 3D app**; requires a GPU-capable browser. `getRenderMode()` caps DPR for low-power/reduced-motion viewers (`docs/ARCHITECTURE.md` line 163).
- **Facilitated/classroom option exists but is separate**: Challenge Mode's Facilitator Room is a "local-first classroom session console" for join codes/alias tracking — explicitly **not live/networked** ("nothing here polls or syncs" — `FacilitatorRoom.tsx` doc comment).
- **Hardware risk flagged internally, unresolved**: `docs/CTO_REPORT.md` — 940.3 kB gzipped eager JS + 44 MB shipped 3D assets (worst single GLB 13 MB); *"on a 10 Mbps school connection that is ~8–10s of JS alone... on school networks this is the difference between a magical first minute and a teacher giving up."* CTO verdict: **"SHIP — as a supervised classroom pilot," explicitly NOT a public/self-serve launch** pending a load-weight pass.
- e2e coverage is **Chromium desktop only** (`playwright.config.ts`: *"Chromium only... this is a smoke pass, not a cross-browser matrix"*); Challenge Mode QA additionally tested a 390×844 phone viewport via a separate screenshot tool, and explicitly notes the phone layout is "visually cramped" and phone support is "deferred per plan."

---

## 9. Student data (factual only, no legal claims)

- **No login, no account server, no email/password.** `apps/highway-world/src/account/playerProfile.ts` header: *"Highway World is a single-device, local-first game. There is NO account server, NO email, NO password, NO personal data collection."*
- Profile = a sanitized display name (default "Player One," 20-char cap, control-chars stripped) + a chosen cosmetic avatar id + timestamps — a local save handle, not an account.
- **Progress saved in browser `localStorage`** under an `hw:` namespace, versioned envelope (`{v, d}`) with pure migrations (`packages/engine/src/state/persistence.ts`). Not a security boundary per the module's own doc comment.
- **No class codes** for the core campaign. Challenge Mode's Facilitator Room uses locally-typed "alias" + "result code" strings that live only on the facilitator's device — not a networked roster.
- `docs/CTO_REPORT.md` flags, as an unresolved risk: *"telemetry and accounts must be designed under COPPA/FERPA from day one, not retrofitted"* — i.e., **no telemetry currently exists** ("zero production observability... no error boundary [fixed this pass], no telemetry").

---

## 10. Health / maturity

- **Test count**: README claims **~2,200** Vitest tests. `docs/CTO_REPORT.md` states **207 test files / ~2,695–2,700 tests**; `docs/GAME_DIRECTOR_REPORT.md` states **"engine 166 files/2,277 tests; ui 20/135; app 24/299"** (≈2,711 total). Direct repo verification: **225 `*.test.ts(x)` files**, and a grep-count of `it(`/`test(` occurrences returns **~2,800**. **Verdict: the higher figures (~2,700) are closer to current reality; README's "~2,200" appears stale/undercounted**, but the order of magnitude (thousands of tests) is confirmed real, not a doc exaggeration.
- **CI**: single workflow `.github/workflows/ci.yml` — install → repo-weight guard → typecheck → **full Vitest suite** → build → bundle-budget guard. No lint step in CI (stubbed per-package), no visual-regression CI, no coverage tracking (`CTO_REPORT.md`, "Engineering Assessment" gaps).
- **e2e**: `e2e/smoke.spec.ts`, 8 Playwright tests, Chromium-only, against the production preview build — boot, land, drive, one room decision, one challenge-mode path.
- **"Gold master" meaning here**: an internally-declared engineering/QA milestone (full test suite green, dead-ends invariant-tested, campaign provably completes, saves persist, copy style-gated, crash recovery in place) — **not** an external certification. The CTO report's own verdict pairs it with a hard caveat: *"SHIP Episode 1 — as a supervised pilot, not a public launch."*
- **Known blockers** (from `docs/CTO_REPORT.md`): (1) first-load weight (940 kB gz JS + 44 MB assets), (2) zero telemetry/observability, (3) ~590 MiB git history of raw GLBs with "unclear licensing" on some sources, (4) marginal content cost (~20 files per new room). Three explicit pre-public-launch gates: telemetry, load-weight pass, accessibility + licensing review.

---

## 11. Evidence of running with real students

**NO EVIDENCE of a completed real-student session.** All signal points to "recommended next step," not "already happened":
- `docs/CTO_REPORT.md`: *"classroom pilots (5–10 cohorts)"* is listed under **"3 Months — the pilot quarter"** (future), and *"evidence from real students"* is named as something that arrives *after* that quarter.
- `docs/GAME_DIRECTOR_REPORT.md`: *"Would I put 10,000 students through it tomorrow? Through the supervised classroom pilot the CTO recommended — yes, without hesitation"* — phrased as endorsing a **recommended, not-yet-run** pilot.
- `docs/CHALLENGE_MODE_SESSION_2_REPORT.md`: scoring bands explicitly **"have not been playtested with real students."**
- `docs/EPISODE0_PILOT_NOTES.md` — despite the filename, this is **NOT student-pilot data**. It's a design/QA audit of a now-**retired** flow (marked "SUPERSEDED — HISTORICAL... describes retired content" at the top), and its own text describes it as *"a planning + verification artifact, not player-facing copy"* with an *automated playthrough*, not a human student session.
- No telemetry pipeline exists to have captured real-student data even if a session occurred (§10).

---

## 12. Deployment

**No live URL, no deploy config found.** No `vercel.json`, `netlify.toml`, or CI deploy step in `.github/workflows/ci.yml` (CI runs build + guardrails only, does not publish). `docs/` contains no hosting/URL references. **An instructor would launch this by cloning the repo and running `pnpm install && pnpm dev`** (Vite dev server) or `pnpm build` + serving the static output locally — there is no hosted instance to point a classroom at today.

---

## Library Candidate Record(s)

### Candidate 1 (primary)
- **proposedId**: `highway-world-episode-1`
- **canonicalTitle**: "BSC · Highway World — Episode 1: Origin District" (README: "BSC · Highway World"; internal: "Episode 1 · Origin District," `storyChain.ts`)
- **aliases**: "Highway World," "Save The Franchise" (campaign name, `60-minute-run-guide.md` header), "Franchise OS"
- **path**: `/workspace/bsc-highway-world` (game: `apps/highway-world`; curriculum: `packages/engine/src/curriculum`)
- **whatStudentsDo**: Play as a basketball front-office GM; drive a 3D city between 11 destinations (3 "venue" rooms + 8 career-decision rooms); make forced-tradeoff business calls on interactive boards (allocation pumps, cap sheets, draft rankers, negotiation ladders, revenue-mix dials); see consequences ripple through 6 stakeholders; end on a synthesized "GM Identity" review.
- **pillar**: Sports-business decision economics / financial literacy (career-sim)
- **conceptTerms** (verbatim ids, `concepts.ts`): `opportunity-cost, expected-value, risk-reward, uncertainty, tradeoff-analysis, sunk-cost, marginal-value, scarcity, incentives, optionality, portfolio-thinking, long-term-vs-short-term, leadership-under-constraints, negotiation, batna, leverage, asset-valuation, roster-construction, salary-cap-strategy, price-elasticity, revenue-management, customer-segmentation, customer-experience, fan-engagement, retention, sponsorship-roi, brand-fit, media-rights, operations-tradeoffs, stakeholder-management, principal-agent, crisis-communication, reputation-risk` (33 total)
- **gradeBandEvidence**: README.md:64 — *"the audience is 5th–8th graders"* (copy-style gate, not a formal certification)
- **purpose**: Teach transferable decision-economics/negotiation/operations concepts through an NBA front-office fiction; curriculum invisible during play, visible via Instructor Mode + Final GM Review
- **delivery**: Individual, single-device, browser (WebGL/R3F). Facilitator-led optional (Instructor Mode script exists); not multiplayer/networked.
- **durationEvidence**: `docs/60-minute-run-guide.md` — "≈63 min of suggested time" for the documented 2-room curated session; full 11-mission campaign total duration UNKNOWN
- **groupSize**: Individual (1 student : 1 device); Instructor Mode supports whole-class facilitated pacing of one individual's/shared session
- **facilitation**: Optional but supported — in-app Instructor Mode panel (`InstructorPanel.tsx`, HQ `I` key), companion doc `docs/60-minute-run-guide.md`
- **technology**: React 18 + React Three Fiber/Three.js (WebGL), Vite, Zustand, Zod; ~940 kB gz eager JS + 44 MB 3D assets (CTO_REPORT); Chromium-verified via Playwright e2e; no mobile support verified
- **evidenceOutput**: Final GM Review / GM Identity synthesis (`finalReview.ts`); no exportable teacher report/dashboard beyond the live Instructor Mode panel
- **studentDataProfile**: No login/account/email/password; local display-name profile; progress saved in browser `localStorage` (`hw:` namespace); no telemetry pipeline exists
- **maturitySignal**: "Gold master" (internal QA milestone) + supervised-pilot-only release recommendation; ~2,700 Vitest tests (CTO/Game Director reports; grep-verified ~2,800 test() occurrences across 225 test files vs. README's stated ~2,200 — likely stale); 1 CI workflow (typecheck+test+build+2 guardrails); 8 Playwright e2e smoke tests, Chromium only; **no evidence of a completed real-student pilot**
- **simulationPattern**: Branching-narrative career sim / decision-room sequence with consequence propagation and stakeholder-reaction model
- **confidence**: High (extensively source- and test-verified; primary risk to the label is that "Episode 1" spans 11 missions while the README foregrounds "eight career rooms" — both are accurate but describe different scopes of the same one product)
- **evidence**: `README.md`; `packages/engine/src/curriculum/{concepts,missions,spine,types}.ts`; `packages/engine/src/careerMission/manifest/registry.ts`; `packages/engine/src/world/story/storyChain.ts`; `packages/engine/src/state/career/instructorMode.ts`; `docs/60-minute-run-guide.md`; `docs/CTO_REPORT.md`; `docs/GAME_DIRECTOR_REPORT.md`; `apps/highway-world/tests/episode1RouteIntegrity.test.ts`

### Candidate 2 (secondary, lower confidence — split only if the schema needs session-length, facilitator-run units)
- **proposedId**: `highway-world-challenge-mode-game-night`
- **canonicalTitle**: "Highway World — Challenge Mode: Game Night Pricing Crisis"
- **aliases**: "The Challenge," "Game Night Pricing Crisis"
- **path**: `apps/highway-world/src/challenge/`, `apps/highway-world/src/facilitator/`, `apps/highway-world/src/review/`
- **whatStudentsDo**: Standalone 2-round pricing/elasticity crisis mission (revenue-mix board under a demand shock), independent of the main career campaign
- **pillar**: Price elasticity / revenue management (economics, single-topic)
- **conceptTerms**: `price-elasticity, revenue-management, brand-fit, fan-engagement` (subset, via `arena-revenue-office`-style mechanic)
- **gradeBandEvidence**: Same 5th–8th grade copy law by inheritance; not independently stated
- **purpose**: A facilitated, classroom-console-driven acquisition/assessment arc, separate from the narrative campaign
- **delivery**: Individual play + a local-only facilitator console (join codes, alias tracking, compare view); no live sync
- **durationEvidence**: UNKNOWN (no stated time budget found)
- **groupSize**: Individual play, classroom-aggregated by a facilitator's local device
- **facilitation**: Built (`FacilitatorRoom.tsx`), but explicitly noted as untested with real facilitators for tone/appropriateness
- **technology**: Same stack as Candidate 1, own lazy chunk
- **evidenceOutput**: Result code (shareable string), category-award ranking, counterfactual strategies (`ChallengeDebrief.tsx`)
- **studentDataProfile**: Same local-only model; facilitator-typed alias/result codes stay on-device
- **maturitySignal**: Shipped, engine + UI tested, rendered-QA'd across 6 device/motion combos — **but scoring bands "provisional pending playtest data," not playtested with real students** (`docs/CHALLENGE_MODE_SESSION_2_REPORT.md`)
- **simulationPattern**: Single-topic pricing-crisis simulation with facilitator compare/ranking layer
- **confidence**: Medium (real shipped code, but positioned internally as pre-pilot and not part of the README's headline "gold master" claim)
- **evidence**: `docs/CHALLENGE_MODE_SESSION_2_REPORT.md`; `research/highway-world-2-5d-challenge-mode-master-plan.md`; `apps/highway-world/src/challenge/ChallengeArena.tsx`; `apps/highway-world/src/facilitator/FacilitatorRoom.tsx`
