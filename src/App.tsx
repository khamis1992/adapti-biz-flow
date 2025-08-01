import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import { TenantProvider } from '@/hooks/useTenant';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Index from "./pages/Index";
import OnboardingWizard from "./pages/OnboardingWizard";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Accounting from "./pages/Accounting";
import AccountLedger from "./pages/AccountLedger";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import InvoiceDetails from "./pages/invoices/InvoiceDetails";
import FinancialReports from "./pages/FinancialReports";
import Inventory from "./pages/Inventory";
import Purchasing from "./pages/Purchasing";
import Fleet from "./pages/Fleet";
import AddVehicle from "./pages/fleet/AddVehicle";
import EditVehicle from "./pages/fleet/EditVehicle";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/customers/AddCustomer";
import CustomerDetails from "./pages/customers/CustomerDetails";
import EditCustomer from "./pages/customers/EditCustomer";
import ImportCustomers from "./pages/customers/ImportCustomers";
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
    <ErrorBoundary>
      <AuthProvider>
        <TenantProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes - no authentication required */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Auth required, no tenant required */}
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute requireTenant={false}>
                      <OnboardingWizard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected routes - auth + tenant required */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/accounting" 
                  element={
                    <ProtectedRoute>
                      <Accounting />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/accounting/accounts/:accountId" 
                  element={
                    <ProtectedRoute>
                      <AccountLedger />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices" 
                  element={
                    <ProtectedRoute>
                      <Invoices />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/new" 
                  element={
                    <ProtectedRoute>
                      <CreateInvoice />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/:id" 
                  element={
                    <ProtectedRoute>
                      <InvoiceDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <CreateInvoice />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/financial-reports" 
                  element={
                    <ProtectedRoute>
                      <FinancialReports />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/inventory" 
                  element={
                    <ProtectedRoute>
                      <Inventory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/purchasing" 
                  element={
                    <ProtectedRoute>
                      <Purchasing />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet" 
                  element={
                    <ProtectedRoute>
                      <Fleet />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet/add-vehicle" 
                  element={
                    <ProtectedRoute>
                      <AddVehicle />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet/edit-vehicle/:id" 
                  element={
                    <ProtectedRoute>
                      <EditVehicle />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers" 
                  element={
                    <ProtectedRoute>
                      <Customers />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/new" 
                  element={
                    <ProtectedRoute>
                      <AddCustomer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/add" 
                  element={
                    <ProtectedRoute>
                      <AddCustomer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/import" 
                  element={
                    <ProtectedRoute>
                      <ImportCustomers />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/:id" 
                  element={
                    <ProtectedRoute>
                      <CustomerDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <EditCustomer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts" 
                  element={
                    <ProtectedRoute>
                      <Contracts />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/new" 
                  element={
                    <ProtectedRoute>
                      <CreateContract />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/:id" 
                  element={
                    <ProtectedRoute>
                      <ContractDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <EditContract />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/templates" 
                  element={
                    <ProtectedRoute>
                      <ContractTemplates />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/reports" 
                  element={
                    <ProtectedRoute>
                      <ContractReports />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/hr" 
                  element={
                    <ProtectedRoute>
                      <HR />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/attendance" 
                  element={
                    <ProtectedRoute>
                      <Attendance />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/leaves" 
                  element={
                    <ProtectedRoute>
                      <Leaves />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payroll" 
                  element={
                    <ProtectedRoute>
                      <Payroll />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TenantProvider>
      </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
