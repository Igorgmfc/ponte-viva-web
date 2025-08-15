
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
}

const SEOHead = ({
  title = "Estratégia Viva - Transformação Organizacional Autêntica",
  description = "Consultoria especializada em transformação organizacional através de diagnóstico, arquitetura e cultivo de estratégias vivas e autênticas.",
  image = "https://estrategiaviva.com.br/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png",
  url = "https://estrategiaviva.com.br",
  type = "website",
  publishedDate,
  modifiedDate,
  author = "Estratégia Viva"
}: SEOHeadProps) => {
  const siteName = "Estratégia Viva";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific tags */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="geo.region" content="BR" />
      <meta name="geo.country" content="Brazil" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'Organization',
          "name": siteName,
          "description": description,
          "url": url,
          "logo": image,
          ...(type === 'article' && {
            "headline": title,
            "datePublished": publishedDate,
            "dateModified": modifiedDate || publishedDate,
            "author": {
              "@type": "Organization",
              "name": author
            }
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
