#!/usr/bin/env node
/**
 * LAUNCH TRUTH — does the Launch button open something playable?
 *
 * probe-health.mjs answers a narrower question: does the URL respond? That is
 * necessary and nowhere near sufficient. A 200 is returned by a GitHub repo
 * page, by a sign-in wall, by a directory index, and by a build whose script
 * tag 404s so the page renders blank. Every one of those would be published as
 * "Play now" on the strength of a status code alone.
 *
 * So this fetches each launch URL and asks the questions a visitor would:
 *
 *   - did it end up somewhere else?          (redirect off-site)
 *   - is it a repository page?               (source code sold as a game)
 *   - is it a sign-in wall?                  (a public card behind a login)
 *   - is there anything interactive on it?   (script, canvas, controls)
 *   - do its own assets load?                (a blank page is not a game)
 *   - will it work on a phone?               (no viewport = pinch-and-zoom)
 *
 *   node scripts/verify-launch.mjs            # every active record
 *   node scripts/verify-launch.mjs --public   # only what the public build ships
 *   node scripts/verify-launch.mjs --json     # machine-readable report
 *
 * Exit code is non-zero when a PUBLISHED record fails, so this can gate a
 * release. Failures on unpublished records are reported, never fatal.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assess } from "./public-readiness.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIM_DIR = join(ROOT, "data", "simulations");
const PUBLIC_ONLY = process.argv.includes("--public");
const AS_JSON = process.argv.includes("--json");
const TIMEOUT = 25000;
const CONCURRENCY = 6;

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const get = async (url, method = "GET") => {
  const res = await fetch(url, {
    method,
    redirect: "follow",
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  return res;
};

/** Resolve a possibly-relative asset reference against the page it appeared on. */
const resolveAsset = (ref, base) => {
  if (/^(data:|blob:|javascript:|#|mailto:)/i.test(ref)) return null;
  try {
    return new URL(ref, base).href;
  } catch {
    return null;
  }
};

async function verify(url) {
  const findings = [];
  const note = (code, detail) => findings.push({ code, detail });

  let res;
  try {
    res = await get(url);
  } catch (e) {
    note("unreachable", `${e.name}: ${e.message}`);
    return { url, status: null, findings };
  }

  const status = res.status;
  const finalUrl = res.url;
  if (status >= 400) note("http-error", `HTTP ${status}`);

  // A redirect within the same origin is normal (trailing slash, index.html).
  // A redirect to a DIFFERENT host means the card points somewhere it does not
  // claim to, which is the case worth surfacing.
  try {
    if (new URL(finalUrl).host !== new URL(url).host) {
      note("redirected-off-site", `${url} → ${finalUrl}`);
    }
  } catch { /* malformed URL is already reported elsewhere */ }

  const html = await res.text().catch(() => "");
  const lower = html.toLowerCase();

  // A repository page. Checked on the FINAL url and on unmistakable GitHub
  // chrome, not on the word "github" — plenty of legitimate games credit a repo.
  if (/^https?:\/\/(www\.)?github\.com\//.test(finalUrl)) {
    note("repository-not-a-game", `resolves to ${finalUrl}`);
  } else if (lower.includes('id="repository-container-header"') || lower.includes("data-testid=\"repos-header\"")) {
    note("repository-not-a-game", "page renders GitHub repository chrome");
  }

  // A sign-in wall. Redirect-to-auth is the strong signal; body text alone is
  // too weak, since a game may legitimately mention accounts.
  if (/\/(sign-in|signin|login|auth)(\/|\?|$)/i.test(finalUrl)) {
    note("login-gated", `lands on ${finalUrl}`);
  }

  // Is there anything to do here? A directory listing and a README render both
  // return 200 and neither is playable.
  const isInteractive = (h) =>
    /<script[\s>]/i.test(h) || /<canvas[\s>]/i.test(h) ||
    /<button[\s>]/i.test(h) || /<input[\s>]/i.test(h) || /<select[\s>]/i.test(h);

  if (!isInteractive(html)) {
    // Several BOW simulations open on a HUB page — a title card whose only job
    // is to link into `game.html` or `track101/index.html`. That page has no
    // script of its own and is still a perfectly good front door, so treating
    // it as broken was a false positive on real, working experiences.
    //
    // Following the hop is also strictly stronger than not: a hub whose links
    // all 404 is a dead end that the naive check would have passed.
    const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)]
      .map((m) => resolveAsset(m[1], finalUrl))
      .filter((u) => u && new URL(u).host === new URL(finalUrl).host && u !== finalUrl)
      .filter((u) => /\.html?($|[?#])/i.test(u) || /\/$/.test(new URL(u).pathname));

    const tried = [...new Set(links)].slice(0, 4);
    // Follow every candidate rather than stopping at the first hit, because the
    // COUNT is what separates the two very different pages this branch catches.
    const playable = [];
    for (const link of tried) {
      try {
        const r = await get(link);
        if (r.status < 400 && isInteractive(await r.text())) playable.push(link);
      } catch { /* try the next one */ }
    }

    if (playable.length >= 2) {
      // A page offering two or more distinct playable routes is a mode-select
      // screen — tutorial vs scored run, or one episode of several. That is a
      // deliberate front door presenting a choice the student is meant to make,
      // not a click standing between them and the experience. Flagging it as
      // degraded taught the release check to cry wolf about good design.
      note("entry-is-a-mode-select", `front door offering ${playable.length} playable routes: ${playable.join(", ")}`);
    } else if (playable.length === 1) {
      note("entry-is-a-hub", `title page; the experience is one click away at ${playable[0]}`);
    } else if (tried.length) {
      note("nothing-interactive", `hub page whose ${tried.length} onward link(s) lead nowhere playable`);
    } else {
      note("nothing-interactive", "no script, canvas, button, input or select, and nothing to click through to");
    }
  }
  if (/<title>index of /i.test(html) || lower.includes("<h1>index of")) {
    note("directory-listing", "the URL serves a file listing, not a page");
  }
  if (html.length < 500) note("suspiciously-empty", `${html.length} bytes of HTML`);

  // Does the build actually load? A single missing bundle is the difference
  // between a game and a white screen, and it returns 200 on the HTML either way.
  const refs = [
    ...[...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]),
    ...[...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]),
    ...[...html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']stylesheet["']/gi)].map((m) => m[1]),
  ];
  const assets = [...new Set(refs.map((r) => resolveAsset(r, finalUrl)).filter(Boolean))]
    .filter((a) => new URL(a).host === new URL(finalUrl).host) // first-party only
    .slice(0, 12);

  for (const a of assets) {
    try {
      let r = await get(a, "HEAD");
      if (r.status === 405 || r.status === 501) r = await get(a);
      if (r.status >= 400) note("broken-asset", `${r.status} ${a}`);
    } catch (e) {
      note("broken-asset", `${e.name} ${a}`);
    }
  }

  // Mobile. Without a viewport meta a page renders at desktop width on a phone
  // and every control needs pinch-and-zoom — for a classroom that is a failure.
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) {
    note("no-mobile-viewport", "no viewport meta tag");
  }

  return { url, status, finalUrl, title: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null, findings };
}

// ── gather targets ──────────────────────────────────────────────────────────
const records = readdirSync(SIM_DIR).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(readFileSync(join(SIM_DIR, f), "utf8")));

const targets = [];
for (const rec of records) {
  const verdict = assess(rec);
  const published = verdict.eligible;
  if (PUBLIC_ONLY && !published) continue;
  if (rec.governance.visibility !== "active" && !published) continue;
  for (const r of rec.product.runResources ?? []) {
    if (r.url && (r.kind === "live-url" || r.kind === "create-class-url")) {
      targets.push({ id: rec.id, kind: r.kind, url: r.url, published });
    }
  }
}

// ── run ─────────────────────────────────────────────────────────────────────
const results = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, targets.length) }, async () => {
    while (cursor < targets.length) {
      const t = targets[cursor++];
      const r = await verify(t.url);
      results.push({ ...t, ...r });
    }
  }),
);
results.sort((a, b) => a.id.localeCompare(b.id) || a.url.localeCompare(b.url));

// ── report ──────────────────────────────────────────────────────────────────
// Some findings mean "this is not a playable experience" and some mean "this is
// playable but degraded". Only the first kind may block a release; conflating
// them would either block on cosmetics or wave through a dead link.
const FATAL = new Set([
  "unreachable", "http-error", "repository-not-a-game", "login-gated",
  "directory-listing", "nothing-interactive", "suspiciously-empty", "redirected-off-site",
]);

// A third kind: an observation worth recording that is not a defect at all. A
// release check that reports good design as a problem gets ignored, and an
// ignored check protects nothing — so these do not make a record "degraded".
const INFORMATIONAL = new Set(["entry-is-a-mode-select"]);

const failures = results.filter((r) => r.findings.some((f) => FATAL.has(f.code)));
const warnings = results.filter(
  (r) => !failures.includes(r) && r.findings.some((f) => !INFORMATIONAL.has(f.code)),
);
const clean = results.filter((r) => !failures.includes(r) && !warnings.includes(r));

if (AS_JSON) {
  writeFileSync(join(ROOT, "public", "launch-verification.json"),
    JSON.stringify({ generated: new Date().toISOString().slice(0, 10), results }, null, 2) + "\n");
  console.log(`public/launch-verification.json: ${results.length} URLs checked.`);
} else {
  console.log(`Checked ${results.length} launch URLs across ${new Set(results.map((r) => r.id)).size} simulations.\n`);
  if (failures.length) {
    console.log(`NOT PLAYABLE (${failures.length}):`);
    for (const r of failures) {
      console.log(`  ✗ ${r.id}${r.published ? " [PUBLISHED]" : ""}`);
      console.log(`    ${r.url}`);
      for (const f of r.findings) console.log(`      ${FATAL.has(f.code) ? "!" : "~"} ${f.code}: ${f.detail}`);
    }
    console.log("");
  }
  if (warnings.length) {
    console.log(`PLAYABLE BUT DEGRADED (${warnings.length}):`);
    for (const r of warnings) {
      console.log(`  ~ ${r.id}${r.published ? " [PUBLISHED]" : ""}`);
      for (const f of r.findings) console.log(`      ${f.code}: ${f.detail}`);
    }
    console.log("");
  }
  console.log(`${clean.length} clean, ${warnings.length} degraded, ${failures.length} not playable.`);
}

const publishedFailures = failures.filter((r) => r.published);
if (publishedFailures.length) {
  console.error(`\nFAILED — ${publishedFailures.length} PUBLISHED simulation(s) do not open a playable experience:`);
  for (const r of publishedFailures) console.error(`  ${r.id} — ${r.url}`);
  process.exit(1);
}
