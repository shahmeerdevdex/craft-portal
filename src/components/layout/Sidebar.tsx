
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Clock, 
  User, 
  Settings, 
  FileCheck, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6">
            <h1 className="text-2xl font-bold text-blue-500">TradesmenPortal</h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/jobs" 
              className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Briefcase size={20} />
              <span>Available Jobs</span>
            </NavLink>
            
            <NavLink 
              to="/my-jobs" 
              className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <FileCheck size={20} />
              <span>My Jobs</span>
            </NavLink>
            
            <NavLink 
              to="/history" 
              className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Clock size={20} />
              <span>Job History</span>
            </NavLink>
            
            <NavLink 
              to="/profile" 
              className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
              <span>My Profile</span>
            </NavLink>
            
            {isAdmin && (
              <NavLink 
                to="/admin" 
                className={({isActive}) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Settings size={20} />
                <span>Admin Dashboard</span>
              </NavLink>
            )}
          </nav>
          
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-neutral-900 hover:text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
