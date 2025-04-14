
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

// Mocked data - would come from Supabase in a real implementation
const MOCK_CONTRACTORS = [
  { id: 'con1', name: 'John Smith', trade: 'Plumbing', completedJobs: 12, totalPaid: 4800 },
  { id: 'con2', name: 'Maria Garcia', trade: 'Electrical', completedJobs: 8, totalPaid: 3200 },
  { id: 'con3', name: 'David Johnson', trade: 'Lawn Care', completedJobs: 15, totalPaid: 2700 },
];

const MOCK_JOBS = [
  { id: 'job1', title: 'Fix Kitchen Sink', location: '123 Main St', status: 'completed', date: '2023-06-10', payment: 350 },
  { id: 'job2', title: 'Repair Electrical Panel', location: '456 Oak Ave', status: 'completed', date: '2023-06-15', payment: 450 },
  { id: 'job3', title: 'Weekly Lawn Service', location: '789 Pine Blvd', status: 'paid', date: '2023-06-20', payment: 180 },
  { id: 'job4', title: 'Replace Light Fixtures', location: '101 Maple Dr', status: 'in-progress', date: '2023-06-25', payment: null },
];

const ContractorHistory = () => {
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const handleContractorChange = (value: string) => {
    setSelectedContractor(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'paid':
        return <Badge className="bg-purple-500">Paid</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  const selectedContractorData = MOCK_CONTRACTORS.find(c => c.id === selectedContractor);

  return (
    <div>
      <div className="mb-6">
        <Label htmlFor="contractor-select">Select Contractor</Label>
        <Select onValueChange={handleContractorChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a contractor" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_CONTRACTORS.map((contractor) => (
              <SelectItem key={contractor.id} value={contractor.id}>
                {contractor.name} - {contractor.trade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedContractor && selectedContractorData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <h3 className="text-2xl font-bold">{selectedContractorData.completedJobs}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <h3 className="text-2xl font-bold">${selectedContractorData.totalPaid}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Trade</p>
                  <h3 className="text-xl font-bold">{selectedContractorData.trade}</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Job History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_JOBS.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>{job.payment ? `$${job.payment}` : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {selectedContractor === null && (
        <div className="text-center py-8 text-muted-foreground">
          Select a contractor to view their history
        </div>
      )}
    </div>
  );
};

export default ContractorHistory;
