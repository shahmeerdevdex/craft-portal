
import { supabase } from './supabase';

// Function to verify that all required tables exist in Supabase
export const checkSupabaseSync = async () => {
  try {
    const requiredTables = ['users', 'jobs', 'payments', 'job_photos', 'admin_logs'];
    const results = {};
    
    // Check each table
    for (const table of requiredTables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
        
      results[table] = {
        exists: !error,
        error: error ? error.message : null,
        count
      };
    }
    
    // Check storage bucket
    const { data: buckets, error: bucketError } = await supabase
      .storage
      .listBuckets();
      
    const jobPhotosBucket = buckets?.find(b => b.name === 'job-photos');
    
    results['storage'] = {
      'job-photos': {
        exists: !!jobPhotosBucket,
        error: bucketError ? bucketError.message : null
      }
    };
    
    console.log('Supabase sync check results:', results);
    
    // Return overall status
    const allTablesExist = Object.values(results)
      .filter(r => typeof r === 'object' && 'exists' in r)
      .every(r => r.exists);
      
    const storageExists = results['storage']['job-photos'].exists;
    
    return {
      success: allTablesExist && storageExists,
      details: results
    };
  } catch (error) {
    console.error('Error checking Supabase sync:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// This function can be called from the Admin dashboard to check sync status
export const syncStatus = async () => {
  const status = await checkSupabaseSync();
  return status;
};
