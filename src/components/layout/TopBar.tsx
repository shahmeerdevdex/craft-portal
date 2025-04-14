
import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TopBar = () => {
  return (
    <header className="h-16 bg-white border-b border-border px-4 md:px-6 flex items-center justify-end">
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <Badge className="h-5 w-5 p-0 flex items-center justify-center absolute -top-1 -right-1 bg-blue-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium">New job available in your area</div>
              <div className="text-sm text-muted-foreground mt-1">Roofing job posted 20 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium">Job status updated</div>
              <div className="text-sm text-muted-foreground mt-1">Your submission for 123 Main St was approved</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium">Payment received</div>
              <div className="text-sm text-muted-foreground mt-1">$350 has been deposited to your account</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Mail size={20} />
              <Badge className="h-5 w-5 p-0 flex items-center justify-center absolute -top-1 -right-1 bg-teal-500">
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Messages</div>
            <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium">Admin</div>
              <div className="text-sm text-muted-foreground mt-1">Please provide an update on the bathroom repair job</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
              <div className="font-medium">System</div>
              <div className="text-sm text-muted-foreground mt-1">Welcome to TradesmenPortal! Complete your profile to start receiving jobs.</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-blue-100 text-blue-500">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem>Available Jobs</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
