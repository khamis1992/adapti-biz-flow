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
import InvoiceDetails from "./pages/invoices/InvoiceDetailsNew";
import EditInvoice from "./pages/invoices/EditInvoice";
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
import Payments from "./pages/Payments";
import WorkOrders from "./pages/WorkOrders";
import Projects from "./pages/Projects";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Analytics from "./pages/Analytics";
import AdvancedAccounting from "./pages/AdvancedAccounting";
import AdvancedInventory from "./pages/AdvancedInventory";
import AdvancedSales from "./pages/AdvancedSales";
import AdvancedCRM from "./pages/AdvancedCRM";
import AdvancedPOS from "./pages/AdvancedPOS";
import AdvancedProcurement from "./pages/AdvancedProcurement";
import Manufacturing from "./pages/Manufacturing";
import QualityManagement from "./pages/QualityManagement";
import DocumentManagement from "./pages/DocumentManagement";
import SystemIntegrations from "./pages/SystemIntegrations";
import AdvancedHR from './pages/AdvancedHR';
import AdvancedPayroll from './pages/AdvancedPayroll';
import MenuManagement from './pages/MenuManagement';
import OrderManagement from './pages/OrderManagement';
import KitchenManagement from './pages/KitchenManagement';
import DeliveryManagement from './pages/DeliveryManagement';
import NotFound from "./pages/NotFound";
import { MockAuth } from "./components/auth/MockAuth";

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
                <Route path="/mock-auth" element={<MockAuth />} />
                
                {/* Protected Routes */}
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
                  path="/invoices/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <EditInvoice />
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
                <Route 
                  path="/payments" 
                  element={
                    <ProtectedRoute>
                      <Payments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/work-orders" 
                  element={
                    <ProtectedRoute>
                      <WorkOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects/new" 
                  element={
                    <ProtectedRoute>
                      <CreateProject />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects/:id" 
                  element={
                    <ProtectedRoute>
                      <ProjectDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-accounting" 
                  element={
                    <ProtectedRoute>
                      <AdvancedAccounting />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-inventory" 
                  element={
                    <ProtectedRoute>
                      <AdvancedInventory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-sales" 
                  element={
                    <ProtectedRoute>
                      <AdvancedSales />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-crm" 
                  element={
                    <ProtectedRoute>
                      <AdvancedCRM />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-pos" 
                  element={
                    <ProtectedRoute>
                      <AdvancedPOS />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-procurement" 
                  element={
                    <ProtectedRoute>
                      <AdvancedProcurement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manufacturing" 
                  element={
                    <ProtectedRoute>
                      <Manufacturing />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/quality-management" 
                  element={
                    <ProtectedRoute>
                      <QualityManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/document-management" 
                  element={
                    <ProtectedRoute>
                      <DocumentManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/system-integrations" 
                  element={
                    <ProtectedRoute>
                      <SystemIntegrations />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-hr" 
                  element={
                    <ProtectedRoute>
                      <AdvancedHR />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-payroll" 
                  element={
                    <ProtectedRoute>
                      <AdvancedPayroll />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/menu-management" 
                  element={
                    <ProtectedRoute>
                      <MenuManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-management" 
                  element={
                    <ProtectedRoute>
                      <OrderManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/kitchen-management" 
                  element={
                    <ProtectedRoute>
                      <KitchenManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/delivery-management" 
                  element={
                    <ProtectedRoute>
                      <DeliveryManagement />
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
