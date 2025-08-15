import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Philosophy = () => {
  const seoData = {
    title: 'Nossa Filosofia - Estratégia Viva',
    description: 'Acreditamos que as organizações podem ser uma força de regeneração no mundo. Conheça nosso manifesto e os princípios que guiam nosso trabalho.',
    url: '/filosofia'
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
        <section className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Nós acreditamos que as organizações podem ser uma força de regeneração no mundo.
          </h1>
        </section>

        {/* Manifesto Section */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-lg shadow-soft p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
              Manifesto Fundador da Estratégia Viva
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-xl leading-relaxed mb-6">
                Organizações não são <strong>máquinas</strong>. São <strong>organismos</strong>. 
                Ignorar essa verdade é a raiz de toda fragmentação, de todo potencial desperdiçado. 
                Uma máquina pode ser eficiente, mas apenas um organismo pode ser verdadeiramente 
                próspero, resiliente e regenerativo.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Acreditamos que toda organização é um ser vivo, e que sua prosperidade depende do 
                equilíbrio entre quatro forças vitais: <strong>Alma</strong> (seu propósito inegociável), 
                <strong>Conexões</strong> (seu tecido nervoso social e digital), a <strong>Nutrição</strong> 
                (seus fluxos de valor) e as <strong>Raízes</strong> (sua cultura profunda). Nosso trabalho 
                é tecer essas forças em um sistema coeso, sustentável e autônomo.
              </p>

              <h3 className="text-2xl font-heading font-bold text-primary mt-12 mb-6">
                O Mundo que Desafiamos
              </h3>
              
              <p className="text-lg leading-relaxed mb-6">
                Nós nos posicionamos contra um inimigo comum, um dragão de múltiplas cabeças que 
                assola o mundo das organizações:
              </p>

              <ul className="list-disc list-inside space-y-3 text-lg mb-8">
                <li>
                  <strong>A Fragmentação:</strong> O pensamento em silos. Departamentos que não 
                  conversam. Estratégias que ignoram a cultura. A mão direita que não sabe o que 
                  a esquerda está semeando.
                </li>
                <li>
                  <strong>A Superficialidade:</strong> As soluções "de prateleira" que tratam 
                  sintomas e ignoram causas. O "impact washing\" que usa a linguagem da mudança 
                  para manter tudo como está.
                </li>
                <li>
                  <strong>A Extração:</strong> A visão de que o sucesso é medido apenas pelo valor 
                  que se extrai, deixando para trás um terreno menos fértil para todos.
                </li>
              </ul>

              <p className="text-lg leading-relaxed mb-8">
                Acreditamos que os desafios complexos do nosso tempo exigem soluções integradas, 
                profundas e autênticas.
              </p>

              <h3 className="text-2xl font-heading font-bold text-primary mt-12 mb-6">
                Nossos Códigos: Os Princípios Inegociáveis
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                Toda arquitetura que erguemos é guiada por um código de ética que é a nossa constituição.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-heading font-semibold text-secondary mb-3">
                    1. Ouvir Primeiro: A Lente Antropológica
                  </h4>
                  <p className="text-lg leading-relaxed">
                    Nós não chegamos com fórmulas. Nós chegamos com perguntas. Antes de projetar 
                    qualquer estrutura, nós ouvimos a 'tribo': seus rituais, seus mitos, seus símbolos, 
                    suas tensões. A estratégia não é algo que impomos à cultura; ela é algo que brota 
                    do solo cultural, ou não sobrevive à primeira tempestade.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-semibold text-secondary mb-3">
                    2. Tecnologia a Serviço do Humano: A Simbiose Digital-Real
                  </h4>
                  <p className="text-lg leading-relaxed">
                    A tecnologia é uma ferramenta poderosa, mas é um meio, não um fim. Ela deve 
                    ampliar as relações humanas e gerar impacto concreto, nunca substituir o contato 
                    real. Cada ação digital que projetamos deve ter a intenção clara de catalisar um 
                    impacto real: um aperto de mão, uma comunidade mais forte.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-semibold text-secondary mb-3">
                    3. Deixar o Solo Mais Fértil: A Regeneração como Métrica
                  </h4>
                  <p className="text-lg leading-relaxed">
                    O sucesso verdadeiro não é um jogo de soma zero. Medimos nosso êxito pelo valor 
                    que geramos e circulamos, deixando o ecossistema — social, ambiental e financeiro — 
                    comprovadamente mais forte, diverso e resiliente do que o encontramos.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-semibold text-secondary mb-3">
                    4. Coragem e Clareza: A Integridade Radical
                  </h4>
                  <p className="text-lg leading-relaxed">
                    Operamos com uma transparência que beira o desconforto. Traçamos fronteiras éticas 
                    nítidas e comunicamos nossas intenções. A confiança não é um slogan; é o resultado 
                    inevitável de se operar com integridade, mesmo quando ninguém está olhando.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/10 rounded-lg p-8 mt-12 text-center">
                <blockquote className="text-2xl font-heading font-semibold text-primary mb-4">
                  "Acreditamos em um futuro onde o trabalho é uma fonte de significado, não de esgotamento."
                </blockquote>
                <p className="text-lg text-secondary-dark">
                  Se a sua organização deseja mais do que sobreviver, se ela quer florescer e deixar 
                  um legado, nós somos a ponte entre a sua visão e a realidade.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
              <Link to="/jornadas">Descubra Nossas Jornadas</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Philosophy;