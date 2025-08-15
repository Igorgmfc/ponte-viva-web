
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Insight {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover_image: string | null;
  author: string;
  published_at: string;
  category: string | null;
  tags: string[] | null;
  author_id: string;
}

const Insights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [filteredInsights, setFilteredInsights] = useState<Insight[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    filterInsights();
  }, [insights, searchTerm, selectedCategory]);

  const fetchInsights = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching insights:', error);
        return;
      }

      setInsights(data || []);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInsights = () => {
    let filtered = insights;

    if (searchTerm) {
      filtered = filtered.filter(insight =>
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(insight => insight.category === selectedCategory);
    }

    setFilteredInsights(filtered);
  };

  const categories = Array.from(new Set(insights.map(insight => insight.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <SEOHead
        title="Insights - Estratégia Viva"
        description="Descubra insights valiosos sobre transformação organizacional, liderança estratégica e cultivo de estratégias vivas e autênticas."
        url="https://estrategiaviva.com.br/insights"
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Insights Estratégicos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Reflexões, análises e insights sobre transformação organizacional, 
            liderança estratégica e o cultivo de estratégias vivas.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando insights...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
              {searchTerm || selectedCategory ? 'Nenhum insight encontrado' : 'Em breve, novos insights'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory 
                ? 'Tente ajustar sua busca ou filtros para encontrar o que procura.'
                : 'Estamos preparando conteúdos valiosos sobre transformação organizacional e estratégia viva.'
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="text-secondary hover:text-secondary/80 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Insights Grid */}
        {!loading && filteredInsights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight) => (
              <Card key={insight.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={insight.cover_image || '/placeholder.svg'}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  {insight.category && (
                    <Badge variant="secondary" className="mb-3">
                      {insight.category}
                    </Badge>
                  )}
                  
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3 line-clamp-2">
                    {insight.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {insight.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{insight.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(insight.published_at), "dd MMM yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  {insight.tags && insight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {insight.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Link
                    to={`/insights/${insight.slug}`}
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium group"
                  >
                    Ler mais
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
