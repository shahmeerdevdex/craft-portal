
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import JobCard from '@/components/jobs/JobCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';

// Mock job data
const jobsData = [
  {
    id: '1',
    title: 'Roof Repair - Shingle Replacement',
    address: '123 Main St, Springfield, IL 62701',
    jobType: 'Roofing',
    dueDate: '2023-12-15',
    status: 'Pending',
    payment: '$850',
    description: 'Replace damaged shingles on a 1,500 sq ft single-story home. Materials will be provided. Requires ladder work and basic roofing experience.'
  },
  {
    id: '2',
    title: 'Lawn Maintenance - Large Property',
    address: '456 Oak Ave, Springfield, IL 62702',
    jobType: 'Lawn Care',
    dueDate: '2023-12-10',
    status: 'Pending',
    payment: '$250',
    description: 'Weekly lawn maintenance for a 1-acre property. Tasks include mowing, edging, and debris cleanup. Must provide own equipment.'
  },
  {
    id: '3',
    title: 'Electrical Panel Upgrade',
    address: '789 Elm Blvd, Springfield, IL 62703',
    jobType: 'Electrical',
    dueDate: '2023-12-18',
    status: 'Pending',
    payment: '$1,200',
    description: 'Upgrade electrical panel from 100A to 200A service. Must be licensed electrician. All necessary permits will be provided by property management.'
  },
  {
    id: '4',
    title: 'Bathroom Plumbing Repair',
    address: '101 Pine St, Springfield, IL 62704',
    jobType: 'Plumbing',
    dueDate: '2023-12-08',
    status: 'Pending',
    payment: '$350',
    description: 'Fix leaking sink and replace bathroom faucet. Materials will be on-site. Requires basic plumbing knowledge and tools.'
  },
  {
    id: '5',
    title: 'Property Inspection with Photos',
    address: '202 Cedar Rd, Springfield, IL 62701',
    jobType: 'Inspector',
    dueDate: '2023-12-05',
    status: 'Pending',
    payment: '$75',
    description: 'Conduct exterior property inspection with detailed photos of all sides of house, yard, and any visible damage. Complete standard inspection checklist.'
  },
  {
    id: '6',
    title: 'Gutter Cleaning & Repair',
    address: '303 Maple Dr, Springfield, IL 62702',
    jobType: 'Maintenance',
    dueDate: '2023-12-12',
    status: 'Pending',
    payment: '$175',
    description: 'Clean gutters and downspouts, repair any loose sections, and ensure proper drainage. Two-story house, requires ladder work.'
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Filter jobs based on search term and filters
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.jobType.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesJobType = selectedJobType === '' || job.jobType === selectedJobType;
    
    // Extract numeric value from payment string (remove $ and commas)
    const jobPayment = parseInt(job.payment.replace(/[$,]/g, ''));
    const matchesPrice = jobPayment >= priceRange[0] && jobPayment <= priceRange[1];
    
    return matchesSearch && matchesJobType && matchesPrice;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Available Jobs</h1>
          
          <div className="w-full md:w-auto flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search jobs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                  <SheetDescription>
                    Narrow down available jobs by your preferences
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger id="jobType">
                        <SelectValue placeholder="All job types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All job types</SelectItem>
                        <SelectItem value="Lawn Care">Lawn Care</SelectItem>
                        <SelectItem value="Roofing">Roofing</SelectItem>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Inspector">Inspector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <div className="pt-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={1500}
                        step={50}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-neutral-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Distance</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="within10" />
                      <label htmlFor="within10" className="text-sm">Within 10 miles</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="within25" checked />
                      <label htmlFor="within25" className="text-sm">Within 25 miles</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="within50" />
                      <label htmlFor="within50" className="text-sm">Within 50 miles</label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="urgent" />
                      <label htmlFor="urgent" className="text-sm">Urgent (due in 48 hours)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="thisWeek" checked />
                      <label htmlFor="thisWeek" className="text-sm">Due this week</label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => {
                      setSelectedJobType('');
                      setPriceRange([0, 1500]);
                    }}>
                      Reset Filters
                    </Button>
                    <Button className="btn-primary">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} onClick={() => setSelectedJob(job)}>
                <JobCard job={job} />
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No jobs match your criteria</h3>
              <p className="text-neutral-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <Sheet open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
            <SheetContent className="sm:max-w-[600px]">
              <SheetHeader>
                <SheetTitle>{selectedJob.title}</SheetTitle>
                <SheetDescription>{selectedJob.address}</SheetDescription>
              </SheetHeader>
              
              <div className="py-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-700">{selectedJob.jobType}</Badge>
                  <Badge className="bg-green-100 text-green-700">Payment: {selectedJob.payment}</Badge>
                  <Badge className="bg-orange-100 text-orange-700">
                    Due: {new Date(selectedJob.dueDate).toLocaleDateString()}
                  </Badge>
                </div>
                
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700">{selectedJob.description}</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700">
                      <li>Required skills: {selectedJob.jobType} experience</li>
                      <li>Estimated time: 2-4 hours</li>
                      <li>Materials: Provided by property management</li>
                      <li>Documentation: Must upload before/after photos</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Not Interested
                  </Button>
                  <Button className="btn-primary">
                    Accept Job
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </MainLayout>
  );
};

// Reuse Badge component for job types
const Badge = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Jobs;
