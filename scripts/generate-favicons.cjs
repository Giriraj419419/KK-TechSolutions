const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const inputImage = path.join(__dirname, '../public/kk-logo-transparent.png');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(inputImage)) {
    console.error(`Input image not found: ${inputImage}`);
    process.exit(1);
  }

  console.log('Generating favicon-16x16.png...');
  await sharp(inputImage)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  console.log('Generating favicon-32x32.png...');
  await sharp(inputImage)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  console.log('Generating apple-touch-icon.png...');
  await sharp(inputImage)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }) // Apple requires solid bg or it turns black
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Generating android-chrome-192x192.png...');
  await sharp(inputImage)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));

  console.log('Generating android-chrome-512x512.png...');
  await sharp(inputImage)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

  console.log('Generating favicon.ico...');
  const pngToIcoFn = pngToIco.default || pngToIco;
  const icoBuf = await pngToIcoFn([
    path.join(publicDir, 'favicon-16x16.png'),
    path.join(publicDir, 'favicon-32x32.png')
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
