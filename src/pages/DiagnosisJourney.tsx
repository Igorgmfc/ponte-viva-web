import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Target, Users, FileText } from "lucide-react";

const DiagnosisJourney = () => {
  const seoData = {
    title: 'Diagnóstico de DNA Organizacional - Estratégia Viva',
    description: 'Descubra o DNA único da sua organização através do nosso processo de diagnóstico profundo. O primeiro passo para uma transformação autêntica.',
    url: '/jornadas/diagnostico'
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
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Jornada de Entrada: O Diagnóstico de DNA Organizacional
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Este é o ponto de partida. Um mergulho profundo e de alto impacto, ideal para 
              organizações que sentem a necessidade de mudança, mas ainda não têm clareza 
              sobre o caminho a seguir.
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
                      Lideranças que percebem um desalinhamento entre o discurso e a prática
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Organizações em um ponto de inflexão (crescimento rápido, crise, mudança de gestão)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Equipes que buscam alinhar sua visão e renovar seu senso de propósito
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
                  Revelar o DNA cultural autêntico da organização, identificando as forças vitais 
                  (Alma, Conexões, Nutrição, Raízes) e suas dinâmicas internas. O diagnóstico 
                  oferece clareza radical sobre a identidade organizacional e uma base sólida 
                  para qualquer decisão estratégica futura.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fases e Atividades */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">
              Fases e Atividades
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Imersão Cultural</h3>
                  <p className="text-sm text-muted-foreground">
                    Entrevistas em profundidade e observação etnográfica
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-secondary font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Mapeamento das Forças</h3>
                  <p className="text-sm text-muted-foreground">
                    Análise das quatro forças vitais organizacionais
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Síntese Estratégica</h3>
                  <p className="text-sm text-muted-foreground">
                    Identificação de padrões e oportunidades de transformação
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-secondary font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-2">Apresentação</h3>
                  <p className="text-sm text-muted-foreground">
                    Workshop de devolutiva com a liderança
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Entregável e Resultados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Entregável-Chave */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <FileText className="w-6 h-6 text-secondary" />
                  Entregável-Chave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/10 rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-primary mb-3">
                    Relatório de DNA Organizacional
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Um documento estratégico completo contendo:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Mapa cultural detalhado
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Análise das quatro forças vitais
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Recomendações estratégicas prioritárias
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      Roadmap de próximos passos
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Resultados Esperados */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <Target className="w-6 h-6 text-secondary" />
                  Resultados Esperados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Clareza radical</strong> sobre a identidade cultural
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Alinhamento</strong> da equipe de liderança
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Uma <strong>base sólida</strong> para qualquer decisão estratégica futura
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong>Renovação</strong> do senso de propósito coletivo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Duração e CTA */}
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <Clock className="w-5 h-5 text-secondary" />
              <span><strong>Duração Estimada:</strong> 4 a 6 semanas</span>
            </div>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
                <Link to="/contato">Solicite uma Proposta para o Diagnóstico</Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>Ou conheça nossas outras jornadas:</p>
                <div className="flex justify-center gap-4 mt-2">
                  <Link to="/jornadas/arquitetura" className="text-primary hover:text-primary-dark transition-colors">
                    Arquitetura de Ecossistema
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

export default DiagnosisJourney;