
import Image from "next/image";
import Link from "next/link";
import dynamicImport from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/lib/cms";

// CRITICAL: Load GradientBars synchronously for above-the-fold content
// It's part of the hero section and must render immediately
import { GradientBars } from '@/components/nurui';

// Lazy load non-critical components below the fold
const FlexibleBlogGrid = dynamicImport(() => import('@/components/flexible-blog-grid').then(mod => ({ default: mod.FlexibleBlogGrid })), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />,
});

const SwapyDrag = dynamicImport(() => import('@/components/swapy-drag'), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20 rounded-lg" />,
});

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 10); // Allow up to 10 posts for flexibility
  
  return (
    <div className="overflow-x-clip">
      <section id="home" className="px-4 relative w-full">
        {/* Gradient Bars Background - Critical for LCP */}
        <GradientBars bars={15} colors={['#3ca2faD9', 'transparent']} />
        <div className="container hero" style={{ zIndex: 10, position: 'relative', maxWidth: '80rem' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Critical content for LCP */}
            <div className="flex flex-col items-start text-left">
              <div className="relative mb-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ fontWeight: 700, margin: 0, color: 'hsl(var(--foreground))', lineHeight: 1.1 }}>
                      I'm Tuan <span style={{ backgroundColor: 'hsl(var(--primary))', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>(Zura)</span>
                  </h1>
              </div>
              
              <p className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-muted-foreground" style={{ textAlign: 'left', maxWidth: '600px' }}>
                You've found my little corner of the internet.
              </p>
              <p className="mt-3 sm:mt-4 max-w-md text-base sm:text-lg text-muted-foreground" style={{ textAlign: 'left', maxWidth: '600px' }}>
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
                <a 
                  href="https://github.com/Zura1555" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary rounded-full px-6 sm:px-8 py-3"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/zuratran/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn rounded-full px-6 sm:px-8 py-3"
                  style={{ border: '1px solid hsl(var(--border))' }}
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:guithutuantran@gmail.com"
                  className="btn rounded-full px-6 sm:px-8 py-3"
                  style={{ border: '1px solid hsl(var(--border))' }}
                >
                  Gmail
                </a>
              </div>
            </div>
            {/* Right Column */}
            <div className="relative flex justify-center items-center mt-8 md:mt-0">
              <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px]">
                  {/* Purple Background */}
                  <div className="absolute inset-0 bg-primary rounded-t-3xl rounded-bl-3xl rounded-br-[80px] sm:rounded-br-[100px] md:rounded-br-[120px]" />
                  
                  {/* Image - LCP optimization */}
                  <div className="absolute inset-3 sm:inset-4 md:inset-5">
                      <Image
                          src="https://ik.imagekit.io/zmblm08qi/Blog%20Header%20Image.png?updatedAt=1754142363015"
                          alt="Portrait of Zura"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint="woman portrait professional"
                          className="rounded-t-2xl rounded-bl-2xl rounded-br-[60px] sm:rounded-br-[80px] md:rounded-br-[100px] object-cover"
                          priority
                          fetchPriority="high"
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

      {/* Swapy Drag Section */}
      <SwapyDrag />

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
