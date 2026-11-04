#!/usr/bin/env node
/**
 * Convert any photo (including iPhone HEIC/HEIF) into a web-ready JPEG in
 * src/assets/images/ — resized, auto-rotated, and with ALL metadata removed
 * (iPhone photos contain GPS location in their EXIF data).
 *
 *   npm run photo -- <input> [output-name]
 *   npm run photo -- src/assets/images/sajith-jeewantha.heic
 *   npm run photo -- ~/Downloads/IMG_1234.HEIC sajith-jeewantha
 *
 * HEIC needs macOS (uses the built-in `sips`). On Linux/Windows, export the
 * photo as JPEG from your phone/Photos app first, or install `heif-convert`.
 */
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir, platform } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX = 1600; // longest side in px — plenty for a portrait shown at ≤ 400px (2× retina)
const QUALITY = 85;

const [input, name] = process.argv.slice(2);
if (!input) {
  console.error('Usage: npm run photo -- <input-image> [output-name]');
  process.exit(1);
}
const src = resolve(input);
if (!existsSync(src)) {
  console.error(`File not found: ${src}`);
  process.exit(1);
}

const ext = extname(src).toLowerCase();
const outName = (name ?? basename(src, extname(src))).replace(/\.(jpe?g)$/i, '');
const outDir = fileURLToPath(new URL('../src/assets/images/', import.meta.url));
const out = join(outDir, `${outName}.jpg`);

let source = src;
let tmp;
if (ext === '.heic' || ext === '.heif') {
  // sharp's prebuilt binaries can't decode HEVC — use a system converter.
  tmp = mkdtempSync(join(tmpdir(), 'photo-'));
  const converted = join(tmp, 'converted.jpg');
  try {
    if (platform() === 'darwin') {
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '100', src, '--out', converted], { stdio: 'ignore' });
    } else {
      execFileSync('heif-convert', ['-q', '100', src, converted], { stdio: 'ignore' });
    }
  } catch {
    console.error(
      'Could not convert HEIC on this system.\n' +
        '  • macOS: uses the built-in `sips` (should just work)\n' +
        '  • Linux: install libheif-examples (provides `heif-convert`)\n' +
        '  • Otherwise: export the photo as JPEG from your phone / Photos app and run this again.',
    );
    process.exit(1);
  }
  source = converted;
}

const info = await sharp(source)
  .rotate() // respect EXIF orientation, then drop it
  .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile(out); // sharp writes no metadata unless asked → GPS/EXIF removed

if (tmp) rmSync(tmp, { recursive: true, force: true });

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`✓ ${basename(src)} (${kb(statSync(src).size)}) → src/assets/images/${outName}.jpg (${info.width}×${info.height}, ${kb(info.size)}, metadata removed)`);
console.log(`  Set "avatar": "${outName}" in src/data/profile.json, and adjust "avatarPosition" if the face is off-centre.`);
if (ext !== '.jpg' && ext !== '.jpeg' && src.startsWith(outDir)) {
  console.log(`  You can delete the original: ${input}`);
}
