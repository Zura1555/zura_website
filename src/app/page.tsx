import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";

const Squiggle = () => (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -left-4 text-primary opacity-70">
        <path d="M20.2435 2.15552C20.2435 2.15552 35.8475 4.81852 42.1555 17.5875" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2.15527 20.2435C2.15527 20.2435 4.81827 35.8475 17.5873 42.1555" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);


export default function Home() {
  return (
    <div className="overflow-x-clip animate-in fade-in duration-700">
      <section id="home" className="container mx-auto max-w-7xl py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left">
            <div className="relative mb-4">
                <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">
                    I'm Jon Dawson, <br />Product Designer
                </h1>
                <Squiggle />
            </div>
            
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="outline" className="rounded-lg px-8 py-3">
                <Link href="/about">About</Link>
              </Button>
              <Button asChild size="lg" className="rounded-lg px-8 py-3">
                <a href="/jon_dawson_cv.pdf" download>Download CV <Download className="ml-2" /></a>
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className="relative flex justify-center items-center mt-12 md:mt-0">
            <div className="relative w-[380px] h-[480px]">
                {/* Purple Background */}
                <div className="absolute inset-0 bg-primary rounded-t-3xl rounded-bl-3xl rounded-br-[120px]" />
                
                {/* Image */}
                <div className="absolute inset-5">
                    <Image
                        src="https://placehold.co/400x500"
                        alt="Portrait of Jon Dawson"
                        fill
                        data-ai-hint="man portrait professional"
                        className="rounded-t-2xl rounded-bl-2xl rounded-br-[100px] object-cover"
                        priority
                    />
                </div>

                {/* Arrow button in the corner */}
                <Button asChild size="icon" className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-background text-foreground hover:bg-background/80 transition-colors cursor-pointer">
                  <Link href="/gallery" aria-label="View portfolio">
                    <ArrowUpRight className="h-8 w-8" />
                  </Link>
                </Button>

                {/* Vertical Social Bar */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 translate-x-full flex items-center gap-4">
                  <div className="[writing-mode:vertical-rl] transform rotate-180 whitespace-nowrap text-sm text-muted-foreground tracking-widest">
                      Follow me on
                  </div>
                  <div className="flex flex-col gap-3">
                      <a href="#" aria-label="Social Media 1" className="block h-2 w-2 rounded-full bg-muted-foreground hover:bg-primary-foreground transition-colors" />
                      <a href="#" aria-label="Social Media 2" className="block h-2 w-2 rounded-full bg-muted-foreground hover:bg-primary-foreground transition-colors" />
                      <a href="#" aria-label="Social Media 3" className="block h-2 w-2 rounded-full bg-muted-foreground hover:bg-primary-foreground transition-colors" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
