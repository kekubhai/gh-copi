'use client'
import React from "react";
import {item, } from '../../utils/data'
import { usePathname } from "next/navigation";
import { SidebarContent, SidebarGroup,Sidebar, SidebarHeader, SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar  ()  {
  const pathname = usePathname();



  return (
    
<Sidebar>

    <SidebarContent>
        <SidebarGroup>
      <SidebarHeader>
        Logo
      </SidebarHeader> 
      <SidebarContent>
          <SidebarGroupLabel>
            App
          </SidebarGroupLabel>
      </SidebarContent>

<SidebarGroup>
        {item.map((item) => {
          const isActive = pathname === item.url;
          
          return (
            <SidebarMenuItem  key={item.url}>
              <SidebarMenuButton asChild>
              <Link
                href={item.url}
                className={` ${
                  isActive ? "bg-black text-white" : "text-gray-800 hover:bg-gray-200"
                }`}
                >
                <item.icon className={` ${isActive ? "text-white" : "text-gray-500"}`} />
                <span>{item.title}</span>
              </Link>
              </SidebarMenuButton>
             
            </SidebarMenuItem>
          );
        })}
      
        </SidebarGroup>
        </SidebarGroup>
        </SidebarContent>
        </Sidebar>
      
  );
};


