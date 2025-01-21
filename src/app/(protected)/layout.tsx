import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs'; // Import the UserButton from Clerk

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
        <div className="text-xl font-bold">My App</div>
        <UserButton afterSignOutUrl="/" /> {/* Add the UserButton here */}
      </nav>

      {/* Content */}
      <div className="flex flex-grow">
        <SidebarProvider>
          <main className="flex flex-grow items-center p-4">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default SidebarLayout;
