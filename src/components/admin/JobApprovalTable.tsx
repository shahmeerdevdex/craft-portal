
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Sample data (to be replaced with real data from Supabase)
const sampleJobs = [
  {
    id: '1',
    title: 'Roof Repair',
    location: '123 Main St, Springfield',
    contractor: 'John Doe',
    status: 'submitted',
    payment: 350,
    date: '2023-04-15'
  },
  {
    id: '2',
    title: 'Electrical Wiring',
    location: '456 Oak Ave, Springfield',
    contractor: 'Jane Smith',
    status: 'completed',
    payment: 250,
    date: '2023-04-10'
  },
  {
    id: '3',
    title: 'Plumbing Repair',
    location: '789 Elm Blvd, Springfield',
    contractor: 'Mike Johnson',
    status: 'in-progress',
    payment: 400,
    date: '2023-04-18'
  },
  {
    id: '4',
    title: 'Lawn Maintenance',
    location: '101 Pine St, Springfield',
    contractor: 'Sarah Brown',
    status: 'submitted',
    payment: 150,
    date: '2023-04-20'
  },
  {
    id: '5',
    title: 'HVAC Installation',
    location: '202 Cedar Rd, Springfield',
    contractor: 'Alex Green',
    status: 'completed',
    payment: 1200,
    date: '2023-04-05'
  }
];

const JobApprovalTable = () => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-700">Submitted</Badge>;
      case 'approved':
        return <Badge className="bg-teal-100 text-teal-700">Approved</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-700">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-700">Completed</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      default:
        return <Badge className="bg-neutral-100 text-neutral-700">{status}</Badge>;
    }
  };

  const openApproveDialog = (job) => {
    setSelectedJob(job);
    setApprovalDialog(true);
  };

  const openPaymentDialog = (job) => {
    setSelectedJob(job);
    setPaymentDialog(true);
  };

  const handleApproveJob = () => {
    // In real app, this would update the job status in Supabase
    setJobs(jobs.map(job => 
      job.id === selectedJob.id ? {...job, status: 'approved'} : job
    ));
    
    toast({
      title: "Job approved",
      description: `${selectedJob.title} has been approved and the contractor has been notified.`,
    });
    
    setApprovalDialog(false);
    setSelectedJob(null);
  };

  const handleRejectJob = () => {
    // In real app, this would update the job status in Supabase
    toast({
      title: "Job rejected",
      description: `${selectedJob.title} has been rejected.`,
      variant: "destructive",
    });
    
    setApprovalDialog(false);
    setSelectedJob(null);
  };

  const handleMarkAsPaid = () => {
    // In real app, this would update the job status in Supabase and create a payment record
    setJobs(jobs.map(job => 
      job.id === selectedJob.id ? {...job, status: 'paid'} : job
    ));
    
    toast({
      title: "Payment recorded",
      description: `Payment of $${selectedJob.payment} has been recorded for ${selectedJob.title}.`,
    });
    
    setPaymentDialog(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <Table>
        <TableCaption>Active jobs requiring approval or payment</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contractor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.contractor}</TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
              <TableCell>${job.payment}</TableCell>
              <TableCell>{new Date(job.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                {job.status === 'submitted' && (
                  <Button 
                    onClick={() => openApproveDialog(job)} 
                    size="sm" 
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                )}
                {job.status === 'completed' && (
                  <Button 
                    onClick={() => openPaymentDialog(job)} 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pay
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Approval Dialog */}
      {selectedJob && (
        <Dialog open={approvalDialog} onOpenChange={setApprovalDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to approve this job for {selectedJob.contractor}?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Job Title</p>
                  <p>{selectedJob.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Location</p>
                  <p>{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Payment</p>
                  <p>${selectedJob.payment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Date</p>
                  <p>{new Date(selectedJob.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="space-x-2 flex">
              <Button 
                onClick={handleRejectJob} 
                variant="outline" 
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                onClick={handleApproveJob} 
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Payment Dialog */}
      {selectedJob && (
        <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Payment</DialogTitle>
              <DialogDescription>
                Mark this job as paid and notify the contractor.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Job Title</p>
                  <p>{selectedJob.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Contractor</p>
                  <p>{selectedJob.contractor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500">Payment Amount</p>
                  <p className="font-bold text-lg">${selectedJob.payment}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleMarkAsPaid} 
                className="w-full bg-green-500 hover:bg-green-600"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Mark as Paid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobApprovalTable;
