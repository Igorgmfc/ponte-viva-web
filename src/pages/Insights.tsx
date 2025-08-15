import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicAPI } from "@/lib/api";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  cover_image?: string;
  published_at: string;
  admin_users: {
    name: string;
  };
}

const Insights = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const seoData = {
    title: 'Insights - Nosso Ateliê de Ideias | Estratégia Viva',
    description: 'Explore nossos insights sobre ecossistemas organizacionais, liderança regenerativa e transformação empresarial. Conhecimento prático para organizações vivas.',
    url: '/insights'
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await publicAPI.getPublishedPosts();
      setPosts(data as BlogPost[]);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError('Erro ao carregar os insights. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead data={seoData} />
      <Header />
      
      <main className="py-16">
        <section className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary text-center mb-8">
            Nosso Ateliê de Ideias
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Um espaço para explorar as ideias, ferramentas e filosofias que guiam nosso trabalho. 
            Aqui compartilhamos nossos aprendizados sobre como cultivar ecossistemas vivos no mundo real.
          </p>
        </section>

        <section className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchPosts} variant="outline">
                Tentar Novamente
              </Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                Em breve, novos insights
              </h3>
              <p className="text-muted-foreground">
                Estamos preparando conteúdos valiosos para compartilhar com você.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 group">
                  <Link to={`/insights/${post.id}`} className="block">
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.admin_users?.name || 'Estratégia Viva'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(post.published_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.summary}
                      </p>
                      
                      <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Ler mais</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;