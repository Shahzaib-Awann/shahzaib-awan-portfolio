import AdminSidebar from "@/components/layouts/admin-side-bar";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import React from "react";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen bg-background flex flex-row">
      
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 relative">
        
        {/* Background (goes behind) */}
        <BackgroundPattern />

        {/* Content (goes above) */}
        <div className="relative z-10">
          {children}
        </div>

      </main>

    </div>
    );
  }