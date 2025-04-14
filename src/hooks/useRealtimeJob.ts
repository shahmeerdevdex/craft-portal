
import { useState, useEffect } from 'react';
import { Job, JobPhoto } from '@/lib/supabase';
import { subscribeToJobUpdates, subscribeToJobPhotos } from '@/lib/initSupabase';

export const useRealtimeJob = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [photos, setPhotos] = useState<JobPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    setLoading(true);
    
    // Set up subscription to job updates
    const unsubscribeJob = subscribeToJobUpdates(jobId, (updatedJob: Job) => {
      setJob(updatedJob);
      setLoading(false);
    });

    // Set up subscription to job photos
    const unsubscribePhotos = subscribeToJobPhotos(jobId, (newPhoto: JobPhoto) => {
      setPhotos(prev => [...prev, newPhoto]);
    });

    // Clean up subscriptions on unmount
    return () => {
      unsubscribeJob();
      unsubscribePhotos();
    };
  }, [jobId]);

  return { job, photos, loading };
};
