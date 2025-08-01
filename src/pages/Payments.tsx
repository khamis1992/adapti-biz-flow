import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentsList } from "@/components/payments/PaymentsList";
import { PaymentReports } from "@/components/payments/PaymentReports";
import { PaymentSettings } from "@/components/payments/PaymentSettings";
import { RecurringPayments } from "@/components/payments/RecurringPayments";
import { Plus, CreditCard, BarChart3, Settings, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/components/invoices/PaymentDialog";

const Payments = () => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المدفوعات</h1>
          <p className="text-muted-foreground">
            إدارة شاملة للمدفوعات والتحصيلات والتقارير المالية
          </p>
        </div>
        <Button onClick={() => setShowPaymentDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          دفعة جديدة
        </Button>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            المدفوعات
          </TabsTrigger>
          <TabsTrigger value="recurring" className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            المدفوعات المتكررة
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل المدفوعات</CardTitle>
              <CardDescription>
                عرض وإدارة جميع المدفوعات والتحصيلات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المدفوعات المتكررة</CardTitle>
              <CardDescription>
                إدارة المدفوعات التي تتكرر بشكل دوري
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecurringPayments />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <PaymentReports />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <PaymentSettings />
        </TabsContent>
      </Tabs>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        invoiceId=""
        invoiceNumber=""
        remainingAmount={0}
        onPaymentAdded={() => {
          setShowPaymentDialog(false);
          // Refresh payments list
        }}
      />
    </div>
  );
};

export default Payments;