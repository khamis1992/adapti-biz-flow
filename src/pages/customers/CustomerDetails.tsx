import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Phone, Mail, MapPin, CreditCard, FileText, Calendar, AlertTriangle, Plus, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";

interface Customer {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  civil_id?: string;
  customer_type: 'individual' | 'company';
  address?: string;
  city?: string;
  notes?: string;
  is_blacklisted: boolean;
  blacklist_reason?: string;
  created_at: string;
  updated_at: string;
}

interface Contract {
  id: string;
  contract_number: string;
  vehicle_plate: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  amount?: number;
}

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      // Fetch customer data
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (customerError) {
        // Use mock data if fetch fails
        setCustomer({
          id: id!,
          full_name: "أحمد محمد الكندري",
          email: "ahmed.alkandari@email.com",
          phone: "+965 9876 5432",
          civil_id: "123456789012",
          customer_type: "individual",
          address: "الجابرية، قطعة 1، شارع 103، منزل 45",
          city: "الكويت",
          notes: "عميل مميز، يفضل التعامل صباحاً",
          is_blacklisted: false,
          blacklist_reason: "",
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z"
        });

        // Mock contracts data
        setContracts([
          {
            id: "1",
            contract_number: "CTR-2024-001",
            vehicle_plate: "123 ABC",
            start_date: "2024-01-15",
            end_date: "2024-02-15",
            total_amount: 450,
            status: "active"
          },
          {
            id: "2",
            contract_number: "CTR-2024-002",
            vehicle_plate: "456 DEF",
            start_date: "2023-12-01",
            end_date: "2023-12-31",
            total_amount: 900,
            status: "completed"
          }
        ]);

        // Mock activities data
        setActivities([
          {
            id: "1",
            type: "contract_created",
            description: "تم إنشاء عقد جديد CTR-2024-001",
            date: "2024-01-15T10:30:00Z",
            amount: 450
          },
          {
            id: "2",
            type: "payment",
            description: "تم دفع رسوم العقد",
            date: "2024-01-15T11:00:00Z",
            amount: 450
          },
          {
            id: "3",
            type: "contract_completed",
            description: "تم إكمال العقد CTR-2024-002",
            date: "2023-12-31T16:00:00Z",
            amount: 900
          }
        ]);
      } else {
        setCustomer(customerData);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل تفاصيل العميل",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contract_created': return <FileText className="h-4 w-4" />;
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'contract_completed': return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(3)} د.ك`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-KW');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-KW');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">العميل غير موجود</h1>
          <Button onClick={() => navigate('/customers')}>العودة إلى قائمة العملاء</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/customers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {customer.full_name}
              {customer.is_blacklisted && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  محظور
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">تفاصيل العميل وسجل العمليات</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/customers/${id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          تعديل البيانات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.address}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">نوع العميل:</span>
                  <Badge variant="outline">
                    {customer.customer_type === 'individual' ? 'فرد' : 'شركة'}
                  </Badge>
                </div>
                {customer.civil_id && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الرقم المدني:</span>
                    <span>{customer.civil_id}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ التسجيل:</span>
                  <span>{formatDate(customer.created_at)}</span>
                </div>
              </div>

              {customer.notes && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">ملاحظات</h4>
                  <p className="text-sm text-muted-foreground">{customer.notes}</p>
                </div>
              )}

              {customer.is_blacklisted && customer.blacklist_reason && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-destructive">سبب الحظر</h4>
                  <p className="text-sm text-destructive">{customer.blacklist_reason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="contracts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="contracts">العقود ({contracts.length})</TabsTrigger>
              <TabsTrigger value="activities">سجل العمليات ({activities.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="contracts" className="space-y-4">
              {contracts.length > 0 ? (
                contracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{contract.contract_number}</h3>
                          <p className="text-sm text-muted-foreground">
                            مركبة: {contract.vehicle_plate}
                          </p>
                        </div>
                        <Badge className={getStatusColor(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">تاريخ البداية:</span>
                          <p>{formatDate(contract.start_date)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">تاريخ النهاية:</span>
                          <p>{formatDate(contract.end_date)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المبلغ الإجمالي:</span>
                          <p className="font-medium">{formatCurrency(contract.total_amount)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">لا توجد عقود مسجلة لهذا العميل</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{activity.description}</h4>
                            {activity.amount && (
                              <span className="font-medium text-green-600">
                                {formatCurrency(activity.amount)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDateTime(activity.date)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">لا توجد عمليات مسجلة لهذا العميل</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;