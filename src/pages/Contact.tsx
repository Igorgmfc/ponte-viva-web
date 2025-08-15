import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { handleContactSubmit } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Contact = () => {
  const seoData = {
    title: 'Contato - Estratégia Viva',
    description: 'Entre em contato conosco para uma conversa sobre como podemos ajudar sua organização a florescer como um ecossistema vivo.',
    url: '/contato'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await handleContactSubmit(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: 'error', text: result.error || 'Erro ao enviar mensagem. Tente novamente.' });
    }

    setIsSubmitting(false);
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
        <section className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary text-center mb-8">
            Vamos construir juntos?
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            O primeiro passo é uma conversa. Sem compromisso, sem pressão. Apenas um espaço para 
            entendermos seu momento e explorarmos se nossa jornada faz sentido para você.
          </p>
          
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="organization">Nome da sua organização</Label>
              <Input id="organization" name="organization" type="text" />
            </div>
            <div>
              <Label htmlFor="message">Como podemos ajudar?</Label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-secondary hover:bg-secondary-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
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