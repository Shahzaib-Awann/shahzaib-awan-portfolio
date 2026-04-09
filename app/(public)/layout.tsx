import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import React from "react";

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}