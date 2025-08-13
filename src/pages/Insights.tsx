import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary text-center mb-8">
            Nosso Ateliê de Ideias
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Um espaço para explorar as ideias, ferramentas e filosofias que guiam nosso trabalho. 
            Aqui compartilhamos nossos aprendizados sobre como cultivar ecossistemas vivos no mundo real.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;