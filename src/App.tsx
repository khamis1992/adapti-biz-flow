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
import CreateContract from "./pages/contracts/CreateContract";
import ContractDetails from "./pages/contracts/ContractDetails";
import EditContract from "./pages/contracts/EditContract";
import ContractTemplates from "./pages/contracts/ContractTemplates";
import ContractReports from "./pages/contracts/ContractReports";
import HR from "./pages/HR";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
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
          <Route path="/contracts/new" element={<CreateContract />} />
          <Route path="/contracts/:id" element={<ContractDetails />} />
          <Route path="/contracts/:id/edit" element={<EditContract />} />
          <Route path="/contracts/templates" element={<ContractTemplates />} />
          <Route path="/contracts/reports" element={<ContractReports />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/payroll" element={<Payroll />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
