/**
 * Display order for skill groups on the public site. The site renders
 * groups in this order; anything with an unrecognised category falls to
 * the end under "Other".
 *
 * Adding a group here is all that's needed — the backend stores the
 * category as a free string, so no deploy of the API is required.
 */
export const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend & Databases",
  "AI & Automation",
  "Payments",
  "DevOps & Tooling",
  "Other",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const DEFAULT_CATEGORY: SkillCategory = "Other";

/** Sort index for a category, with unknown values last. */
export const categoryRank = (category?: string): number => {
  const index = SKILL_CATEGORIES.indexOf(
    (category ?? "") as SkillCategory
  );
  return index === -1 ? SKILL_CATEGORIES.length : index;
};
