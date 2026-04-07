"use client";

import { socialLinks } from "@/lib/portfolio.constants";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact-me" },
];

const Footer = () => {
  return (
    <footer className="relative bg-background overflow-hidden">

      {/* Subtle grid (same as hero) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main container */}
      <div className="container mx-auto px-6 py-20 relative z-10 space-y-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a]">
              Shahzaib Awan
            </h2>

            <p className="text-gray-600 leading-relaxed max-w-sm">
              Full Stack Developer focused on building scalable, performant,
              and production-ready applications with modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4 items-start md:items-center">
            <h3 className="text-sm uppercase text-gray-500 tracking-wider">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-[#0a0a0a] hover:translate-x-1 transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <h3 className="text-sm uppercase text-gray-500 tracking-wider">
              Connect
            </h3>

            <div className="flex gap-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={i}
                    href={item.href}
                    target="_blank"
                    className="p-3 border border-black/20 rounded hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Icon className="size-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

          <p>
            © {new Date().getFullYear()} Shahzaib Awan. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Built with precision & modern technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;