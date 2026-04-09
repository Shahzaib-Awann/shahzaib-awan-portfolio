import React from "react";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="admin-container">
        {children}
      </main>
    );
  }