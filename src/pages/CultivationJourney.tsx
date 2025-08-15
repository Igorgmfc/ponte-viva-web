import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CultivationJourney = () => {
  const seoData = {
    title: 'Ciclo de Cultivo - Estratégia Viva',
    description: 'Parceria estratégica contínua para manter seu ecossistema organizacional próspero e em constante evolução.',
    url: '/jornadas/cultivo'
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead data={seoData} />
      <Header />
      
      <main className="py-16">
        <section className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
            O Ciclo de Cultivo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Um ecossistema, uma vez arquitetado, precisa ser cultivado. Este serviço é uma 
            parceria estratégica contínua para salvaguardar seu investimento e garantir seu florescimento.
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark">
            <Link to="/contato">Converse sobre a Continuidade</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CultivationJourney;