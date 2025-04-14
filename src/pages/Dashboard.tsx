
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, Briefcase, Clock, DollarSign, MessageCircle, Plus, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useJobs } from '@/hooks/useJobs';
import JobDetails from '@/components/jobs/JobDetails';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const jobsHook = useJobs();
  const { data: myJobs, isLoading } = user ? jobsHook.useMyJobs(user.id) : { data: [], isLoading: false };
  
  // Calculate statistics
  const stats = [
    { 
      label: 'Active Jobs', 
      value: myJobs?.filter(job => job.status === 'in-progress').length || 0, 
      icon: <Activity className="h-4 w-4" />, 
      color: 'blue' 
    },
    { 
      label: 'Completed Jobs', 
      value: myJobs?.filter(job => job.status === 'completed').length || 0, 
      icon: <Clock className="h-4 w-4" />, 
      color: 'green' 
    },
    { 
      label: 'Total Earnings', 
      value: `$${myJobs?.filter(job => job.status === 'paid' && job.payment)
        .reduce((sum, job) => sum + (job.payment?.amount || 0), 0) || 0}`, 
      icon: <DollarSign className="h-4 w-4" />, 
      color: 'orange' 
    },
  ];

  // Get the most recent active jobs
  const activeJobs = myJobs
    ?.filter(job => job.status === 'in-progress')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3) || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Link to="/jobs">
            <Button className="btn-primary">
              <Briefcase className="h-4 w-4 mr-2" />
              Find New Jobs
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className={`flex items-center space-x-4`}>
                  <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                    <div className={`text-${stat.color}-500`}>{stat.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                    <h2 className="text-3xl font-bold">{stat.value}</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Your currently assigned jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <p className="text-center py-4">Loading your jobs...</p>
                ) : activeJobs.length > 0 ? (
                  activeJobs.map(job => (
                    <div key={job.id} className="mb-4">
                      <JobDetails job={job} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 mx-auto text-neutral-300 mb-2" />
                    <h3 className="font-medium text-lg">No active jobs</h3>
                    <p className="text-neutral-500 mb-4">You don't have any active jobs yet</p>
                    <Link to="/jobs">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Available Jobs
                      </Button>
                    </Link>
                  </div>
                )}
                {activeJobs.length > 0 && (
                  <Link to="/my-jobs">
                    <Button variant="outline" className="w-full">View All Jobs</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity & Chatbot */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New job available</p>
                    <p className="text-xs text-neutral-600">Lawn maintenance in your area</p>
                    <p className="text-xs text-neutral-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-neutral-600">$450 for Plumbing repair</p>
                    <p className="text-xs text-neutral-400 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Job completed</p>
                    <p className="text-xs text-neutral-600">Electrical wiring inspection</p>
                    <p className="text-xs text-neutral-400 mt-1">2 days ago</p>
                  </div>
                </div>
                
                {/* Chatbot Placeholder */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-medium">AI Assistant</h3>
                    </div>
                    <p className="text-sm text-neutral-600">Have questions about a job or need help? Ask our AI assistant.</p>
                    <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
