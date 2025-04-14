
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, BarChart, Users, CheckSquare, Calendar, DollarSign } from 'lucide-react';
import JobApprovalTable from '@/components/admin/JobApprovalTable';
import ContractorHistory from '@/components/admin/ContractorHistory';
import PaymentsTable from '@/components/admin/PaymentsTable';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tradesmen</p>
                  <h3 className="text-2xl font-bold">47</h3>
                </div>
                <div className="p-2 bg-teal-100 rounded-full">
                  <Users className="h-6 w-6 text-teal-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <h3 className="text-2xl font-bold">18</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckSquare className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Payments</p>
                  <h3 className="text-2xl font-bold">$4,280</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="jobs">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Job Approvals</TabsTrigger>
            <TabsTrigger value="contractors">Contractor History</TabsTrigger>
            <TabsTrigger value="payments">Payment Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Job Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <JobApprovalTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contractors" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ContractorHistory />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
