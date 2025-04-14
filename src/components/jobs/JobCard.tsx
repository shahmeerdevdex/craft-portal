
import React from 'react';
import { CalendarClock, Clock, DollarSign, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    address: string;
    jobType: string;
    dueDate: string;
    status: string;
    payment: string;
  };
  showActions?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showActions = true }) => {
  const { title, address, jobType, dueDate, status, payment } = job;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'submitted':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="job-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex items-center text-neutral-600 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {address}
          </div>
        </div>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center text-sm text-neutral-700">
          <Home className="h-4 w-4 mr-2 text-blue-500" />
          {jobType}
        </div>
        <div className="flex items-center text-sm text-neutral-700">
          <CalendarClock className="h-4 w-4 mr-2 text-teal-500" />
          Due: {new Date(dueDate).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-neutral-700">
          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
          {payment}
        </div>
      </div>
      
      {showActions && (
        <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Button className="btn-primary" size="sm">
            {status === 'Pending' ? 'Accept Job' : 
             status === 'In Progress' ? 'Update Status' : 
             status === 'Submitted' ? 'View Submission' : 'View Details'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
