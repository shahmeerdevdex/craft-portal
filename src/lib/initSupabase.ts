
import { supabase, setupDatabaseSchema, setupStorage } from './supabase';
import { useToast } from '@/hooks/use-toast';

// This function initializes our Supabase resources
export const initializeSupabase = async () => {
  try {
    // Check if we have a valid Supabase connection
    const { data: connectionTest } = await supabase.from('users').select('count').limit(1);

    // Setup database schema if needed
    await setupDatabaseSchema();
    
    // Setup storage buckets if needed
    await setupStorage();
    
    console.log('Supabase initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return { success: false, error };
  }
};

// Function to enable real-time subscriptions for jobs
export const subscribeToJobUpdates = (jobId: string, callback: Function) => {
  const subscription = supabase
    .channel(`job-${jobId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'jobs',
        filter: `id=eq.${jobId}`
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};

// Function to subscribe to new job photos
export const subscribeToJobPhotos = (jobId: string, callback: Function) => {
  const subscription = supabase
    .channel(`job-photos-${jobId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'job_photos',
        filter: `job_id=eq.${jobId}`
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
