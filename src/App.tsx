import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Philosophy from "./pages/Philosophy";
import Journeys from "./pages/Journeys";
import DiagnosisJourney from "./pages/DiagnosisJourney";
import ArchitectureJourney from "./pages/ArchitectureJourney";
import CultivationJourney from "./pages/CultivationJourney";
import CaseStudy from "./pages/CaseStudy";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filosofia" element={<Philosophy />} />
          <Route path="/jornadas" element={<Journeys />} />
          <Route path="/jornadas/diagnostico" element={<DiagnosisJourney />} />
          <Route path="/jornadas/arquitetura" element={<ArchitectureJourney />} />
          <Route path="/jornadas/cultivo" element={<CultivationJourney />} />
          <Route path="/estudo-de-caso" element={<CaseStudy />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contato" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
