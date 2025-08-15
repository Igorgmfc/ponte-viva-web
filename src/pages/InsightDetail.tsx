
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "./NotFound";

interface Insight {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  author: string;
  published_at: string;
  updated_at: string;
  category: string | null;
  tags: string[] | null;
  status: string;
}

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchInsight();
    }
  }, [slug]);

  const fetchInsight = async () => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        console.error('Insight not found:', error);
        setNotFound(true);
        return;
      }

      setInsight(data);
    } catch (error) {
      console.error('Error fetching insight:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const shareInsight = async () => {
    if (navigator.share && insight) {
      try {
        await navigator.share({
          title: insight.title,
          text: insight.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando insight...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !insight) {
    return <NotFound />;
  }

  const insightUrl = `https://estrategiaviva.com.br/insights/${insight.slug}`;
  const publishedDate = new Date(insight.published_at).toISOString();
  const modifiedDate = new Date(insight.updated_at).toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <SEOHead
        title={insight.title}
        description={insight.summary}
        image={insight.cover_image || "https://estrategiaviva.com.br/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png"}
        url={insightUrl}
        type="article"
        publishedDate={publishedDate}
        modifiedDate={modifiedDate}
        author={insight.author}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/insights">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Insights
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            {insight.category && (
              <Badge variant="secondary" className="mb-4">
                {insight.category}
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              {insight.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {insight.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{insight.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(insight.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={shareInsight} className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>

            {insight.tags && insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {insight.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          {insight.cover_image && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={insight.cover_image}
                alt={insight.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-heading prose-a:text-secondary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{insight.content}</ReactMarkdown>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Última atualização: {format(new Date(insight.updated_at), "dd/MM/yyyy", { locale: ptBR })}
              </div>
              
              <div className="flex gap-2">
                <Link to="/insights">
                  <Button variant="outline">
                    Ver mais insights
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button>
                    Entre em contato
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default InsightDetail;
