# BOW simulation portfolio — account-wide audit

August 2026. All 86 repositories in the `braydenokley13-ux` account were read.
Raw per-cluster findings are preserved in `evidence/agent-reports/`.

---

## 1. Executive summary

BOW has **76 simulation experiences**. That is far more than anyone was likely
tracking, and materially more than the repository names suggest.

It also has five problems that the portfolio makes unavoidable:

1. **Nothing has been run with students.** Not one record carries evidence of a
   real student session, and the three flagship products state it outright in
   their own repositories. Every experience therefore sits at PLAYABLE or below.
2. **Roughly 45 working simulations are effectively invisible.** 48 are live and
   playable on GitHub Pages today; the public website's 24-lesson catalog links
   exactly one of them. This is a linking problem, not a building problem.
3. **25 active experiences cannot be launched at all**, including the largest
   product in the account.
4. **Financial literacy is thin** — 5 experiences against 59 economics, for two
   pillars BOW describes as co-equal.
5. **Nothing has an owner.** All 73 active experiences are unowned.

The single highest-value action available is not building anything. It is
linking the 48 live simulations to the lessons that already exist.

---

## 2. Account audit

| Category | Repos | Outcome |
| --- | --- | --- |
| Track lesson and module repos (101 / 201 / 301) | 48 | 48 experiences |
| Flagship products | 3 | 4 experiences |
| Standalone and bonus games | 6 | 20 experiences |
| Platforms containing simulations | 2 | 4 experiences |
| Platforms and delivery shells | 3 | excluded |
| Analytics and ML models | 8 | excluded |
| Unrelated ventures | 8 | excluded |
| Empty (no commits) | 4 | excluded |
| Data-only or forms-only | 4 | excluded |

**Coverage confidence: high for GitHub, unknown beyond it.** Every repository was
cloned and inspected; the flagships were read in depth. Two caveats: all clones
are shallow, so commit history could not inform lineage beyond dates; and this is
a GitHub audit only — anything living in Drive, Slides or physical materials is
not represented.

### Discovered, not expected

- **Track 301 exists** — 16 repositories, 18 experiences, never mentioned in the
  brief. It is BOW's most conceptually advanced work: game theory, model risk,
  venture capital, negotiation under asymmetric information.
- **BOW already had four concept vocabularies**, grown independently and never
  joined.
- **Three real simulations live inside the public website** and are not in any
  lesson list.
- **A recurring dual-build pattern**: roughly a dozen lessons ship both a browser
  build and a Google Sheets build of the same activity, often sharing a claim
  code. The Sheets builds are facilitator-run and record evidence; the browser
  builds record nothing.

---

## 3. Portfolio map

**76 total · 73 active · 3 superseded**

| Maturity | | Health | | Pillar | |
| --- | --- | --- | --- | --- | --- |
| PLAYABLE | 63 | healthy | 48 | economics | 59 |
| EXPERIMENTAL | 10 | unknown | 14 | cross-pillar | 9 |
| TESTED | 0 | needs attention | 7 | financial literacy | 5 |
| BOW_APPROVED | 0 | broken | 4 | | |
| CORE | 0 | | | | |

**Grades** (a simulation counts once per grade it states): 5 → 29, 6 → 30,
7 → 30, 8 → 31, 9 → 3, 10 → 3, **not recorded → 23**.

**Families**: Track 301 (18), Track 201 (14), Track 101 (14), bonus GM sims (8),
Gauntlet (4), website (3), analytics lab (2), pre-course (2), Front Office City
(2), Highway World (2), plus Decision Challenges, Sports Agency, BOW Universe and
the Entrepreneurship Lab.

**Operability**: 48 of 73 launchable from a link. 20 of 73 have a recorded
duration. 32 carry at least one known blocker.

---

## 4. Concept coverage and gaps

71 canonical concepts, crosswalked from BOW's four existing vocabularies. 68 are
taught by at least one active experience.

**Strongest**: salary cap (22), opportunity cost (16), uncertainty (15), asset
valuation (14), expected value (14), luxury tax (13), tradeoffs (13), time
horizon (13).

**No coverage at all**: market equilibrium, monopoly, auctions and bidding.
Market equilibrium is the notable one — it is on BOW's own published concept map
as a Track 101 Module 2 concept, and nothing teaches it.

**Financial literacy, in full**: income reliability (7), full cost (3), viable
budget (3), contingency planning (3), adaptation (2), financial defense (2),
saving (1). Almost all of that comes from two products.

**Deliberately absent**: credit, debt, interest and insurance appear in BOW's
source vocabulary but no simulation teaches them, so they were not added as
canonical concepts. Adding them would have manufactured a phantom gap instead of
reporting a real one.

**Macroeconomics rests on one experience.** Fiscal policy, monetary policy,
inflation, the business cycle and the multiplier are covered almost exclusively
by Gauntlet L3. If that one file breaks, an entire branch of the concept map goes
dark.

---

## 5. Duplicates and lineage

| Canonical | Superseded | Basis |
| --- | --- | --- |
| The Front Office (`BSC-201-Capstone`) | The Front Office early build (`Franchise-Sim`) | Identical title, state shape, screens and storage keys. The successor, three days later, adds the cap timeline and the entire ending. |
| Trade Deadline War Room 201 (`T201-M1-L2`) | Luxury Tax in Action (`201-M1-L2-Luxury-Tax-`) | Same lesson slot; the successor has tests and a README, five months later. |
| BOW Sports Capital: Pre-Course | BOW Zoom Game (`101-pre-course`) | Byte-identical mission id sequence; the successor rebuilds it on Postgres with roles, branching and a dual grade band. |

**Not lineage, despite the names.** `M1-201-FINAL` and `M2-201-FINAL` are not
"final" versions of the T201 lessons — they are a separate 3D product line that
*predates* them. If anything the simpler T201 lessons superseded the 3D line for
classroom use.

**Both `The Front Office` builds remain publicly reachable**, so a student can
still land on the incomplete one. Marking the record is done; retiring the
deployment is a BOW decision.

**Other cleanup**: `301-M2-L1` has two byte-identical entry points; `scout-model`
contains the same application four times plus a workflow file containing HTML
instead of YAML; two committed workbooks contain a real name and email address as
leftover test data.

---

## 6. Ownership and instructor transfer

Every active experience is `UNOWNED`. Ownership was not inferred from commit
counts, because the most frequent committer is routinely not the accountable
person. This needs 73 human decisions, or at minimum a decision about which
subset matters.

Founder dependence: one product — Front Office Challenge — is `founder-required`
by design, since the whole thing assumes one person driving phases live. That is
a legitimate R&D posture, but it means no other instructor can run it today.

**Facilitator transfer is unknown everywhere.** No record anywhere shows a
non-founder running any BOW simulation.

---

## 7. What should happen next

Ranked by value against effort.

1. **Link the 48 live simulations into the website's lesson catalog.** 23 of 24
   lessons say "coming soon" while working simulations sit one URL away. Highest
   value in the audit, and close to zero build cost.
2. **Run one simulation with real students and record it.** The portfolio cannot
   leave PLAYABLE until this happens once. Pick a short, healthy, live one.
3. **Assign owners** — start with the flagships and anything at Track level.
4. **Deploy Highway World somewhere.** Roughly 2,700 tests and no way for a
   teacher to open it. Its own CTO report flags first-load weight as the blocker;
   that needs a decision, not more building.
5. **Fix the four broken experiences.** `Structural Leverage SIM` is missing a
   deleted entry point; the Entrepreneurship Lab throws on load over a missing
   script tag. Both are small fixes.
6. **Record durations.** 53 experiences have none, which makes them invisible to
   an instructor with a fixed period. Reading each one and writing down a real
   number is cheap.
7. **Decide what Track 301 is.** 18 experiences and a contested audience: two
   repositories say Grades 9–10, the website says "executive level". This changes
   whether BOW is a Grades 5–8 organisation.
8. **Build one more financial-literacy experience**, ideally short and
   self-guided. The pillar currently depends on two untested flagships.
9. **Retire the superseded deployments**, and clear the two workbooks containing
   real personal data.
10. **Cover market equilibrium**, the one concept on BOW's own published map with
    nothing behind it.

Not recommended yet: manifests across 50 repositories, any authoring tool, deep
BOW OS integration, or a public listing surface. Each is either premature or
solving a problem the account does not have.

---

## 8. Integration paths

**BOW OS** — consume `data/simulations/*.json`. Stable ids are the contract, and
they already match what products own (`plan-under-pressure` is
`bow-decision-challenges`'s own id, not one invented here). Nothing more should
be built until BOW OS has a real operating need.

**Public website** — publish only `product` fields, and only where
`governance.publicListing` is true. It is false everywhere today, deliberately:
that is an editorial decision for BOW, not one an audit should make. The internal
half of every record — blockers, owner gaps, validation history — must never be
published.

**Decision Challenges** — reference by `challengeId`. Its world registry,
evidence model and micro-skill ids stay entirely its own.

---

## 9. Unresolved

Genuinely open, and each needs a person rather than more investigation:

1. **Track 301's audience.** Grades 9–10 or executive? It changes BOW's scope.
2. **Do the dual-build lessons count once or twice?** Recorded as one experience
   each to avoid inflating the portfolio, but the Sheets builds have a different
   delivery model and are the only ones that record evidence.
3. **Is `bow-universe` an active direction or a parked experiment?** It rejects
   the arcade framing the other platforms use. Nothing in the repo says which.
4. **Should `what-counts-as-best` be in?** Excluded on subject and audience, but
   it is a better-built experience than several that were included.
5. **Which of the three BOW platforms is current?** Bow-Platform, bow-universe
   and Bow-Sports-Capital-Full-APP overlap heavily; no repository declares
   another deprecated.
6. **Did any of this ever run with students?** The repositories say no. If it
   did and simply went unrecorded, that is the fastest way to move the portfolio
   off PLAYABLE.
