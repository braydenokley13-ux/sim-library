# Source of truth

Who owns which field, and what happens when two places disagree.

This is the document that keeps the Library from rotting. Every other design
choice here follows from one rule:

> A simulation describes **itself**. BOW judges **it**.

A maintainer is the authority on what their simulation is and how it runs. A
maintainer is *not* the authority on whether it is good enough for BOW to put in
front of students. Those are different questions, they belong to different
people, and mixing them is how catalogs become marketing.

---

## The two blocks

Every record in `data/simulations/` has exactly two substantive blocks.

### `product` — self-described

Owned by whoever builds the simulation.

| Field | Why it belongs to the builder |
| --- | --- |
| `title`, `aliases`, `family` | They named it. |
| `summary`, `whatStudentsDo` | They know what it does. |
| `concepts` | Proposed by the builder; the canonical id list is central (see below). |
| `standards` | Only the builder knows what they actually aligned to. |
| `gradeBands`, `gradeBandBasis` | The design targets an age. |
| `purpose`, `pattern` | Design intent. |
| `delivery`, `duration`, `groupSize` | Operating shape. |
| `facilitation` | What running it actually takes. |
| `technology`, `evidenceOutput`, `studentDataProfile` | Implementation facts. |
| `source`, `runResources`, `version` | Where it lives and how to open it. |

If a repo ever ships a manifest (see `manifest-spec.md`), the sync overwrites
this block **wholesale**. That is deliberate: one writer, no merge conflicts, no
drift.

### `governance` — BOW-owned

Never settable from a repo. A sync must not touch it.

| Field | Why it is central |
| --- | --- |
| `maturity`, `maturityBasis` | `CORE` is a portfolio judgement about strategic value. A repo cannot promote itself. |
| `visibility`, `supersededBy` | Which of five near-identical builds instructors see is a BOW call, not a repo's. |
| `publicListing` | What appears on the public site is an editorial decision. |
| `owner` | Assigned by BOW. Never inferred from commit counts — the most-committing person is often not the one accountable. |
| `health.*` | Includes `knownBlockers`, which a maintainer has an obvious incentive to leave empty. |
| `validation.*` | Whether real students ran it. Only a human who was in the room knows. |
| `lastVerified.*` | Institutional memory, including which content version was tested. |
| `notes` | Leadership-facing. Internal. |

The validator enforces the boundary that matters most: **maturity claims must be
earned.** `TESTED` and above requires recorded student validation; `BOW_APPROVED`
requires a named owner, non-broken health, and at least one run resource; `CORE`
requires repeated student validation *and* facilitator transfer beyond the
founder. You cannot type your way to `CORE`.

---

## The one field the centre owns inside `product`

`product.concepts` is builder-proposed but **centrally constrained**. The values
must resolve against `data/concepts.json` or validation fails.

This is the single standardised layer in the whole system, and it is standardised
on purpose: concepts are how an instructor searches, how leadership sees coverage,
and how the gap map is computed. A free-text concept field would have produced
"Supply & Demand", "supply/demand", and "the demand curve" as three different
things, and the portfolio view would have been worthless.

Everything else about how a simulation is built stays local to the simulation.

---

## Where each field actually comes from today

Most records were built by reading the source, not by asking a maintainer. That
is recorded honestly in `provenance`:

- `confidence: VERIFIED` — read directly out of the files.
- `confidence: INFERRED` — reasonable from evidence, not stated.
- `confidence: UNKNOWN` — not established, and left empty rather than guessed.

`governance.validation` is `unknown` almost everywhere, because **GitHub cannot
tell us whether students ever played something.** That is not a hole in the data
collection; it is the honest answer, and it is one of the most useful things the
Library reports.

---

## Products that own their own registries

Three BOW products have real internal registries. The Library **references** them
and must never duplicate them.

| Product | Owns | Library's job |
| --- | --- | --- |
| `bow-decision-challenges` | `WORLD_REGISTRY`, `challengeId: "plan-under-pressure"`, concepts `C1`–`C6`, micro-skill ids, NYSED alignment | Point at `plan-under-pressure` by its existing id. Do not restate its worlds or its scoring model. |
| `BSC-HIGHWAY-WORLD` | `packages/engine/src/curriculum/` — mission spine, 33 concept ids, content-integrity checks | One Library entry for the shipped experience. Do not mirror the mission list. |
| `BOW-WEBSITE` | `lib/concept-map.ts`, `lib/glossary.ts`, `lib/lessons.ts` | The concept map is the Economics backbone of the taxonomy — crosswalked, not copied. |

Where a product already owns a stable id, **the Library adopts that id.** The
worst outcome here would be a second name for something that already had one.

---

## Drift control

The registry goes stale in three ways. Each has a specific answer.

**1. The simulation changes and the record doesn't.**
`product.version.sourceRef` records the commit a record was built from. When it
drifts far from the repo's head, the record is due a re-read. Cheap to check,
honest about staleness.

**2. The deployment dies and nobody notices.**
`scripts/probe-health.mjs` re-probes every live URL and writes
`health.technical` + `lastVerified.technical`. This is the only health signal
that can be automated, and the script says so in the basis string it writes. Run
it on a schedule; it is the difference between a catalog and a working one.

**3. Governance rots quietly.**
Nothing automated can fix this, so the Library makes it visible instead:
unowned products, never-validated products, and stale `lastVerified` dates all
surface in the leadership view. Rot you can see is a manageable problem.

---

## Why the registry is its own repo

`sim-library` is a small, independent repo. The alternatives were considered
against the actual account:

- **Inside `BOW-WEBSITE`** — couples the internal portfolio record to a public
  marketing deploy, and puts `knownBlockers` and owner gaps one config mistake
  away from being public.
- **Inside BOW OS / `Bow-Platform`** — couples simulation metadata to operations
  software with its own release cycle, and BOW OS V1 is explicitly in a
  use-measure-fix posture rather than an extend-it posture.
- **Inside a curriculum repo** — the account has ~50 of them and no single one is
  the parent. Track 301 alone spans 16 repos.

An independent registry keeps every simulation repo independent, and lets BOW OS,
the public website, and future builders all consume the same source without any
of them owning it. It is also the only option under which the ~50 frozen
single-file lesson repos need no changes at all.
