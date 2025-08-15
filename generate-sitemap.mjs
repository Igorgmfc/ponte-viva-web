
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Static pages
const staticPages = [
  { url: '', priority: '1.0' },
  { url: 'filosofia', priority: '0.9' },
  { url: 'jornadas', priority: '0.9' },
  { url: 'jornadas/diagnostico', priority: '0.8' },
  { url: 'jornadas/arquitetura', priority: '0.8' },
  { url: 'jornadas/cultivo', priority: '0.8' },
  { url: 'estudo-de-caso', priority: '0.8' },
  { url: 'contato', priority: '0.7' },
  { url: 'insights', priority: '0.9' }
];

async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap...');
    
    // Fetch published insights from Supabase
    const { data: insights, error } = await supabase
      .from('insights')
      .select('id, slug, title, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching insights:', error);
      process.exit(1);
    }

    console.log(`📝 Found ${insights?.length || 0} published insights`);

    const baseUrl = 'https://estrategiaviva.com.br';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add dynamic insight pages
    if (insights && insights.length > 0) {
      insights.forEach(insight => {
        const lastmod = new Date(insight.updated_at).toISOString().split('T')[0];
        sitemap += `
  <url>
    <loc>${baseUrl}/insights/${insight.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }

    sitemap += `
</urlset>`;

    // Write sitemap to public directory
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📊 Total URLs: ${staticPages.length + (insights?.length || 0)}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
