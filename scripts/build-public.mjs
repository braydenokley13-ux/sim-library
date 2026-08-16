#!/usr/bin/env node
/**
 * Builds the PUBLIC payload — the only artefact from this repo that is safe to
 * put on a public host.
 *
 * `app/index.html` is an internal tool. It inlines the whole registry, including
 * owner gaps, known blockers, validation history and leadership notes. Publishing
 * it would publish all of that. The guard for that must be a separate build, not
 * a label in a header, so this script exists and app/ never leaves the intranet.
 *
 * Rules, enforced here rather than assumed:
 *   - eligibility comes from scripts/public-readiness.mjs and nowhere else
 *   - only `product` fields, and only the subset a public page needs
 *   - never any governance or provenance field, whatever its value
 *   - never a maturity word BOW has not earned
 *
 * Run: node scripts/build-public.mjs
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { partition, PUBLIC_LABEL, PUBLIC_LABEL_MEANING, IN_DEVELOPMENT_LABEL, FORBIDDEN_PUBLIC_WORDS } from "./public-readiness.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const OUT_DIR = join(ROOT, "public");
mkdirSync(OUT_DIR, { recursive: true });

const concepts = JSON.parse(readFileSync(join(ROOT, "data", "concepts.json"), "utf8"));
const conceptName = Object.fromEntries(concepts.concepts.map((c) => [c.id, c.name]));

const all = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")));

// ── public vocabulary ────────────────────────────────────────────────────────
// The registry's internal ids are not visitor-facing language. `track-301` means
// nothing to a teacher; "Track 301 · Advanced" does.
const TRACKS = {
  "track-101": { name: "Track 101", note: "Foundations" },
  "track-201": { name: "Track 201", note: "Intermediate" },
  "track-301": { name: "Track 301", note: "Advanced" },
  "pre-course": { name: "Pre-Course", note: "Getting started" },
  gauntlet: { name: "The Gauntlet", note: "Economics challenge ladder" },
  "analytics-lab": { name: "Analytics Lab", note: "Build and test a metric" },
  "bonus-gm-sims": { name: "GM Sims", note: "Standalone front-office games" },
  "highway-world": { name: "Highway World", note: "3D sports-business city" },
  "front-office-city": { name: "Front Office City", note: "3D sports-business city" },
  "decision-challenges": { name: "Decision Challenges", note: "Financial-literacy scenarios" },
  "entrepreneurship-lab": { name: "Entrepreneurship Lab", note: "Unit economics" },
  "sports-agency": { name: "Sports Agency", note: "Agent-side negotiation" },
  "bow-universe": { name: "BOW Universe", note: "League rule modelling" },
  "bow-website": { name: "BOW Site", note: "Runs on bowsportscapital.com" },
};

const CONTEXT_NAMES = {
  basketball: "Basketball",
  football: "Football",
  baseball: "Baseball",
  "multi-sport": "Multi-sport",
  "sports-front-office": "Front office & GM",
  business: "Running a business",
  "city-and-policy": "Cities & policy",
  investing: "Investing",
  "media-and-brand": "Media & brand",
  "personal-finance": "Personal finance",
};

const PILLARS = {
  economics: "Economics",
  "financial-literacy": "Financial literacy",
  "cross-pillar": "Economics & financial literacy",
};

const SETTINGS = {
  "self-guided": "Students can run it alone",
  "facilitator-led": "Led by an instructor",
  "whole-class": "Run with the whole class",
  hybrid: "Works either way",
};

const GROUPINGS = { individual: "Individually", pairs: "In pairs", teams: "In teams", "whole-class": "As a class" };

// ── derived, visitor-facing fields ───────────────────────────────────────────

/** A teacher thinks in periods, not minutes. Buckets, plus the real number. */
const durationBucket = (d) => {
  if (!d) return null;
  const mins = d.minutes ?? d.maxMinutes ?? d.minMinutes;
  if (mins == null) return d.sessions > 1 ? "multi-session" : null;
  if (d.sessions > 1) return "multi-session";
  if (mins <= 20) return "under-20";
  if (mins <= 45) return "20-45";
  if (mins <= 90) return "45-90";
  return "multi-session";
};

const durationLabel = (d) => {
  if (!d) return null;
  const { minutes, minMinutes, maxMinutes, sessions } = d;
  const span = minutes != null ? `${minutes} min`
    : minMinutes != null && maxMinutes != null ? `${minMinutes}–${maxMinutes} min`
    : minMinutes != null ? `${minMinutes}+ min`
    : maxMinutes != null ? `up to ${maxMinutes} min` : null;
  if (sessions > 1) return span ? `${sessions} sessions · ${span}` : `${sessions} sessions`;
  return span;
};

const gradeLabel = (bands) => {
  if (!bands?.length) return null;
  const n = bands.map(Number).sort((a, b) => a - b);
  return n.length === 1 ? `Grade ${n[0]}` : `Grades ${n[0]}–${n[n.length - 1]}`;
};

/**
 * What an instructor has to bring. This is the question that decides whether a
 * simulation gets used on a Tuesday, and it is stated plainly rather than as an
 * enum a teacher would have to decode.
 */
const instructorNeed = (p) => {
  const f = p.facilitation ?? {};
  const selfGuided = (p.delivery.setting ?? []).includes("self-guided");
  if (f.required === true) return "An instructor runs this one";
  switch (f.founderDependence) {
    case "self-guided": return "No instructor needed";
    case "any-instructor": return "Any instructor can run it";
    case "bow-certified-instructor": return "Needs a BOW-trained instructor";
    case "experienced-facilitator": return "Needs an experienced facilitator";
    case "founder-required": return "Currently run by BOW directly";
    default: return selfGuided ? "Students can start on their own" : "Instructor guidance recommended";
  }
};

const deviceNeed = (p) => p.delivery.devices ?? null;

// ── the allowlist ────────────────────────────────────────────────────────────
// A field added to the schema later is excluded by default rather than published
// by accident. Everything below is drawn from `product` only.
const publish = ({ rec, verdict }) => {
  const p = rec.product;
  const track = TRACKS[p.family] ?? null;
  return {
    id: rec.id,
    title: p.title,
    summary: p.summary,
    whatStudentsDo: p.whatStudentsDo,

    track: track ? { id: p.family, name: track.name, note: track.note } : null,
    subject: { id: p.pillar, name: PILLARS[p.pillar] ?? p.pillar },
    concepts: p.concepts.map((c) => ({ id: c, name: conceptName[c] ?? c })),
    contexts: (p.contexts ?? []).map((c) => ({ id: c, name: CONTEXT_NAMES[c] ?? c })),

    gradeBands: p.gradeBands ?? [],
    gradeLabel: gradeLabel(p.gradeBands),

    durationBucket: durationBucket(p.duration),
    durationLabel: durationLabel(p.duration),

    format: {
      setting: (p.delivery.setting ?? []).map((s) => ({ id: s, name: SETTINGS[s] ?? s })),
      grouping: (p.delivery.grouping ?? []).map((g) => ({ id: g, name: GROUPINGS[g] ?? g })),
      devices: deviceNeed(p),
    },
    instructorNeed: instructorNeed(p),

    availability: verdict.state,
    label: verdict.state === "available" ? PUBLIC_LABEL : IN_DEVELOPMENT_LABEL,
    playUrl: verdict.launchUrl,

    // Curation is the only editorial opinion that reaches the public site, and
    // it answers a question readiness cannot: of the things that open, which
    // should a teacher try first? It is published only for records that
    // actually launch, so a tier can never point a visitor at a dead end, and
    // only for the three tiers that mean "try this" — HOLD, REBUILD and
    // ARCHIVE are internal decisions and would read publicly as a verdict on
    // work BOW is still standing behind.
    tier:
      verdict.state === "available" &&
      ["FLAGSHIP", "RECOMMENDED", "EXPERIMENTAL"].includes(rec.governance?.curation?.tier)
        ? rec.governance.curation.tier
        : null,

    educatorResources: (p.runResources ?? [])
      .filter((r) => ["facilitator-guide", "slides", "printable", "setup-checklist", "debrief-guide"].includes(r.kind) && r.url)
      .map((r) => ({ kind: r.kind, label: r.label, url: r.url })),
  };
};

const { included, excluded } = partition(all);
const simulations = included.map(publish);

const payload = {
  generated: new Date().toISOString().slice(0, 10),
  label: { name: PUBLIC_LABEL, meaning: PUBLIC_LABEL_MEANING },
  simulations,
};

// ── the leakage gate ─────────────────────────────────────────────────────────
// Belt and braces. Two independent failure modes are checked separately: an
// internal STRUCTURE escaping, and an unearned maturity WORD escaping.
const serialized = JSON.stringify(payload);

const BANNED_KEYS = ["governance", "provenance", "publicRelease", "owner", "productOwner", "knownBlockers", "validation", "maturity", "maturityBasis", "health", "technicalBasis", "evidence", "notes", "blockers", "lastVerified", "openQuestions", "discoveredBy", "supersededBy", "visibility", "source", "repo"];
for (const k of BANNED_KEYS) {
  if (serialized.includes(`"${k}"`)) {
    console.error(`REFUSING TO WRITE: internal key "${k}" appeared in the public payload.`);
    process.exit(1);
  }
}

// No record may be described to the public with a word BOW has not earned. This
// checks VALUES, not keys — a summary reading "a tested classroom favourite"
// would be just as false as a maturity field.
for (const sim of simulations) {
  const prose = [sim.title, sim.summary, sim.whatStudentsDo, sim.label, sim.instructorNeed].join(" ").toLowerCase();
  for (const w of FORBIDDEN_PUBLIC_WORDS) {
    if (new RegExp(`\\b${w}\\b`).test(prose)) {
      console.error(`REFUSING TO WRITE: ${sim.id} uses the unearned public word "${w}".`);
      console.error(`  No student validation is recorded anywhere in the registry, so nothing may claim it.`);
      process.exit(1);
    }
  }
}

// Every card must be able to do the one thing its own state promises. The two
// halves of this are the contradiction the public library exists to avoid:
// "Play now" with nothing behind it, and "In development" beside a live link.
for (const sim of simulations) {
  if (sim.availability === "available") {
    if (!sim.playUrl || !/^https:\/\//.test(sim.playUrl)) {
      console.error(`REFUSING TO WRITE: ${sim.id} says available but has no usable https launch URL.`);
      process.exit(1);
    }
    if (/github\.com/.test(sim.playUrl)) {
      console.error(`REFUSING TO WRITE: ${sim.id} presents a repository URL as a playable experience.`);
      process.exit(1);
    }
  } else if (sim.playUrl) {
    console.error(`REFUSING TO WRITE: ${sim.id} says "${sim.availability}" but carries a launch URL.`);
    process.exit(1);
  }
}

writeFileSync(join(OUT_DIR, "simulations.json"), JSON.stringify(payload, null, 2) + "\n");

// ── the exclusion ledger ─────────────────────────────────────────────────────
// Excluded is not the same as forgotten. This is written next to the payload so
// the question "why isn't X on the site?" always has a checked-in answer.
const ledger = {
  generated: payload.generated,
  totals: { records: all.length, included: included.length, excluded: excluded.length },
  excluded: excluded.map(({ rec, verdict }) => ({ id: rec.id, title: rec.product.title, reason: verdict.reason })),
};
writeFileSync(join(OUT_DIR, "exclusions.json"), JSON.stringify(ledger, null, 2) + "\n");

const nAvailable = simulations.filter((s) => s.availability === "available").length;
console.log(`public/simulations.json: ${included.length} of ${all.length} records published — ${nAvailable} "${PUBLIC_LABEL}" and ready to play, ${included.length - nAvailable} "${IN_DEVELOPMENT_LABEL}".`);
const byReason = {};
for (const { verdict } of excluded) byReason[verdict.reason] = (byReason[verdict.reason] ?? 0) + 1;
console.log(`public/exclusions.json: ${excluded.length} held back —`, byReason);
