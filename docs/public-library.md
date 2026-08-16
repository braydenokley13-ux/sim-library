# The public library

What a stranger sees, why each thing is there, and what has to be true before
anything else joins it.

---

## Two questions, kept apart

The registry answers a strict question about every simulation: *how much does
BOW vouch for this?* That is `maturity`, it is earned rather than typed, and the
validator enforces every gate on it.

The public site asks a different and much smaller question: *is this safe and
sensible for a stranger to click?*

These were originally the same gate, and the result was a public library that
could never contain anything. Publication required `TESTED`; `TESTED` requires a
recorded student run; no BOW simulation has one. So a maturity-gated public site
was structurally empty however well the simulations actually ran — 45 working
experiences invisible behind a rule about pedagogy that none of them had failed,
because none of them had been asked.

A visitor clicking **Launch** is not asking whether BOW has validated the
learning outcomes. They are asking whether a page opens and does something. So:

| Question | Answered by | Character |
| --- | --- | --- |
| How much does BOW vouch for this? | `governance.maturity` | earned, slow, strict — unchanged |
| Is this safe and sensible to click? | `scripts/public-readiness.mjs` | computed, mechanical |

Maturity did not move. Nothing was downgraded, loosened or renamed to make the
public site possible.

## The readiness gate

Computed in one place, from observable facts only:

1. `visibility` is `active` — superseded and archived builds are never shown.
2. No `publicRelease.hold` — see below.
3. A `live-url` run resource exists. A `repo` resource is **not** a launch:
   sending a teacher to source code and calling it Play is the precise failure
   this registry exists to prevent.
4. That URL carries a `verified` date, so it has actually been probed.
5. `health.technical` is `healthy`. Resolving is not the same as working.
6. `summary` and `whatStudentsDo` are substantial enough that a visitor knows
   what they are opening before they click.
7. `studentDataProfile.storesStudentData` is `no`.

Rule 7 is the one that is easy to skip and shouldn't be. A public Launch button
is an **unsupervised link**: a child can follow it from a marketing page with no
teacher, no consent and no class context. A simulation that records or transmits
their data is a different proposition from one that does not, and that is a
decision for someone who understands BOW's obligations to children — not for a
build script that noticed the page loads. `unknown` is treated the same as
`yes`, because an unanswered question about children's data is not a "no".

The rule applies to launch actions, not to listings. An in-development card
carries no link at all, so there is nothing for a child to reach.

**Nothing can be hand-promoted.** There is no field a record can set to force
its way onto the public site. The only human input is a veto:

- `governance.publicRelease.hold` — keep this off the site. Must state a
  `holdReason`, because a veto without a reason is indistinguishable from an
  accident.

## The two public states

| State | Card shows | Launch action |
| --- | --- | --- |
| `available` | **Beta** | a Launch button |
| `in-development` | **In development** | none at all |

The second is opt-in (`publicRelease.preview`, which must state a
`previewReason`) and exists so BOW can show work that is genuinely underway —
Highway World, Front Office City — without either hiding it or faking a link.

The rule that makes it safe is structural rather than procedural: **a record
flagged for preview must have no live URL at all.** There is therefore no path
where "In development" appears beside a working link, and none where a dead
button can appear. Both the gate and the validator refuse the combination, and
`tests/public.test.mjs` asserts it against the built payload.

Note what is *not* used: a disabled button. A greyed-out control still reads as
a promise. Plain text does not.

## Why everything says Beta

Because no BOW simulation has been studied with a class, and saying anything
stronger would be false.

`Tested`, `Validated`, `Proven` and `Core` are refused in public output by
`build-public.mjs` — checked against **values**, not just field names, so a
summary reading "our proven classroom favourite" fails the build exactly as a
maturity field would. The internal ladder still uses those words; they simply
cannot cross the boundary until they are earned.

Beta is defined for the reader on the page itself: *built and playable, free to
try, not yet studied in a classroom.*

## Track 301

Track 301 is a real, active BOW product. One of its repositories holds
configuration and no gameplay, and an early reading of the audit let that single
thin repo colour the whole track.

The Library keeps the two questions separate, because both halves are true at
once:

- **The track** is stated as in development, explicitly, in the Programs strip.
- **The simulations inside it** are counted from what actually launches today.

So Track 301 reads *"In development — 13 ready to play"*, which is precisely
what is true. A track's status is a fact about the product; a simulation's
status is a fact about that build. Neither is allowed to overwrite the other,
and `tests/website/simulation-library.test.ts` in the website repo asserts both
halves.

## What is published today

Run `npm run build:public` for current numbers. At the last build:

- **41** playable, labelled Beta
- **8** in development, with no launch action
- **27** held back entirely — every one of them accounted for in
  `docs/work-queue.md` and `public/exclusions.json`

Excluded is not the same as forgotten. The exclusion ledger is written next to
the payload so "why isn't X on the site?" always has a checked-in answer.

## Verifying it

```bash
npm run check        # validate, test, build the payload and the page
npm run verify       # open every launch URL and prove it is playable
```

`scripts/verify-launch.mjs` is the one that matters for launch truth. A `200` is
returned by a GitHub repo page, a sign-in wall, a directory index, and a build
whose bundle 404s so the page renders blank — so it fetches each page and checks
for all of those, follows one hop when a simulation opens on a hub page, and
exits non-zero if any **published** record fails. It caught a published
simulation whose GitHub Pages deployment had gone away since the audit.

## Where it appears

- `public/index.html` — a self-contained page. Works from disk or any static
  host. Fonts are embedded rather than linked, so a student browser makes no
  third-party request.
- `bowsportscapital.com/simulations` — the Next.js route, in the website repo.
  It consumes `public/simulations.json`, never `data/simulations/*.json`.

### Adding it to the site navigation

The website's nav is CMS-driven (`navMenuData`, empty by default), so it cannot
be added in code. In the admin, add a **Programs** dropdown:

| Label | Href |
| --- | --- |
| Classes | `/programs` |
| Simulations | `/simulations` |
| Concept Map | `/concept-map` |
| Glossary | `/glossary` |

The last two are finished, live, and currently reachable from nowhere on the
site, so the same change fixes three orphans at once.
