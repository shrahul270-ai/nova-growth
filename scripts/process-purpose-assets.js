const sharp = require('sharp');
const fs = require('fs');

async function processPurposeAssets() {
  const file = 'C:/Users/dimple/.gemini/antigravity/brain/edc2c259-f4be-4f43-b3d7-c4f198c38717/.user_uploaded/media_1794232308998_39d8b29a.jpg';
  
  if (!fs.existsSync('public/images/purpose')) {
    fs.mkdirSync('public/images/purpose', { recursive: true });
  }

  // 1. Rounded 3D App Icon with purple hue
  const size = 96;
  const radius = 22;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white" /></svg>`
  );

  const appIconCropped = await sharp(file)
    .extract({ left: 32, top: 28, width: size, height: size })
    .modulate({ hue: 160 })
    .toBuffer();

  await sharp(appIconCropped)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile('public/images/purpose/bpm-3d-app-icon-purple.png');
  console.log('Saved bpm-3d-app-icon-purple.png');

  // 2. Right side 3D centerpiece (earth + bar chart + podium with purple hue)
  await sharp(file)
    .extract({ left: 340, top: 20, width: 350, height: 380 })
    .modulate({ hue: 160 })
    .toFile('public/images/purpose/purpose-3d-centerpiece-purple.png');
  console.log('Saved purpose-3d-centerpiece-purple.png');
}

processPurposeAssets().catch(console.error);
