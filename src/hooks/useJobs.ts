
import { supabase, Job } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export const useJobs = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all available jobs
  const useAvailableJobs = () => {
    return useQuery({
      queryKey: ['available-jobs'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'open')
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data as Job[];
      }
    });
  };

  // Fetch jobs assigned to the current user
  const useMyJobs = (userId: string) => {
    return useQuery({
      queryKey: ['my-jobs', userId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('assigned_to', userId)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data as Job[];
      },
      enabled: !!userId
    });
  };

  // Fetch a single job by ID
  const useJob = (jobId: string) => {
    return useQuery({
      queryKey: ['job', jobId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) throw new Error(error.message);
        return data as Job;
      },
      enabled: !!jobId
    });
  };

  // Accept a job
  const useAcceptJob = () => {
    return useMutation({
      mutationFn: async ({ jobId, userId }: { jobId: string; userId: string }) => {
        const { data, error } = await supabase
          .from('jobs')
          .update({ assigned_to: userId, status: 'in-progress' })
          .eq('id', jobId)
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data as Job;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['available-jobs'] });
        queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
        toast({
          title: "Job accepted",
          description: "You have successfully accepted this job",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Error accepting job",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Update job status
  const useUpdateJobStatus = () => {
    return useMutation({
      mutationFn: async ({ jobId, status }: { jobId: string; status: string }) => {
        const { data, error } = await supabase
          .from('jobs')
          .update({ status })
          .eq('id', jobId)
          .select()
          .single();

        if (error) throw new Error(error.message);
        return data as Job;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['job'] });
        queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
        toast({
          title: "Job updated",
          description: "Job status has been updated successfully",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Error updating job",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return {
    useAvailableJobs,
    useMyJobs,
    useJob,
    useAcceptJob,
    useUpdateJobStatus
  };
};
