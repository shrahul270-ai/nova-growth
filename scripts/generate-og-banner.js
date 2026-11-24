const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;

const svgBanner = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#681fe4" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="#220090" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#07030d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#681fe4"/>
    </linearGradient>
  </defs>

  <!-- Deep Obsidian Background -->
  <rect width="100%" height="100%" fill="#07030d"/>

  <!-- Ambient Glow -->
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- Top Badge -->
  <rect x="80" y="130" width="370" height="36" rx="6" fill="rgba(104,31,228,0.2)" stroke="rgba(104,31,228,0.5)" stroke-width="1"/>
  <text x="96" y="153" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#a5b4fc" letter-spacing="2">GLOBAL SEARCH &amp; WEB ARCHITECTURE</text>

  <!-- Main Brand Title -->
  <text x="80" y="240" font-family="Impact, Arial Black, sans-serif" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="2">BALAJI PRIME MEDIA</text>

  <!-- Core Services Keyword Headline -->
  <text x="80" y="320" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="url(#brandGrad)" letter-spacing="0.5">SEO, Next.js Web Development &amp; Guest Posting Agency</text>

  <!-- Subheading Description -->
  <text x="80" y="380" font-family="Arial, sans-serif" font-size="20" font-weight="400" fill="#94a3b8">Custom enterprise search strategies, DR 50–90+ editorial outreach &amp; sub-second Next.js applications.</text>
  <text x="80" y="415" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#64748b">Google Search Essentials compliant • E-E-A-T aligned • High-performance modern web engineering</text>

  <!-- Footer Domain & Verification -->
  <rect x="80" y="475" width="16" height="16" rx="3" fill="#10b981"/>
  <text x="108" y="488" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff">balajiprimemedia.in</text>
  <text x="310" y="488" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#6366f1">• Direct Executive Inquiries</text>
  <text x="540" y="488" font-family="Arial, sans-serif" font-size="14" font-weight="normal" fill="#64748b">• US • UK • Global Reach</text>
</svg>
`;

const outputPath = path.join(__dirname, '..', 'public', 'images', 'bpm-og-banner.png');

sharp(Buffer.from(svgBanner))
  .png()
  .toFile(outputPath)
  .then(() => console.log('Successfully generated 1200x630 OG banner at:', outputPath))
  .catch(err => console.error('Error generating banner:', err));
