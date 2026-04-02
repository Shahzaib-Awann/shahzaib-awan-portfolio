"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <header className="h-25 border">
      <div className="container mx-auto h-full px-4 py-2">
        <div className="flex h-full items-center justify-between">
          <h1 className="font-oswald text-2xl">Shahzaib Awan</h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="p-6 rounded-md bg-transparent text-foreground hover:bg-card-foreground hover:text-primary-foreground/75 transition-all duration-300"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="h-full flex flex-col justify-between bg-card-foreground border-none p-6"
            >
              {/* Header */}
              <SheetHeader className="flex flex-row items-center justify-between px-2">
                <SheetTitle className="text-white font-poppins text-lg">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation panel
                </SheetDescription>

                <SheetClose asChild>
                  <button
                    aria-label="Close menu"
                    className="text-white hover:text-white/75"
                  >
                    <X />
                  </button>
                </SheetClose>
              </SheetHeader>

              {/* Navigation */}
              <nav className="flex flex-col gap-6 px-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-3xl font-poppins-400 text-white hover:text-white/75 hover:translate-x-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="flex flex-col gap-2 text-white">
                <Link
                  href="mailto:shahzaibawan1357@gmail.com"
                  className="font-poppins text-white hover:text-white/75 transition-colors"
                >
                  shahzaibawan1357@gmail.com
                </Link>

                <hr className="my-2 border-white/25" />

                <div className="flex gap-6 text-sm font-poppins-400">
                  <Link
                    href="https://github.com/Shahzaib-Awann"
                    className="text-white hover:text-white/75 transition-colors"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/shahzaib-awan-dev/"
                    className="text-white hover:text-white/75 transition-colors"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
