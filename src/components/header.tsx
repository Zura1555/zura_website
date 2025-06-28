"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#service", label: "Service" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLink = ({ href, label, className, onClick }: { href: string; label:string; className?: string; onClick?: () => void }) => {
    const isActive = href === "/" ? pathname === href : pathname.startsWith(href) && href !== "/#service";
    
    // For hash links, we can't rely on pathname. A different logic would be needed if we want active state on scroll.
    // For now, it will only be active if it's the root page.
    const isServiceLinkOnHomePage = href === "/#service" && pathname === "/";

    return (
        <Link 
            href={href} 
            onClick={onClick}
            className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive || isServiceLinkOnHomePage ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                className
            )}
        >
            {label}
        </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        
        <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <nav className="flex flex-col gap-4 p-6 pt-16">
                    {navLinks.map(link => <NavLink key={link.href} {...link} className="text-lg" onClick={() => setSheetOpen(false)} />)}
                </nav>
                </SheetContent>
            </Sheet>
        </div>
        
        <div className="hidden items-center justify-start gap-2 md:flex flex-1">
          {navLinks.slice(0, 3).map(link => <NavLink key={link.href} {...link} />)}
        </div>
        
        <div className="flex justify-center flex-shrink-0">
          <Link href="/">
            <Avatar className="h-12 w-12 bg-card ring-2 ring-primary/50">
              <AvatarFallback className="bg-transparent text-xl font-bold text-foreground">JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <div className="hidden items-center justify-end gap-2 md:flex flex-1">
          {navLinks.slice(3).map(link => <NavLink key={link.href} {...link} />)}
        </div>
        
        <div className="flex-1 md:hidden"></div>

      </div>
    </header>
  );
}
