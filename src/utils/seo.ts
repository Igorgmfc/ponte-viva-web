export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const generateSEOTags = (data: SEOData) => {
  const baseUrl = 'https://estrategiaviva.com.br';
  const fullUrl = data.url ? `${baseUrl}${data.url}` : baseUrl;
  const defaultImage = `${baseUrl}/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png`;

  return {
    title: data.title,
    description: data.description,
    canonical: fullUrl,
    openGraph: {
      title: data.title,
      description: data.description,
      url: fullUrl,
      type: data.type || 'website',
      image: data.image || defaultImage,
      siteName: 'Estratégia Viva',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      image: data.image || defaultImage,
    }
  };
};

export const defaultSEO: SEOData = {
  title: 'Estratégia Viva - Arquitetamos Ecossistemas Organizacionais Vivos',
  description: 'Transformamos organizações em organismos prósperos, resilientes e regenerativos. Consultoria estratégica especializada em ecossistemas vivos organizacionais.',
  url: '/',
  type: 'website'
};