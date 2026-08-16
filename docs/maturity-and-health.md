# Maturity and health

Two different questions that are constantly confused:

- **Maturity** — how far has this product come? Only ever moves forward.
- **Health** — does it work right now? Moves both ways, and a Core product can
  break on a Tuesday.

Keeping them apart is what lets the Library say "this is our best experience and
it is currently broken", which is exactly the sentence an operating catalog
exists to be able to say.

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

## Who changes what

| Change | Who |
| --- | --- |
| `health.technical`, `lastVerified.technical` | The probe script, automatically |
| `knownBlockers`, `documentation` | Whoever last worked on it |
| `maturity`, `visibility`, `publicRelease` | BOW leadership |
| `validation.*`, `lastVerified.studentRun` | Whoever was in the room |
| `owner` | BOW leadership. Never inferred from commits — the person who committed most is routinely not the person accountable. |
