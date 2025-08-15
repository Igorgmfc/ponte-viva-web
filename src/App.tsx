import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Philosophy from "./pages/Philosophy";
import Journeys from "./pages/Journeys";
import DiagnosisJourney from "./pages/DiagnosisJourney";
import ArchitectureJourney from "./pages/ArchitectureJourney";
import CultivationJourney from "./pages/CultivationJourney";
import CaseStudy from "./pages/CaseStudy";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Contact from "./pages/Contact";
import SitemapRoute from "./pages/SitemapRoute";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInsights from "./pages/admin/Insights";
import InsightEditor from "./pages/admin/InsightEditor";
import AdminContacts from "./pages/admin/Contacts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <AuthProvider>
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
          <Route path="/insights/:id" element={<InsightDetail />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sitemap.xml" element={<SitemapRoute />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/insights" element={
            <ProtectedRoute>
              <AdminInsights />
            </ProtectedRoute>
          } />
          <Route path="/admin/insights/new" element={
            <ProtectedRoute>
              <InsightEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/insights/edit/:id" element={
            <ProtectedRoute>
              <InsightEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/contacts" element={
            <ProtectedRoute requireAdmin>
              <AdminContacts />
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
