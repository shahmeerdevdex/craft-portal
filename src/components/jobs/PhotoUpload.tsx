
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Camera, Loader2, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface PhotoUploadProps {
  jobId: string;
  onSuccess?: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ jobId, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const { isUploading, uploadJobPhoto } = useFileUpload();
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !user) return;
    
    await uploadJobPhoto(jobId, file, user.id, comment);
    
    // Reset form
    setFile(null);
    setComment('');
    setPreview(null);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-neutral-50">
      <h3 className="font-medium">Upload Work Photos</h3>
      
      {!preview ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}>
          <Camera className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-600">Click to select a photo or drag and drop</p>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <Button 
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-80 hover:opacity-100"
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
          >
            Remove
          </Button>
        </div>
      )}
      
      <div>
        <Label htmlFor="comment">Comment (optional)</Label>
        <Textarea
          id="comment"
          placeholder="Add details about this photo..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={!file || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </>
        )}
      </Button>
    </form>
  );
};

export default PhotoUpload;
