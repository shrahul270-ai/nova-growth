const sharp = require('sharp');
const fs = require('fs');

async function convertAvatarsToPurple() {
  const avatars = ['avatar-rahul.png', 'avatar-engineering.png', 'avatar-media.png'];
  
  for (const name of avatars) {
    const src = `public/images/leadership/${name}`;
    if (fs.existsSync(src)) {
      // Rotate cyan (~190) to purple (~280): +90 deg
      await sharp(src)
        .modulate({ hue: 90 })
        .toFile(`public/images/leadership/purple-${name}`);
      console.log(`Saved purple-${name}`);
    }
  }
}

convertAvatarsToPurple().catch(console.error);
