import type { Metadata } from "next";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
})

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700"],
  variable: "--font-oswald",
})

export const metadata: Metadata = {
  title: "Shahzaib Awan Portfolio",
  description: "Shahzaib Awan Portfolio - A showcase of my work and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
        </body>
    </html>
  );
}
