/**
 * Where the public site lives.
 *
 * This is only needed by the dashboard, and only to preview images that
 * are stored as site-relative paths. Nothing written to the database
 * should contain a domain — store "/images/blog/cover.png", not
 * "https://example.com/images/blog/cover.png". The public site then
 * resolves it against whatever origin it happens to be served from, so
 * moving to a custom domain needs no data migration.
 *
 * Override per environment with VITE_SITE_URL in `.env.local`.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://mdemonsheikh.vercel.app"
).replace(/\/+$/, "");

/**
 * Turns whatever is in an image field into something previewable.
 * Absolute URLs (old records, third-party hosts) pass through untouched;
 * relative paths get the site origin attached.
 */
export const resolveAssetUrl = (value: string): string => {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";

  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }

  return `${SITE_URL}/${trimmed.replace(/^\/+/, "")}`;
};

/** True when the value is a site-relative path rather than a full URL. */
export const isRelativeAsset = (value: string): boolean => {
  const trimmed = (value ?? "").trim();
  return Boolean(trimmed) && !/^(https?:)?\/\//i.test(trimmed) && !trimmed.startsWith("data:");
};
