import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData, generateSEOTags } from '@/utils/seo';

interface SEOHeadProps {
  data: SEOData;
}

const SEOHead: React.FC<SEOHeadProps> = ({ data }) => {
  const seoTags = generateSEOTags(data);

  return (
    <Helmet>
      <title>{seoTags.title}</title>
      <meta name="description" content={seoTags.description} />
      <link rel="canonical" href={seoTags.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTags.openGraph.title} />
      <meta property="og:description" content={seoTags.openGraph.description} />
      <meta property="og:url" content={seoTags.openGraph.url} />
      <meta property="og:type" content={seoTags.openGraph.type} />
      <meta property="og:image" content={seoTags.openGraph.image} />
      <meta property="og:site_name" content={seoTags.openGraph.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={seoTags.twitter.card} />
      <meta name="twitter:title" content={seoTags.twitter.title} />
      <meta name="twitter:description" content={seoTags.twitter.description} />
      <meta name="twitter:image" content={seoTags.twitter.image} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Estratégia Viva" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEOHead;