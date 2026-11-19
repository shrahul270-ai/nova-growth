const sharp = require('sharp');
const fs = require('fs');

async function buildCompleteLogo() {
  // Load the 3D celestial symbol
  const symbol = await sharp('public/images/bpm-celestial-symbol.png')
    .resize(480, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const width = 640;
  const height = 660;

  // Create high-res SVG for metallic gold BPM and DIGITAL GROWTH & SEO AGENCY
  const svgText = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Luxury 3D Metallic Champagne Gold Gradient -->
        <linearGradient id="bpmGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff8e7" />
          <stop offset="25%" stop-color="#f5dfa2" />
          <stop offset="50%" stop-color="#d4af37" />
          <stop offset="75%" stop-color="#aa820a" />
          <stop offset="100%" stop-color="#f3e5ab" />
        </linearGradient>

        <linearGradient id="taglineGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f5dfa2" />
          <stop offset="50%" stop-color="#e6ca65" />
          <stop offset="100%" stop-color="#caa02c" />
        </linearGradient>

        <!-- Ambient Glow -->
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#d4af37" flood-opacity="0.4" />
        </filter>
      </defs>

      <!-- BPM Text -->
      <text x="320" y="555" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="88" font-weight="900" letter-spacing="8" fill="url(#bpmGold)" filter="url(#goldGlow)">
        BPM
      </text>

      <!-- DIGITAL GROWTH & SEO AGENCY Text -->
      <text x="320" y="618" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="25" font-weight="800" letter-spacing="6" fill="url(#taglineGold)">
        DIGITAL GROWTH &amp; SEO AGENCY
      </text>
    </svg>
  `);

  // Composite emblem + text
  const compositeBuf = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: symbol, left: 80, top: 10 },
    { input: svgText, left: 0, top: 0 }
  ])
  .png()
  .toBuffer();

  // Trim transparent margins
  await sharp(compositeBuf)
    .trim()
    .png()
    .toFile('public/images/bpm-complete-logo.png');

  console.log('Successfully saved public/images/bpm-complete-logo.png');
}

buildCompleteLogo().catch(console.error);
