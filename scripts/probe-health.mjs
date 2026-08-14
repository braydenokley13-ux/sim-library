#!/usr/bin/env node
/**
 * BOW Simulation Library — reachability probe.
 *
 * The registry's one automatable health signal: can an instructor actually open
 * the thing? Everything else about health (did students run it, is it any good)
 * needs a human, and this script never pretends otherwise.
 *
 *   node scripts/probe-health.mjs           # report only
 *   node scripts/probe-health.mjs --write   # also stamp governance.lastVerified.technical
 *
 * --write only ever touches lastVerified.technical and health.technical/technicalBasis.
 * It will not invent maturity, ownership, or student-run history.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const WRITE = process.argv.includes("--write");
const TODAY = new Date().toISOString().slice(0, 10);

const probe = async (url) => {
  for (const method of ["HEAD", "GET"]) {
    try {
      const ctl = AbortSignal.timeout(15000);
      const res = await fetch(url, { method, redirect: "follow", signal: ctl });
      if (res.status !== 405) return res.status;
    } catch (e) {
      if (method === "GET") return `ERR ${e.name}`;
    }
  }
  return "ERR";
};

const files = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json")).sort();
const rows = [];
let changed = 0;

for (const f of files) {
  const path = join(SIM_DIR, f);
  const rec = JSON.parse(readFileSync(path, "utf8"));
  // Only a launch surface tells us anything about health. A repository URL
  // resolving says nothing about whether the simulation runs, so probing it
  // would manufacture exactly the false confidence this registry exists to avoid.
  const urls = (rec.product.runResources ?? [])
    .filter((r) => r.url && (r.kind === "live-url" || r.kind === "create-class-url"))
    .map((r) => ({ label: r.kind, url: r.url }));

  if (!urls.length) {
    rows.push({ id: rec.id, status: "not-probeable", detail: "no launch URL — health must be set by a human" });
    continue; // never written, even with --write
  }

  const results = [];
  for (const u of urls) results.push({ ...u, status: await probe(u.url) });

  const allOk = results.every((r) => r.status === 200);
  const anyOk = results.some((r) => r.status === 200);
  const technical = allOk ? "healthy" : anyOk ? "needs-attention" : "broken";

  rows.push({
    id: rec.id,
    status: technical,
    detail: results.map((r) => `${r.label}:${r.status}`).join(" "),
  });

  if (WRITE) {
    const g = rec.governance;
    const prev = g.health.technical;
    g.health.technical = technical;
    g.health.technicalBasis = `Automated reachability probe ${TODAY}: ${results.map((r) => `${r.label} ${r.status}`).join(", ")}. Reachability only — not an assessment of educational quality.`;
    g.lastVerified = { ...(g.lastVerified ?? {}), technical: TODAY };
    writeFileSync(path, JSON.stringify(rec, null, 2) + "\n");
    if (prev !== technical) changed++;
  }
}

const w = Math.max(...rows.map((r) => r.id.length), 4);
for (const r of rows) console.log(`${r.status.padEnd(15)} ${r.id.padEnd(w)}  ${r.detail}`);

const tally = rows.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }), {});
console.log(`\n${rows.length} records — ${Object.entries(tally).map(([k, v]) => `${k}: ${v}`).join(", ")}`);
if (WRITE) console.log(`Wrote technical health to all records (${changed} changed).`);
else console.log("Report only. Pass --write to stamp governance.lastVerified.technical.");
