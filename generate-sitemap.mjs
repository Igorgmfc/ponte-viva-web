import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Lista de rotas do site
const routes = [
  '/',
  '/jornadas',
  '/jornadas/diagnostico',
  '/jornadas/arquitetura',
  '/jornadas/cultivo',
  '/filosofia',
  '/insights',
  '/contato',
  '/caso-de-estudo'
];

// Gerar XML do sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://estrategiaviva.com.br${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Escrever o arquivo
const sitemapPath = resolve('./public/sitemap.xml');
writeFileSync(sitemapPath, sitemap);

console.log('✅ Sitemap gerado com sucesso em:', sitemapPath);