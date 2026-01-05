"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "السيرة الذاتية", href: "/bio" },
  { name: "الدروس العلمية", href: "/lessons" },
  { name: "الفتاوى", href: "/fatwas" },
  { name: "الكتب", href: "/books" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                الشيخ يوسف أبو غزالة
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-secondary",
                    pathname === link.href
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin/lessons"
                  className={cn(
                    "text-sm font-bold text-secondary hover:text-secondary/80 flex items-center gap-1",
                    pathname.startsWith("/admin") ? "border-b-2 border-secondary" : ""
                  )}
                >
                  لوحة التحكم
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" fallbackRedirectUrl="/admin/lessons">
                <button className="hidden md:block text-sm font-medium text-primary hover:text-secondary transition-colors">
                  تسجيل الدخول
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-secondary focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-b border-border animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href
                    ? "text-secondary bg-primary/10"
                    : "text-foreground/80 hover:text-secondary hover:bg-primary/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full text-right px-3 py-2 text-base font-medium text-primary hover:text-secondary">
                  تسجيل الدخول
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
