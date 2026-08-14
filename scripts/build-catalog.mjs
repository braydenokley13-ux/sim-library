#!/usr/bin/env node
/**
 * Builds the Library interface and the generated markdown catalog from the
 * registry. The UI is a single self-contained file with the data inlined, so it
 * can be opened from disk or served from GitHub Pages with no build step and no
 * network access — the same constraints the simulations themselves run under.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const APP = join(ROOT, "app");
mkdirSync(APP, { recursive: true });

const concepts = JSON.parse(readFileSync(join(ROOT, "data", "concepts.json"), "utf8"));
const sims = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")))
  .sort((a, b) => a.product.title.localeCompare(b.product.title));

const conceptName = Object.fromEntries(concepts.concepts.map((c) => [c.id, c.name]));

/* ── the shape the UI actually needs, kept small ── */
const view = sims.map((s) => {
  const p = s.product, g = s.governance;
  const d = p.duration ?? {};
  const mins = d.minutes ?? (d.minMinutes != null && d.maxMinutes != null ? Math.round((d.minMinutes + d.maxMinutes) / 2) : null);
  return {
    id: s.id, title: p.title, aliases: p.aliases ?? [], family: p.family ?? null,
    pillar: p.pillar, summary: p.summary, does: p.whatStudentsDo,
    concepts: p.concepts, conceptNames: p.concepts.map((c) => conceptName[c] ?? c),
    standards: p.standards ?? [],
    grades: p.gradeBands ?? [], gradeBasis: p.gradeBandBasis,
    purpose: p.purpose.primary, purposeAll: [p.purpose.primary, ...(p.purpose.secondary ?? [])],
    setting: p.delivery.setting, grouping: p.delivery.grouping, mode: p.delivery.mode ?? [],
    devices: p.delivery.devices ?? null,
    mins, durText: durText(d), sessions: d.sessions ?? null, durBasis: d.basis ?? null,
    groupSize: p.groupSize ?? null,
    facRequired: p.facilitation?.required ?? null,
    founder: p.facilitation?.founderDependence ?? "unknown",
    prep: p.facilitation?.prep ?? null, facNotes: p.facilitation?.notes ?? null,
    pattern: p.pattern ?? [], tech: p.technology ?? null,
    output: p.evidenceOutput, data: p.studentDataProfile ?? {},
    source: p.source, run: p.runResources ?? [], version: p.version ?? null,
    maturity: g.maturity, maturityBasis: g.maturityBasis ?? "",
    visibility: g.visibility, supersededBy: g.supersededBy ?? null,
    owner: g.owner?.productOwner ?? "UNOWNED",
    health: g.health.technical, healthBasis: g.health.technicalBasis ?? "",
    docs: g.health.documentation ?? "minimal", blockers: g.health.knownBlockers ?? [],
    studentVal: g.validation?.studentValidation ?? "unknown",
    facVal: g.validation?.facilitatorValidation ?? "unknown",
    valNotes: g.validation?.notes ?? null,
    lastVerified: g.lastVerified ?? {}, govNotes: g.notes ?? null,
    confidence: s.provenance?.confidence ?? "UNKNOWN",
    evidence: s.provenance?.evidence ?? "", open: s.provenance?.openQuestions ?? [],
    launch: (p.runResources ?? []).find((r) => r.kind === "live-url" || r.kind === "create-class-url")?.url ?? null,
  };
});

function durText(d) {
  if (d.minutes != null) return d.sessions > 1 ? `${d.minutes} min × ${d.sessions}` : `${d.minutes} min`;
  if (d.minMinutes != null && d.maxMinutes != null) return `${d.minMinutes}–${d.maxMinutes} min`;
  return null;
}

const conceptsUsed = new Set(view.filter((v) => v.visibility === "active").flatMap((v) => v.concepts));
const payload = {
  generated: new Date().toISOString().slice(0, 10),
  sims: view,
  concepts: concepts.concepts.map((c) => ({ id: c.id, name: c.name, pillar: c.pillar, group: c.group, definition: c.definition, covered: conceptsUsed.has(c.id) })),
};

/* ────────────────────────────  markdown catalog  ──────────────────────────── */
const active = view.filter((v) => v.visibility === "active");
const tally = (fn) => active.reduce((a, v) => { const k = fn(v); a[k] = (a[k] ?? 0) + 1; return a; }, {});
const line = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(" · ");

let md = `# BOW Simulation Library — catalog

_Generated from the registry on ${payload.generated}. Do not edit by hand; run \`npm run build\`._

**${view.length} experiences** recorded — ${active.length} active, ${view.length - active.length} superseded.

- Maturity: ${line(tally((v) => v.maturity))}
- Technical health: ${line(tally((v) => v.health))}
- Pillar: ${line(tally((v) => v.pillar))}
- Launchable from a link today: ${active.filter((v) => v.launch).length} of ${active.length}
- Duration recorded: ${active.filter((v) => v.durText).length} of ${active.length}
- Named product owner: ${active.filter((v) => v.owner !== "UNOWNED").length} of ${active.length}
- Confirmed student-run: ${active.filter((v) => ["once", "repeated"].includes(v.studentVal)).length} of ${active.length}

`;

const families = [...new Set(active.map((v) => v.family ?? "unfiled"))].sort();
for (const fam of families) {
  md += `\n## ${fam}\n\n| Simulation | Grades | Duration | Maturity | Health | Launch |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const v of active.filter((x) => (x.family ?? "unfiled") === fam)) {
    md += `| **${v.title}** | ${v.grades.length ? v.grades.join("–") : "—"} | ${v.durText ?? "—"} | ${v.maturity} | ${v.health} | ${v.launch ? "yes" : "—"} |\n`;
  }
}

const superseded = view.filter((v) => v.visibility === "superseded");
if (superseded.length) {
  md += `\n## Superseded\n\nKept for history. Not offered to instructors.\n\n`;
  for (const v of superseded) md += `- **${v.title}** — superseded by \`${v.supersededBy}\`\n`;
}

const uncovered = payload.concepts.filter((c) => !c.covered);
md += `\n## Concepts with no active simulation\n\n${uncovered.length ? uncovered.map((c) => `- ${c.name} (\`${c.id}\`)`).join("\n") : "_None._"}\n`;

writeFileSync(join(ROOT, "CATALOG.md"), md);

/* ──────────────────────────────────  UI  ────────────────────────────────── */
const html = readFileSync(join(ROOT, "scripts", "app-template.html"), "utf8")
  .replace("/*__DATA__*/null", JSON.stringify(payload));
writeFileSync(join(APP, "index.html"), html);

console.log(`CATALOG.md and app/index.html built from ${view.length} records.`);
