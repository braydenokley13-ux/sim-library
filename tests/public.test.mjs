/**
 * Adversarial tests for the PUBLIC surface.
 *
 * These are not "does the builder run" tests. Each one encodes a specific way
 * the public library could tell a visitor something untrue, and asserts that it
 * cannot. The two failure modes that matter:
 *
 *   1. leakage      — an internal fact reaching a stranger
 *   2. overclaiming — a promise BOW has not earned, above all a Launch button
 *                     that does not launch
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { assess, partition, FORBIDDEN_PUBLIC_WORDS, PUBLIC_LABEL, IN_DEVELOPMENT_LABEL } from "../scripts/public-readiness.mjs";

const ROOT = join(import.meta.dirname, "..");
const records = readdirSync(join(ROOT, "data", "simulations"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "data", "simulations", f), "utf8")));

const build = () => {
  execFileSync("node", [join(ROOT, "scripts", "build-public.mjs")], { cwd: ROOT, stdio: "pipe" });
  return JSON.parse(readFileSync(join(ROOT, "public", "simulations.json"), "utf8"));
};

const clone = (r) => JSON.parse(JSON.stringify(r));
const anEligible = () => clone(partition(records).included[0].rec);

// ── the gate ────────────────────────────────────────────────────────────────

test("the fixture this file leans on is genuinely eligible", () => {
  // Guards every test below: if anEligible() stopped being eligible, the
  // "rejects X" tests would all pass for the wrong reason.
  assert.equal(assess(anEligible()).eligible, true);
});

test("a record with no live URL is never public", () => {
  const r = anEligible();
  r.product.runResources = [];
  assert.equal(assess(r).eligible, false);
});

test("a repository URL is not a launch, however it is labelled", () => {
  const r = anEligible();
  r.product.runResources = [
    { kind: "repo", label: "Play now", url: "https://github.com/braydenokley13-ux/whatever", verified: "2026-08-14" },
  ];
  assert.equal(assess(r).eligible, false);
});

test("an unprobed live URL is not public", () => {
  const r = anEligible();
  for (const rr of r.product.runResources) delete rr.verified;
  assert.equal(assess(r).eligible, false);
});

test("health short of healthy keeps a record off the public site", () => {
  for (const h of ["needs-attention", "broken", "unknown"]) {
    const r = anEligible();
    r.governance.health.technical = h;
    assert.equal(assess(r).eligible, false, h);
  }
});

test("superseded and archived work is never public", () => {
  for (const v of ["superseded", "archived", "hidden"]) {
    const r = anEligible();
    r.governance.visibility = v;
    assert.equal(assess(r).eligible, false, v);
  }
});

test("a record too thin to explain itself is not public", () => {
  const r = anEligible();
  r.product.whatStudentsDo = "Students play it.";
  assert.equal(assess(r).eligible, false);
});

test("a hold removes an otherwise qualifying record", () => {
  const r = anEligible();
  r.governance.publicRelease = { hold: true, holdReason: "Owner review pending." };
  assert.equal(assess(r).eligible, false);
});

test("nothing can be hand-promoted onto the public site", () => {
  // The inverse of the hold: there is no field a record can set to force its way
  // in. A record that fails the gate stays out no matter what it declares.
  const r = anEligible();
  r.product.runResources = [];
  r.governance.publicRelease = { hold: false };
  r.governance.maturity = "CORE";
  assert.equal(assess(r).eligible, false);
});

// ── the payload ─────────────────────────────────────────────────────────────

test("the public payload carries no internal structure", () => {
  const serialized = JSON.stringify(build());
  for (const k of ["governance", "provenance", "maturity", "owner", "productOwner", "knownBlockers",
                   "validation", "health", "notes", "publicRelease", "visibility", "supersededBy",
                   "lastVerified", "discoveredBy", "openQuestions", "repo"]) {
    assert.ok(!serialized.includes(`"${k}"`), `internal key "${k}" reached the public payload`);
  }
});

test("no public record uses a maturity word BOW has not earned", () => {
  // Values, not just keys. A summary reading "our proven classroom favourite"
  // would be exactly as false as a maturity field saying so.
  const payload = build();
  for (const sim of payload.simulations) {
    const prose = [sim.title, sim.summary, sim.whatStudentsDo, sim.label, sim.instructorNeed].join(" ").toLowerCase();
    for (const w of FORBIDDEN_PUBLIC_WORDS) {
      assert.ok(!new RegExp(`\\b${w}\\b`).test(prose), `${sim.id} claims "${w}"`);
    }
  }
});

test("the only two public labels are Beta and In development", () => {
  const labels = new Set(build().simulations.map((s) => s.label));
  for (const l of labels) assert.ok([PUBLIC_LABEL, IN_DEVELOPMENT_LABEL].includes(l), `unexpected label "${l}"`);
});

test("the label always agrees with the availability state", () => {
  for (const sim of build().simulations) {
    const expected = sim.availability === "available" ? PUBLIC_LABEL : IN_DEVELOPMENT_LABEL;
    assert.equal(sim.label, expected, `${sim.id} is "${sim.availability}" but labelled "${sim.label}"`);
  }
});

test("every playable record can do the one thing its card promises", () => {
  for (const sim of build().simulations.filter((s) => s.availability === "available")) {
    assert.match(sim.playUrl ?? "", /^https:\/\//, `${sim.id} has no usable launch URL`);
    assert.ok(!/github\.com/.test(sim.playUrl), `${sim.id} offers a repository as a game`);
  }
});

test("an in-development record carries no launch URL at all", () => {
  // The contradiction this file exists to make impossible: "In development"
  // printed beside a button that goes somewhere, or one that goes nowhere.
  for (const sim of build().simulations.filter((s) => s.availability !== "available")) {
    assert.equal(sim.playUrl, null, `${sim.id} is in development but carries ${sim.playUrl}`);
  }
});

test("the preview flag is refused on anything that already launches", () => {
  const r = anEligible();
  r.governance.publicRelease = { preview: true, previewReason: "why" };
  assert.equal(assess(r).eligible, false);
});

test("the preview flag does not bypass the copy requirement", () => {
  const r = anEligible();
  r.product.runResources = [];
  r.product.whatStudentsDo = "Students play it.";
  r.governance.publicRelease = { preview: true, previewReason: "why" };
  assert.equal(assess(r).eligible, false);
});

test("a hold beats a preview flag", () => {
  const r = anEligible();
  r.product.runResources = [];
  r.governance.publicRelease = { preview: true, previewReason: "why", hold: true, holdReason: "not yet" };
  assert.equal(assess(r).eligible, false);
});

test("availability never contradicts the presence of a launch URL", () => {
  // The contradiction this exists to prevent: "Play now" beside nothing to play,
  // or "In development" beside a working link.
  for (const sim of build().simulations) {
    if (sim.availability === "available") assert.ok(sim.playUrl, `${sim.id} says available with no URL`);
    else assert.ok(!sim.playUrl, `${sim.id} says ${sim.availability} but carries a launch URL`);
  }
});

test("the exclusion ledger accounts for every record that is not published", () => {
  build();
  const ledger = JSON.parse(readFileSync(join(ROOT, "public", "exclusions.json"), "utf8"));
  assert.equal(ledger.totals.records, records.length);
  assert.equal(ledger.totals.included + ledger.totals.excluded, records.length);
  assert.equal(ledger.excluded.length, ledger.totals.excluded);
  for (const e of ledger.excluded) assert.ok(e.reason, `${e.id} excluded with no reason`);
});

// ── the rendered page ───────────────────────────────────────────────────────

test("the rendered page contains no internal vocabulary", () => {
  const page = join(ROOT, "public", "index.html");
  if (!existsSync(page)) return; // built separately; nothing to check yet
  const html = readFileSync(page, "utf8");
  for (const k of ["knownBlockers", "UNOWNED", "productOwner", "maturityBasis", "studentValidation",
                   "technicalBasis", "BOW_APPROVED", "EXPERIMENTAL", "PLAYABLE"]) {
    assert.ok(!html.includes(k), `internal vocabulary "${k}" is in the published page`);
  }
});

test("the rendered page never points at a repository as a game", () => {
  const page = join(ROOT, "public", "index.html");
  if (!existsSync(page)) return;
  const html = readFileSync(page, "utf8");
  assert.ok(!/href="https:\/\/github\.com/.test(html), "the page links a repository");
});
