# GitHub Pages sweep — 2026-08-16

Every repository in the braydenokley13-ux account probed at
`https://braydenokley13-ux.github.io/<repo>/`, following redirects, to answer one
question: does the registry know about every simulation that is actually
serving to the public?

It does. 47 of 78 repositories serve a live page. 44 are already recorded as
the host of a registry launch URL. The 3 that are not carry no registry record
at all, and none is a simulation:

| Repository | What is actually there |
| --- | --- |
| `Bow-Sports-Capital-Full-APP` | A Jekyll landing page describing the brand. No gameplay. |
| `Rookie-Performance-Prediction-Model` | "NBA Rookie Bust Predictor" — an analytics model, excluded by the inclusion rule along with the other `*-MODEL` repositories. |
| `what-counts-as-best` | Serves 200 with no title and no extractable content. |

One correction came out of the sweep. `entrepreneurship-lab-unit-economics`
was counted among the experiences with no deployment. It has one, at
`entrepuernurship/entrepeurneurship/`, and it is dead: the UI renders, a syntax
error stops every script, and Start Run plus all four strategy presets were
clicked in a browser without changing anything on the page. That moves the
repair from "build and deploy" to "fix a syntax error on something already
public".

## Raw result

```
  200 101-M1-ECON
  200 101-M2-ECON
  200 101-M2-L2
  200 101-M3-ECON
  200 101-M3-L1
  200 101-M3-L2
  200 101-M3-L3
  404 101-M4-ECON
  200 101-M4-L1
  404 101-M4-L2
  200 101-M4-L3
  404 101-pre-course
  404 201-M1-ECON
  200 201-M1-L2-Luxury-Tax-
  200 201-M2-ECON
  200 201-M2-L2
  200 201-M3-ECON
  200 201-M3-L1
  200 201-M3-L2
  200 201-M3-L3
  404 201-M4-ECON
  404 201-M4-L1
  200 201-M4-L2
  200 201-M4-L3
  200 301-M1-ECON
  200 301-M1-L1
  200 301-M1-L2
  200 301-M1-L3
  200 301-M2-ECON
  200 301-M2-L1
  200 301-M2-L2
  200 301-M2-L3
  200 301-M3-ECON
  404 301-M3-L1
  200 301-M3-L2
  404 301-M3-L3
  404 301-M4-ECON
  200 301-M4-L1
  200 301-M4-L2
  200 301-M4-L3
  404 AP-CHEM
  404 Adaptability-Model-NBA
  404 Advantage-Portal
  200 BSC-201-Capstone
  200 BSC-BUILDANALYTIC
  404 BSC-HIGHWAY-WORLD
  404 BSC-anythingelse
  200 BSC-pre-course
  404 Bow-Platform
  200 Bow-Sports-Capital-Full-APP
  404 CourtIQ
  200 Franchise-Sim
  200 GAUNTLET
  404 M1-201-FINAL
  404 M2-201-FINAL
  200 Rookie-Performance-Prediction-Model
  404 SDO-MODEL-BOW
  200 T101-M1-L1
  200 T101-M1-L2
  200 T101-M2-L1
  200 T201-M1-L1
  200 T201-M1-L2
  200 T201-M2-L1
  404 TPHM-MODEL
  404 TRACK201M2-SLIDES
  404 Touch-Dependency-Model
  404 advantage-calendar
  404 bow-decision-challenges
  404 bow-finlit
  404 bow-prospect-builder
  404 bow-scheduler
  404 bow-universe
  404 entrepuernurship
  404 kalshi-edge
  200 league-in-a-box
  200 scout-model
  404 upticklocal
  200 what-counts-as-best
```
