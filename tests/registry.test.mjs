/**
 * Integrity tests for the registry. These guard the properties that make the
 * catalog trustworthy — mostly by asserting that it cannot claim more than it knows.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const files = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json"));
const sims = files.map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")));
const concepts = JSON.parse(readFileSync(join(ROOT, "data", "concepts.json"), "utf8"));
const conceptIds = new Set(concepts.concepts.map((c) => c.id));

test("registry is non-empty and every file matches its id", () => {
  assert.ok(sims.length > 0);
  for (const s of sims) assert.ok(files.includes(`${s.id}.json`), `${s.id} filename mismatch`);
});

test("simulation ids are unique", () => {
  const ids = sims.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every concept id resolves to the canonical taxonomy", () => {
  for (const s of sims) for (const c of s.product.concepts) {
    assert.ok(conceptIds.has(c), `${s.id} references unknown concept ${c}`);
  }
});

test("concept taxonomy has no duplicate ids or clashing aliases", () => {
  const ids = concepts.concepts.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
  const owner = new Map();
  for (const c of concepts.concepts) for (const a of c.aliases ?? []) {
    const k = a.toLowerCase();
    assert.ok(!owner.has(k) || owner.get(k) === c.id, `alias "${a}" claimed twice`);
    owner.set(k, c.id);
  }
});

test("maturity above PLAYABLE requires recorded student validation", () => {
  for (const s of sims) {
    if (["TESTED", "BOW_APPROVED", "CORE"].includes(s.governance.maturity)) {
      assert.ok(["once", "repeated"].includes(s.governance.validation?.studentValidation),
        `${s.id} claims ${s.governance.maturity} without student validation`);
    }
  }
});

test("BOW_APPROVED and CORE require an owner, working health and a way to run it", () => {
  for (const s of sims) {
    if (!["BOW_APPROVED", "CORE"].includes(s.governance.maturity)) continue;
    assert.notEqual(s.governance.owner?.productOwner, "UNOWNED", `${s.id} approved but unowned`);
    assert.notEqual(s.governance.health.technical, "broken", `${s.id} approved but broken`);
    assert.ok((s.product.runResources ?? []).length > 0, `${s.id} approved with no run resource`);
  }
});

test("CORE requires facilitator transfer beyond the founder", () => {
  for (const s of sims) {
    if (s.governance.maturity !== "CORE") continue;
    assert.ok(["bow-instructor", "external-educator"].includes(s.governance.validation?.facilitatorValidation),
      `${s.id} is CORE without facilitator transfer`);
  }
});

test("no number is recorded without a basis", () => {
  for (const s of sims) {
    const d = s.product.duration;
    if (d && (d.minutes != null || d.minMinutes != null || d.maxMinutes != null)) {
      assert.ok(d.basis && d.basis !== "unknown", `${s.id} has a duration with no basis`);
    }
    if (s.product.gradeBands?.length) {
      assert.ok(s.product.gradeBandBasis && s.product.gradeBandBasis !== "unknown",
        `${s.id} has grade bands with no basis`);
    }
  }
});

test("superseded records point at a simulation that exists", () => {
  const ids = new Set(sims.map((s) => s.id));
  for (const s of sims) {
    if (s.governance.visibility === "superseded") {
      assert.ok(s.governance.supersededBy, `${s.id} superseded with no successor`);
      assert.ok(ids.has(s.governance.supersededBy), `${s.id} points at missing ${s.governance.supersededBy}`);
    }
  }
});

test("an experimental simulation is never publicly listed", () => {
  for (const s of sims) {
    if (s.governance.maturity === "EXPERIMENTAL") assert.notEqual(s.governance.publicListing, true, s.id);
  }
});

test("a VERIFIED record carries evidence", () => {
  for (const s of sims) {
    if (s.provenance?.confidence === "VERIFIED") {
      assert.ok(s.provenance.evidence?.length > 20, `${s.id} claims VERIFIED with thin evidence`);
    }
  }
});

test("multi-simulation repositories are represented as separate entries", () => {
  const byRepo = {};
  for (const s of sims) {
    const r = s.product.source.primary.repo;
    if (r) (byRepo[r] ??= []).push(s.id);
  }
  // These repos were confirmed during discovery to hold several distinct experiences.
  assert.ok(byRepo["braydenokley13-ux/GAUNTLET"]?.length >= 4, "GAUNTLET should yield 4+ entries");
  assert.ok(byRepo["braydenokley13-ux/BSC-anythingelse"]?.length >= 8, "BSC-anythingelse should yield 8+ entries");
});

test("one experience spanning several artefacts stays a single entry", () => {
  // T101-M1-L1 ships a browser build and an xlsx sharing one claim code.
  const s = sims.find((x) => x.id === "front-office-build-the-roster");
  assert.ok(s, "expected front-office-build-the-roster");
  assert.ok((s.product.source.additional ?? []).length >= 1, "the workbook should be an additional source");
});

test("URLs are well formed", () => {
  for (const s of sims) {
    for (const r of s.product.runResources ?? []) {
      if (r.url) assert.match(r.url, /^https?:\/\//, `${s.id} bad url`);
    }
  }
});

test("every record states a technical health value", () => {
  for (const s of sims) {
    assert.ok(["healthy", "needs-attention", "broken", "unknown"].includes(s.governance.health.technical), s.id);
  }
});

test("public/internal separation: no governance field leaks into product", () => {
  const forbidden = ["maturity", "health", "owner", "validation", "knownBlockers", "publicListing"];
  for (const s of sims) for (const k of forbidden) {
    assert.ok(!(k in s.product), `${s.id} has governance field "${k}" inside product`);
  }
});
