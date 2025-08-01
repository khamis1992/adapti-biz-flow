import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LedgerEntry {
  id: string;
  entry_date: string;
  description: string;
  reference: string;
  debit_amount: number;
  credit_amount: number;
  running_balance: number;
  journal_entry_number: string;
}

interface AccountLedgerChartProps {
  entries: LedgerEntry[];
  accountType: string;
}

export function AccountLedgerChart({ entries, accountType }: AccountLedgerChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Prepare chart data - group by month for better visualization
  const chartData = entries.reduce((acc: any[], entry) => {
    const date = new Date(entry.entry_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const existingMonth = acc.find(item => item.month === monthKey);
    
    if (existingMonth) {
      existingMonth.debit += entry.debit_amount;
      existingMonth.credit += entry.credit_amount;
      existingMonth.balance = entry.running_balance; // Use latest balance in month
      existingMonth.transactions += 1;
    } else {
      acc.push({
        month: monthKey,
        monthLabel: date.toLocaleDateString('ar-KW', { year: 'numeric', month: 'short' }),
        debit: entry.debit_amount,
        credit: entry.credit_amount,
        balance: entry.running_balance,
        transactions: 1,
      });
    }
    
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));

  // Daily balance data for line chart
  const dailyData = entries.slice(-30).map(entry => ({
    date: new Date(entry.entry_date).toLocaleDateString('ar-KW', { month: 'short', day: 'numeric' }),
    balance: entry.running_balance,
    debit: entry.debit_amount,
    credit: entry.credit_amount,
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Balance Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              اتجاه الرصيد - آخر 30 حركة
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant={chartType === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('line')}
              >
                خطي
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('bar')}
              >
                أعمدة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'line' ? (
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${value.toFixed(0)} د.ك`} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  name="الرصيد"
                />
              </LineChart>
            ) : (
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${value.toFixed(0)} د.ك`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="balance" fill="hsl(var(--primary))" name="الرصيد" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            النشاط الشهري - مدين ودائن
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthLabel" />
              <YAxis tickFormatter={(value) => `${value.toFixed(0)} د.ك`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="debit" fill="hsl(var(--chart-1))" name="مدين" />
              <Bar dataKey="credit" fill="hsl(var(--chart-2))" name="دائن" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}