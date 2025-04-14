
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Upload single file
  const uploadFile = async (file: File, bucket: string, folder: string) => {
    try {
      setIsUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get public URL for the file
      const { data: urlData } = supabase
        .storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      return urlData.publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Upload job photo and save to DB
  const uploadJobPhoto = async (jobId: string, file: File, userId: string, comment?: string) => {
    try {
      setIsUploading(true);
      
      // First upload the file
      const imageUrl = await uploadFile(file, 'job-photos', jobId);
      
      if (!imageUrl) throw new Error('Failed to upload image');
      
      // Then save the record to the database
      const { data, error } = await supabase
        .from('job_photos')
        .insert({
          job_id: jobId,
          url: imageUrl,
          uploaded_by: userId,
          comment
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Now update the job record with the new photo URL in the photos array
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .select('photos')
        .eq('id', jobId)
        .single();
      
      if (jobError) throw jobError;
      
      const updatedPhotos = job.photos ? [...job.photos, imageUrl] : [imageUrl];
      
      await supabase
        .from('jobs')
        .update({ photos: updatedPhotos })
        .eq('id', jobId);
      
      // Refresh job data
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
      
      toast({
        title: "Photo uploaded",
        description: "Your photo has been uploaded successfully",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFile,
    uploadJobPhoto
  };
};
