import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { publicAPI } from "@/lib/api";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover_image?: string;
  published_at: string;
  admin_users: {
    name: string;
  };
}

const InsightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      const data = await publicAPI.getPost(postId);
      setPost(data as BlogPost);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      setError('Insight não encontrado ou não está mais disponível.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead data={{
          title: 'Insight não encontrado - Estratégia Viva',
          description: 'O insight que você procura não foi encontrado ou não está mais disponível.',
          url: `/insights/${id}`
        }} />
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">
              Insight não encontrado
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {error || 'O insight que você procura não foi encontrado.'}
            </p>
            <Button asChild>
              <Link to="/insights">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Insights
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const seoData = {
    title: `${post.title} - Estratégia Viva`,
    description: post.summary,
    url: `/insights/${post.id}`,
    image: post.cover_image,
    type: 'article'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead data={seoData} />
      <Header />
      
      <main className="py-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/insights" 
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Insights
            </Link>
          </nav>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8 shadow-medium">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.summary}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-b py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.admin_users?.name || 'Estratégia Viva'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-heading font-bold text-primary mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-heading font-semibold text-primary mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-heading font-semibold text-primary mt-6 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-heading font-semibold text-secondary mt-6 mb-3">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-secondary pl-6 py-2 my-6 bg-secondary/5 italic text-lg">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-primary">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-secondary-dark">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-primary hover:text-primary-dark underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Gostou deste insight? Compartilhe suas reflexões conosco.
              </p>
              <Button asChild className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
                <Link to="/contato">Entre em Contato</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetail;