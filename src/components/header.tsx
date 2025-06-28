"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#service", label: "Service" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("#home");
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
          setActiveLink(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label, className, onClick }: { href: string; label: string; className?: string; onClick?: () => void }) => (
    <Link 
      key={href} 
      href={href} 
      onClick={onClick}
      className={cn("px-4 py-2 rounded-lg text-sm transition-colors", activeLink === href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground', className)}>
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.slice(0, 3).map(link => <NavLink key={link.href} {...link} />)}
        </div>
        <div className="hidden md:block">
          <Link href="#home">
            <Avatar className="h-12 w-12 bg-primary ring-2 ring-primary-foreground/20">
              <AvatarFallback className="bg-transparent text-xl font-bold text-primary-foreground">JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.slice(3).map(link => <NavLink key={link.href} {...link} />)}
        </div>
        
        {/* Mobile Header */}
        <div className="flex items-center gap-4 md:hidden">
            <Link href="#home">
                <Avatar className="h-10 w-10 bg-primary">
                    <AvatarFallback className="bg-transparent text-lg font-bold text-primary-foreground">JD</AvatarFallback>
                </Avatar>
            </Link>
            <span className="font-bold text-lg">Zura</span>
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 p-6 pt-16">
                {navLinks.map(link => <NavLink key={link.href} {...link} className="text-lg" onClick={() => setSheetOpen(false)} />)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
