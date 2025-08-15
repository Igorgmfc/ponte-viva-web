import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Target, Users, Building2, Sprout } from "lucide-react";

const ArchitectureJourney = () => {
  const seoData = {
    title: 'Arquitetura de Ecossistema Vivo - Estratégia Viva',
    description: 'Nossa jornada completa de transformação organizacional. Redesenhe sua organização como um ecossistema vivo, próspero e regenerativo.',
    url: '/jornadas/arquitetura'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoData.title}
        description={seoData.description} 
        url={`https://estrategiaviva.com.br${seoData.url}`}
      />
      <Header />
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold mb-4">
              JORNADA PRINCIPAL
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Projeto de Arquitetura de Ecossistema Vivo
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Esta é a nossa jornada de transformação completa. Um processo colaborativo para 
              redesenhar a organização como um ecossistema vivo, integrando Alma, Conexões, 
              Nutrição e Raízes.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Para Quem é Ideal */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <Users className="w-6 h-6 text-secondary" />
                  Para Quem é Ideal?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Organizações prontas para um compromisso de transformação integral
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Lideranças que não buscam apenas um plano estratégico, mas uma nova forma de operar
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Projetos de impacto que precisam estruturar seu crescimento de forma sustentável
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetivo Principal */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <Target className="w-6 h-6 text-secondary" />
                  Objetivo Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Desenhar e implementar uma arquitetura organizacional completa que integre as 
                  quatro forças vitais, criando um ecossistema autônomo, resiliente e regenerativo. 
                  O processo resulta em uma organização que prospera de forma sustentável e 
                  deixa o mundo mais fértil.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* As Quatro Forças */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">
              Integramos as Quatro Forças Vitais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Alma & Propósito</h3>
                  <p className="text-sm text-muted-foreground">
                    A verdade inegociável que guia cada decisão
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Conexões</h3>
                  <p className="text-sm text-muted-foreground">
                    O tecido nervoso que une tecnologia e comunidade
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sprout className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Narrativa & Nutrição</h3>
                  <p className="text-sm text-muted-foreground">
                    A história que atrai e os fluxos de valor que sustentam
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Raízes & Estrutura</h3>
                  <p className="text-sm text-muted-foreground">
                    A cultura e os processos que dão estabilidade ao crescimento
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fases da Jornada */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">
              Nossa Jornada: A Arte do Artífice
            </h2>
            
            <div className="space-y-8">
              <Card className="shadow-medium border-0 overflow-hidden">
                <div className="flex">
                  <div className="w-2 bg-gradient-to-b from-primary to-secondary"></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">1</span>
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-primary">
                        Descobrir a Alma
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Mergulhamos na essência da sua organização para revelar seu DNA cultural e 
                      propósito autêntico. Este é o alicerce sobre o qual todo o ecossistema será construído.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-medium border-0 overflow-hidden">
                <div className="flex">
                  <div className="w-2 bg-gradient-to-b from-secondary to-primary"></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold text-lg">2</span>
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-primary">
                        Tecer as Conexões
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Desenhamos o sistema nervoso que une tecnologia e comunidade para amplificar 
                      o impacto. Criamos as pontes que conectam pessoas, processos e propósitos.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-medium border-0 overflow-hidden">
                <div className="flex">
                  <div className="w-2 bg-gradient-to-b from-primary to-secondary"></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">3</span>
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-primary">
                        Amplificar a Narrativa e a Nutrição
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Criamos histórias e modelos de valor que são coerentes com a Alma. 
                      Desenvolvemos os fluxos que nutrem e sustentam o crescimento orgânico.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-medium border-0 overflow-hidden">
                <div className="flex">
                  <div className="w-2 bg-gradient-to-b from-secondary to-primary"></div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold text-lg">4</span>
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-primary">
                        Fortalecer as Raízes
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Estruturamos processos, finanças e cultura para sustentar o crescimento 
                      orgânico. Garantimos que o ecossistema seja autônomo e regenerativo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Resultados */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">
              Resultados Esperados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-medium border-0">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Uma <strong>estratégia clara e integrada</strong> que alinha todas as forças vitais
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>Cultura fortalecida</strong> com rituais e processos alinhados
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>Capacidade renovada</strong> para crescer de forma orgânica e sustentável
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-0">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>Autonomia operacional</strong> com sistemas que funcionam sem dependência externa
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>Resiliência</strong> para navegar mudanças e desafios futuros
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>Impacto regenerativo</strong> que deixa o ecossistema mais forte
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Duração e CTA */}
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <Clock className="w-5 h-5 text-secondary" />
              <span><strong>Duração Estimada:</strong> 3 a 6 meses</span>
            </div>
            
            <div className="bg-secondary/10 rounded-lg p-8 max-w-2xl mx-auto">
              <p className="text-lg text-primary font-semibold mb-4">
                Esta jornada é um investimento transformador no futuro da sua organização.
              </p>
              <p className="text-muted-foreground mb-6">
                Cada etapa é desenhada para gerar valor imediato, enquanto constrói as bases 
                para um crescimento sustentável e regenerativo.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
                <Link to="/contato">Solicite uma Proposta para a Arquitetura</Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>Conheça também nossas outras jornadas:</p>
                <div className="flex justify-center gap-4 mt-2">
                  <Link to="/jornadas/diagnostico" className="text-primary hover:text-primary-dark transition-colors">
                    Diagnóstico de DNA
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/jornadas/cultivo" className="text-primary hover:text-primary-dark transition-colors">
                    Ciclo de Cultivo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArchitectureJourney;