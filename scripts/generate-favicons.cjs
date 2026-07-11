const sharp = require('sharp');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function generateFavicons() {
  const masterLogo = path.join(__dirname, '../public/kk-logo-transparent.png');
  const outDir = path.join(__dirname, '../public');
  
  if (!fs.existsSync(masterLogo)) {
    console.error('Master logo not found at', masterLogo);
    process.exit(1);
  }

  // Generate PNG favicons
  const sizes = [16, 32, 192, 512];
  for (const size of sizes) {
    const filename = size === 192 ? 'android-chrome-192x192.png' :
                     size === 512 ? 'android-chrome-512x512.png' :
                     `favicon-${size}x${size}.png`;
                     
    await sharp(masterLogo)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, filename));
      
    console.log(`Generated ${filename}`);
  }
  
  // Generate Apple Touch Icon (180x180, usually white background or transparent)
  await sharp(masterLogo)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate ICO file
  console.log('Generating favicon.ico...');
  try {
    // Check if png-to-ico is installed, if not, use npx
    execSync(`npx -y png-to-ico "${path.join(outDir, 'favicon-32x32.png')}" > "${path.join(outDir, 'favicon.ico')}"`, { stdio: 'inherit' });
    console.log('Generated favicon.ico');
  } catch (err) {
    console.error('Failed to generate favicon.ico', err.message);
  }
  
  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
