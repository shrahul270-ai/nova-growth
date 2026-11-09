const sharp = require('sharp');
const fs = require('fs');

async function extractCircularAvatars() {
  const input = 'C:/Users/dimple/.gemini/antigravity/brain/edc2c259-f4be-4f43-b3d7-c4f198c38717/.user_uploaded/media_1794229998513_884a6367.jpg';
  const size = 114;
  const radius = size / 2;

  if (!fs.existsSync('public/images/leadership')) {
    fs.mkdirSync('public/images/leadership', { recursive: true });
  }

  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white" /></svg>`
  );

  const targets = [
    { name: 'avatar-rahul.png', left: 123, top: 148 },
    { name: 'avatar-engineering.png', left: 419, top: 148 },
    { name: 'avatar-media.png', left: 715, top: 148 }
  ];

  for (const t of targets) {
    const cropped = await sharp(input)
      .extract({ left: t.left, top: t.top, width: size, height: size })
      .toBuffer();

    await sharp(cropped)
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toFile(`public/images/leadership/${t.name}`);
    console.log('Saved', t.name);
  }

  // Also extract the 3D podium pedestal graphic
  await sharp(input)
    .extract({ left: 370, top: 432, width: 215, height: 75 })
    .png()
    .toFile('public/images/leadership/podium-center.png');
  console.log('Saved podium-center.png');
}

extractCircularAvatars().catch(console.error);
