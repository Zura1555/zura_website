import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl animate-in fade-in duration-500">
      <section className="flex flex-col-reverse items-center gap-12 py-12 md:flex-row md:py-24">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
            Jane Doe
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Creative Developer & Digital Artisan. I craft elegant and effective solutions at the intersection of design and technology.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Button asChild>
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                    <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <Image
              src="https://placehold.co/400x400"
              alt="Portrait of Jane Doe"
              width={400}
              height={400}
              data-ai-hint="woman portrait"
              className="rounded-full object-cover shadow-lg"
              priority
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
