import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Personal Canvas. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}
