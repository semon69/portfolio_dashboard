/* eslint-disable @typescript-eslint/no-explicit-any */

// Mirrors the public site's ordering so the dashboard list matches what
// visitors see. Entries have no timestamps, so order is derived from the
// hand-written `timeSpan`, whose format varies between records.

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

// Written as a literal so the escapes aren't filtered through a string first.
const MONTH_YEAR =
  /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?[\s,]*(\d{4})/i;

/** Milliseconds for the start of a range, or null if nothing parses. */
export const experienceStart = (timeSpan?: string): number | null => {
  const text = String(timeSpan ?? "");

  const monthYear = text.match(MONTH_YEAR);
  if (monthYear) {
    const month = MONTHS.indexOf(monthYear[1].toLowerCase());
    return new Date(Number(monthYear[2]), month, 1).getTime();
  }

  const year = text.match(/\b(\d{4})\b/);
  return year ? new Date(Number(year[1]), 0, 1).getTime() : null;
};

/** True while a role is still running ("... – Present"). */
export const isOngoing = (timeSpan?: string): boolean =>
  /present|current|now|ongoing/i.test(String(timeSpan ?? ""));

/** Current role first, then newest start date. Unparseable entries last. */
export const sortExperience = (roles: any[] = []): any[] =>
  [...roles].sort((a, b) => {
    const aOngoing = isOngoing(a?.timeSpan);
    const bOngoing = isOngoing(b?.timeSpan);
    if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;

    const aStart = experienceStart(a?.timeSpan);
    const bStart = experienceStart(b?.timeSpan);
    if (aStart === null && bStart === null) return 0;
    if (aStart === null) return 1;
    if (bStart === null) return -1;

    return bStart - aStart;
  });
