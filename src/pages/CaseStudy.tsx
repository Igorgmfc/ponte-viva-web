import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary text-center mb-8">
            Estudo de Caso: A Arquitetura de um Ecossistema de Valor
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Como transformamos um "pedido de ajuda" de uma organização social em um sistema próspero e regenerativo.
          </p>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark">
              <Link to="/contato">Vamos Conversar sobre seu Projeto</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;