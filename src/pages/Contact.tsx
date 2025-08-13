import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <section className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary text-center mb-8">
            Vamos construir juntos?
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            O primeiro passo é uma conversa. Sem compromisso, sem pressão. Apenas um espaço para 
            entendermos seu momento e explorarmos se nossa jornada faz sentido para você.
          </p>
          
          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="text" />
            </div>
            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" />
            </div>
            <div>
              <Label htmlFor="organization">Nome da sua organização</Label>
              <Input id="organization" type="text" />
            </div>
            <div>
              <Label htmlFor="message">Como podemos ajudar?</Label>
              <Textarea id="message" rows={5} />
            </div>
            <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary-dark">
              Enviar Mensagem
            </Button>
          </form>
          
          <div className="mt-12 text-center space-y-2 text-muted-foreground">
            <p>contato@estrategiaviva.com.br</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;