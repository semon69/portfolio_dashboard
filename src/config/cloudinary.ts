/**
 * Cloudinary unsigned uploads.
 *
 * Both values are public by design — an unsigned preset is meant to be
 * callable from the browser. Lock the preset down in the Cloudinary
 * console (folder, allowed formats, max file size) rather than trying to
 * keep the name secret, because it ships in the JS bundle.
 *
 * Set these in `.env.local`:
 *   VITE_CLOUDINARY_CLOUD_NAME=...
 *   VITE_CLOUDINARY_UPLOAD_PRESET=...
 */
export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";

export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";

export const cloudinaryConfigured = Boolean(
  CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET
);

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/** Rejected before upload rather than after a slow round trip. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
