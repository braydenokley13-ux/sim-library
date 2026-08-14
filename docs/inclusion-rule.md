# What counts as a Library entry

The rule was written after the account was read, not before, and it was tested
against the awkward cases rather than the obvious ones.

## The rule

> A Library entry is a **student-facing learning experience** in which students
> make decisions inside a model that responds, and live with what follows.

Three parts, all required:

1. **Student-facing.** A student is the operator. A tool an instructor runs *about*
   students is not an entry.
2. **Decisions inside a responding model.** Choosing, allocating, negotiating,
   pricing, drafting, operating — and the thing pushes back. A page that explains
   a concept, however interactive its diagrams, is not an entry.
3. **Consequence.** The choice changes what happens next: a number moves, an
   option closes, a stakeholder reacts, a later round starts from a worse place.

The unit is the **experience**, never the repository. See "The unit" below.

## What this includes

- Browser simulations, whatever the framework — 3D worlds and single 70 KB HTML
  files sit side by side in this catalog on purpose.
- Spreadsheet simulations. Several BOW activities are Google Sheets driven by
  Apps Script, and they are as real as the React ones.
- Branching PowerPoint decks where the branching carries running state.
- Live, facilitated, multi-session experiences.
- Materials-only experiences, if one ever exists. Nothing in the schema requires code.
- Experiences that are broken today. `Structural Leverage SIM` cannot be opened
  because its entry point was deleted; it is still an entry, marked broken. A
  catalog that silently omits what is broken cannot be used to fix anything.

## What this excludes

Judged, not assumed — each of these was read before being excluded.

| Excluded | Why |
| --- | --- |
| Analytics and ML models (`Touch-Dependency-Model`, `Volatility_Model_NBA`, `SDO-MODEL-BOW`, and five more) | Enter data, receive a prediction. No sequence, no consequence, and the vocabulary assumes an analyst audience. |
| `bow-prospect-builder` | A Google Forms intake widget. The scouting engine its copy promises does not exist in the repository. |
| `Bow-Platform`, `Bow-Sports-Capital-Full-APP` | Delivery platforms that link to simulations. The shell is not the experience. |
| `Teacher Collector` inside `BSC-BUILDANALYTIC` | A facilitator dashboard. No student ever operates it. |
| `what-counts-as-best` | A genuinely good interactive investigation — but it is an IB Theory of Knowledge exercise on subjectivity in ranking, with no economics or financial-literacy content, aimed well above Grades 5–8. |
| `bernath-test-5` | A trigonometry RPG. No BOW, sports, economics or finance content anywhere in it. |
| `Advantage-*`, `upticklocal`, `CourtIQ`, `bow-scheduler` | Different ventures, or operations tooling. |
| Empty repositories (`101-M4-L2`, `TRACK201M2-SLIDES`, `AP-CHEM`, `kalshi-edge`) | No commits at all. |
| `201-M4-L1` | Contains only a PDF export of Google Form responses. |

Two exclusions are worth arguing about, and they are recorded here rather than
buried: `what-counts-as-best` is a better *experience* than several things that
were included, and it was excluded purely on subject and audience. If BOW's
pillars ever widen, it should be revisited first.

## The edge cases that shaped the rule

**A repo is not a simulation.** `GAUNTLET` holds four distinct experiences.
`BSC-anythingelse` holds eight. `BSC-pre-course` holds two unrelated ones — a
team platform and an orphaned single-player game its own README never mentions.
Meanwhile `201-M4-ECON` is a whole repository containing zero.

**Several files can be one simulation.** `201-M3-L2` has separate MLB, NBA and
NFL pages, but they share one state module, gate each other in sequence, and end
at one victory screen. One entry. `301-M1-L3` spans four HTML files that pass a
session between them. One entry. `301-M2-L1` has two byte-identical HTML files.
One entry, and a recorded blocker.

**Two media can be one simulation.** Roughly a dozen lessons ship both a browser
build and an Apps Script or workbook build of the same activity — often sharing
the same claim code, which is what settles it. One entry, with the second listed
as an additional source. Where the two builds are genuinely different designs,
they are split: `301-M4-L1` holds a clickable game *and* a reflective memo
exercise sharing one lesson slot, and those are two entries.

**One product can hold many rooms and still be one entry.** Highway World has
eleven missions, each individually addressable by URL and route-integrity
tested. It is still one entry, because only the curated hour is documented,
timed and scripted — the product supports assigning *it*, not a room. Plan Under
Pressure is one entry for the same reason: the challenge is the unit, and a
second story world would be a variant of it rather than a new experience.

**Boundary cases, included with the reasoning recorded.** `Model Risk & False
Confidence` is closer to a worked diagnostic quiz than a turn-based simulation,
and `The GM's Model` teaches evaluation bias rather than named economics
vocabulary. Both are in, because the decisions are genuine and the consequences
are real and delayed. Both carry a note saying they sit at the edge.

## Applying it to something new

Ask, in order:

1. Does a student operate it? If no — not an entry.
2. Do they decide something the system responds to? If no — not an entry.
3. Does the response change what comes next? If no, it is a demonstration, not
   a simulation.
4. Is this one experience or several? Ask what an instructor would *assign*. That
   is the unit, regardless of how the files are arranged.

If it passes and you are still unsure, add it with `confidence: INFERRED` and an
open question. An honest uncertain record is worth more than an omission.
