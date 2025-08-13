import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png" 
              alt="Estratégia Viva" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80">
              Arquitetamos ecossistemas organizacionais vivos, prósperos e regenerativos.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/filosofia" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Nossa Filosofia
                </Link>
              </li>
              <li>
                <Link to="/jornadas" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  As Jornadas
                </Link>
              </li>
              <li>
                <Link to="/estudo-de-caso" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Estudo de Caso
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Jornadas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jornadas/diagnostico" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Diagnóstico de DNA
                </Link>
              </li>
              <li>
                <Link to="/jornadas/arquitetura" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Arquitetura de Ecossistema
                </Link>
              </li>
              <li>
                <Link to="/jornadas/cultivo" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ciclo de Cultivo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>contato@estrategiaviva.com.br</li>
              <li>
                <Link to="/contato" className="hover:text-primary-foreground transition-colors">
                  Agende uma Conversa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 Estratégia Viva. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;