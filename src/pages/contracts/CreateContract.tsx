import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContractFormData {
  contract_number: string;
  customer_id: string;
  vehicle_id: string;
  contract_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: Date;
  end_date: Date;
  daily_rate: number;
  total_amount: number;
  security_deposit: number;
  notes?: string;
  terms_conditions?: string;
}

export default function CreateContract() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ContractFormData>();

  const contractType = watch('contract_type');
  const dailyRate = watch('daily_rate');

  const calculateTotalAmount = () => {
    if (startDate && endDate && dailyRate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      let multiplier = days;
      
      if (contractType === 'weekly') {
        multiplier = Math.ceil(days / 7);
      } else if (contractType === 'monthly') {
        multiplier = Math.ceil(days / 30);
      } else if (contractType === 'yearly') {
        multiplier = Math.ceil(days / 365);
      }
      
      return dailyRate * multiplier;
    }
    return 0;
  };

  const generateContractNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CTR-${year}${month}-${random}`;
  };

  const onSubmit = async (data: ContractFormData) => {
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select start and end dates",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Not authenticated');

      const contractData = {
        ...data,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        total_amount: calculateTotalAmount(),
        created_by: user.data.user.id,
        tenant_id: user.data.user.user_metadata?.tenant_id,
      };

      const { error } = await supabase
        .from('contracts')
        .insert([contractData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contract created successfully",
      });

      navigate('/contracts');
    } catch (error) {
      console.error('Error creating contract:', error);
      toast({
        title: "Error",
        description: "Failed to create contract",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/contracts')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contracts
        </Button>
        <h1 className="text-3xl font-bold">Create New Contract</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contract Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contract_number">Contract Number</Label>
                <Input
                  id="contract_number"
                  {...register('contract_number', { required: 'Contract number is required' })}
                  defaultValue={generateContractNumber()}
                />
                {errors.contract_number && (
                  <p className="text-sm text-destructive mt-1">{errors.contract_number.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contract_type">Contract Type</Label>
                <Select onValueChange={(value) => setValue('contract_type', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="customer_id">Customer</Label>
                <Input
                  id="customer_id"
                  {...register('customer_id', { required: 'Customer is required' })}
                  placeholder="Customer ID"
                />
                {errors.customer_id && (
                  <p className="text-sm text-destructive mt-1">{errors.customer_id.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="vehicle_id">Vehicle</Label>
                <Input
                  id="vehicle_id"
                  {...register('vehicle_id', { required: 'Vehicle is required' })}
                  placeholder="Vehicle ID"
                />
                {errors.vehicle_id && (
                  <p className="text-sm text-destructive mt-1">{errors.vehicle_id.message}</p>
                )}
              </div>

              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="daily_rate">Rate (per day)</Label>
                <Input
                  id="daily_rate"
                  type="number"
                  step="0.01"
                  {...register('daily_rate', { required: 'Daily rate is required', min: 0 })}
                />
                {errors.daily_rate && (
                  <p className="text-sm text-destructive mt-1">{errors.daily_rate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="security_deposit">Security Deposit</Label>
                <Input
                  id="security_deposit"
                  type="number"
                  step="0.01"
                  {...register('security_deposit', { min: 0 })}
                />
              </div>
            </div>

            {startDate && endDate && dailyRate && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg font-semibold">
                  Total Amount: ${calculateTotalAmount().toFixed(2)}
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Additional notes..."
              />
            </div>

            <div>
              <Label htmlFor="terms_conditions">Terms & Conditions</Label>
              <Textarea
                id="terms_conditions"
                {...register('terms_conditions')}
                placeholder="Contract terms and conditions..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Contract'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/contracts')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}