
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "Estratégia Viva - Transformação Organizacional Regenerativa",
  description = "Desenvolvemos líderes e organizações que regeneram pessoas, comunidades e ecossistemas através de metodologias inovadoras de transformação organizacional.",
  image = "https://estrategiaviva.com.br/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png",
  url = "https://estrategiaviva.com.br",
  type = "website"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Estratégia Viva") ? title : `${title} | Estratégia Viva`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Estratégia Viva" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Estratégia Viva" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
