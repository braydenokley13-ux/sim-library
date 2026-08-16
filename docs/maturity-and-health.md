# Maturity, health and curation

Three different questions that are constantly confused:

- **Maturity** — how far has this product come? Only ever moves forward, and
  every step above PLAYABLE has to be earned with evidence.
- **Health** — does it work right now? Moves both ways, and a Core product can
  break on a Tuesday.
- **Curation** — of the things that do work, which should a teacher reach for
  first? An opinion, formed by playing them.

Keeping them apart is what lets the Library say "this is our best experience and
it is currently broken", which is exactly the sentence an operating catalog
exists to be able to say. Adding the third lets it say something the first two
cannot: "nothing here has been student-tested, and these eleven are still the
ones to start with."

---

## Maturity

Five levels. The validator enforces the gates; you cannot type your way up.

### EXPERIMENTAL
The idea exists. It may not run, may be half-built, may be a config file with no
gameplay behind it. Not for classroom use.

### PLAYABLE
A student can get from start to finish without hitting a wall.

**This says nothing about educational quality.** It is the most misread level in
the model, so it is worth being blunt: 63 of BOW's 73 active experiences are
PLAYABLE, and that means only that they run.

### TESTED
Has been run with real students, and someone recorded what happened.

**Gate (enforced):** `validation.studentValidation` must be `once` or `repeated`.

### BOW_APPROVED
Another appropriately trained BOW instructor could pick this up and run it well.

**Gates (enforced):** everything TESTED requires, plus a named product owner,
technical health that is not `broken`, and at least one run resource — because
an instructor who cannot open it cannot run it, whatever else is true.

**Also required, by review rather than by script:** grade band established,
concepts mapped, run instructions that a non-author can follow, materials
complete, no critical defect, limitations written down.

### CORE
One of BOW's strongest repeatable experiences. A deliberately high bar.

**Gates (enforced):** `studentValidation: repeated`, and `facilitatorValidation`
of `bow-instructor` or `external-educator` — someone other than the founder has
run it successfully.

**Also required, by review:** strong instructional value, reliable in the room,
and genuine strategic importance to BOW. Being popular is not enough.

### Where the portfolio actually sits

| Level | Count |
| --- | --- |
| EXPERIMENTAL | 10 |
| PLAYABLE | 63 |
| TESTED | 0 |
| BOW_APPROVED | 0 |
| CORE | 0 |

Nothing has passed PLAYABLE, because no repository in the account records a
student ever having run any of it — and in the three flagship products the
source says so outright. That is not a modelling failure. It is the single most
important thing this audit found, and the model is built so it cannot be hidden.

---

## Health

### Technical health

| Value | Meaning |
| --- | --- |
| `healthy` | The live link resolves. |
| `needs-attention` | Runs, but something real is wrong or it cannot be launched without a build. |
| `broken` | Does not work. |
| `unknown` | Cannot be checked from here — typically a Google Sheet whose bound workbook is not in the repo. |

`scripts/probe-health.mjs` sets this from an automated reachability probe and
writes a basis string saying exactly that. **Reachability is the only health
signal that can honestly be automated**, and the script never claims more.

### The other health fields

- **`documentation`** — complete, partial, minimal, missing. Judged on whether a
  non-author could run it, not on word count.
- **`knownBlockers`** — short, specific, actionable. "The page throws on load
  because state.js is never included" beats "needs work". 32 active experiences
  carry at least one.

  **A defect is not automatically a health problem.** Health drives whether a
  record reaches the public site, so downgrading it removes a working
  simulation from the library — which is the right call for a broken build and
  the wrong one for a flawed design. The line: health answers *can a student
  open this and play it through?* A dominant strategy, contradictory copy, an
  unrounded number or a confusing wait are all real, all worth recording, and
  none of them stops a playthrough — they belong in `knownBlockers` and in the
  curation tier. Only an advertised path that cannot be completed downgrades
  the record. Three do today: a tutorial mode that throws on its first
  question, a chart that never renders, and a policy simulator whose winning
  path never resolves.
- **`validation`** — student and facilitator. Defaults to `unknown` and stays
  there until a human says otherwise. GitHub cannot tell us whether a class
  enjoyed something.
- **`lastVerified`** — separate dates for technical check, student run,
  facilitator run and substantive update, plus `testedContentVersion`.

### Staleness

Deliberately **not** a stored field. A stored `STALE` flag is wrong the moment
it is written. Staleness is derived from `lastVerified` dates at read time, so
it cannot rot.

`testedContentVersion` exists for one specific failure: a product marked tested
a year ago and rewritten since. Recording which version was tested means the
Library can say "tested, but not this version" instead of quietly implying the
current build has evidence behind it.

---

## Curation

Maturity is nearly empty and will stay that way until students run something.
That is honest, but on its own it is useless to a teacher: a catalog where
everything sits at PLAYABLE offers no way to choose. Curation is the axis that
answers "where do I start?" without pretending evidence exists.

It is stored at `governance.curation` and it is explicitly an **opinion**,
formed by playing the simulation and judging the decision it puts in front of a
student.

| Tier | Meaning |
| --- | --- |
| `FLAGSHIP` | Carries the library. Worth investing real work in. |
| `RECOMMENDED` | Solid. Teach it today. |
| `EXPERIMENTAL` | Interesting idea, rough execution. Opt in knowingly. |
| `HOLD` | Do not teach yet. |
| `REBUILD` | The idea is worth keeping; this execution is not. |
| `ARCHIVE` | Stop spending time on it. |

### What stops an opinion becoming a claim

An unconstrained editorial field is the easiest way to smuggle a truth claim
into a registry built to prevent them, so four gates are enforced by the
validator rather than left to good intentions:

- **`tierBasis` is required**, with a minimum length. A tier is never a bare
  assertion; it comes with a sentence a colleague could argue with.
- **`FLAGSHIP` and `RECOMMENDED` require a record that actually launches**, is
  `active`, and is not `broken`. A recommendation a teacher cannot act on is
  not a recommendation.
- **Neither may contradict a `publicRelease.hold`.** BOW cannot recommend what
  BOW is simultaneously withholding.
- **`HOLD`, `REBUILD` and `ARCHIVE` are deliberately unconstrained.** Judging
  something unready must never first require it to work.

`playtestedOn` records when someone last played it end to end. It is **not**
student evidence and never feeds the maturity gates — a hundred agent playthroughs
still leave `studentValidation` at `unknown`.

### What reaches the public site

Only `FLAGSHIP`, `RECOMMENDED` and `EXPERIMENTAL`, and only on records that
launch. `HOLD`, `REBUILD` and `ARCHIVE` are decisions about BOW's own roadmap;
printed beside a simulation BOW has not withdrawn, they would read as a public
verdict on it.

---

## Who changes what

| Change | Who |
| --- | --- |
| `health.technical`, `lastVerified.technical` | The probe script, automatically |
| `knownBlockers`, `documentation` | Whoever last worked on it |
| `maturity`, `visibility`, `publicRelease` | BOW leadership |
| `curation.tier`, `curation.tierBasis` | BOW leadership, after playing it |
| `curation.playtestedOn` | Whoever played it end to end |
| `validation.*`, `lastVerified.studentRun` | Whoever was in the room |
| `owner` | BOW leadership. Never inferred from commits — the person who committed most is routinely not the person accountable. |
