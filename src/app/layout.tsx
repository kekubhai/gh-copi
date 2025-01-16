import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider }from  '@clerk/nextjs'


export const metadata: Metadata = {
  title: "gh-copi-ost",
  description: "Generated by create next app",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
       
        >
          {children}
      </body>
    </html>
        </ClerkProvider>
  );
}
