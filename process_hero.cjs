/**
 * Hero image processor — CommonJS version
 * Run from: d:\Site Secretly\secretly-site\
 */
const sharp = require('sharp');
const path  = require('path');

const SRC  = path.join(__dirname, 'public/photo_2026-04-27_21-53-42.jpg');
const DEST = path.join(__dirname, 'public/hero-devices.png');

async function process() {
  console.log('Loading image...');

  const meta = await sharp(SRC).metadata();
  console.log(`  Original: ${meta.width}×${meta.height}`);

  // ── Step 1: Upscale 2× LANCZOS ──────────────────────────────────────────
  const ratio = Math.max(1400, meta.width * 2) / meta.width;
  const newW  = Math.round(meta.width  * ratio);
  const newH  = Math.round(meta.height * ratio);

  const upscaled = await sharp(SRC)
    .resize(newW, newH, { kernel: sharp.kernel.lanczos3 })
    .toBuffer();
  console.log(`  Upscaled: ${newW}×${newH}`);

  // ── Step 2: Pixel-level background removal ──────────────────────────────
  console.log('Removing dark background...');
  const { data, info } = await sharp(upscaled)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  const W = info.width;
  const H = info.height;
  const topZone = Math.round(H * 0.30); // top 30% = text + lock icon area

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      let alpha = pixels[idx + 3];

      // ── Remove dark navy/gradient background ──
      const lum = (r * 0.299 + g * 0.587 + b * 0.114);
      const isDarkBlue = r < 50 && g < 60 && b < 90 && lum < 60;
      const isNavy     = r < 30 && g < 45 && b < 80;

      if (isNavy || isDarkBlue) {
        if (lum < 20) {
          alpha = 0;
        } else if (lum < 50) {
          alpha = Math.round((lum - 20) / 30 * 180);
        }
      }

      // ── Remove text zone (top 30%) fully ──
      if (y < topZone) {
        const factor = y / topZone;
        // Transition: top 60% of text zone fully transparent, fade in lower 40%
        if (factor < 0.60) {
          alpha = 0;
        } else {
          alpha = Math.min(alpha, Math.round((factor - 0.60) / 0.40 * 255));
        }
      }

      pixels[idx + 3] = alpha;
    }
  }

  // ── Step 3: Reconstruct + enhance ───────────────────────────────────────
  console.log('Enhancing quality...');
  let result = await sharp(Buffer.from(pixels), {
    raw: { width: W, height: H, channels: 4 }
  }).png().toBuffer();

  result = await sharp(result)
    .modulate({ brightness: 1.10, saturation: 1.25 })
    .sharpen({ sigma: 1.8, m1: 0.6, m2: 4 })
    .gamma(1.08)
    .toBuffer();

  // ── Step 4: Screen-blend bloom for premium glow on phone screens ─────────
  console.log('Adding premium glow...');
  const bloom = await sharp(result)
    .blur(10)
    .modulate({ brightness: 1.4, saturation: 1.6 })
    .toBuffer();

  result = await sharp(result)
    .composite([{ input: bloom, blend: 'screen' }])
    .toBuffer();

  // ── Step 5: Final crisp pass ─────────────────────────────────────────────
  const info2 = await sharp(result)
    .sharpen({ sigma: 0.7 })
    .png({ compressionLevel: 7 })
    .toFile(DEST);

  console.log(`\n✓ hero-devices.png saved — ${info2.width}×${info2.height}, ${(info2.size/1024).toFixed(0)} KB`);
}

process().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
