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

/** Shown on a card with no launch action. Never on anything playable. */
export const IN_DEVELOPMENT_LABEL = "In development";

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
  PREVIEW_HAS_LAUNCH: "preview-flag-on-a-launchable-record",
  STUDENT_DATA: "student-data-needs-a-human-decision",
};

const isNonEmpty = (s, min) => typeof s === "string" && s.trim().length >= min;

/**
 * A record may reach the public site in one of two states:
 *
 *   available       it launches, and the card carries a Launch button
 *   in-development  it does NOT launch, and the card carries no launch action
 *
 * The second exists so BOW can show work that is genuinely underway — Highway
 * World, Front Office City — without either hiding it or lying about it. It is
 * strictly opt-in (`governance.publicRelease.preview`), because the default for
 * something with no way to run it must be silence, not a teaser.
 *
 * The rule that makes this safe: an in-development record must have NO launch
 * URL at all. That removes the failure mode by construction rather than by
 * discipline — there is no path where "In development" and a working Launch
 * button can appear on the same card, and none where a dead button can.
 */
export const STATE = { AVAILABLE: "available", IN_DEVELOPMENT: "in-development", EXCLUDED: "excluded" };

/**
 * @returns {{eligible: boolean, state: string, reason: string|null, launchUrl: string|null}}
 */
export function assess(rec) {
  const p = rec.product ?? {};
  const g = rec.governance ?? {};
  const no = (reason) => ({ eligible: false, state: STATE.EXCLUDED, reason, launchUrl: null });

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

  // The in-development path. Deliberately checked BEFORE the launch requirement
  // and refused if a launch URL exists at all, so the two states can never
  // describe the same record.
  if (g.publicRelease?.preview === true) {
    if (launch) return no(EXCLUSION.PREVIEW_HAS_LAUNCH);
    if (!isNonEmpty(p.summary, 20) || !isNonEmpty(p.whatStudentsDo, 60)) return no(EXCLUSION.THIN_COPY);
    return { eligible: true, state: STATE.IN_DEVELOPMENT, reason: null, launchUrl: null };
  }

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

  // 7. Student data. A public Launch button is an unsupervised link: a child can
  //    reach it from a marketing page with no teacher, no consent and no class
  //    context. A simulation that transmits or retains their data is a different
  //    proposition from one that does not, and that decision belongs to a human
  //    who understands BOW's obligations — not to a build script that noticed
  //    the page loads.
  //
  //    So "yes" is not published automatically, and neither is "unknown": an
  //    unanswered question about children's data is not the same as a "no".
  //    Either can still be published deliberately, by recording the answer.
  const stores = p.studentDataProfile?.storesStudentData;
  if (stores !== "no") return no(EXCLUSION.STUDENT_DATA);

  return { eligible: true, state: STATE.AVAILABLE, reason: null, launchUrl: launch.url };
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
