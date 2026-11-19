const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'app/projects/layout.tsx',
    from: 'Case Studies & Client Results | Nova Growth',
    to: 'Case Studies & Client Results | Balaji Prime Media'
  },
  {
    file: 'app/projects/projectsData.ts',
    from: /Nova Growth/g,
    to: 'Balaji Prime Media'
  },
  {
    file: 'app/projects/[slug]/page.tsx',
    from: 'scale with Nova Growth',
    to: 'scale with Balaji Prime Media'
  },
  {
    file: 'app/web-development-uk/page.tsx',
    from: 'Start Your Web Project With Nova Growth',
    to: 'Start Your Web Project With Balaji Prime Media'
  },
  {
    file: 'app/seo-services-usa/page.tsx',
    from: 'choose Nova Growth',
    to: 'choose Balaji Prime Media'
  },
  {
    file: 'app/blog/[slug]/page.tsx',
    from: '"name": "Nova Growth"',
    to: '"name": "Balaji Prime Media"'
  },
  {
    file: 'app/blog/BlogClient.tsx',
    from: 'Nova Growth Insights',
    to: 'Balaji Prime Media Insights'
  },
  {
    file: 'app/blog/layout.tsx',
    from: 'from the Nova Growth team.',
    to: 'from the Balaji Prime Media team.'
  },
  {
    file: 'app/buyer-dashboard/page.tsx',
    from: /Nova Growth/g,
    to: 'Balaji Prime Media'
  },
  {
    file: 'app/components/GooglePreferredSourceButton.tsx',
    from: /Nova Growth/g,
    to: 'Balaji Prime Media'
  },
  {
    file: 'app/components/GuestPostMarketplace.tsx',
    from: /Hi Nova Growth!/g,
    to: 'Hi Balaji Prime Media!'
  },
  {
    file: 'app/contact/ContactClient.tsx',
    from: /Hi%20Nova%20Growth/g,
    to: 'Hi%20Balaji%20Prime%20Media'
  },
  {
    file: 'app/components/Footer.tsx',
    from: 'Nova Growth newsletter',
    to: 'Balaji Prime Media newsletter'
  },
  {
    file: 'app/admin/AnalyticsDashboardView.tsx',
    from: 'indexing status for Nova Growth.',
    to: 'indexing status for Balaji Prime Media.'
  },
  {
    file: 'app/admin/ClientProfileView.tsx',
    from: /Nova%20Growth%20Agency/g,
    to: 'Balaji%20Prime%20Media'
  },
  {
    file: 'app/admin/ClientProfileView.tsx',
    from: 'NOVA GROWTH - CLIENT 360° DOSSIER',
    to: 'BALAJI PRIME MEDIA - CLIENT 360° DOSSIER'
  },
  {
    file: 'app/admin/NovaBentoAdminView.tsx',
    from: /Nova Growth/g,
    to: 'Balaji Prime Media'
  },
  {
    file: 'app/admin/NovaCyber3DAdmin.tsx',
    from: 'Nova Growth',
    to: 'Balaji Prime Media'
  },
  {
    file: 'app/admin/page.tsx',
    from: /Nova Growth/g,
    to: 'Balaji Prime Media'
  },
  {
    file: 'package.json',
    from: '"name": "nova-growth"',
    to: '"name": "balaji-prime-media"'
  }
];

let count = 0;
for (const item of replacements) {
  if (fs.existsSync(item.file)) {
    let content = fs.readFileSync(item.file, 'utf8');
    const updated = content.replace(item.from, item.to);
    if (content !== updated) {
      fs.writeFileSync(item.file, updated, 'utf8');
      console.log('Updated: ' + item.file);
      count++;
    }
  }
}
console.log('Total files updated:', count);
