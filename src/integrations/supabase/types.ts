export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_code: string
          account_name_ar: string
          account_name_en: string
          account_type: Database["public"]["Enums"]["account_type"]
          allow_posting: boolean | null
          balance: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          level: number
          parent_account_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          account_code: string
          account_name_ar: string
          account_name_en: string
          account_type: Database["public"]["Enums"]["account_type"]
          allow_posting?: boolean | null
          balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level: number
          parent_account_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          account_code?: string
          account_name_ar?: string
          account_name_en?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          allow_posting?: boolean | null
          balance?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          parent_account_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records: {
        Row: {
          check_in_location: Json | null
          check_in_time: string | null
          check_out_location: Json | null
          check_out_time: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          notes: string | null
          overtime_hours: number | null
          status: string | null
          tenant_id: string
          total_hours: number | null
        }
        Insert: {
          check_in_location?: Json | null
          check_in_time?: string | null
          check_out_location?: Json | null
          check_out_time?: string | null
          created_at?: string | null
          date: string
          employee_id: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          tenant_id: string
          total_hours?: number | null
        }
        Update: {
          check_in_location?: Json | null
          check_in_time?: string | null
          check_out_location?: Json | null
          check_out_time?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          tenant_id?: string
          total_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          contract_number: string
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at: string | null
          created_by: string
          customer_id: string
          daily_rate: number
          end_date: string
          id: string
          notes: string | null
          security_deposit: number | null
          start_date: string
          status: Database["public"]["Enums"]["contract_status"] | null
          tenant_id: string
          terms_conditions: string | null
          total_amount: number
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          contract_number: string
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          created_by: string
          customer_id: string
          daily_rate: number
          end_date: string
          id?: string
          notes?: string | null
          security_deposit?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          tenant_id: string
          terms_conditions?: string | null
          total_amount: number
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          contract_number?: string
          contract_type?: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          created_by?: string
          customer_id?: string
          daily_rate?: number
          end_date?: string
          id?: string
          notes?: string | null
          security_deposit?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"] | null
          tenant_id?: string
          terms_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_centers: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          blacklist_reason: string | null
          city: string | null
          civil_id: string | null
          created_at: string | null
          customer_type: Database["public"]["Enums"]["customer_type"]
          email: string | null
          full_name: string
          id: string
          is_blacklisted: boolean | null
          notes: string | null
          phone: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          blacklist_reason?: string | null
          city?: string | null
          civil_id?: string | null
          created_at?: string | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          email?: string | null
          full_name: string
          id?: string
          is_blacklisted?: boolean | null
          notes?: string | null
          phone: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          blacklist_reason?: string | null
          city?: string | null
          civil_id?: string | null
          created_at?: string | null
          customer_type?: Database["public"]["Enums"]["customer_type"]
          email?: string | null
          full_name?: string
          id?: string
          is_blacklisted?: boolean | null
          notes?: string | null
          phone?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          allowances: number | null
          basic_salary: number | null
          created_at: string | null
          department: string | null
          employee_number: string
          full_name: string
          hire_date: string | null
          id: string
          is_active: boolean | null
          position: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allowances?: number | null
          basic_salary?: number | null
          created_at?: string | null
          department?: string | null
          employee_number: string
          full_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          position?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allowances?: number | null
          basic_salary?: number | null
          created_at?: string | null
          department?: string | null
          employee_number?: string
          full_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          position?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          cost_center_id: string
          created_at: string | null
          created_by: string
          description: string
          entry_date: string
          entry_number: string
          id: string
          is_auto_generated: boolean | null
          reference: string | null
          source_id: string | null
          source_type: string | null
          tenant_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          cost_center_id: string
          created_at?: string | null
          created_by: string
          description: string
          entry_date: string
          entry_number: string
          id?: string
          is_auto_generated?: boolean | null
          reference?: string | null
          source_id?: string | null
          source_type?: string | null
          tenant_id: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          cost_center_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          entry_date?: string
          entry_number?: string
          id?: string
          is_auto_generated?: boolean | null
          reference?: string | null
          source_id?: string | null
          source_type?: string | null
          tenant_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entry_lines: {
        Row: {
          account_id: string
          created_at: string | null
          credit_amount: number | null
          debit_amount: number | null
          description: string | null
          id: string
          journal_entry_id: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          credit_amount?: number | null
          debit_amount?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entry_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entry_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          employee_id: string
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          rejection_reason: string | null
          start_date: string
          status: string | null
          tenant_id: string
          total_days: number
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id: string
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          rejection_reason?: string | null
          start_date: string
          status?: string | null
          tenant_id: string
          total_days: number
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          rejection_reason?: string | null
          start_date?: string
          status?: string | null
          tenant_id?: string
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          business_type: Database["public"]["Enums"]["business_type"]
          created_at: string | null
          id: string
          logo_url: string | null
          max_contracts: number | null
          max_users: number | null
          max_vehicles: number | null
          name: string
          settings: Json | null
          slug: string
          status: Database["public"]["Enums"]["tenant_status"] | null
          subscription_expires_at: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at: string | null
        }
        Insert: {
          business_type: Database["public"]["Enums"]["business_type"]
          created_at?: string | null
          id?: string
          logo_url?: string | null
          max_contracts?: number | null
          max_users?: number | null
          max_vehicles?: number | null
          name: string
          settings?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subscription_expires_at?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string | null
        }
        Update: {
          business_type?: Database["public"]["Enums"]["business_type"]
          created_at?: string | null
          id?: string
          logo_url?: string | null
          max_contracts?: number | null
          max_users?: number | null
          max_vehicles?: number | null
          name?: string
          settings?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subscription_expires_at?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string | null
        }
        Relationships: []
      }
      traffic_violations: {
        Row: {
          contract_id: string | null
          created_at: string | null
          customer_id: string | null
          fine_amount: number
          id: string
          is_paid: boolean | null
          notes: string | null
          paid_amount: number | null
          payment_date: string | null
          tenant_id: string
          updated_at: string | null
          vehicle_id: string
          violation_date: string
          violation_type: string
        }
        Insert: {
          contract_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          fine_amount: number
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          tenant_id: string
          updated_at?: string | null
          vehicle_id: string
          violation_date: string
          violation_type: string
        }
        Update: {
          contract_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          fine_amount?: number
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          tenant_id?: string
          updated_at?: string | null
          vehicle_id?: string
          violation_date?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "traffic_violations_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "traffic_violations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "traffic_violations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "traffic_violations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          permissions: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          last_login_at?: string | null
          permissions?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          permissions?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_maintenance: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string
          description: string
          end_date: string | null
          id: string
          is_completed: boolean | null
          maintenance_type: string
          notes: string | null
          start_date: string
          tenant_id: string
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by: string
          description: string
          end_date?: string | null
          id?: string
          is_completed?: boolean | null
          maintenance_type: string
          notes?: string | null
          start_date: string
          tenant_id: string
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string
          description?: string
          end_date?: string | null
          id?: string
          is_completed?: boolean | null
          maintenance_type?: string
          notes?: string | null
          start_date?: string
          tenant_id?: string
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_maintenance_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_movements: {
        Row: {
          cost: number | null
          created_at: string | null
          created_by: string
          end_datetime: string | null
          from_location: string | null
          id: string
          movement_type: string
          notes: string | null
          responsible_person: string | null
          start_datetime: string
          tenant_id: string
          to_location: string | null
          vehicle_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          created_by: string
          end_datetime?: string | null
          from_location?: string | null
          id?: string
          movement_type: string
          notes?: string | null
          responsible_person?: string | null
          start_datetime: string
          tenant_id: string
          to_location?: string | null
          vehicle_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          created_by?: string
          end_datetime?: string | null
          from_location?: string | null
          id?: string
          movement_type?: string
          notes?: string | null
          responsible_person?: string | null
          start_datetime?: string
          tenant_id?: string
          to_location?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_movements_responsible_person_fkey"
            columns: ["responsible_person"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_movements_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          chassis_number: string | null
          color: string
          created_at: string | null
          current_location: string | null
          daily_rate: number | null
          depreciation_method: string | null
          depreciation_rate: number | null
          engine_number: string | null
          extra_km_rate: number | null
          has_gps: boolean | null
          id: string
          insurance_data: Json | null
          maintenance_data: Json | null
          make: string
          max_km_per_day: number | null
          model: string
          monthly_rate: number | null
          plate_number: string
          productive_life_years: number | null
          purchase_cost: number | null
          purchase_date: string | null
          residual_value: number | null
          status: Database["public"]["Enums"]["vehicle_status"] | null
          tenant_id: string
          updated_at: string | null
          weekly_rate: number | null
          year: number
          yearly_rate: number | null
        }
        Insert: {
          chassis_number?: string | null
          color: string
          created_at?: string | null
          current_location?: string | null
          daily_rate?: number | null
          depreciation_method?: string | null
          depreciation_rate?: number | null
          engine_number?: string | null
          extra_km_rate?: number | null
          has_gps?: boolean | null
          id?: string
          insurance_data?: Json | null
          maintenance_data?: Json | null
          make: string
          max_km_per_day?: number | null
          model: string
          monthly_rate?: number | null
          plate_number: string
          productive_life_years?: number | null
          purchase_cost?: number | null
          purchase_date?: string | null
          residual_value?: number | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          tenant_id: string
          updated_at?: string | null
          weekly_rate?: number | null
          year: number
          yearly_rate?: number | null
        }
        Update: {
          chassis_number?: string | null
          color?: string
          created_at?: string | null
          current_location?: string | null
          daily_rate?: number | null
          depreciation_method?: string | null
          depreciation_rate?: number | null
          engine_number?: string | null
          extra_km_rate?: number | null
          has_gps?: boolean | null
          id?: string
          insurance_data?: Json | null
          maintenance_data?: Json | null
          make?: string
          max_km_per_day?: number | null
          model?: string
          monthly_rate?: number | null
          plate_number?: string
          productive_life_years?: number | null
          purchase_cost?: number | null
          purchase_date?: string | null
          residual_value?: number | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          tenant_id?: string
          updated_at?: string | null
          weekly_rate?: number | null
          year?: number
          yearly_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_default_chart_of_accounts: {
        Args: { p_tenant_id: string }
        Returns: undefined
      }
      create_default_cost_centers: {
        Args: {
          p_tenant_id: string
          p_business_type: Database["public"]["Enums"]["business_type"]
        }
        Returns: undefined
      }
      setup_new_tenant: {
        Args: {
          p_tenant_id: string
          p_business_type: Database["public"]["Enums"]["business_type"]
          p_user_id: string
          p_user_email: string
          p_user_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type: "assets" | "liabilities" | "equity" | "revenue" | "expenses"
      business_type:
        | "car_rental"
        | "yacht_rental"
        | "equipment_rental"
        | "restaurant"
        | "salon"
        | "hr_only"
        | "booking_only"
        | "custom"
      contract_status: "active" | "completed" | "cancelled" | "overdue"
      contract_type: "daily" | "weekly" | "monthly" | "yearly"
      customer_type: "individual" | "company"
      subscription_status: "active" | "expired" | "trial" | "canceled"
      tenant_status: "active" | "suspended" | "inactive"
      user_role:
        | "super_admin"
        | "admin"
        | "manager"
        | "accountant"
        | "employee"
        | "user"
      vehicle_status:
        | "available"
        | "rented"
        | "maintenance"
        | "unavailable"
        | "reserved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["assets", "liabilities", "equity", "revenue", "expenses"],
      business_type: [
        "car_rental",
        "yacht_rental",
        "equipment_rental",
        "restaurant",
        "salon",
        "hr_only",
        "booking_only",
        "custom",
      ],
      contract_status: ["active", "completed", "cancelled", "overdue"],
      contract_type: ["daily", "weekly", "monthly", "yearly"],
      customer_type: ["individual", "company"],
      subscription_status: ["active", "expired", "trial", "canceled"],
      tenant_status: ["active", "suspended", "inactive"],
      user_role: [
        "super_admin",
        "admin",
        "manager",
        "accountant",
        "employee",
        "user",
      ],
      vehicle_status: [
        "available",
        "rented",
        "maintenance",
        "unavailable",
        "reserved",
      ],
    },
  },
} as const
