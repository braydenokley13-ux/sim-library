/**
 * Adversarial tests for the validator itself.
 *
 * The integrity tests check that today's data is clean. These check that a
 * careless author CANNOT get bad data in — which is the property that actually
 * keeps the registry honest as it grows. Each case writes a deliberately bad
 * record into the real registry, runs the validator, and asserts it fails.
 */
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROBE_ID = "zz-validator-probe";
const PROBE = join(ROOT, "data", "simulations", `${PROBE_ID}.json`);

const base = () => ({
  schemaVersion: 1,
  id: PROBE_ID,
  product: {
    title: "Validator probe",
    pillar: "economics",
    summary: "A deliberately synthetic record used only by the test suite.",
    whatStudentsDo: "Nothing. This record exists to prove the validator rejects bad input.",
    concepts: ["econ.scarcity"],
    purpose: { primary: "PRACTICE" },
    delivery: { setting: ["self-guided"], grouping: ["individual"] },
    source: { primary: { type: "github", repo: "braydenokley13-ux/sim-library" } },
    runResources: [{ kind: "live-url", label: "x", url: "https://example.com" }],
  },
  governance: {
    maturity: "PLAYABLE",
    maturityBasis: "synthetic",
    visibility: "active",
    publicListing: false,
    owner: { productOwner: "UNOWNED" },
    health: { technical: "healthy", knownBlockers: [] },
    validation: { studentValidation: "unknown", facilitatorValidation: "unknown" },
  },
});

/** Runs the validator; returns true when it accepts the registry. */
function accepts(record) {
  writeFileSync(PROBE, JSON.stringify(record, null, 2));
  try {
    execFileSync("node", [join(ROOT, "scripts", "validate.mjs")], { cwd: ROOT, stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

afterEach(() => { if (existsSync(PROBE)) unlinkSync(PROBE); });

test("a well-formed record is accepted (guards against a validator that rejects everything)", () => {
  assert.equal(accepts(base()), true);
});

test("rejects TESTED without a recorded student run", () => {
  const r = base();
  r.governance.maturity = "TESTED";
  assert.equal(accepts(r), false);
});

test("rejects CORE claimed with only founder facilitation", () => {
  const r = base();
  r.governance.maturity = "CORE";
  r.governance.validation = { studentValidation: "repeated", facilitatorValidation: "founder-only" };
  r.governance.owner.productOwner = "Someone";
  r.governance.lastVerified = { testedContentVersion: "1.0" };
  assert.equal(accepts(r), false);
});

test("rejects BOW_APPROVED with no way to run it", () => {
  const r = base();
  r.governance.maturity = "BOW_APPROVED";
  r.governance.validation = { studentValidation: "once", facilitatorValidation: "bow-instructor" };
  r.governance.owner.productOwner = "Someone";
  r.governance.lastVerified = { testedContentVersion: "1.0" };
  r.product.runResources = [];
  assert.equal(accepts(r), false);
});

test("rejects a duration with no basis — fake precision", () => {
  const r = base();
  r.product.duration = { minutes: 30 };
  assert.equal(accepts(r), false);
});

test("rejects grade bands with no basis", () => {
  const r = base();
  r.product.gradeBands = ["7", "8"];
  assert.equal(accepts(r), false);
});

test("rejects a non-github source that says where nothing is", () => {
  const r = base();
  r.product.source = { primary: { type: "physical" } };
  assert.equal(accepts(r), false);
});

test("accepts a non-github source that carries a locator", () => {
  const r = base();
  r.product.source = { primary: { type: "physical", note: "Printed card deck, held in the BOW office." } };
  assert.equal(accepts(r), true);
});

test("rejects a VERIFIED claim propped up by token evidence", () => {
  const r = base();
  r.provenance = { confidence: "VERIFIED", evidence: "trust me" };
  assert.equal(accepts(r), false);
});

test("rejects public listing of anything untested", () => {
  const r = base();
  r.governance.publicListing = true;
  assert.equal(accepts(r), false);
});

test("rejects public listing of an archived record", () => {
  const r = base();
  r.governance.maturity = "TESTED";
  r.governance.validation = { studentValidation: "once", facilitatorValidation: "bow-instructor" };
  r.governance.lastVerified = { testedContentVersion: "1.0" };
  r.governance.visibility = "archived";
  r.governance.publicListing = true;
  assert.equal(accepts(r), false);
});

test("rejects a student run with no record of which version was tested", () => {
  const r = base();
  r.governance.maturity = "TESTED";
  r.governance.validation = { studentValidation: "once", facilitatorValidation: "bow-instructor" };
  assert.equal(accepts(r), false);
});

test("rejects an unknown concept id", () => {
  const r = base();
  r.product.concepts = ["econ.not-a-real-concept"];
  assert.equal(accepts(r), false);
});

test("rejects an unrecognised field rather than silently dropping it", () => {
  const r = base();
  r.product.somethingNobodyDefined = "should not vanish quietly";
  assert.equal(accepts(r), false);
});

test("rejects a superseded record pointing nowhere", () => {
  const r = base();
  r.governance.visibility = "superseded";
  assert.equal(accepts(r), false);
});

test("rejects a filename that does not match the id", () => {
  const r = base();
  r.id = "some-other-id";
  assert.equal(accepts(r), false);
});
