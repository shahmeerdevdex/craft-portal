
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Download, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

// Mock job history data
const jobHistoryData = [
  {
    id: '101',
    jobTitle: 'Bathroom Plumbing Repair',
    address: '101 Pine St, Springfield, IL 62704',
    completedDate: '2023-11-28',
    jobType: 'Plumbing',
    payment: '$350',
    status: 'Paid',
  },
  {
    id: '102',
    jobTitle: 'Property Inspection with Photos',
    address: '202 Cedar Rd, Springfield, IL 62701',
    completedDate: '2023-11-25',
    jobType: 'Inspector',
    payment: '$75',
    status: 'Paid',
  },
  {
    id: '103',
    jobTitle: 'Gutter Cleaning & Repair',
    address: '303 Maple Dr, Springfield, IL 62702',
    completedDate: '2023-11-20',
    jobType: 'Maintenance',
    payment: '$175',
    status: 'Paid',
  },
  {
    id: '104',
    jobTitle: 'Lawn Mowing - Weekly Service',
    address: '404 Birch Ln, Springfield, IL 62703',
    completedDate: '2023-11-15',
    jobType: 'Lawn Care',
    payment: '$120',
    status: 'Paid',
  },
  {
    id: '105',
    jobTitle: 'Light Fixture Installation',
    address: '505 Walnut Ct, Springfield, IL 62704',
    completedDate: '2023-11-10',
    jobType: 'Electrical',
    payment: '$200',
    status: 'Paid',
  },
  {
    id: '106',
    jobTitle: 'Roof Leak Repair',
    address: '606 Chestnut Pl, Springfield, IL 62701',
    completedDate: '2023-11-05',
    jobType: 'Roofing',
    payment: '$550',
    status: 'Paid',
  },
  {
    id: '107',
    jobTitle: 'HVAC Maintenance',
    address: '707 Poplar Ave, Springfield, IL 62702',
    completedDate: '2023-10-28',
    jobType: 'Maintenance',
    payment: '$280',
    status: 'Paid',
  },
  {
    id: '108',
    jobTitle: 'Window Replacement',
    address: '808 Spruce Blvd, Springfield, IL 62703',
    completedDate: '2023-10-20',
    jobType: 'Maintenance',
    payment: '$650',
    status: 'Paid',
  },
];

const JobHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const { toast } = useToast();
  
  // Filter jobs based on search, job type, and date range
  const filteredJobs = jobHistoryData.filter(job => {
    const matchesSearch = 
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType ? job.jobType === filterType : true;
    
    const jobDate = new Date(job.completedDate);
    const matchesDateRange = 
      (!fromDate || jobDate >= fromDate) && 
      (!toDate || jobDate <= toDate);
    
    return matchesSearch && matchesType && matchesDateRange;
  });
  
  // Calculate total earnings
  const totalEarnings = filteredJobs.reduce((sum, job) => {
    return sum + parseFloat(job.payment.replace('$', '').replace(',', ''));
  }, 0);
  
  const handleDownloadCSV = () => {
    // In a real application, this would generate and download a CSV file
    toast({
      title: "CSV Downloaded",
      description: "Your job history has been exported to CSV",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Job History</h1>
          
          <Button onClick={handleDownloadCSV} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
        
        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search" className="text-sm font-medium mb-1 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                <Input
                  id="search"
                  placeholder="Search job history..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="jobType" className="text-sm font-medium mb-1 block">Job Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Lawn Care">Lawn Care</SelectItem>
                  <SelectItem value="Roofing">Roofing</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inspector">Inspector</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-1 block">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-1 block">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
            <div className="text-sm">
              <span className="font-medium">{filteredJobs.length}</span> jobs found
              {filteredJobs.length > 0 && (
                <span className="ml-3">
                  Total earnings: <span className="font-medium">${totalEarnings.toFixed(2)}</span>
                </span>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
                setFromDate(undefined);
                setToDate(undefined);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </Card>
        
        {/* Job history table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id} onClick={() => setSelectedJob(job)} className="cursor-pointer">
                    <TableCell className="font-medium">{job.jobTitle}</TableCell>
                    <TableCell className="hidden md:table-cell">{job.address}</TableCell>
                    <TableCell>{new Date(job.completedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{job.jobType}</TableCell>
                    <TableCell>{job.payment}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700">{job.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="h-8 w-8 text-neutral-300 mb-2" />
                      <p className="text-neutral-500 font-medium">No jobs found</p>
                      <p className="text-sm text-neutral-400">Try adjusting your filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Job Details Dialog */}
        {selectedJob && (
          <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedJob.jobTitle}</DialogTitle>
                <DialogDescription>{selectedJob.address}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-neutral-500">Completed Date</p>
                    <p className="font-medium">{new Date(selectedJob.completedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Job Type</p>
                    <p className="font-medium">{selectedJob.jobType}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-neutral-500">Payment</p>
                    <p className="font-medium">{selectedJob.payment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Status</p>
                    <Badge className="bg-green-100 text-green-700">{selectedJob.status}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-medium">Job Details</h3>
                <p className="text-sm text-neutral-600">
                  This job was completed on {new Date(selectedJob.completedDate).toLocaleDateString()}. 
                  Payment of {selectedJob.payment} was processed and marked as {selectedJob.status.toLowerCase()}.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button variant="outline">View Receipts</Button>
                  <Button variant="outline">Download Invoice</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default JobHistory;
