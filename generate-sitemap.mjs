import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// A linha 'import 'dotenv/config';' foi removida.

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: Variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são necessárias.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const baseUrl = 'https://estrategiaviva.com.br';

const staticPages = [
  { loc: `${baseUrl}/`, changefreq: 'weekly', priority: 1.0 },
  { loc: `${baseUrl}/insights`, changefreq: 'weekly', priority: 0.9 },
];

async function generateSitemap() {
  console.log('Iniciando geração do sitemap pós-build...');
  try {
    const { data: insights, error } = await supabase
      .from('blog_posts')
      .select('id, updated_at')
      .eq('status', 'published');

    if (error) throw error;

    const insightUrls = (insights || []).map(insight => ({
      loc: `${baseUrl}/insights/${insight.id}`,
      lastmod: new Date(insight.updated_at).toISOString().split('T')[0],
    }));

    const allUrls = [...staticPages, ...insightUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.resolve(process.cwd(), 'dist/sitemap.xml'), sitemap);
    console.log('✅ Sitemap gerado com sucesso em dist/sitemap.xml!');
  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
