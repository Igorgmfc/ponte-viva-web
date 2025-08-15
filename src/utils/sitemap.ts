import { supabase } from '@/integrations/supabase/client';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const baseUrl = 'https://estrategiaviva.com.br';

const staticPages: SitemapUrl[] = [
  {
    loc: `${baseUrl}/`,
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: `${baseUrl}/filosofia`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/jornadas`,
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/jornadas/diagnostico`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/jornadas/arquitetura`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/jornadas/cultivo`,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/estudo-de-caso`,
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${baseUrl}/insights`,
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/contato`,
    changefreq: 'monthly',
    priority: 0.6
  }
];

export const generateSitemap = async (): Promise<string> => {
  try {
    // Buscar insights publicados
    const { data: insights, error } = await supabase
      .from('blog_posts')
      .select('id, title, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar insights para sitemap:', error);
    }

    // Criar URLs dos insights
    const insightUrls: SitemapUrl[] = (insights || []).map(insight => ({
      loc: `${baseUrl}/insights/${insight.id}`,
      lastmod: new Date(insight.updated_at || insight.published_at).toISOString().split('T')[0],
      changefreq: 'monthly' as const,
      priority: 0.7
    }));

    // Combinar todas as URLs
    const allUrls = [...staticPages, ...insightUrls];

    // Gerar XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    // Retornar sitemap básico em caso de erro
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
  }
};

// Função para salvar o sitemap durante o build
export const saveSitemap = async () => {
  const sitemap = await generateSitemap();
  
  // Em ambiente de desenvolvimento, apenas log
  if (import.meta.env.DEV) {
    console.log('Sitemap gerado:', sitemap);
    return;
  }
  
  // Em produção, o sitemap será servido via rota API
  return sitemap;
};