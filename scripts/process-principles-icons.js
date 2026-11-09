const sharp = require('sharp');
const fs = require('fs');

async function processPrinciplesIcons() {
  const file = 'C:/Users/dimple/.gemini/antigravity/brain/edc2c259-f4be-4f43-b3d7-c4f198c38717/.user_uploaded/media_1794233468501_0439f646.jpg';
  
  if (!fs.existsSync('public/images/principles')) {
    fs.mkdirSync('public/images/principles', { recursive: true });
  }

  const w = 110;
  const h = 100;
  // Circular/elliptical soft radial mask
  const radialMaskSvg = Buffer.from(`
    <svg width="${w}" height="${h}">
      <defs>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stop-color="white" stop-opacity="1"/>
          <stop offset="95%" stop-color="white" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" fill="url(#fade)"/>
    </svg>
  `);

  const icons = [
    { name: '3d-laptop.png', left: 120, top: 130, hue: 160 },
    { name: '3d-globe.png', left: 340, top: 130, hue: 0 },
    { name: '3d-rocket.png', left: 560, top: 130, hue: 160 },
    { name: '3d-shield.png', left: 780, top: 130, hue: 160 },
  ];

  for (const ic of icons) {
    let pipeline = sharp(file).extract({ left: ic.left, top: ic.top, width: w, height: h });
    if (ic.hue !== 0) {
      pipeline = pipeline.modulate({ hue: ic.hue });
    }
    const buf = await pipeline.toBuffer();
    await sharp(buf)
      .composite([{ input: radialMaskSvg, blend: 'dest-in' }])
      .png()
      .toFile(`public/images/principles/${ic.name}`);
    console.log(`Saved ${ic.name}`);
  }
}

processPrinciplesIcons().catch(console.error);
