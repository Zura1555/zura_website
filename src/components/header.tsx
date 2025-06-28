"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinksLeft = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#service", label: "Service" },
];
const navLinksRight = [
  { href: "/gallery", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
const allNavLinks = [...navLinksLeft, ...navLinksRight];


export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string; }) => {
    const isActive = href === "/" ? pathname === href : pathname.startsWith(href) && href !== "/#service";
    return (
      <Link
        href={href}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center justify-center gap-2 bg-secondary p-2 rounded-full w-full max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            {navLinksLeft.map((link) => <NavLink key={link.href} {...link} />)}
          </div>
          <Link href="/" className="mx-4 text-2xl font-bold text-foreground hover:text-primary transition-colors">
            JD
          </Link>
          <div className="flex items-center gap-2">
            {navLinksRight.map((link) => <NavLink key={link.href} {...link} />)}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex w-full items-center justify-between">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95">
                <nav className="flex flex-col gap-4 p-6 pt-16">
                  {allNavLinks.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          <Link href="/" className="text-2xl font-bold text-foreground">
            JD
          </Link>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>
    </header>
  );
}
