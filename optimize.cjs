const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, 'public/hero-devices.png');

async function run() {
  // WebP optimized
  const w = await sharp(SRC)
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(__dirname, 'public/hero-devices.webp'));
  console.log(`WebP: ${w.width}×${w.height}, ${Math.round(w.size/1024)}KB`);
}
run().catch(console.error);
