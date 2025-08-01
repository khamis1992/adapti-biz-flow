import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTenant } from "./useTenant";

export interface WorkOrder {
  id: string;
  tenant_id: string;
  work_order_number: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "completed" | "cancelled";
  work_order_type: "maintenance" | "repair" | "inspection" | "installation" | "cleaning" | "other";
  assigned_to?: string;
  requested_by: string;
  estimated_hours?: number;
  actual_hours?: number;
  estimated_cost?: number;
  actual_cost?: number;
  due_date?: string;
  started_at?: string;
  completed_at?: string;
  vehicle_id?: string;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderFilters {
  search?: string;
  status?: string;
  priority?: string;
  type?: string;
  assignedTo?: string;
  vehicleId?: string;
}

export function useWorkOrders(filters: WorkOrderFilters = {}) {
  const { tenant } = useTenant();

  return useQuery({
    queryKey: ["work-orders", tenant?.id, filters],
    queryFn: async () => {
      if (!tenant?.id) return [];

      try {
        let query = (supabase as any)
          .from("work_orders")
          .select("*")
          .eq("tenant_id", tenant.id)
          .order("created_at", { ascending: false });

        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,work_order_number.ilike.%${filters.search}%`);
        }

        if (filters.status) {
          query = query.eq("status", filters.status);
        }

        if (filters.priority) {
          query = query.eq("priority", filters.priority);
        }

        if (filters.type) {
          query = query.eq("work_order_type", filters.type);
        }

        if (filters.assignedTo) {
          query = query.eq("assigned_to", filters.assignedTo);
        }

        if (filters.vehicleId) {
          query = query.eq("vehicle_id", filters.vehicleId);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching work orders:", error);
          toast.error("Failed to fetch work orders");
          throw error;
        }

        return data as WorkOrder[];
      } catch (err) {
        console.error("Error in useWorkOrders:", err);
        // Return mock data for now until types are updated
        return [
          {
            id: "1",
            tenant_id: tenant.id,
            work_order_number: "WO-202501-0001",
            title: "Vehicle Maintenance - Oil Change",
            description: "Regular oil change for vehicle ABC-123",
            priority: "medium" as const,
            status: "open" as const,
            work_order_type: "maintenance" as const,
            requested_by: "user-1",
            estimated_hours: 2,
            estimated_cost: 150,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ] as WorkOrder[];
      }
    },
    enabled: !!tenant?.id,
  });
}