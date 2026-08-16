#!/usr/bin/env node
/**
 * Assigns product.contexts — the "what world is this set in" facet.
 *
 * WHY THIS IS A TABLE AND NOT A REGEX. The obvious implementation is to keyword-
 * match titles and summaries. That was tried and it is not good enough: "Why the
 * Draft Isn't a Ranking" matched `city` on the word "building", and "Westbrook
 * Wolves" matched four contexts at once. Metadata that is confidently wrong is
 * worse than metadata that is absent, and this registry's whole premise is not
 * inventing facts.
 *
 * So every assignment below was made by reading that record's own title, summary
 * and whatStudentsDo, and is recorded as `contextBasis: "editorial"` — an
 * honest description of what it is. A record with no defensible context simply
 * gets none.
 *
 * Run: node scripts/seed-contexts.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");

// id -> contexts. Ordered most-specific-first; a named league beats the generic
// front-office context, because "football" is what a teacher actually searches.
const CONTEXTS = {
  "analytics-lab": ["multi-sport"],
  "bow-boss-sim-economic-summit": ["city-and-policy"],
  "bow-sports-empire": ["sports-front-office", "business"],
  "bow-universe-sandbox": ["sports-front-office"],
  "bow-zoom-discovery-game": ["sports-front-office"],
  "bsc-pre-course-front-office": ["sports-front-office"],
  "bsc-pregame-cap-simulator": ["sports-front-office"],
  "business-economics-challenge": ["business"],
  "candlecart-business-strategy": ["business"],
  "cap-crash": ["sports-front-office"],
  "creative-business-simulation": ["personal-finance", "business"],
  "curve-room-2": ["sports-front-office"],
  "deal-dynasty": ["business"],
  "decision-room-memo": ["sports-front-office"],
  "decision-room-simulator": ["sports-front-office"],
  deliverempire: ["business"],
  "delivery-empire-strategy": ["business"],
  "draft-room-fit-vs-bpa": ["sports-front-office"],
  "eastfield-eagles": ["sports-front-office"],
  "endorsement-empire": ["media-and-brand"],
  "entrepreneurship-lab-unit-economics": ["business"],
  "espn-crisis-manager": ["media-and-brand", "sports-front-office"],
  "fill-my-building": ["sports-front-office"],
  "final-mastery-simulation-201": ["sports-front-office"],
  "front-office-build-the-roster": ["sports-front-office"],
  "front-office-challenge": ["sports-front-office"],
  "front-office-city-district-a": ["city-and-policy", "sports-front-office"],
  "front-office-city-nfl-capital-run": ["football", "city-and-policy"],
  "front-office-dashboard": ["sports-front-office"],
  "front-office-draft": ["sports-front-office"],
  "front-office-the-homestand": ["baseball"],
  "gauntlet-l1-market-master": ["business"],
  "gauntlet-l2-supply-chain-crisis": ["business"],
  "gauntlet-l3-economic-policy-simulator": ["city-and-policy"],
  "gm-challenge-efficiency-frontier": ["sports-front-office"],
  "gm-decision-game": ["sports-front-office"],
  "gm-trade-challenge": ["sports-front-office"],
  "ground-zero": ["sports-front-office"],
  "highway-world-challenge-mode": ["sports-front-office"],
  "highway-world-episode-1": ["city-and-policy", "sports-front-office"],
  "luxury-tax-in-action": ["sports-front-office"],
  "mega-city-tycoon": ["city-and-policy"],
  "mlb-agent-simulator": ["baseball"],
  "mlb-money-maker": ["baseball", "media-and-brand"],
  "model-risk-false-confidence": ["sports-front-office"],
  "module-4-econ-final-101": ["sports-front-office"],
  "moneyball-draft-challenge": ["baseball"],
  "nba-surplus-value-championship": ["basketball"],
  "nfl-system-stress-test": ["football"],
  "plan-under-pressure": ["personal-finance"],
  "process-vs-results-lab": ["football"],
  "reputation-and-the-long-game": ["business"],
  "risk-volatility-gm-sim": ["sports-front-office"],
  "signal-engine": ["sports-front-office"],
  "small-markets-big-money": ["sports-front-office"],
  "sports-analytics-team-builder": ["multi-sport"],
  "startup-tycoon": ["business"],
  "stat-inventor": ["multi-sport"],
  "stats-vs-scouts": ["basketball"],
  "structural-leverage-sim": ["business"],
  "tank-commander": ["sports-front-office"],
  "the-asset-everyone-wants": ["sports-front-office"],
  "the-blockbuster": ["sports-front-office"],
  "the-dumpster-fire": ["sports-front-office"],
  "the-front-office": ["sports-front-office"],
  "the-front-office-early-build": ["sports-front-office"],
  "the-gms-model": ["sports-front-office"],
  "the-league-in-a-box": ["sports-front-office"],
  "the-lebron-files": ["basketball"],
  "the-rookie-deal": ["sports-front-office"],
  "trade-deadline-war-room-101": ["sports-front-office"],
  "trade-deadline-war-room-201": ["sports-front-office"],
  "venture-capital-tycoon": ["investing"],
  "war-room-nba-decision-simulator": ["basketball"],
  "westbrook-wolves": ["basketball"],
  "why-the-draft-isnt-a-ranking": ["sports-front-office"],
};

let written = 0;
const missing = [];
for (const [id, contexts] of Object.entries(CONTEXTS)) {
  const path = join(SIM_DIR, `${id}.json`);
  if (!existsSync(path)) {
    missing.push(id);
    continue;
  }
  const rec = JSON.parse(readFileSync(path, "utf8"));
  rec.product.contexts = contexts;
  rec.product.contextBasis = "editorial";
  // Rewrite with the key order the schema declares, so diffs stay readable.
  writeFileSync(path, JSON.stringify(rec, null, 2) + "\n");
  written++;
}

console.log(`contexts written to ${written} records.`);
if (missing.length) console.error(`No such record: ${missing.join(", ")}`);
process.exit(missing.length ? 1 : 0);
