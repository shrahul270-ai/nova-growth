const https = require('https');
const fs = require('fs');
const sharp = require('sharp');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function preparePortraits() {
  const size = 200;
  const radius = size / 2;
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white" /></svg>`
  );

  const list = [
    {
      name: 'real-avatar-rahul.png',
      // Professional handsome male founder in dark suit
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=85',
    },
    {
      name: 'real-avatar-engineering.png',
      // Smart tech engineer with glasses
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces&q=85',
    },
    {
      name: 'real-avatar-media.png',
      // Confident executive woman in blazer
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces&q=85',
    }
  ];

  for (const item of list) {
    try {
      console.log(`Downloading ${item.name}...`);
      const buf = await download(item.url);
      const resized = await sharp(buf)
        .resize(size, size, { fit: 'cover', position: 'center' })
        .toBuffer();

      await sharp(resized)
        .composite([{ input: circleMask, blend: 'dest-in' }])
        .png()
        .toFile(`public/images/leadership/${item.name}`);
      console.log(`Saved ${item.name}`);
    } catch (err) {
      console.error(`Error processing ${item.name}:`, err.message);
    }
  }
}

preparePortraits().catch(console.error);
