
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with public anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type UserRole = 'tradesman' | 'admin';
export type TradeType = 'Lawn Care' | 'Roofing' | 'Plumbing' | 'Electrical' | 'Maintenance' | 'Inspector';
export type JobStatus = 'open' | 'in-progress' | 'completed' | 'paid';
export type PaymentStatus = 'pending' | 'released' | 'failed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  trade: TradeType;
  hourly_rate: number;
  service_area: string;
  avatar_url?: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  posted_by: string;
  assigned_to?: string;
  status: JobStatus;
  photos?: string[];
  created_at: string;
  due_date?: string;
  payment?: {
    amount: number;
    status: PaymentStatus;
  };
}

export interface JobPhoto {
  id: string;
  job_id: string;
  url: string;
  uploaded_by: string;
  created_at: string;
  comment?: string;
}

export interface Payment {
  id: string;
  job_id: string;
  amount: number;
  paid_to: string;
  status: PaymentStatus;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  job_id?: string;
  payment_id?: string;
  contractor_id?: string;
  timestamp: string;
  details?: string;
}

// Function to setup database schema (can be called from an admin page)
export const setupDatabaseSchema = async () => {
  try {
    console.log("Setting up database schema...");
    
    // Create tables if they don't exist using Supabase's built-in functions
    // This is a simplified example - in production you would use migrations
    
    // Create storage bucket for job photos if it doesn't exist
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    if (!existingBuckets?.find(b => b.name === 'job-photos')) {
      await supabase.storage.createBucket('job-photos', {
        public: false,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
      });
    }
    
    console.log("Database schema setup complete");
    return { success: true };
  } catch (error) {
    console.error("Error setting up database schema:", error);
    return { success: false, error };
  }
};

// Create a storage bucket for job photos if it doesn't exist
export const setupStorage = async () => {
  try {
    const { data, error } = await supabase.storage.getBucket('job-photos');
    
    if (error && error.message.includes('not found')) {
      await supabase.storage.createBucket('job-photos', {
        public: true, // Make this public so we can access photos without auth
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error setting up storage:", error);
    return { success: false, error };
  }
};
