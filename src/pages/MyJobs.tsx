
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Search, ArrowUpRight, ImagePlus, SendHorizonal } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

// Mock job data for different tabs
const inProgressJobs = [
  {
    id: '1',
    title: 'Roof Repair - Shingle Replacement',
    address: '123 Main St, Springfield, IL 62701',
    jobType: 'Roofing',
    dueDate: '2023-12-15',
    status: 'In Progress',
    payment: '$850',
  },
  {
    id: '2',
    title: 'Lawn Maintenance - Large Property',
    address: '456 Oak Ave, Springfield, IL 62702',
    jobType: 'Lawn Care',
    dueDate: '2023-12-10',
    status: 'In Progress',
    payment: '$250',
  },
];

const submittedJobs = [
  {
    id: '3',
    title: 'Electrical Panel Upgrade',
    address: '789 Elm Blvd, Springfield, IL 62703',
    jobType: 'Electrical',
    dueDate: '2023-12-18',
    status: 'Submitted',
    payment: '$1,200',
  },
];

const completedJobs = [
  {
    id: '4',
    title: 'Bathroom Plumbing Repair',
    address: '101 Pine St, Springfield, IL 62704',
    jobType: 'Plumbing',
    dueDate: '2023-11-28',
    status: 'Completed',
    payment: '$350',
  },
  {
    id: '5',
    title: 'Property Inspection with Photos',
    address: '202 Cedar Rd, Springfield, IL 62701',
    jobType: 'Inspector',
    dueDate: '2023-11-25',
    status: 'Completed',
    payment: '$75',
  },
];

const MyJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('in-progress');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();
  
  // Mock photo uploads
  const [photos, setPhotos] = useState<{ url: string; caption: string }[]>([]);
  
  const handleAddPhoto = () => {
    // In a real app, this would open a file picker and upload to a server
    // For demo, we'll add a placeholder image
    const newPhoto = {
      url: 'https://placehold.co/600x400/e2e8f0/64748b?text=Job+Photo',
      caption: '',
    };
    setPhotos([...photos, newPhoto]);
    
    toast({
      title: "Photo added",
      description: "Your photo has been added to the job",
    });
  };
  
  const handleUpdateStatus = () => {
    toast({
      title: "Job updated",
      description: "Job status has been updated successfully",
    });
    setSelectedJob(null);
  };
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    // In a real app, this would send the comment to a server
    toast({
      title: "Comment added",
      description: "Your comment has been posted",
    });
    
    setCommentText('');
  };
  
  // Filter jobs based on search term
  const filteredJobs = () => {
    let jobs: any[] = [];
    
    if (selectedTab === 'in-progress') jobs = inProgressJobs;
    else if (selectedTab === 'submitted') jobs = submittedJobs;
    else if (selectedTab === 'completed') jobs = completedJobs;
    
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">My Jobs</h1>
          
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Search my jobs..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="in-progress" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="in-progress" className="space-y-4 mt-6">
            {filteredJobs().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredJobs().map(job => (
                  <div key={job.id} onClick={() => setSelectedJob(job)}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No in-progress jobs found</h3>
                <p className="text-neutral-600">You don't have any active jobs right now</p>
                <Button className="mt-4 btn-primary">Find New Jobs</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-4 mt-6">
            {filteredJobs().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredJobs().map(job => (
                  <div key={job.id} onClick={() => setSelectedJob(job)}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No submitted jobs found</h3>
                <p className="text-neutral-600">You don't have any jobs waiting for approval</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-6">
            {filteredJobs().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredJobs().map(job => (
                  <div key={job.id} onClick={() => setSelectedJob(job)}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No completed jobs found</h3>
                <p className="text-neutral-600">You haven't completed any jobs yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Job Details Dialog */}
        {selectedJob && (
          <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription className="flex items-center">
                  {selectedJob.address}
                  <a 
                    href={`https://maps.google.com/?q=${selectedJob.address}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center ml-2 text-blue-500 text-xs"
                  >
                    View on Maps
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {/* Left side - Job details */}
                <div className="space-y-4 md:col-span-1 overflow-auto">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-neutral-500">Job Type</p>
                        <p className="font-medium">{selectedJob.jobType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Status</p>
                        <p className="font-medium">{selectedJob.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Due Date</p>
                        <p className="font-medium">{new Date(selectedJob.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Payment</p>
                        <p className="font-medium">{selectedJob.payment}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Required Photos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">Upload photos to document your work:</p>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          Before work begins
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          During work (progress)
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                          Completed work
                        </li>
                      </ul>
                      <Button onClick={handleAddPhoto} className="w-full">
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Add Photo
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {selectedJob.status === 'In Progress' && (
                    <Button onClick={handleUpdateStatus} className="w-full btn-success">
                      {photos.length > 0 ? 'Submit for Approval' : 'Mark as Complete'}
                    </Button>
                  )}
                </div>
                
                {/* Right side - Photos and comments */}
                <div className="md:col-span-2 space-y-4 overflow-hidden flex flex-col">
                  {/* Photos section */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Job Photos</h3>
                    {photos.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {photos.map((photo, index) => (
                          <div key={index} className="border rounded-md overflow-hidden">
                            <img 
                              src={photo.url} 
                              alt={`Job photo ${index+1}`} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-2">
                              <Input
                                placeholder="Add a caption"
                                value={photo.caption}
                                onChange={(e) => {
                                  const newPhotos = [...photos];
                                  newPhotos[index].caption = e.target.value;
                                  setPhotos(newPhotos);
                                }}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-dashed rounded-md p-8 text-center bg-neutral-50">
                        <p className="text-neutral-600">No photos uploaded yet</p>
                        <p className="text-sm text-neutral-500 mt-1">
                          Upload photos to document your work
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Comments section */}
                  <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
                    <h3 className="font-medium">Comments</h3>
                    <Card className="flex-1 flex flex-col">
                      <ScrollArea className="flex-1 p-4 max-h-[250px]">
                        {/* Example comments */}
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-100 text-blue-500">JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="bg-neutral-100 rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-sm">You</span>
                                  <span className="text-xs text-neutral-500">2 days ago</span>
                                </div>
                                <p className="text-sm mt-1">
                                  I've started working on this job. Will upload photos of the progress soon.
                                </p>
                              </div>
                              <span className="text-xs text-neutral-500 ml-3 mt-1 block">
                                Dec 5, 2023 at 10:32 AM
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-teal-100 text-teal-500">AM</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="bg-teal-50 rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-sm">Admin</span>
                                  <span className="text-xs text-neutral-500">1 day ago</span>
                                </div>
                                <p className="text-sm mt-1">
                                  Thanks for the update. Please make sure to take clear before and after photos.
                                </p>
                              </div>
                              <span className="text-xs text-neutral-500 ml-3 mt-1 block">
                                Dec 6, 2023 at 9:15 AM
                              </span>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                      
                      <div className="p-3 border-t">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <Button 
                            size="icon" 
                            onClick={handleSubmitComment} 
                            disabled={!commentText.trim()}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <SendHorizonal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default MyJobs;
