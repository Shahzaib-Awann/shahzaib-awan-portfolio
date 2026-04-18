"use client";

import Link from "next/link";
import { ArrowUpRight, Loader2, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

// ================= LINKS =================
const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Messages", href: "/admin/messages" },
];

//  NAV ITEMS (OUTSIDE) 
function NavItems({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-4 mt-10">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-base font-poppins-400 hover:translate-x-2 transition-all duration-300 group relative inline-block px-4 py-3 rounded-md  ${
              isActive
                ? "bg-card text-black"
                : "text-white/75 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.label}

            <ArrowUpRight className={`top-1/2 -translate-y-1/2 right-4 size-4 transition-transform duration-500  group-hover:rotate-45 translate-x-1 ${isActive ? 'hidden' : 'absolute' } `} />
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
        setIsSigningOut(true);
        await signOut({ callbackUrl: "/sign-in" });
    } catch (error) {
        console.error("Sign out failed: ", error);
    } finally {
        setIsSigningOut(false);
    }
};

  return (
    <>
      {/* DESKTOP */}
      <aside className="max-w-72 w-full h-screen sticky top-0 left-0 justify-between bg-black text-white p-6 hidden lg:flex flex-col">
        <div>
        <h1 className="text-xl font-bold uppercase">Admin Panel</h1>

        <NavItems pathname={pathname} />
        </div>

        <Button variant="destructive" onClick={handleSignOut} disabled={isSigningOut} className="p-5">{isSigningOut ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing Out...
          </span>
        ) : (
          <span className="flex items-center gap-2">Sign Out</span>
        )}</Button>
      </aside>

      {/* MOBILE */}
      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="absolute cursor-pointer top-0 left-0 z-100 bg-black p-5 rounded-none text-white">
            <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent showCloseButton={false} side="left" className="bg-black text-white border-none flex flex-col justify-between p-6">
            <div>
            <SheetHeader className="flex flex-row justify-between items-center">
              <SheetTitle className="text-white font-poppins text-lg">Menu</SheetTitle>

              <SheetClose asChild>
                  <X />
              </SheetClose>
            </SheetHeader>

            <NavItems pathname={pathname} />
            </div>

            <Button variant="destructive" onClick={handleSignOut} disabled={isSigningOut} className="p-5">{isSigningOut ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing Out...
          </span>
        ) : (
          <span className="flex items-center gap-2">Sign Out</span>
        )}</Button>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}