const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\DHRUVIL\\.gemini\\antigravity-ide\\brain\\a6cc90c4-5186-4554-bdba-04421ab8e5f0\\media__1783768517013.png';
const outputPath = path.join(__dirname, '../public/kk-logo-transparent.png');

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    // Calculate distance from pure white
    const dist = Math.sqrt(Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2));
    
    // Threshold 80 to catch all compression artifacts on white background
    if (dist < 80) {
      // Map alpha smoothly for anti-aliased edges
      // If dist is 0 (pure white), alpha is 0. If dist is 80, alpha is 255.
      let alpha = (dist / 80) * 255;
      // Exponential curve to drop alpha faster near white
      alpha = Math.pow(alpha / 255, 2) * 255;
      data[i+3] = Math.max(0, Math.min(255, alpha));
      
      // Color correction to remove white halos (defringing)
      // Since the background was white, the color is artificially lightened.
      // We estimate the true color by "un-blending" the white.
      if (alpha > 0 && alpha < 255) {
        const aNorm = alpha / 255;
        data[i] = Math.max(0, Math.min(255, (r - 255 * (1 - aNorm)) / aNorm));
        data[i+1] = Math.max(0, Math.min(255, (g - 255 * (1 - aNorm)) / aNorm));
        data[i+2] = Math.max(0, Math.min(255, (b - 255 * (1 - aNorm)) / aNorm));
      }
    }
  }

  // 3x upscaling for high-res master
  const scale = 3;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 0 }) // Remove completely empty transparent borders
    .resize({ width: info.width * scale, kernel: sharp.kernel.lanczos3 }) // High quality upscale
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(outputPath);
    
  console.log('Logo successfully processed and upscaled to master PNG:', outputPath);
}

processLogo().catch(console.error);
