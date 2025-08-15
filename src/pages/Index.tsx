import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Sprout, Building2 } from "lucide-react";
import { defaultSEO } from "@/utils/seo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead data={defaultSEO} />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-7xl font-heading font-bold text-primary mb-6 leading-tight">
              Sua organização é uma <br />
              <span className="text-secondary">máquina</span> ou um <span className="text-secondary">organismo</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
              Nós arquitetamos ecossistemas vivos. Transformamos organizações em organismos prósperos, 
              resilientes e regenerativos, alinhando sua cultura profunda ao seu propósito maior.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground text-lg px-8 py-4">
              <Link to="/contato">Agende uma Conversa</Link>
            </Button>
          </div>
        </section>

        {/* Tese Central */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                Organismos florescem. Máquinas se desgastam.
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                A prosperidade de uma organização depende do equilíbrio entre quatro forças vitais. 
                Nosso trabalho é tecer essas forças em um sistema coeso, sustentável e autônomo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">Alma & Propósito</h3>
                  <p className="text-muted-foreground">A verdade inegociável que guia cada decisão.</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">Conexões</h3>
                  <p className="text-muted-foreground">O tecido nervoso que une tecnologia e comunidade.</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sprout className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">Narrativa & Nutrição</h3>
                  <p className="text-muted-foreground">A história que atrai e os fluxos de valor que sustentam.</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">Raízes & Estrutura</h3>
                  <p className="text-muted-foreground">A cultura e os processos que dão estabilidade ao crescimento.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Jornadas */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
              Nossos Caminhos de Transformação
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Não oferecemos soluções de prateleira. Guiamos sua organização por uma das três jornadas, 
              cada uma desenhada para um estágio diferente do seu florescimento.
            </p>
            
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
              <Link to="/jornadas">Descubra sua Jornada</Link>
            </Button>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-4xl font-heading font-semibold text-primary mb-8 leading-tight">
                "Acreditamos em um futuro onde o trabalho é fonte de significado, não de esgotamento."
              </blockquote>
              <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Link to="/filosofia">Conheça Nossa Filosofia</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
