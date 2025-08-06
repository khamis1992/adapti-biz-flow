import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import { TenantProvider } from '@/hooks/useTenant';
import { ModuleProvider } from '@/contexts/ModuleContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { OnboardingGuard } from '@/components/OnboardingGuard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import MainLayout from '@/components/layout/MainLayout';
import Index from "./pages/Index";
import OnboardingWizard from "./pages/OnboardingWizard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
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
          <ModuleProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <OnboardingGuard>
                <Routes>
                {/* Public routes - no authentication required */}
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mock-auth" element={<MockAuth />} />
                
                {/* Onboarding route - accessible without authentication */}
                <Route path="/onboarding" element={<OnboardingWizard />} />
                
                {/* Protected Routes with MainLayout */}
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
                      <MainLayout>
                        <Settings />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/accounting" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Accounting />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/accounting/accounts/:accountId" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AccountLedger />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Invoices />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/new" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CreateInvoice />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <InvoiceDetails />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/invoices/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <EditInvoice />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/financial-reports" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <FinancialReports />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/inventory" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Inventory />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/purchasing" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Purchasing />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Fleet />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet/add-vehicle" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AddVehicle />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/fleet/edit-vehicle/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <EditVehicle />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Customers />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/new" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AddCustomer />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/add" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AddCustomer />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/import" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ImportCustomers />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CustomerDetails />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/customers/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <EditCustomer />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Contracts />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/new" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CreateContract />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ContractDetails />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <EditContract />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/templates" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ContractTemplates />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/contracts/reports" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ContractReports />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/hr" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <HR />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/attendance" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Attendance />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/leaves" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Leaves />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payroll" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Payroll />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payments" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Payments />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/work-orders" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <WorkOrders />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Projects />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects/new" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CreateProject />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects/:id" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <ProjectDetails />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Analytics />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-accounting" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedAccounting />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-inventory" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedInventory />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-sales" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedSales />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-crm" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedCRM />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-pos" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedPOS />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-procurement" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedProcurement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manufacturing" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Manufacturing />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/quality-management" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <QualityManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/document-management" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <DocumentManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/system-integrations" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <SystemIntegrations />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-hr" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedHR />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/advanced-payroll" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <AdvancedPayroll />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/menu" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <MenuManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <OrderManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/kitchen" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <KitchenManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/delivery" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <DeliveryManagement />
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/bookings" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold mb-4">نظام الحجوزات</h1>
                          <p>صفحة نظام الحجوزات قيد التطوير...</p>
                        </div>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pos" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <div className="p-6">
                          <h1 className="text-2xl font-bold mb-4">نقاط البيع</h1>
                          <p>صفحة نقاط البيع قيد التطوير...</p>
                        </div>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </OnboardingGuard>
            </BrowserRouter>
          </TooltipProvider>
          </ModuleProvider>
        </TenantProvider>
      </AuthProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;

