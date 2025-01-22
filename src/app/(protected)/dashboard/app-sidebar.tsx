'use client'
import React from "react";
import {item, } from '../../utils/data'
import { usePathname } from "next/navigation";
import { SidebarContent, SidebarGroup,Sidebar, SidebarHeader, SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton, SidebarMenu, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export function AppSidebar  ()  {
  const pathname = usePathname();
 const {open} =useSidebar()
const projects =[
  {
    name:'Project1'
  },
  {
    name:'Project2'
  },
  {
    name:'Project3'
  }
]

  return (
    
<Sidebar>

    <SidebarContent>
        <SidebarGroup>
      <SidebarHeader>
        <div className="flex border-l-gray-500 rounded-md items-center gap-2">
          <Image
          src={'/logo.jpg'}
          width={40}
          height={40}
          alt="logo"
          />
          {open && (
            <h3 className="text-xl text-font-mono font-bold text-primary/80 ">
             Gh-COPI
            </h3>
          )}

        </div>
      </SidebarHeader> 
      <SidebarContent>
          <SidebarGroupLabel>
            App
          </SidebarGroupLabel>
      </SidebarContent>

<SidebarMenu>
        {item.map((item) => {
          const isActive = pathname === item.url;
          
          return (
            <SidebarMenuItem  key={item.url}>
              <SidebarMenuButton asChild>
              <Link
                href={item.url}
                className={` ${
                  isActive ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-200"
                }`}
                >
                <item.icon className={` ${isActive ? "text-white" : "text-gray-500"}`} />
                <span>{item.title}</span>
              </Link>
              </SidebarMenuButton>
             
            </SidebarMenuItem>
          );
        })}
      
        </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Your Project
          </SidebarGroupLabel>
            <SidebarContent>
<SidebarMenu>
{projects.map(project => {
  return (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton asChild>
        <div >
          <div className={cn("w-4 h-4 rounded-sm-border size-6 text-primary flex items-center justify-center ", "bg-gray-300", "bg-gray text-white")}>
            {project.name[0]}
          </div>
          <span>{project.name}</span>
        
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
})}

<div className="h-2">
</div>
{open && (

  <SidebarMenuItem>

<Link href={'/create'}>
<Button size={'sm'} variant={'outline'} className="w-fit shadow-sm border-amber-900">
Create your Project
<Plus/>
</Button>
</Link>
  </SidebarMenuItem>
)}
</SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
        </SidebarContent>
        </Sidebar>
      
  );
};


