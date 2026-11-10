/**
 * Profile photo — resolved in ONE place so the file name / format can change
 * without touching any component.
 *
 *   profile.json → "avatar": "sajith-jeewantha"        (name without extension)
 *                  "avatarPosition": "42% 32%"           (focus point for crops)
 *
 * Supported: .jpg .jpeg .png .webp .avif
 * Not supported on the web: .heic / .heif (iPhone) → run `npm run photo -- <file>`.
 */
import type { ImageMetadata } from 'astro';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import profile from '../data/profile.json';

const SUPPORTED = /\.(jpe?g|png|webp|avif)$/i;
const UNSUPPORTED = /\.(heic|heif|tiff?|bmp|raw|cr2|nef|dng)$/i;

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}', {
  eager: true,
});
// List the folder from disk (build runs from the project root) so unsupported
// formats like .heic can be explained — without Vite trying to bundle them.
const allFiles = (() => {
  try {
    return readdirSync(join(process.cwd(), 'src/assets/images'));
  } catch {
    return [];
  }
})();

const base = (p: string) => p.split('/').pop()!;
const stem = (p: string) => base(p).replace(/\.[^.]+$/, '');

function resolveAvatar(): ImageMetadata {
  const wanted = profile.avatar;
  const wantedStem = stem(wanted);

  // 1) exact file name, 2) same name with any supported extension
  const match =
    Object.entries(images).find(([p]) => base(p) === wanted) ??
    Object.entries(images).find(([p]) => stem(p) === wantedStem && SUPPORTED.test(p));
  if (match) return match[1].default;

  const unsupported = allFiles.find((p) => stem(p) === wantedStem && UNSUPPORTED.test(p));
  if (unsupported) {
    throw new Error(
      `Profile photo "${base(unsupported)}" is in a format browsers and Astro can't use.\n` +
        `Convert it with:  npm run photo -- src/assets/images/${base(unsupported)}\n` +
        `(creates ${wantedStem}.jpg, resized and with location metadata removed)`,
    );
  }

  const available = allFiles.map(base).filter((f) => !f.startsWith('.'));
  throw new Error(
    `Profile photo "${wanted}" not found in src/assets/images.\n` +
      `Set "avatar" in src/data/profile.json to one of: ${available.join(', ') || '(folder is empty)'}`,
  );
}

export const avatar = resolveAvatar();

/** Absolute path of the photo on disk — for build-time tools (e.g. social cards) that read the file directly. */
export const avatarFile: string = join(
  process.cwd(),
  'src/assets/images',
  allFiles.find((p) => p === profile.avatar) ??
    allFiles.find((p) => stem(p) === stem(profile.avatar) && SUPPORTED.test(p))!,
);

/** CSS object-position style focus point used when the photo is cropped (e.g. to a circle). */
export const avatarPosition: string = (profile as { avatarPosition?: string }).avatarPosition ?? 'center';
