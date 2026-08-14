#!/usr/bin/env node
/* Runs every seed part, then writes one JSON file per simulation. */
import { RECORDS, OUT } from "./seed-registry.mjs";
import "./seed-data.mjs";
import "./seed-data-201.mjs";
import "./seed-data-301.mjs";
import "./seed-data-flagship.mjs";
import "./seed-data-standalone.mjs";
import { writeFileSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

for (const f of readdirSync(OUT)) if (f.endsWith(".json")) unlinkSync(join(OUT, f));
const seen = new Set();
for (const r of RECORDS) {
  if (seen.has(r.id)) throw new Error(`duplicate id in seed data: ${r.id}`);
  seen.add(r.id);
  writeFileSync(join(OUT, `${r.id}.json`), JSON.stringify(r, null, 2) + "\n");
}
console.log(`wrote ${RECORDS.length} simulation records`);
