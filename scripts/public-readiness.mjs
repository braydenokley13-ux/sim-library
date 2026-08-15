/**
 * PUBLIC READINESS — the one place that decides what a stranger may click.
 *
 * This is deliberately a DIFFERENT question from maturity, and the two must
 * never be collapsed:
 *
 *   maturity        "how much does BOW vouch for this?"   — earned, slow, strict
 *   public readiness "is this safe and sensible to click?" — mechanical, fast
 *
 * Collapsing them is what produced an empty public library: every record sits at
 * PLAYABLE or below because no student has ever been recorded using one, so a
 * maturity-gated public site can never list anything, however well the thing
 * runs. That is the wrong answer to the wrong question. A visitor clicking
 * Launch is not asking whether BOW has validated the pedagogy; they are asking
 * whether a page opens and does something.
 *
 * So readiness is computed here from observable facts only, never hand-set, and
 * the single human input is a veto (`governance.publicRelease.hold`) which can
 * only ever REMOVE something. Nothing can be hand-promoted into the public site.
 *
 * Because nothing is student-tested, the public label is "Beta" everywhere.
 * The words Tested, Validated, Proven and Core are forbidden in public output
 * and that is asserted in tests, not merely intended.
 */

/** The only public maturity vocabulary that exists. Anything else is a bug. */
export const PUBLIC_LABEL = "Beta";
export const PUBLIC_LABEL_MEANING =
  "Built and playable. Free to try. Not yet studied in a classroom.";

/** Words that would overstate what BOW actually knows. Asserted against output. */
export const FORBIDDEN_PUBLIC_WORDS = ["tested", "validated", "proven", "core"];

/**
 * Why a record is not on the public site. These map 1:1 onto the internal work
 * queue, so "excluded" is always actionable rather than a shrug.
 */
export const EXCLUSION = {
  NOT_ACTIVE: "not-active",
  NO_LAUNCH: "no-launch-url",
  UNVERIFIED: "launch-url-not-verified",
  UNHEALTHY: "health-not-confirmed",
  THIN_COPY: "insufficient-public-copy",
  HELD: "held-by-bow",
};

const isNonEmpty = (s, min) => typeof s === "string" && s.trim().length >= min;

/**
 * @returns {{eligible: boolean, reason: string|null, launchUrl: string|null}}
 */
export function assess(rec) {
  const p = rec.product ?? {};
  const g = rec.governance ?? {};
  const no = (reason) => ({ eligible: false, reason, launchUrl: null });

  // 1. Superseded and archived work is not shown. Visitors should not be able to
  //    reach a build BOW has already replaced.
  if (g.visibility !== "active") return no(EXCLUSION.NOT_ACTIVE);

  // 2. An explicit human veto. Only ever subtracts, and must carry a reason so
  //    the decision is reviewable rather than folklore.
  if (g.publicRelease?.hold === true) return no(EXCLUSION.HELD);

  // 3. There must be somewhere to go. A `repo` resource is not a launch: sending
  //    a teacher to source code and calling it Play is the precise lie this
  //    registry exists to prevent, so only `live-url` counts.
  const launch = (p.runResources ?? []).find((r) => r.kind === "live-url" && r.url);
  if (!launch) return no(EXCLUSION.NO_LAUNCH);

  // 4. That URL must have been confirmed reachable by the probe, and recently
  //    enough to mean something. An unprobed URL is a guess.
  if (!launch.verified) return no(EXCLUSION.UNVERIFIED);

  // 5. Health is the probe's verdict. `needs-attention` and `broken` stay off the
  //    public site even when the URL resolves, because resolving is not working.
  if (g.health?.technical !== "healthy") return no(EXCLUSION.UNHEALTHY);

  // 6. A visitor must be able to tell what it is before clicking. A record with
  //    no real description is not ready to be seen, however well it runs.
  if (!isNonEmpty(p.summary, 20) || !isNonEmpty(p.whatStudentsDo, 60)) {
    return no(EXCLUSION.THIN_COPY);
  }

  return { eligible: true, reason: null, launchUrl: launch.url };
}

/** Convenience: partition a whole registry in one pass. */
export function partition(records) {
  const included = [];
  const excluded = [];
  for (const rec of records) {
    const verdict = assess(rec);
    (verdict.eligible ? included : excluded).push({ rec, verdict });
  }
  return { included, excluded };
}
