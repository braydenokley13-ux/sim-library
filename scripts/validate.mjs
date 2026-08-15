#!/usr/bin/env node
/**
 * BOW Simulation Library — registry validator.
 *
 * Fails loudly on malformed records. Never silently discards unknown metadata:
 * the schemas are additionalProperties:false, so an unrecognised field is an
 * error the author sees, not data that quietly disappears.
 *
 * Run: node scripts/validate.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");

const errors = [];
const warnings = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const isNonEmptyString = (s) => typeof s === "string" && s.trim().length > 0;

// ── load schemas + concept taxonomy ──────────────────────────────────────────
const simSchema = readJson(join(ROOT, "schema", "simulation.schema.json"));
const concepts = readJson(join(ROOT, "data", "concepts.json"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateSim = ajv.compile(simSchema);

const conceptIds = new Set(concepts.concepts.map((c) => c.id));
const conceptAliasOwner = new Map();
for (const c of concepts.concepts) {
  for (const a of c.aliases ?? []) {
    const key = a.toLowerCase();
    if (conceptAliasOwner.has(key) && conceptAliasOwner.get(key) !== c.id) {
      fail("data/concepts.json", `alias "${a}" is claimed by both ${conceptAliasOwner.get(key)} and ${c.id}`);
    }
    conceptAliasOwner.set(key, c.id);
  }
  if (conceptIds.has(c.id) === false) fail("data/concepts.json", `concept id missing: ${c.id}`);
}
// duplicate concept ids
{
  const seen = new Set();
  for (const c of concepts.concepts) {
    if (seen.has(c.id)) fail("data/concepts.json", `duplicate concept id: ${c.id}`);
    seen.add(c.id);
  }
}

// ── load simulation records ──────────────────────────────────────────────────
if (!existsSync(SIM_DIR)) {
  console.error("No data/simulations directory.");
  process.exit(1);
}
const files = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json")).sort();
const records = [];
for (const f of files) {
  let rec;
  try {
    rec = readJson(join(SIM_DIR, f));
  } catch (e) {
    fail(f, `unparseable JSON — ${e.message}`);
    continue;
  }
  records.push({ file: f, rec });
}

// ── per-record checks ────────────────────────────────────────────────────────
const idToFile = new Map();
const VALID_MATURITY = ["EXPERIMENTAL", "PLAYABLE", "TESTED", "BOW_APPROVED", "CORE"];

for (const { file, rec } of records) {
  // 1. schema conformance (covers required fields, enums, unknown schemaVersion,
  //    invalid maturity/grade bands, malformed structures)
  if (!validateSim(rec)) {
    for (const e of validateSim.errors) fail(file, `schema ${e.instancePath || "/"} ${e.message}`);
    continue; // downstream checks assume shape
  }

  const { id, product: p, governance: g } = rec;

  // 2. duplicate simulation ids
  if (idToFile.has(id)) fail(file, `duplicate simulation id "${id}" (also in ${idToFile.get(id)})`);
  idToFile.set(id, file);

  // 3. filename must match id — keeps the registry navigable
  if (file !== `${id}.json`) fail(file, `filename must be ${id}.json`);

  // 4. concept ids must resolve
  for (const c of p.concepts) {
    if (!conceptIds.has(c)) {
      const guess = conceptAliasOwner.get(c.toLowerCase());
      fail(file, `unknown concept "${c}"${guess ? ` — did you mean "${guess}"?` : ""}`);
    }
  }
  if (new Set(p.concepts).size !== p.concepts.length) fail(file, "duplicate concept ids");

  // 5. duration sanity — a number without a basis is fake precision
  const d = p.duration;
  if (d) {
    const hasNumber = d.minutes != null || d.minMinutes != null || d.maxMinutes != null;
    if (hasNumber && !d.basis) fail(file, "duration has a number but no basis — state where it came from");
    if (d.basis === "unknown" && hasNumber) fail(file, 'duration basis "unknown" cannot accompany a number');
    if (d.minMinutes != null && d.maxMinutes != null && d.minMinutes > d.maxMinutes)
      fail(file, `duration minMinutes ${d.minMinutes} > maxMinutes ${d.maxMinutes}`);
    if (d.minutes != null && (d.minutes < 3 || d.minutes > 2400))
      warn(file, `duration ${d.minutes}min is implausible for a classroom experience`);
    if (d.sessions != null && d.sessions > 1 && !p.delivery.mode?.length)
      warn(file, "multi-session experience with no delivery.mode recorded");
  }

  // 6. grade bands — present without a basis, or a basis claiming a source that isn't there
  if (p.gradeBands?.length && !p.gradeBandBasis)
    fail(file, "gradeBands set without gradeBandBasis — say whether it is stated or conventional");
  if (p.gradeBandBasis === "unknown" && p.gradeBands?.length)
    fail(file, 'gradeBandBasis "unknown" cannot accompany gradeBands');

  // 6b. contexts, like grade bands, must say where they came from
  if (p.contexts?.length && !p.contextBasis)
    fail(file, "contexts set without contextBasis — say whether it is stated in the source or editorial");
  if (p.contextBasis === "unknown" && p.contexts?.length)
    fail(file, 'contextBasis "unknown" cannot accompany contexts');
  if (p.contexts && new Set(p.contexts).size !== p.contexts.length)
    fail(file, "duplicate contexts");

  // 7. source references must be coherent for their type
  const checkSource = (s, where) => {
    if (s.type === "github" && !s.repo) fail(file, `${where}: github source needs repo`);
    if (s.type === "github" && s.repo && !/^[\w.-]+\/[\w.-]+$/.test(s.repo))
      fail(file, `${where}: repo "${s.repo}" is not owner/name`);
    if ((s.type === "live-site" || s.type === "external") && !s.url)
      fail(file, `${where}: ${s.type} source needs url`);
    // Every source must say where the thing actually is. A Drive or physical
    // source with no locator looks complete and points nowhere.
    if (!s.repo && !s.url && !s.path && !s.note)
      fail(file, `${where}: ${s.type} source has no locator — give a url, path or note`);
    if (s.url && !/^https?:\/\//.test(s.url)) fail(file, `${where}: malformed url "${s.url}"`);
  };
  checkSource(p.source.primary, "source.primary");
  (p.source.additional ?? []).forEach((s, i) => checkSource(s, `source.additional[${i}]`));

  // 8. run resource URLs
  for (const r of p.runResources ?? []) {
    if (r.url && !/^https?:\/\//.test(r.url)) fail(file, `runResource "${r.label}" malformed url`);
    if (!r.url && !r.path) fail(file, `runResource "${r.label}" has neither url nor path`);
  }

  // 9. maturity claims must be earned — this is the integrity core of the model
  const v = g.validation ?? {};
  if (["TESTED", "BOW_APPROVED", "CORE"].includes(g.maturity)) {
    if (!["once", "repeated"].includes(v.studentValidation))
      fail(file, `maturity ${g.maturity} requires governance.validation.studentValidation of "once" or "repeated" (found "${v.studentValidation ?? "unset"}")`);
  }
  if (["BOW_APPROVED", "CORE"].includes(g.maturity)) {
    if (g.health.technical === "broken")
      fail(file, `maturity ${g.maturity} cannot have technical health "broken"`);
    if (!g.owner?.productOwner || g.owner.productOwner === "UNOWNED")
      fail(file, `maturity ${g.maturity} requires a named product owner`);
    const hasRunResource = (p.runResources ?? []).length > 0;
    if (!hasRunResource) fail(file, `maturity ${g.maturity} requires at least one runResource — an instructor must be able to actually run it`);
  }
  if (g.maturity === "CORE" && v.studentValidation !== "repeated")
    fail(file, 'maturity CORE requires studentValidation "repeated"');
  if (g.maturity === "CORE" && !["bow-instructor", "external-educator"].includes(v.facilitatorValidation ?? ""))
    fail(file, "maturity CORE requires facilitator transfer beyond the founder");
  if (!g.maturityBasis) warn(file, `maturity ${g.maturity} has no maturityBasis recorded`);

  // 10. superseded records must point somewhere real (checked cross-record below)
  if (g.visibility === "superseded" && !g.supersededBy)
    fail(file, 'visibility "superseded" requires supersededBy');
  if (g.supersededBy && g.visibility !== "superseded")
    warn(file, "supersededBy set but visibility is not superseded");

  // 11. public release is COMPUTED (scripts/public-readiness.mjs), not declared.
  //     The only thing a human may write here is a veto, and a veto without a
  //     stated reason is indistinguishable from an accident.
  if (g.publicRelease?.hold === true && !isNonEmptyString(g.publicRelease.holdReason))
    fail(file, "publicRelease.hold is true without a holdReason — say why it is being kept off the public site");
  if (g.publicRelease && g.publicRelease.hold !== true && g.publicRelease.holdReason)
    warn(file, "publicRelease.holdReason is set but hold is not true — the record will be published");

  // 12. dated fields must be real dates, not in the future
  const today = new Date().toISOString().slice(0, 10);
  for (const [k, val] of Object.entries(g.lastVerified ?? {})) {
    if (k === "testedContentVersion") continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) fail(file, `lastVerified.${k} "${val}" is not YYYY-MM-DD`);
    else if (val > today) fail(file, `lastVerified.${k} "${val}" is in the future`);
  }

  // 13. tested-version guard — stops "tested last year" on a since-rewritten product
  if (["once", "repeated"].includes(v.studentValidation) && !g.lastVerified?.testedContentVersion)
    fail(file, "a student run is claimed but testedContentVersion is not recorded — the Library could not say which version was actually tested");

  // 14. provenance honesty
  if (rec.provenance?.confidence === "VERIFIED" && !(rec.provenance.evidence?.length > 20))
    fail(file, "provenance claims VERIFIED without substantive evidence");
}

// ── cross-record checks ──────────────────────────────────────────────────────
for (const { file, rec } of records) {
  const sb = rec.governance?.supersededBy;
  if (sb && !idToFile.has(sb)) fail(file, `supersededBy "${sb}" is not a known simulation id`);
}

// family values are free text; a near-duplicate silently splits a bucket in the catalog
{
  const fams = new Map();
  for (const { file, rec } of records) {
    const f = rec.product?.family;
    if (!f) continue;
    const norm = f.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (fams.has(norm) && fams.get(norm) !== f) warn(file, `family "${f}" looks like a variant of "${fams.get(norm)}"`);
    else fams.set(norm, f);
  }
}

// concepts with no active simulation — reported, never fatal (this is the gap map)
const used = new Set();
for (const { rec } of records) {
  if (rec.governance?.visibility === "active") for (const c of rec.product?.concepts ?? []) used.add(c);
}
const uncovered = [...conceptIds].filter((c) => !used.has(c));

// ── report ───────────────────────────────────────────────────────────────────
console.log(`Checked ${records.length} simulation records against ${conceptIds.size} canonical concepts.\n`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ~ ${w}`);
  console.log("");
}
if (uncovered.length) {
  console.log(`Concepts with no active simulation (${uncovered.length}/${conceptIds.size}): ${uncovered.join(", ")}\n`);
}
if (errors.length) {
  console.error(`FAILED — ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("Registry valid.");
