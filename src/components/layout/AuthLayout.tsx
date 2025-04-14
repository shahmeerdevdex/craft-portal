
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Banner */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 justify-center items-center p-10">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-6">TradesmenPortal</h1>
          <p className="text-xl mb-8">
            Connect with job opportunities, manage your work, and get paid - all in one place.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Find Jobs</h3>
              <p className="text-sm">Access jobs that match your skills and location</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Track Progress</h3>
              <p className="text-sm">Manage all your jobs in one dashboard</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Document Work</h3>
              <p className="text-sm">Upload photos and comments directly from the site</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Get Paid</h3>
              <p className="text-sm">Fast, secure payments for completed work</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
