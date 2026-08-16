#!/usr/bin/env node
/**
 * The internal work queue.
 *
 * Everything not publicly playable, sorted into what would actually have to
 * happen to change that. "Excluded" is otherwise just a shrug, and a shrug is
 * not a plan.
 *
 * Two rules this file holds to:
 *
 *   - It is GENERATED. A hand-kept queue is out of date the first time anyone
 *     fixes something, and then it is worse than nothing because people stop
 *     trusting it. Re-run it and the answer is current.
 *
 *   - It never invents an owner. GitHub knows who committed most; that is
 *     routinely not who is accountable, and guessing would put a name against
 *     work that person never agreed to. Where a human decision is the blocker,
 *     the queue says so and stops.
 *
 * Run: node scripts/build-queue.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assess } from "./public-readiness.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");

const BUCKETS = {
  METADATA: {
    n: 1,
    title: "Launchable, needs metadata or copy",
    blurb:
      "The experience works and is reachable. What is missing is the writing around it — a duration, a grade band, a description a stranger could act on. The cheapest work in the queue.",
  },
  DEPLOYMENT: {
    n: 2,
    title: "High-value deployment fix",
    blurb:
      "A finished build with no working front door. Nothing needs designing or rewriting; something needs hosting, or a host that stopped serving needs restarting. The highest ratio of value to effort here.",
  },
  REPAIR: {
    n: 3,
    title: "Substantial product repair",
    blurb:
      "The experience itself is incomplete or broken. Real product work, not a deployment step.",
  },
  IN_DEVELOPMENT: {
    n: 4,
    title: "In development",
    blurb:
      "Active work that is not finished and is not pretending to be. Nothing here is a defect.",
  },
  ARCHIVE: {
    n: 5,
    title: "Archive or review candidate",
    blurb:
      "Superseded by something newer, or kept only for history. The question is whether the old deployment should still be reachable at all.",
  },
  OWNERSHIP: {
    n: 6,
    title: "Needs a human decision",
    blurb:
      "Blocked on a judgement no script can make. Deliberately not assigned to anyone — see the note at the end of this file.",
  },
};

/**
 * Some blockers are not scheduling problems. A repository holding a real
 * person's name and email address is a privacy issue, and sorting it into
 * "needs hosting" alongside a dozen deployment chores buries it exactly where
 * nobody will look. These are pulled out and listed first, whatever else is
 * true of the record.
 */
const PERSONAL_DATA = /personal data|real name|email address|\bPII\b/i;
const hasPersonalData = (rec) =>
  (rec.governance.health.knownBlockers ?? []).some((b) => PERSONAL_DATA.test(b));

/**
 * Classification. Ordered, first match wins, and every rule is derived from a
 * recorded field rather than an impression.
 */
function classify(rec, verdict) {
  const g = rec.governance;
  const p = rec.product;
  const live = (p.runResources ?? []).find((r) => r.kind === "live-url" && r.url);
  const gated = (p.runResources ?? []).find((r) => r.kind === "create-class-url" && r.url);
  const health = g.health?.technical;

  if (g.visibility !== "active") {
    return [BUCKETS.ARCHIVE, `Visibility is "${g.visibility}"${g.supersededBy ? `, replaced by ${g.supersededBy}` : ""}.`];
  }
  if (g.publicRelease?.hold === true) {
    // This is an internal document, so it shows the actual reason. A queue that
    // says only "held" tells the next reader nothing they can act on.
    return [BUCKETS.OWNERSHIP, `Held off the public site by an explicit BOW decision: ${g.publicRelease.holdReason}`];
  }
  if (g.publicRelease?.preview === true) {
    return [BUCKETS.IN_DEVELOPMENT, "Shown publicly as in development. Needs a deployment before it can launch."];
  }
  // A route that exists but demands an account is not a broken build — it is a
  // policy question about who is allowed to reach it.
  if (gated && !live) {
    return [BUCKETS.OWNERSHIP, "Runs inside the website behind a login and prior module completion. Whether a public visitor should ever reach it is a decision, not a bug."];
  }
  if (live && health !== "healthy") {
    return [BUCKETS.DEPLOYMENT, `A launch URL exists but health is "${health}". The front door is the problem, not the product.`];
  }
  // A complete build that was simply never hosted. This is the single largest
  // and cheapest category in the account.
  if (!live && g.maturity === "PLAYABLE" && (health === "unknown" || health === "healthy")) {
    return [BUCKETS.DEPLOYMENT, "A complete, playable build with no deployment of any kind. Hosting it is the whole job."];
  }
  if (health === "broken") {
    return [BUCKETS.REPAIR, "Recorded as broken, and there is no launch surface to fall back on."];
  }
  if (!live && health === "needs-attention") {
    return [BUCKETS.REPAIR, "Undeployed and already carrying known defects."];
  }
  if (g.maturity === "EXPERIMENTAL") {
    return [BUCKETS.IN_DEVELOPMENT, "Still experimental — not represented as finished anywhere."];
  }
  // Student data is a decision, not a defect. The build stops; a person decides.
  if (verdict.reason === "student-data-needs-a-human-decision") {
    const d = p.studentDataProfile ?? {};
    const detail = d.storesStudentData === "yes"
      ? "It records or transmits student data."
      : "Whether it records student data has not been established.";
    return [BUCKETS.OWNERSHIP, `${detail} A public Launch button is an unsupervised link, so publishing it needs someone who understands BOW's obligations to children.${d.notes ? ` Recorded: ${d.notes}` : ""}`];
  }
  if (verdict.reason === "insufficient-public-copy") {
    return [BUCKETS.METADATA, "Reachable and working, but the description is too thin to publish."];
  }
  return [BUCKETS.OWNERSHIP, "Does not fit a mechanical rule. Someone needs to look at it."];
}

const records = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")));

const queue = new Map(Object.values(BUCKETS).map((b) => [b.n, []]));
const privacy = [];
let playable = 0;

for (const rec of records) {
  const verdict = assess(rec);
  if (hasPersonalData(rec)) {
    privacy.push({
      rec,
      blockers: (rec.governance.health.knownBlockers ?? []).filter((b) => PERSONAL_DATA.test(b)),
    });
  }
  if (verdict.state === "available") { playable += 1; continue; }
  const [bucket, why] = classify(rec, verdict);
  queue.get(bucket.n).push({ rec, why });
}

// Separately: records that ARE published but whose cards are thinner than they
// should be. Not blockers, but the difference between a usable card and a good one.
const thin = [];
for (const rec of records) {
  if (assess(rec).state !== "available") continue;
  const gaps = [];
  if (!rec.product.duration || (rec.product.duration.minutes == null && rec.product.duration.minMinutes == null)) gaps.push("no duration");
  if (!(rec.product.gradeBands ?? []).length) gaps.push("no grade band");
  if (gaps.length) thin.push({ id: rec.id, title: rec.product.title, gaps });
}

const total = records.length;
const inQueue = [...queue.values()].reduce((n, xs) => n + xs.length, 0);

const lines = [];
const w = (s = "") => lines.push(s);

w("# Internal work queue");
w();
w("<!-- GENERATED by scripts/build-queue.mjs. Do not edit by hand; re-run it. -->");
w();
w(`Generated ${new Date().toISOString().slice(0, 10)} from ${total} registry records.`);
w();
w(`**${playable} are publicly playable today.** The other ${inQueue} are below, grouped by what`);
w("would actually have to happen to change that.");
w();
if (privacy.length) {
  w("## Handle first — personal data in a repository");
  w();
  w(`${privacy.length} record${privacy.length === 1 ? " has" : "s have"} a real person's details committed as`);
  w("leftover test data. This is not a scheduling question and it does not belong in a queue");
  w("sorted by effort, so it is listed here regardless of what else is true of the record.");
  w();
  for (const { rec, blockers } of privacy) {
    w(`- **${rec.product.title}** (\`${rec.id}\`) — ${blockers.join(" ")}`);
  }
  w();
  w("Neither is published, and the public build could not have published this field in any");
  w("case. The exposure is the repository itself.");
  w();
  w("---");
  w();
}
w("| # | Group | Count |");
w("| --- | --- | --- |");
for (const b of Object.values(BUCKETS)) w(`| ${b.n} | ${b.title} | ${queue.get(b.n).length} |`);
w();
w("---");

for (const b of Object.values(BUCKETS)) {
  const items = queue.get(b.n);
  w();
  w(`## ${b.n}. ${b.title} — ${items.length}`);
  w();
  w(b.blurb);
  if (!items.length) {
    w();
    w("*Nothing in this group.*");
    continue;
  }
  for (const { rec, why } of items) {
    w();
    w(`### ${rec.product.title}`);
    w();
    w(`\`${rec.id}\` · ${rec.governance.maturity} · health ${rec.governance.health.technical}`);
    w();
    w(why);
    const blockers = rec.governance.health.knownBlockers ?? [];
    if (blockers.length) {
      w();
      for (const bl of blockers) w(`- ${bl}`);
    }
  }
}

w();
w("---");
w();
w("## Published, but the card could be better");
w();
if (thin.length) {
  w(`${thin.length} of the ${playable} published simulations are missing a field a teacher looks for first.`);
  w("None of this blocks publication; all of it makes a card more useful. A duration cannot be");
  w("guessed from the outside — it needs someone to run the thing and time it.");
  w();
  w("| Simulation | Missing |");
  w("| --- | --- |");
  for (const t of thin) w(`| ${t.title} | ${t.gaps.join(", ")} |`);
} else {
  w("Every published simulation states a duration and a grade band.");
}

w();
w("---");
w();
w("## On ownership");
w();
w("Every record in this registry is `UNOWNED`, and nothing above assigns an owner.");
w("That is deliberate and it is not an oversight to be tidied up by a script.");
w();
w("Commit history answers \"who typed the most here\", which is routinely not the person");
w("accountable for whether a simulation is good, whether it should exist, or whether it");
w("is ready for students. Putting a name against work from a `git log` would manufacture");
w("an accountability that nobody agreed to, and it would look authoritative while being");
w("wrong. Group 6 therefore stops at naming the decision.");

writeFileSync(join(ROOT, "docs", "work-queue.md"), lines.join("\n") + "\n");
console.log(`docs/work-queue.md: ${inQueue} items queued, ${playable} publicly playable.`);
for (const b of Object.values(BUCKETS)) {
  console.log(`  ${b.n}. ${b.title.padEnd(38)} ${String(queue.get(b.n).length).padStart(2)}`);
}
console.log(`  (plus ${thin.length} published cards missing a duration or grade band)`);
