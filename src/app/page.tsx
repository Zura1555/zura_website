
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { getBlogPosts } from "@/lib/cms";
import { FlexibleBlogGrid } from "@/components/flexible-blog-grid";
import { GradientBars } from "@/components/nurui";
import StackingCards from "@/components/stacking-cards";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 10); // Allow up to 10 posts for flexibility
  
  return (
    <div className="overflow-x-clip animate-in fade-in duration-700">
      <section id="home" className="px-4 relative">
        {/* Gradient Bars Background */}
        <GradientBars bars={15} colors={['#3ca2faD9', 'transparent']} />
        <div className="container mx-auto max-w-5xl py-12 sm:py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="flex flex-col items-start text-left">
              <div className="relative mb-4">
                  <h1 className="font-luckiest text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                      I'm Tuan <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl">(Zura)</span>
                  </h1>
              </div>
              
              <p className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-muted-foreground">
                You've found my little corner of the internet.
              </p>
              <p className="mt-3 sm:mt-4 max-w-md text-base sm:text-lg text-muted-foreground">
                By day, I work as IT Project Delivery at{" "}
                <a 
                  href="https://maisonrmi.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:text-primary/80 relative inline-block transition-colors duration-300 group"
                >
                  Maison RMI
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
                . By night, I'm a hobbyist vibe-coder and a{" "}
                <span className="relative">
                  <span className="line-through text-primary">not very active</span>
                </span>{" "}
                content blogger.
              </p>
              <p className="mt-3 sm:mt-4 max-w-md text-base sm:text-lg text-muted-foreground">
                Think of this as a collection of my findings, from project insights to project experiments.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Button asChild size="lg" variant="outline" className="rounded-lg px-6 sm:px-8 py-3">
                  <Link href="/about">About</Link>
                </Button>
                <Button asChild size="lg" className="rounded-lg px-6 sm:px-8 py-3 btn-border-animation">
                  <a href="/zura_cv.pdf" download>
                    <span className="border-left"></span>
                    <span className="border-right"></span>
                    Download CV <Download className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
            {/* Right Column */}
            <div className="relative flex justify-center items-center mt-8 md:mt-0">
              <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px]">
                  {/* Purple Background */}
                  <div className="absolute inset-0 bg-primary rounded-t-3xl rounded-bl-3xl rounded-br-[80px] sm:rounded-br-[100px] md:rounded-br-[120px]" />
                  
                  {/* Image */}
                  <div className="absolute inset-3 sm:inset-4 md:inset-5">
                      <Image
                          src="https://ik.imagekit.io/zmblm08qi/Blog%20Header%20Image.png?updatedAt=1754142363015"
                          alt="Portrait of Zura"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint="woman portrait professional"
                          className="rounded-t-2xl rounded-bl-2xl rounded-br-[60px] sm:rounded-br-[80px] md:rounded-br-[100px] object-cover"
                          priority
                      />
                  </div>

                  {/* Arrow button in the corner */}
                  <Button asChild size="icon" className="absolute bottom-0 right-0 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-background text-foreground hover:bg-background/80 transition-colors cursor-pointer">
                    <Link href="/gallery" aria-label="View portfolio">
                      <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                    </Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <StackingCards />

      {/* Blog Section */}
      <section id="blog" className="bg-background px-4">
        <div className="container mx-auto max-w-5xl py-12 sm:py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-12 sm:mb-16 md:mb-20">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase">
                Stories
              </h2>
              <p className="mt-3 sm:mt-4 font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Blog Update
              </p>
            </div>
          </div>

          <FlexibleBlogGrid posts={latestPosts} />
        </div>
      </section>
    </div>
  );
}
