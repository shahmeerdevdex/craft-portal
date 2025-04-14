
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, MapPin, Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/lib/supabase';
import PhotoUpload from './PhotoUpload';

interface JobDetailsProps {
  job: Job;
  showActions?: boolean;
  onRefresh?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, showActions = true, onRefresh }) => {
  const { user } = useAuth();
  const { useAcceptJob, useUpdateJobStatus } = useJobs();
  const { mutate: acceptJob, isPending: isAccepting } = useAcceptJob();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateJobStatus();

  const handleAcceptJob = () => {
    if (!user) return;
    acceptJob({ jobId: job.id, userId: user.id });
  };

  const handleCompleteJob = () => {
    updateStatus({ jobId: job.id, status: 'completed' });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-700">Available</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-700">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'paid':
        return <Badge className="bg-teal-100 text-teal-700">Paid</Badge>;
      default:
        return <Badge className="bg-neutral-100 text-neutral-700">{status}</Badge>;
    }
  };

  const isMyJob = job.assigned_to === user?.id;
  const canComplete = isMyJob && job.status === 'in-progress';
  const canAccept = job.status === 'open' && !isMyJob;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </CardDescription>
          </div>
          {getStatusBadge(job.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="prose">
          <p>{job.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 py-2">
          {job.due_date && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-teal-500" />
              <span>Due: {new Date(job.due_date).toLocaleDateString()}</span>
            </div>
          )}
          
          {job.payment && (
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
              <span>${job.payment.amount}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        {isMyJob && job.status === 'in-progress' && (
          <PhotoUpload jobId={job.id} onSuccess={onRefresh} />
        )}
        
        {job.photos && job.photos.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <FileCheck className="h-4 w-4 mr-2" />
              Job Photos ({job.photos.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {job.photos.map((photo, index) => (
                <div key={index} className="relative overflow-hidden rounded-md h-24">
                  <img 
                    src={photo} 
                    alt={`Job photo ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="border-t pt-4 flex justify-end space-x-2">
          {canAccept && (
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white" 
              onClick={handleAcceptJob}
              disabled={isAccepting}
            >
              {isAccepting ? "Accepting..." : "Accept Job"}
            </Button>
          )}
          
          {canComplete && (
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white flex items-center" 
              onClick={handleCompleteJob}
              disabled={isUpdating}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isUpdating ? "Submitting..." : "Mark Complete"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default JobDetails;
