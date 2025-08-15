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
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const Contact = () => {
  const seoData = {
    title: 'Contato - Estratégia Viva',
    description: 'Entre em contato conosco para uma conversa sobre como podemos ajudar sua organização a florescer como um ecossistema vivo.',
    url: '/contato'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [phone, setPhone] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setPhoneError(undefined);

    // Validar telefone se fornecido
    if (phone && !isValidPhoneNumber(phone)) {
      setPhoneError('Número de telefone inválido');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    if (phone) {
      formData.append('phone', phone);
    }
    const result = await handleContactSubmit(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' });
      (e.target as HTMLFormElement).reset();
      setPhone(undefined);
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
          <p className="text-xl text-muted-foreground text-center mb-8">
            O primeiro passo é uma conversa. Sem compromisso, sem pressão. Apenas um espaço para 
            entendermos seu momento e explorarmos se nossa jornada faz sentido para você.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => openWhatsApp()}
              variant="outline"
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversar pelo WhatsApp
            </Button>
          </div>
          
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
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="BR"
                value={phone}
                onChange={setPhone}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {phoneError && (
                <p className="text-sm text-destructive mt-1">{phoneError}</p>
              )}
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