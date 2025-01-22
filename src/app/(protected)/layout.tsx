import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs'; // Import the UserButton from Clerk
import { AppSidebar } from './dashboard/app-sidebar';


type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar/> 
    <main className="w-full m-2">
      {/* Navbar */}
      <div  className="flex items-center gap-2 border-sidebar bg-gray-800 p-4 text-white">
        <div className="ml-auto">My App</div>
        <UserButton afterSignOutUrl="/" /> {/* Add the UserButton here */}
      </div>

      {/* Content */}
      <div className="h-4">
        <>
          <main className="border-sidebar-border bg-sidebar border m-4 p-4">{children}</main>
        </>
      </div>
    </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
