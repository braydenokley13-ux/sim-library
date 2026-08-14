# BOW Simulation Library

BOW Sports Capital's canonical catalog of simulations and simulation-like
learning experiences.

> Standardize how BOW understands, finds, evaluates and operates its
> simulations. Do not standardize how every simulation is built.

The Library surrounds the simulations. It does not swallow them. Nothing here
asks a product to change its framework, its visuals, its mechanics or its
session model.

---

## What is in it

**76 experiences**, found by reading all 86 repositories in the
`braydenokley13-ux` account in August 2026. 73 active, 3 superseded.

The count is not a repository count, and the difference matters:
`GAUNTLET` holds four distinct experiences and `BSC-anythingelse` holds eight,
while `201-M4-ECON` — a named Track 201 capstone — holds none at all, being 154
lines of configuration with no gameplay behind it.

## Start here

```bash
npm install
npm run validate     # check every record
npm test             # registry integrity tests
npm run build        # regenerate CATALOG.md and app/index.html
npm run probe        # re-check every live link
```

Then open **`app/index.html`** in a browser. No server needed.

- **Find** — the instructor view. Filter by grade, concept, duration, format.
- **Portfolio** — the leadership view. Coverage, maturity, health, gaps.
- **Concepts** — the taxonomy, with how many simulations teach each.

`CATALOG.md` is the same data as text, for reading in a pull request.

## What the audit found

Five things worth knowing before anything else:

**1. Nothing has been student-tested.** Not one of the 76 records evidence of a
real student run. In the three flagship products the source says so in as many
words — *"No real student has used this build"*, *"No child has used this build
yet"*. Everything therefore sits at PLAYABLE or below, and the maturity model
is built so that cannot be quietly upgraded.

**2. About 45 working simulations are invisible.** 48 of the 73 active
experiences are live and playable on GitHub Pages right now. The public website's
24-lesson catalog links exactly one of them; the other 23 lessons say "coming
soon" and point nowhere. **The gap is a linking problem, not a building
problem** — and it is the cheapest, largest win available.

**3. 25 experiences cannot be launched at all.** No live link. That includes
Highway World, the largest product in the account: it has roughly 2,700 tests
and no deployment of any kind, so running it requires cloning a repo and
starting a dev server. For teaching purposes those 25 do not currently exist.

**4. Financial literacy is thin.** BOW calls Economics and Financial Literacy
co-equal pillars. The portfolio is 59 economics to 5 financial literacy, and the
financial-literacy work sits almost entirely in two flagship products, neither
of which has run with students.

**5. Nothing has an owner.** All 73 active experiences are `UNOWNED`. Ownership
was deliberately not inferred from commit history — the person who committed
most is routinely not the person accountable.

Full analysis: `discovery/REPORT.md`.

## How it is put together

```
data/
  concepts.json          canonical taxonomy, crosswalked over four existing vocabularies
  simulations/<id>.json  one record per experience
schema/
  simulation.schema.json product vs governance, enforced
scripts/
  validate.mjs           integrity, including earned-maturity gates
  probe-health.mjs       reachability, the one automatable health signal
  build-catalog.mjs      regenerates the UI and CATALOG.md
  seed*.mjs              the August 2026 discovery, as reproducible code
discovery/
  REPORT.md              the findings
  evidence/              raw audit output, ~290 KB, so this need not be redone
docs/
  inclusion-rule.md      what counts, tested against the awkward cases
  source-of-truth.md     who owns which field, and what happens on conflict
  maturity-and-health.md two different questions, kept apart
  manifest-spec.md       the file, and why most repos should not get one
  adding-a-simulation.md the workflow
```

### One rule holds it together

Every record has two blocks:

- **`product`** — what the simulation says about itself. The builder owns it.
- **`governance`** — what BOW says about the simulation. Leadership owns it.

A repo manifest can only ever write `product`. It is structurally incapable of
declaring itself Core, assigning itself an owner, or clearing its own blockers.

The validator enforces that maturity is earned: `TESTED` and above requires
recorded student validation, `BOW_APPROVED` additionally requires a named owner,
working health and a way to actually run it, and `CORE` requires repeated use
plus a non-founder instructor. You cannot type your way up the ladder.

### The concept taxonomy is a crosswalk, not an invention

BOW already had four concept vocabularies that had grown independently and never
been joined: the website's 30-entry concept map, its 42-term glossary, Highway
World's 33 internal ids, and the six weighted concepts in Decision Challenges.
`data/concepts.json` maps all four onto 71 canonical ids, keeping each product's
own vocabulary as aliases. Concepts are the only layer that is standardised, and
only because search, coverage and the gap map all depend on it.

## Deliberately not built

No universal runtime. No simulation builder or authoring tool. No shared UI. No
mandatory evidence engine. No monorepo migration. No LMS. No rewriting of
healthy simulations so they fit the catalog better.

The registry is a small independent repository so that every simulation repo
stays independent, and so BOW OS, the public website and future builders can all
consume the same source without any of them owning it.

## Honest limits

- **Governance is nearly empty by design.** Owner, student validation and
  facilitator transfer are `UNOWNED` and `unknown` almost everywhere, because
  GitHub cannot answer those questions. They need a human, not a script.
- **20 of 73 have a recorded duration.** The rest do not state one, and none was
  invented.
- **23 have no grade band.** Track 301 is contested: two repositories say
  Grades 9–10, the website calls it "executive level", most say nothing.
- **This is a GitHub audit.** Materials in Drive, Slides or physical form are not
  represented, and the source model is built to accept them later.
