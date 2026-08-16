/**
 * Adversarial tests for the validator itself.
 *
 * The integrity tests check that today's data is clean. These check that a
 * careless author CANNOT get bad data in — which is the property that actually
 * keeps the registry honest as it grows. Each case writes a deliberately bad
 * record into a throwaway registry, runs the validator, and asserts it fails.
 */
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROBE_ID = "zz-validator-probe";
// A throwaway registry directory. The suite used to write its probe records into
// data/simulations, which meant every other test file could observe a synthetic
// record mid-run depending on scheduling.
const PROBE_DIR = mkdtempSync(join(tmpdir(), "bow-validator-"));
const PROBE = join(PROBE_DIR, `${PROBE_ID}.json`);

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
    owner: { productOwner: "UNOWNED" },
    health: { technical: "healthy", knownBlockers: [] },
    validation: { studentValidation: "unknown", facilitatorValidation: "unknown" },
  },
});

/** Runs the validator; returns true when it accepts the registry. */
function accepts(record) {
  writeFileSync(PROBE, JSON.stringify(record, null, 2));
  try {
    execFileSync("node", [join(ROOT, "scripts", "validate.mjs")], { cwd: ROOT, stdio: "pipe", env: { ...process.env, BOW_SIM_DIR: PROBE_DIR } });
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

test("rejects a public-release hold with no stated reason", () => {
  const r = base();
  r.governance.publicRelease = { hold: true };
  assert.equal(accepts(r), false);
});

test("accepts a public-release hold that states its reason", () => {
  const r = base();
  r.governance.publicRelease = { hold: true, holdReason: "Submission endpoint is a placeholder." };
  assert.equal(accepts(r), true);
});

test("rejects publicListing, the field the maturity gate used to live on", () => {
  // The old model let a record declare itself public. Readiness is computed now,
  // and the schema is additionalProperties:false so the dead field cannot linger
  // in a record and quietly mean nothing.
  const r = base();
  r.governance.publicListing = true;
  assert.equal(accepts(r), false);
});

test("rejects contexts asserted without a basis", () => {
  const r = base();
  r.product.contexts = ["basketball"];
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

/* ---------------------------------------------------------------------------
 * Curation tier.
 *
 * Tier is the one governance field that is pure opinion, so it is also the one
 * most able to quietly become a truth claim. These cases pin the boundary: an
 * opinion may rank an unproven thing highly, but it may not recommend something
 * a teacher cannot open, and it may not contradict a decision already taken
 * elsewhere in the record.
 * ------------------------------------------------------------------------- */

test("accepts a flagship on a healthy, launchable, active record", () => {
  const r = base();
  r.governance.curation = { tier: "FLAGSHIP", tierBasis: "Strong decisions and a real ending; carries the library." };
  assert.equal(accepts(r), true);
});

test("rejects a tier with no basis — a bare assertion is not a judgement", () => {
  const r = base();
  r.governance.curation = { tier: "FLAGSHIP" };
  assert.equal(accepts(r), false);
});

test("rejects a one-word tierBasis", () => {
  const r = base();
  r.governance.curation = { tier: "RECOMMENDED", tierBasis: "good" };
  assert.equal(accepts(r), false);
});

test("rejects a flagship a teacher cannot open", () => {
  const r = base();
  r.product.runResources = [{ kind: "repo", label: "Source", url: "https://github.com/x/y" }];
  r.governance.curation = { tier: "FLAGSHIP", tierBasis: "A genuinely excellent idea that has never been deployed anywhere." };
  assert.equal(accepts(r), false);
});

test("rejects recommending something BOW is simultaneously withholding", () => {
  const r = base();
  r.governance.publicRelease = { hold: true, holdReason: "Collects student names with no privacy decision taken." };
  r.governance.curation = { tier: "RECOMMENDED", tierBasis: "Plays well and teaches surplus value clearly." };
  assert.equal(accepts(r), false);
});

test("rejects a flagship whose technical health is broken", () => {
  const r = base();
  r.governance.health = { technical: "broken", knownBlockers: ["ships a 404"] };
  r.governance.curation = { tier: "FLAGSHIP", tierBasis: "Would be the best thing in the account if it loaded at all." };
  assert.equal(accepts(r), false);
});

test("allows ARCHIVE on a record that does not run — judging something dead needs no live URL", () => {
  const r = base();
  r.product.runResources = [{ kind: "repo", label: "Source", url: "https://github.com/x/y" }];
  r.governance.curation = { tier: "ARCHIVE", tierBasis: "Superseded by a later build; no reason to spend further time." , queue: "ARCHIVE" };
  assert.equal(accepts(r), true);
});

test("rejects archived work that still carries a repair priority", () => {
  const r = base();
  r.governance.curation = { tier: "ARCHIVE", tierBasis: "Abandoned prototype with no path forward worth funding.", queue: "P0" };
  assert.equal(accepts(r), false);
});

test("rejects a malformed playtest date", () => {
  const r = base();
  r.governance.curation = { tier: "EXPERIMENTAL", tierBasis: "Interesting core loop, rough edges throughout.", playtestedOn: "Aug 2026" };
  assert.equal(accepts(r), false);
});
