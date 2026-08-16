#!/usr/bin/env node
/**
 * Renders the PUBLIC library page from public/simulations.json.
 *
 * It reads the built public payload, never data/simulations/*.json directly.
 * That is the point: the page physically cannot render a field the public build
 * did not already allow through, so there is one leakage gate rather than two
 * places to keep in step.
 *
 * Output: public/index.html — a single self-contained file. It can be opened
 * from disk, dropped on any static host, or lifted into the Next.js site as a
 * component; it uses bowsportscapital.com's own design tokens so the last of
 * those needs no restyle.
 *
 * Run: node scripts/build-library.mjs   (after build-public.mjs)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_JSON = join(ROOT, "public", "simulations.json");
const TEMPLATE = join(ROOT, "scripts", "library-template.html");
const OUT = join(ROOT, "public", "index.html");

if (!existsSync(PUBLIC_JSON)) {
  console.error("public/simulations.json is missing. Run `npm run build:public` first.");
  process.exit(1);
}

const payload = JSON.parse(readFileSync(PUBLIC_JSON, "utf8"));

/**
 * Programs strip. This is where a track is described as a PRODUCT, which is a
 * different question from whether any individual simulation is finished.
 *
 * Track 301 is the case that forced the distinction. It is BOW's most advanced
 * track and is actively being built; one of its repositories holds configuration
 * and no gameplay. That single thin repo says nothing about the track, and the
 * Library must not let it. So maturity of a TRACK is stated here, explicitly,
 * and the count beside it is computed from what actually launches today.
 */
const TRACK_STATUS = {
  "pre-course": { order: 0, status: "established" },
  "track-101": { order: 1, status: "established" },
  "track-201": { order: 2, status: "established" },
  "track-301": { order: 3, status: "in-development" },
  gauntlet: { order: 4, status: "established" },
  "analytics-lab": { order: 5, status: "established" },
  "bow-website": { order: 6, status: "established" },
  "highway-world": { order: 7, status: "in-development" },
  "front-office-city": { order: 8, status: "in-development" },
  "bonus-gm-sims": { order: 9, status: "in-development" },
  "decision-challenges": { order: 10, status: "in-development" },
  "entrepreneurship-lab": { order: 11, status: "in-development" },
};

const byTrack = new Map();
for (const s of payload.simulations) {
  if (!s.track) continue;
  if (!byTrack.has(s.track.id)) byTrack.set(s.track.id, { ...s.track, available: 0, inDev: 0 });
  const t = byTrack.get(s.track.id);
  if (s.availability === "available") t.available += 1; else t.inDev += 1;
}

const tracks = [...byTrack.values()]
  .map((t) => {
    const cfg = TRACK_STATUS[t.id] ?? { order: 99, status: "established" };
    // A track with nothing playable must not advertise "0 ready to play". It
    // says what is true instead: work is underway and none of it opens yet.
    return {
      id: t.id,
      name: t.name,
      note: cfg.status === "in-development" ? `${t.note} — actively being built` : t.note,
      available: t.available,
      stat: t.available > 0
        ? `${t.available} ready to play`
        : `${t.inDev} in development`,
      inDevelopment: cfg.status === "in-development",
      order: cfg.order,
    };
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
  .map(({ order, ...t }) => t);

// Fonts are embedded, not linked. See scripts/fetch-fonts.mjs for why: the
// audience is schools, and the page should not make every student browser call
// a third party in order to render BOW's own typography.
const FONTS_JSON = join(ROOT, "data", "fonts.json");
const fontCss = existsSync(FONTS_JSON)
  ? JSON.parse(readFileSync(FONTS_JSON, "utf8")).faces
      .map((f) =>
        `@font-face{font-family:"${f.family}";font-style:${f.style};font-weight:${f.weight};` +
        `font-display:swap;src:url(data:font/woff2;base64,${f.b64}) format("woff2")}`)
      .join("\n")
  : "";
if (!fontCss) console.warn("data/fonts.json missing — the page will fall back to system fonts.");

const html = readFileSync(TEMPLATE, "utf8")
  .replace("/*__FONTS__*/", fontCss)
  .replace("/*__DATA__*/null", JSON.stringify(payload))
  .replace("/*__TRACKS__*/null", JSON.stringify(tracks));

// The template must actually have been filled. A silent no-op replace would ship
// a page that renders nothing and looks like a data problem.
if (html.includes("/*__DATA__*/") || html.includes("/*__TRACKS__*/")) {
  console.error("REFUSING TO WRITE: template placeholders were not substituted.");
  process.exit(1);
}

writeFileSync(OUT, html);
const kb = (html.length / 1024).toFixed(0);
console.log(`public/index.html: ${payload.simulations.length} simulations, ${tracks.length} programs, ${kb} KB.`);
for (const t of tracks) {
  console.log(`  ${t.name.padEnd(24)} ${t.stat.padEnd(22)}${t.inDevelopment ? "[in development]" : ""}`);
}
