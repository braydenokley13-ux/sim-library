#!/usr/bin/env node
/**
 * Seeds data/simulations/ from the August 2026 account-wide discovery.
 *
 * This file is the discovery's machine-readable output, kept in the repo so the
 * audit is reproducible and reviewable rather than a one-off. Editing a record
 * afterwards is normal — re-running this would overwrite, so it is a seed, not
 * a sync. Full narrative evidence lives in discovery/evidence/agent-reports/.
 *
 * Every field here traces to something read in a repo. Where nothing was found,
 * the field is absent and provenance.confidence says so.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "simulations");
mkdirSync(OUT, { recursive: true });

const TODAY = "2026-08-14";
const pages = (repo) => `https://braydenokley13-ux.github.io/${repo}/`;

/**
 * Compact record spec → full schema record.
 * Deliberately verbose defaults: unknown stays unknown.
 */
function rec(s) {
  const product = {
    title: s.title,
    ...(s.aliases ? { aliases: s.aliases } : {}),
    ...(s.family ? { family: s.family } : {}),
    pillar: s.pillar,
    summary: s.summary,
    whatStudentsDo: s.does,
    concepts: s.concepts,
    ...(s.standards ? { standards: s.standards } : {}),
    ...(s.grades ? { gradeBands: s.grades, gradeBandBasis: s.gradeBasis } : { gradeBandBasis: "unknown" }),
    purpose: { primary: s.purpose[0], ...(s.purpose.length > 1 ? { secondary: s.purpose.slice(1) } : {}) },
    delivery: {
      setting: s.setting ?? ["self-guided"],
      grouping: s.grouping ?? ["individual"],
      ...(s.mode ? { mode: s.mode } : {}),
      ...(s.devices ? { devices: s.devices } : {}),
    },
    ...(s.duration ? { duration: s.duration } : {}),
    ...(s.groupSize ? { groupSize: s.groupSize } : {}),
    facilitation: {
      ...(s.facRequired !== undefined ? { required: s.facRequired } : {}),
      founderDependence: s.founder ?? "unknown",
      ...(s.prep ? { prep: s.prep } : {}),
      ...(s.facNotes ? { notes: s.facNotes } : {}),
    },
    ...(s.pattern ? { pattern: s.pattern } : {}),
    ...(s.tech ? { technology: s.tech } : {}),
    evidenceOutput: s.output ?? "unknown",
    studentDataProfile: s.data ?? { storesStudentData: "unknown", requiresLogin: "unknown" },
    source: { primary: s.source, ...(s.moreSources ? { additional: s.moreSources } : {}) },
    runResources: s.run ?? [],
    ...(s.version ? { version: s.version } : {}),
  };

  const governance = {
    maturity: s.maturity,
    maturityBasis: s.maturityBasis,
    visibility: s.visibility ?? "active",
    ...(s.supersededBy ? { supersededBy: s.supersededBy } : {}),
    owner: { productOwner: s.owner ?? "UNOWNED" },
    health: {
      technical: s.health,
      technicalBasis: s.healthBasis,
      documentation: s.docs ?? "minimal",
      knownBlockers: s.blockers ?? [],
    },
    validation: {
      studentValidation: s.studentValidation ?? "unknown",
      facilitatorValidation: s.facValidation ?? "unknown",
      ...(s.valNotes ? { notes: s.valNotes } : {}),
    },
    lastVerified: { technical: TODAY, ...(s.lastVerified ?? {}) },
    ...(s.govNotes ? { notes: s.govNotes } : {}),
  };

  return {
    schemaVersion: 1,
    id: s.id,
    product,
    governance,
    provenance: {
      discoveredBy: "account-wide discovery, August 2026",
      discoveredOn: TODAY,
      confidence: s.confidence,
      evidence: s.evidence,
      ...(s.open ? { openQuestions: s.open } : {}),
    },
  };
}

const gh = (repo, path) => ({ type: "github", repo: `braydenokley13-ux/${repo}`, ...(path ? { path } : {}) });
const liveRun = (repo) => ({ kind: "live-url", label: "Play in browser (GitHub Pages)", url: pages(repo), verified: TODAY });
const repoRun = (repo) => ({ kind: "repo", label: "Source", url: `https://github.com/braydenokley13-ux/${repo}` });

// Shared boilerplate for the ~40 single-file browser lesson simulations.
const SELF_CONTAINED = {
  setting: ["self-guided"],
  grouping: ["individual"],
  mode: ["online"],
  devices: "one browser per student",
  founder: "any-instructor",
  data: { storesStudentData: "no", requiresLogin: "no", usesClassCodes: "no", freeTextEntry: "unknown", thirdPartyServices: [], notes: "Browser-local only; no server observed." },
};
const LOCAL_ONLY = { ...SELF_CONTAINED.data, notes: "State kept in browser localStorage only; no server call observed." };

const RECORDS = [];
const add = (s) => RECORDS.push(rec(s));

export { add, rec, gh, liveRun, repoRun, SELF_CONTAINED, LOCAL_ONLY, RECORDS, OUT, TODAY, pages, writeFileSync, join };
