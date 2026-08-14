# Manifest spec and rollout

## The recommendation first

**Do not add a manifest file to fifty repositories.** The central registry is the
right home for almost everything BOW has today.

That is a conclusion from the account, not a general preference:

- Around fifty of the seventy-six experiences live in repositories that are
  finished artefacts — a single `index.html`, one squashed commit, no build, no
  tests, no ongoing development. A manifest there is a file nobody will ever
  update, in a repo nobody will ever reopen. It would go stale immediately and
  then lie.
- Several repositories hold multiple experiences (`GAUNTLET` four,
  `BSC-anythingelse` eight). One file per repo cannot describe them.
- One experience sometimes spans repositories, or is a spreadsheet, or is a
  PowerPoint. There is nowhere to put a manifest at all.
- Fifty pull requests across frozen repositories is real risk and real noise for
  no operational gain.

**Adopt the hybrid.** Manifests belong only where a repository has a *living*
development workflow — somewhere a manifest will be maintained as a matter of
course, and where the team would rather own their own metadata.

That is three repositories today:

| Repository | Why it qualifies |
| --- | --- |
| `bow-decision-challenges` | Active development, CI-adjacent tooling, already owns stable ids |
| `bow-finlit` | Five-job CI pipeline, active development |
| `BSC-HIGHWAY-WORLD` | Turborepo with CI guardrails and content-integrity contracts |

Everything else stays centrally described until it has a reason not to.

## The file

`bow.simulation.json`, at the repository root. Multi-simulation repositories use
an array under `simulations`.

```json
{
  "schemaVersion": 1,
  "simulations": [
    {
      "id": "plan-under-pressure",
      "title": "Plan Under Pressure",
      "aliases": ["BOW Decision Challenges: Plan Under Pressure"],
      "family": "decision-challenges",
      "pillar": "financial-literacy",
      "summary": "Build an eight-week plan for someone else's money, then repair it when week five breaks it.",
      "whatStudentsDo": "…",
      "concepts": ["fin.income-reliability", "fin.viable-budget"],
      "standards": [{ "framework": "NYSED Personal Finance", "objectiveId": "1.3", "strength": "primary" }],
      "gradeBands": ["6", "7", "8"],
      "gradeBandBasis": "stated-in-source",
      "purpose": { "primary": "EVIDENCE", "secondary": ["APPLY"] },
      "delivery": { "setting": ["facilitator-led"], "grouping": ["individual"], "mode": ["online"] },
      "duration": { "minMinutes": 12, "maxMinutes": 15, "sessions": 1, "basis": "stated-in-source" },
      "facilitation": { "required": true, "founderDependence": "any-instructor" },
      "technology": "React + Vite, no backend",
      "evidenceOutput": "structured-assessment",
      "studentDataProfile": { "storesStudentData": "no", "requiresLogin": "no" },
      "source": { "primary": { "type": "github", "repo": "braydenokley13-ux/bow-decision-challenges" } },
      "runResources": [{ "kind": "live-url", "label": "Play", "url": "https://…" }],
      "version": { "contentVersion": "2.1.0-mvp", "sourceRef": "ebfed08" }
    }
  ]
}
```

The object is exactly the `product` block of `schema/simulation.schema.json`,
plus the `id`. That is the whole design: **a manifest cannot express governance
fields at all**, so a repository has no way to declare itself Core, assign
itself an owner, or clear its own blockers. The boundary is structural, not a
policy someone has to remember.

## Rules

1. **`id` is permanent.** It is what BOW OS and the public site will reference.
   Never rename it. If a product is genuinely replaced, the new one gets a new
   id and the old record is marked `superseded`.
2. **Adopt ids that already exist.** `bow-decision-challenges` already owns
   `plan-under-pressure`. The Library uses that string. Inventing a parallel id
   for something already named is the worst outcome available.
3. **Concepts must resolve** against `data/concepts.json` or sync fails.
4. **Unknown is a valid answer.** Omit `gradeBands` rather than guessing. The
   schema requires a `basis` beside every number precisely so that fake
   precision is impossible to record accidentally.

## Sync

`product` is overwritten wholesale from the manifest; `governance` is never
touched. One writer per block, so there is no merge and no drift.

```
manifest → validate → replace product{} → leave governance{} → validate registry
```

Until that sync exists, the three flagship repositories are described centrally
like everything else. Adding manifests changes who maintains those records, not
what they say.
