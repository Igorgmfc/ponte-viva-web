import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/d2e1c761-fe82-4e01-afc1-2d1bf7c0b6b1.png" 
            alt="Estratégia Viva" 
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/filosofia"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/filosofia") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Filosofia
          </Link>
          <Link
            to="/jornadas"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/jornadas") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Jornadas
          </Link>
          <Link
            to="/estudo-de-caso"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/estudo-de-caso") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Estudo de Caso
          </Link>
          <Link
            to="/insights"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/insights") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Insights
          </Link>
          <Link
            to="/contato"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/contato") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Contato
          </Link>
        </nav>

        <Button asChild className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
          <Link to="/contato">Agende uma Conversa</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;