# Adding a simulation, and moving it up

## Adding one

1. **Check it belongs.** `docs/inclusion-rule.md`. Ask what an instructor would
   assign — that is the unit, not the repository.
2. **Choose a permanent id.** kebab-case, descriptive, never reused. If the
   product already owns an id, use that one.
3. **Create `data/simulations/<id>.json`.** Copy the nearest existing record.
   Fill `product` from what you can actually see; leave anything you cannot
   establish out entirely.
4. **Set governance honestly.** New work starts at `EXPERIMENTAL` or `PLAYABLE`,
   `validation` at `unknown`, `owner.productOwner` at `UNOWNED` unless someone
   has actually agreed to own it.
5. **Record provenance.** `VERIFIED` if you read it, `INFERRED` if you reasoned
   it, `UNKNOWN` if you did not establish it. Put file paths in `evidence`.
6. `npm run validate` then `npm run build`.

The rule that matters: **an honest gap beats a confident guess.** A blank
duration tells an instructor "we do not know". A guessed one wastes their period.

## The lifecycle

```
EXPERIMENTAL → PLAYABLE → TESTED → BOW_APPROVED → CORE
```

1. Build it wherever suits it. The Library imposes no framework, no runtime, no
   visual style.
2. Assign a stable id and create the record. Do this early — it is cheap, and it
   stops the product becoming undiscoverable while it is still interesting.
3. Runs end to end → `PLAYABLE`.
4. **Run it with real students.** This is the only step that cannot be skipped
   or automated, and it is where every BOW product currently stops.
5. Record what happened: `validation.studentValidation`,
   `lastVerified.studentRun`, and `testedContentVersion` so a later rewrite
   cannot silently inherit the evidence. → `TESTED`
6. Name an owner, clear critical blockers, make sure a non-author can run it from
   the materials that exist. → `BOW_APPROVED`
7. Repeated successful use, and a non-founder instructor running it well. →
   `CORE`

Do not bureaucratise steps 1–3. Experimental work should be able to appear in
the Library the day it exists, marked for exactly what it is.

## Retiring one

Never delete a record.

- `hidden` — not offered to instructors, still visible internally.
- `superseded` — replaced. Set `supersededBy` to the successor's id; the
  validator checks it resolves.
- `archived` — historically interesting, not in service.

Three records are `superseded` today. Both `The Front Office` and its earlier
build remain publicly reachable on GitHub Pages, which means a student could
still land on the incomplete one. Marking the record is the Library's job;
retiring the deployment is BOW's.

## Reviewing a record

Ask, in this order:

1. Could an instructor run this from what is written here?
2. Is every number backed by a `basis`, or is it fake precision?
3. Does any `VERIFIED` claim have evidence beside it?
4. Has a governance field been set that only leadership should set?
5. Would the `knownBlockers` let someone else fix it, or just worry them?
