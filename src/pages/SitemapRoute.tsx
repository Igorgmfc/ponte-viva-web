import { useEffect } from 'react';
import { generateSitemap } from '@/utils/sitemap';

const SitemapRoute = () => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        const sitemap = await generateSitemap();
        
        // Definir headers apropriados
        const response = new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
          },
        });
        
        // Substituir o conteúdo da página atual
        document.open();
        document.write(sitemap);
        document.close();
        
        // Definir content-type
        if (document.contentType !== 'application/xml') {
          const meta = document.createElement('meta');
          meta.httpEquiv = 'Content-Type';
          meta.content = 'application/xml';
          document.head.appendChild(meta);
        }
      } catch (error) {
        console.error('Erro ao servir sitemap:', error);
        document.write('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap temporarily unavailable</error>');
      }
    };

    serveSitemap();
  }, []);

  return null; // O componente não renderiza nada, apenas serve o XML
};

export default SitemapRoute;