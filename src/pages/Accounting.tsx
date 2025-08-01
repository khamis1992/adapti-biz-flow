import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Building2, 
  Plus,
  Search,
  Filter,
  BookOpen,
  Calculator,
  TrendingUp,
  FileText,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  BookOpen as Ledger
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AccountDialog } from '@/components/accounting/AccountDialog';
import { DeleteAccountDialog } from '@/components/accounting/DeleteAccountDialog';
import { AccountDetails } from '@/components/accounting/AccountDetails';
import { JournalEntryDialog } from '@/components/accounting/JournalEntryDialog';
import { JournalEntriesList } from '@/components/accounting/JournalEntriesList';
import TrialBalance from '@/components/accounting/TrialBalance';
import { BalanceSheet } from '@/components/accounting/BalanceSheet';
import IncomeStatement from '@/components/accounting/IncomeStatement';
import { CashFlowStatement } from '@/components/accounting/CashFlowStatement';

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses';
  level: number;
  balance: number;
  allow_posting: boolean;
  is_active: boolean;
  parent_account_id?: string;
  created_at: string;
  updated_at: string;
}

const Accounting = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showJournalEntryDialog, setShowJournalEntryDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('account_code');

      if (error) throw error;
      setAccounts(data || []);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل البيانات',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeColor = (type: string) => {
    const colors = {
      assets: 'bg-blue-100 text-blue-800',
      liabilities: 'bg-red-100 text-red-800',
      equity: 'bg-green-100 text-green-800',
      revenue: 'bg-purple-100 text-purple-800',
      expenses: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      assets: 'أصول',
      liabilities: 'خصوم',
      equity: 'حقوق ملكية',
      revenue: 'إيرادات',
      expenses: 'مصروفات'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.account_name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.account_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.account_code.includes(searchTerm);
    const matchesType = selectedType === 'all' || account.account_type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedAccounts = filteredAccounts.reduce((acc, account) => {
    if (!acc[account.account_type]) {
      acc[account.account_type] = [];
    }
    acc[account.account_type].push(account);
    return acc;
  }, {} as Record<string, Account[]>);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(balance);
  };

  const totalBalanceByType = (type: string) => {
    return accounts
      .filter(acc => acc.account_type === type)
      .reduce((sum, acc) => sum + acc.balance, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Calculator className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل المحاسبة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <Calculator className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">المحاسبة والمالية</h1>
                <p className="text-sm text-muted-foreground">إدارة دليل الحسابات والقيود المحاسبية</p>
              </div>
            </div>
            <Button onClick={() => setShowAccountDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              حساب جديد
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="chart-of-accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="chart-of-accounts" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              دليل الحسابات
            </TabsTrigger>
            <TabsTrigger value="journal-entries" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              القيود المحاسبية
            </TabsTrigger>
            <TabsTrigger value="trial-balance" className="flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              ميزان المراجعة
            </TabsTrigger>
            <TabsTrigger value="balance-sheet" className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              قائمة المركز المالي
            </TabsTrigger>
            <TabsTrigger value="income-statement" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              قائمة الدخل
            </TabsTrigger>
            <TabsTrigger value="cash-flow" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              التدفقات النقدية
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              تقارير أخرى
            </TabsTrigger>
          </TabsList>

          {/* Chart of Accounts */}
          <TabsContent value="chart-of-accounts" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الأصول</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatBalance(totalBalanceByType('assets'))}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الخصوم</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatBalance(totalBalanceByType('liabilities'))}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">حقوق الملكية</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatBalance(totalBalanceByType('equity'))}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">الإيرادات</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatBalance(totalBalanceByType('revenue'))}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">المصروفات</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatBalance(totalBalanceByType('expenses'))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في دليل الحسابات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="all">جميع الأنواع</option>
                      <option value="assets">الأصول</option>
                      <option value="liabilities">الخصوم</option>
                      <option value="equity">حقوق الملكية</option>
                      <option value="revenue">الإيرادات</option>
                      <option value="expenses">المصروفات</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accounts List */}
            <div className="space-y-6">
              {Object.entries(groupedAccounts).map(([type, typeAccounts]) => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Badge className={getAccountTypeColor(type)}>
                          {getAccountTypeLabel(type)}
                        </Badge>
                        <span className="mr-3">({typeAccounts.length} حساب)</span>
                      </span>
                      <span className="text-lg font-bold">
                        {formatBalance(totalBalanceByType(type))}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {typeAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                          style={{ marginRight: `${(account.level - 1) * 20}px` }}
                        >
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="font-mono text-sm text-muted-foreground">
                                  {account.account_code}
                                </span>
                                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                <p className="font-medium">{account.account_name_ar}</p>
                                {!account.is_active && (
                                  <Badge variant="secondary">غير نشط</Badge>
                                )}
                                {account.allow_posting && (
                                  <Badge variant="outline" className="text-xs">
                                    قابل للترحيل
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {account.account_name_en}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="font-mono text-sm font-medium">
                              {formatBalance(account.balance)}
                            </span>
                            <div className="flex space-x-1 space-x-reverse">
                              {account.allow_posting && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => navigate(`/accounting/accounts/${account.id}`)}
                                  title="عرض الأستاذ"
                                >
                                  <Ledger className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedAccount(account);
                                  setShowDetailsDialog(true);
                                }}
                                title="تفاصيل الحساب"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedAccount(account);
                                  setShowAccountDialog(true);
                                }}
                                title="تعديل الحساب"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedAccount(account);
                                  setShowDeleteDialog(true);
                                }}
                                title="حذف الحساب"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journal Entries */}
          <TabsContent value="journal-entries">
            <JournalEntriesList 
              onCreateNew={() => setShowJournalEntryDialog(true)} 
            />
          </TabsContent>

          {/* Trial Balance */}
          <TabsContent value="trial-balance">
            <TrialBalance 
              onViewAccountDetails={(accountId) => {
                const account = accounts.find(acc => acc.id === accountId);
                if (account) {
                  setSelectedAccount(account);
                  setShowDetailsDialog(true);
                }
              }} 
            />
          </TabsContent>

          {/* Balance Sheet */}
          <TabsContent value="balance-sheet">
            <BalanceSheet 
              onViewAccountDetails={(accountId) => {
                const account = accounts.find(acc => acc.id === accountId);
                if (account) {
                  setSelectedAccount(account);
                  setShowDetailsDialog(true);
                }
              }} 
            />
          </TabsContent>

          {/* Income Statement */}
          <TabsContent value="income-statement">
            <IncomeStatement />
          </TabsContent>

          {/* Cash Flow Statement */}
          <TabsContent value="cash-flow">
            <CashFlowStatement 
              onViewAccountDetails={(accountId) => {
                const account = accounts.find(acc => acc.id === accountId);
                if (account) {
                  setSelectedAccount(account);
                  setShowDetailsDialog(true);
                }
              }} 
            />
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">قائمة المركز المالي</CardTitle>
                  <CardDescription>الأصول والخصوم وحقوق الملكية</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">قائمة الدخل</CardTitle>
                  <CardDescription>الإيرادات والمصروفات والأرباح</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">قائمة التدفقات النقدية</CardTitle>
                  <CardDescription>التدفقات النقدية الداخلة والخارجة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير الأرباح والخسائر</CardTitle>
                  <CardDescription>تحليل مفصل للربحية</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير مراكز التكلفة</CardTitle>
                  <CardDescription>تحليل التكاليف حسب المراكز</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">التقارير الضريبية</CardTitle>
                  <CardDescription>تقارير خاصة بالضرائب</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <AccountDialog
        open={showAccountDialog}
        onOpenChange={(open) => {
          setShowAccountDialog(open);
          if (!open) setSelectedAccount(null);
        }}
        account={selectedAccount}
        onSuccess={fetchAccounts}
      />

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          setShowDeleteDialog(open);
          if (!open) setSelectedAccount(null);
        }}
        account={selectedAccount}
        onSuccess={fetchAccounts}
      />

      <AccountDetails
        open={showDetailsDialog}
        onOpenChange={(open) => {
          setShowDetailsDialog(open);
          if (!open) setSelectedAccount(null);
        }}
        account={selectedAccount}
      />

      <JournalEntryDialog
        open={showJournalEntryDialog}
        onOpenChange={setShowJournalEntryDialog}
        onSuccess={() => {
          // Refresh any data if needed
        }}
      />
    </div>
  );
};

export default Accounting;