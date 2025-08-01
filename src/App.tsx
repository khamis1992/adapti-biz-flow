import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingWizard from "./pages/OnboardingWizard";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Accounting from "./pages/Accounting";
import Invoices from "./pages/Invoices";
import FinancialReports from "./pages/FinancialReports";
import Inventory from "./pages/Inventory";
import Purchasing from "./pages/Purchasing";
import Fleet from "./pages/Fleet";
import Customers from "./pages/Customers";
import Contracts from "./pages/Contracts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<OnboardingWizard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchasing" element={<Purchasing />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/contracts" element={<Contracts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
