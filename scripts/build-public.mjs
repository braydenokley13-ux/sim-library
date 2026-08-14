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
 *   - only records with governance.publicListing === true
 *   - only records with visibility "active"
 *   - only `product` fields, and only the subset a public page needs
 *   - never any governance or provenance field, whatever its value
 *
 * Run: node scripts/build-public.mjs
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const OUT_DIR = join(ROOT, "public");
mkdirSync(OUT_DIR, { recursive: true });

const concepts = JSON.parse(readFileSync(join(ROOT, "data", "concepts.json"), "utf8"));
const conceptName = Object.fromEntries(concepts.concepts.map((c) => [c.id, c.name]));

const all = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")));

const eligible = all.filter((s) => s.governance.publicListing === true && s.governance.visibility === "active");

// An explicit allowlist. A field added to the schema later is excluded by
// default rather than published by accident.
const publish = (s) => {
  const p = s.product;
  const launch = (p.runResources ?? []).find((r) => r.kind === "live-url" && r.url);
  return {
    id: s.id,
    title: p.title,
    summary: p.summary,
    whatStudentsDo: p.whatStudentsDo,
    pillar: p.pillar,
    concepts: p.concepts.map((c) => ({ id: c, name: conceptName[c] ?? c })),
    gradeBands: p.gradeBands ?? [],
    duration: p.duration ? { minutes: p.duration.minutes, minMinutes: p.duration.minMinutes, maxMinutes: p.duration.maxMinutes, sessions: p.duration.sessions } : null,
    delivery: { setting: p.delivery.setting, grouping: p.delivery.grouping },
    playUrl: launch?.url ?? null,
    educatorResources: (p.runResources ?? [])
      .filter((r) => ["facilitator-guide", "slides", "printable", "setup-checklist", "debrief-guide"].includes(r.kind) && r.url)
      .map((r) => ({ kind: r.kind, label: r.label, url: r.url })),
  };
};

const payload = { generated: new Date().toISOString().slice(0, 10), simulations: eligible.map(publish) };

// Belt and braces: refuse to emit anything carrying an internal-only key.
const BANNED = ["governance", "provenance", "owner", "knownBlockers", "validation", "maturity", "health", "evidence", "notes", "blockers"];
const serialized = JSON.stringify(payload);
for (const k of BANNED) {
  if (serialized.includes(`"${k}"`)) {
    console.error(`REFUSING TO WRITE: internal key "${k}" appeared in the public payload.`);
    process.exit(1);
  }
}

writeFileSync(join(OUT_DIR, "simulations.json"), JSON.stringify(payload, null, 2) + "\n");
console.log(`public/simulations.json: ${payload.simulations.length} of ${all.length} records published.`);
if (!payload.simulations.length) {
  console.log("Nothing is flagged for public listing yet. governance.publicListing is false everywhere,");
  console.log("and the validator will not allow it to be true on anything below TESTED.");
}
