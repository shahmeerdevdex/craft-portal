
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Toaster } from "@/components/ui/toaster";
import ChatbotWidget from '../chat/ChatbotWidget';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <Toaster />
      <ChatbotWidget />
    </div>
  );
};

export default MainLayout;
