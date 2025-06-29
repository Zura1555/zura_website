import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { getBlogPosts } from "@/lib/cms";

export const dynamic = 'force-dynamic';

const Squiggle = () => (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -left-4 text-primary opacity-70">
        <path d="M20.2435 2.15552C20.2435 2.15552 35.8475 4.81852 42.1555 17.5875" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2.15527 20.2435C2.15527 20.2435 4.81827 35.8475 17.5873 42.1555" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

const services = [
  {
    title: "Service 1",
    image: "https://placehold.co/600x400",
    aiHint: "app interface",
    link: "#",
  },
  {
    title: "Service 2",
    image: "https://placehold.co/600x400",
    aiHint: "brand stickers",
    link: "#",
  },
  {
    title: "Service 3",
    image: "https://placehold.co/600x400",
    aiHint: "business laptop",
    link: "#",
  },
];

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);
  
  return (
    <div className="overflow-x-clip animate-in fade-in duration-700">
      <section id="home" className="px-4">
        <div className="container mx-auto max-w-7xl py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="flex flex-col items-start text-left">
              <div className="relative mb-4">
                  <h1 className="font-headline text-6xl md:text-7xl font-bold tracking-tight">
                      I'm Jon Dawson, <br />Product Designer
                  </h1>
                  <Squiggle />
              </div>
              
              <p className="mt-6 max-w-md text-xl text-muted-foreground">
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <section id="services" className="bg-background px-4">
        <div className="container mx-auto max-w-7xl py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
              My Expertise
            </h2>
            <p className="mt-4 font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Innovative Solutions
            </p>
            <p className="mt-6 mx-auto max-w-3xl text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-primary rounded-3xl p-8 h-[480px] flex flex-col relative group">
                <h3 className="font-headline text-3xl font-semibold text-primary-foreground">
                  {service.title}
                </h3>
                <div className="flex-grow" />
                <div className="absolute bottom-0 left-0 right-0 h-[340px] [transform:translateZ(0)]">
                  <div className="absolute inset-x-0 -top-8 h-full bg-card rounded-t-3xl rounded-b-[60px] shadow-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={service.aiHint}
                    />
                    <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-t-3xl" />
                  </div>
                </div>
                <Link
                  href={service.link}
                  className="absolute bottom-8 right-8 z-10"
                >
                  <div className="bg-background/80 backdrop-blur-sm text-foreground rounded-full h-16 w-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-background">
                    <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-background px-4">
        <div className="container mx-auto max-w-7xl py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
                Stories
              </h2>
              <p className="mt-4 font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Blog Update
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                  <div className="relative transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-1">
                    <div className="relative h-56 w-full rounded-t-3xl overflow-hidden">
                      <Image
                        src={post.image || 'https://placehold.co/600x400'}
                        alt={post.title || 'Blog post image'}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        data-ai-hint={post.aiHint}
                      />
                      <div className="absolute top-4 right-4 z-10 h-12 w-12 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <ArrowUpRight className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="bg-primary p-6 rounded-b-3xl text-primary-foreground">
                      <h3 className="font-headline text-xl font-semibold">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-primary-foreground/80 line-clamp-2">{post.summary}</p>
                      <time className="mt-4 block text-xs font-medium text-primary-foreground/70">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No blog posts found. Check your Firestore database and ensure your security rules allow read access to the 'blog' collection.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
