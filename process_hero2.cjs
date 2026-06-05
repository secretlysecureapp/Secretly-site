const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, 'public', 'ChatGPT Image 27 апр. 2026 г., 22_16_39.png');
const OUT_PNG = path.join(__dirname, 'public', 'hero-devices2.png');
const OUT_WEBP = path.join(__dirname, 'public', 'hero-devices2.webp');

async function run() {
  console.log('Reading image...');
  const img = sharp(INPUT);
  const meta = await img.metadata();
  console.log(`Size: ${meta.width}x${meta.height}`);

  // Step 1: Get raw RGBA buffer to process white background removal
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const buf = Buffer.from(data);

  // Flood-fill white/near-white pixels from corners — BFS approach
  const THRESHOLD = 28; // how far from pure white counts as "background"
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhiteish(idx) {
    const r = buf[idx];
    const g = buf[idx + 1];
    const b = buf[idx + 2];
    return r > (255 - THRESHOLD) && g > (255 - THRESHOLD) && b > (255 - THRESHOLD);
  }

  // Seed from all four corners
  const corners = [
    0,
    (width - 1),
    (height - 1) * width,
    (height - 1) * width + (width - 1)
  ];

  for (const c of corners) {
    if (!visited[c] && isWhiteish(c * channels)) {
      queue.push(c);
      visited[c] = 1;
    }
  }

  // BFS flood fill
  let qi = 0;
  while (qi < queue.length) {
    const pos = queue[qi++];
    const x = pos % width;
    const y = Math.floor(pos / width);
    const idx = pos * channels;

    // Make transparent
    buf[idx + 3] = 0;

    // Check 4 neighbors
    const neighbors = [];
    if (x > 0) neighbors.push(pos - 1);
    if (x < width - 1) neighbors.push(pos + 1);
    if (y > 0) neighbors.push(pos - width);
    if (y < height - 1) neighbors.push(pos + width);

    for (const n of neighbors) {
      if (!visited[n] && isWhiteish(n * channels)) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }

  // Soft feather edges — slightly reduce alpha near transparent boundaries
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pos = y * width + x;
      const idx = pos * channels;
      if (buf[idx + 3] > 0) {
        // Check if any neighbor is transparent
        const neighbors = [
          ((y-1)*width + x) * channels + 3,
          ((y+1)*width + x) * channels + 3,
          (y*width + (x-1)) * channels + 3,
          (y*width + (x+1)) * channels + 3,
        ];
        const hasTransparentNeighbor = neighbors.some(ni => buf[ni] === 0);
        if (hasTransparentNeighbor) {
          buf[idx + 3] = 180; // soft edge
        }
      }
    }
  }

  console.log('Background removed. Applying enhancements...');

  // Step 2: Build PNG from modified buffer, upscale 1.4x, enhance
  const targetW = Math.round(width * 1.4);
  const targetH = Math.round(height * 1.4);

  // Base image with transparent bg
  const base = await sharp(buf, {
    raw: { width, height, channels }
  })
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  // Enhanced version: sharpen + modulate
  await sharp(base)
    .sharpen({ sigma: 1.6, m1: 1.5, m2: 0.7 })
    .modulate({ brightness: 1.05, saturation: 1.3, hue: 0 })
    .png({ compressionLevel: 8 })
    .toFile(OUT_PNG);

  console.log(`PNG saved: ${OUT_PNG}`);

  // WebP version (smaller, faster load)
  await sharp(base)
    .sharpen({ sigma: 1.6, m1: 1.5, m2: 0.7 })
    .modulate({ brightness: 1.05, saturation: 1.3, hue: 0 })
    .webp({ quality: 92, lossless: false })
    .toFile(OUT_WEBP);

  const stats = fs.statSync(OUT_WEBP);
  console.log(`WebP saved: ${OUT_WEBP} (${(stats.size / 1024).toFixed(0)} KB)`);
  console.log('Done!');
}

run().catch(console.error);
