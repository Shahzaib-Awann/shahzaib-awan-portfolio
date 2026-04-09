import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen grid grid-rows-[1fr_auto]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
