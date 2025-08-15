
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  published_at: string;
  author_id: string;
  cover_image?: string;
  admin_users?: {
    name: string;
  };
}

export default function Insights() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          summary,
          published_at,
          author_id,
          cover_image,
          admin_users (
            name
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Insights - Estratégia Viva"
        description="Descobrimentos e reflexões sobre transformação organizacional regenerativa, liderança consciente e desenvolvimento de ecossistemas prósperos."
        url="https://estrategiaviva.com.br/insights"
      />
      
      <Header />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Insights para Transformação
              </h1>
              <p className="text-xl text-muted-foreground">
                Descobrimentos e reflexões sobre como criar organizações que regeneram 
                pessoas, comunidades e ecossistemas.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Nenhum insight disponível</h2>
                <p className="text-muted-foreground">
                  Novos insights serão publicados em breve.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                    {post.cover_image && (
                      <div className="overflow-hidden rounded-t-lg">
                        <img 
                          src={post.cover_image} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {post.admin_users?.name && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.admin_users.name}
                          </div>
                        )}
                        
                        {post.published_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(post.published_at), "dd 'de' MMM, yyyy", { 
                              locale: ptBR 
                            })}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.summary}
                      </p>
                      
                      <Link 
                        to={`/insights/${createSlug(post.title)}`}
                        state={{ postId: post.id }}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
