import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

const Journeys = () => {
  const seoData = {
    title: 'Nossas Jornadas de Transformação - Estratégia Viva',
    description: 'Descubra nossos três caminhos de transformação organizacional: Diagnóstico de DNA, Arquitetura de Ecossistema e Ciclo de Cultivo.',
    url: '/jornadas'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead data={seoData} />
      <Header />
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Nossos Caminhos de Transformação
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada organização é única, e seu caminho para o florescimento também. Oferecemos três 
            jornadas distintas, projetadas para atender ao seu momento específico.
          </p>
        </section>

        {/* Jornadas Section */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Jornada 1: Diagnóstico */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading text-primary">
                  1. Diagnóstico de DNA Organizacional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Este é o ponto de partida. Um mergulho profundo e de alto impacto, ideal para 
                  organizações que sentem a necessidade de mudança, mas ainda não têm clareza 
                  sobre o caminho a seguir.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Para Quem é Ideal?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Lideranças que percebem um desalinhamento entre o discurso e a prática
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Organizações em um ponto de inflexão
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Equipes que buscam alinhar sua visão
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>4 a 6 semanas</span>
                </div>

                <Button asChild className="w-full mt-6 bg-primary hover:bg-primary-dark">
                  <Link to="/jornadas/diagnostico">
                    Saiba Mais
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Jornada 2: Arquitetura */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 relative overflow-hidden group lg:scale-105">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
              <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                PRINCIPAL
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-heading text-primary">
                  2. Arquitetura de Ecossistema Vivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Esta é a nossa jornada de transformação completa. Um processo colaborativo para 
                  redesenhar a organização como um ecossistema vivo, integrando Alma, Conexões, 
                  Nutrição e Raízes.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Para Quem é Ideal?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Organizações prontas para transformação integral
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Lideranças que buscam uma nova forma de operar
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Projetos que precisam estruturar crescimento sustentável
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>3 a 6 meses</span>
                </div>

                <Button asChild className="w-full mt-6 bg-secondary hover:bg-secondary-dark text-secondary-foreground">
                  <Link to="/jornadas/arquitetura">
                    Saiba Mais
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Jornada 3: Cultivo */}
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-0 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading text-primary">
                  3. O Ciclo de Cultivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Um ecossistema, uma vez arquitetado, precisa ser cultivado. Este serviço é uma 
                  parceria estratégica contínua para salvaguardar seu investimento e garantir seu 
                  florescimento.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Para Quem é Ideal?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Exclusivamente para clientes que completaram a Arquitetura
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Lideranças que desejam um parceiro estratégico de longo prazo
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Contrato anual renovável</span>
                </div>

                <Button asChild className="w-full mt-6 bg-primary hover:bg-primary-dark">
                  <Link to="/jornadas/cultivo">
                    Saiba Mais
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-8">
              Não tem certeza de qual jornada é ideal para sua organização?
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
              <Link to="/contato">Vamos Conversar</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Journeys;