#!/usr/bin/env node
/**
 * Downloads the four BOW typefaces once and stores them, base64-encoded, in
 * data/fonts.json so the public page can embed them.
 *
 * Why embed rather than link to the Google Fonts CDN:
 *   - the audience is schools, and a linked webfont means every student browser
 *     makes a request to a third party just to read a page BOW controls;
 *   - the page is meant to work as a single file from any host, including from
 *     disk and from behind a school filter that blocks fonts.googleapis.com;
 *   - it makes the artefact self-contained, which is the property that lets it
 *     be dropped into the Next.js site, a static host or an email attachment
 *     without changing behaviour.
 *
 * Only the latin subset is fetched, which is what keeps this to ~100KB rather
 * than megabytes.
 *
 * Run: node scripts/fetch-fonts.mjs     (rarely — output is checked in)
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// A modern browser UA is required or the API returns .ttf instead of .woff2.
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FAMILIES = [
  { css: "Barlow+Condensed:wght@600;900", family: "Barlow Condensed" },
  { css: "Newsreader:opsz,wght@6..72,400;6..72,500", family: "Newsreader" },
  { css: "Inter:wght@400;500;600", family: "Inter" },
  { css: "IBM+Plex+Mono:wght@400;500", family: "IBM Plex Mono" },
];

const faces = [];

for (const { css, family } of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${css}&display=swap`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${family}: css ${res.status}`);
  const sheet = await res.text();

  // Keep only the latin block; latin-ext/cyrillic/greek are dead weight here.
  const blocks = sheet.split("/*").filter((b) => b.trimStart().startsWith("latin *"));
  if (!blocks.length) throw new Error(`${family}: no latin subset found`);

  for (const block of blocks) {
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1].trim();
    const style = block.match(/font-style:\s*([^;]+);/)?.[1].trim() ?? "normal";
    const src = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
    if (!src || !weight) continue;
    const font = await fetch(src, { headers: { "User-Agent": UA } });
    if (!font.ok) throw new Error(`${family} ${weight}: woff2 ${font.status}`);
    const buf = Buffer.from(await font.arrayBuffer());
    faces.push({ family, weight, style, b64: buf.toString("base64") });
    console.log(`${family.padEnd(18)} ${weight.padEnd(10)} ${(buf.length / 1024).toFixed(1)} KB`);
  }
}

// Newsreader and Inter ship as VARIABLE fonts: the API returns byte-identical
// files for weight 400, 500 and 600, so storing one face per weight triples the
// page for nothing. Collapse identical payloads into a single face declaring a
// weight range, which is what a variable font wants anyway.
const byPayload = new Map();
for (const f of faces) {
  const key = `${f.family}|${f.style}|${f.b64.length}|${f.b64.slice(0, 64)}`;
  if (!byPayload.has(key)) byPayload.set(key, { ...f, weights: [] });
  byPayload.get(key).weights.push(f.weight);
}

const deduped = [...byPayload.values()].map(({ family, style, b64, weights }) => {
  const nums = weights.flatMap((w) => w.split(/\s+/).map(Number)).filter(Number.isFinite);
  const lo = Math.min(...nums), hi = Math.max(...nums);
  return { family, style, weight: lo === hi ? String(lo) : `${lo} ${hi}`, b64 };
});

writeFileSync(join(ROOT, "data", "fonts.json"), JSON.stringify({ faces: deduped }, null, 0) + "\n");
const total = deduped.reduce((n, f) => n + f.b64.length, 0);
console.log(`\ndata/fonts.json: ${faces.length} faces collapsed to ${deduped.length}, ${(total / 1024 / 1.37).toFixed(0)} KB of font data.`);
for (const f of deduped) console.log(`  ${f.family.padEnd(18)} ${f.weight}`);
