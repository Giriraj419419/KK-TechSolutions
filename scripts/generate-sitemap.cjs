const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://kktechsolutions.in';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/microsoft-365', priority: '0.9', changefreq: 'weekly' },
  { path: '/azure', priority: '0.9', changefreq: 'weekly' },
  { path: '/aws', priority: '0.9', changefreq: 'weekly' },
  { path: '/adobe', priority: '0.8', changefreq: 'weekly' },
  { path: '/autodesk', priority: '0.8', changefreq: 'weekly' },
  { path: '/coreldraw', priority: '0.8', changefreq: 'weekly' },
  { path: '/gstarcad', priority: '0.8', changefreq: 'weekly' },
  { path: '/zwcad', priority: '0.8', changefreq: 'weekly' },
  { path: '/servers/dell', priority: '0.8', changefreq: 'weekly' },
  { path: '/servers/hp', priority: '0.8', changefreq: 'weekly' },
  { path: '/servers/lenovo', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-services', priority: '0.7', changefreq: 'monthly' },
  { path: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/clients', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.7', changefreq: 'monthly' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(r => `  <url>
    <loc>${DOMAIN}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
