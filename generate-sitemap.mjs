
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs estáticas do site
const staticRoutes = [
  '',
  '/filosofia',
  '/jornadas',
  '/jornadas/diagnostico',
  '/jornadas/cultivacao',
  '/jornadas/arquitetura',
  '/estudo-de-caso',
  '/insights',
  '/contato'
];

// Função para criar slug a partir do título
function createSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Mock dos insights para desenvolvimento (em produção, isso viria do Supabase)
const mockInsights = [
  {
    title: "Liderança Regenerativa: O Novo DNA dos Gestores do Futuro",
    published_at: "2024-01-15"
  },
  {
    title: "Organizações Vivas: Da Máquina ao Organismo",
    published_at: "2024-01-10"
  },
  {
    title: "Ecossistemas de Inovação: Cultivando Ambientes Regenerativos",
    published_at: "2024-01-05"
  }
];

function generateSitemap() {
  const baseUrl = 'https://estrategiaviva.com.br';
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Adicionar URLs estáticas
  staticRoutes.forEach(route => {
    const priority = route === '' ? '1.0' : route === '/insights' ? '0.9' : '0.8';
    const changefreq = route === '' ? 'weekly' : route === '/insights' ? 'weekly' : 'monthly';
    
    sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
  });

  // Adicionar URLs dos insights
  mockInsights.forEach(insight => {
    const slug = createSlug(insight.title);
    sitemap += `
  <url>
    <loc>${baseUrl}/insights/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${insight.published_at}</lastmod>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Escrever o arquivo
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap gerado com sucesso em public/sitemap.xml');
}

generateSitemap();
