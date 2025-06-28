import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Service 1",
    image: "https://placehold.co/600x400",
    aiHint: "mobile app screen",
  },
  {
    title: "Service 2",
    image: "https://placehold.co/600x400",
    aiHint: "design sticker sheet",
  },
  {
    title: "Service 3",
    image: "https://placehold.co/600x400",
    aiHint: "person working laptop",
  },
];

const featuredWorks = [
  { src: "https://placehold.co/500x500", alt: "Project 1", aiHint: "dashboard ui" },
  { src: "https://placehold.co/500x500", alt: "Project 2", aiHint: "mobile app design" },
  { src: "https://placehold.co/500x500", alt: "Project 3", aiHint: "branding design" },
  { src: "https://placehold.co/500x500", alt: "Project 4", aiHint: "website design" },
  { src: "https://placehold.co/500x500", alt: "Project 5", aiHint: "logo design" },
  { src: "https://placehold.co/500x500", alt: "Project 6", aiHint: "social media graphics" },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden animate-in fade-in duration-700">
      <section id="home" className="container mx-auto max-w-7xl py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight relative">
              I&apos;m Zura, 
              <br />
              Product Designer
              <svg width="86" height="11" viewBox="0 0 86 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-2 -right-10 text-primary hidden md:block">
                <path d="M2.39999 5.09998C10.3794 2.87241 46.4897 -2.49998 83.5 6.49997" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base rounded-full">
                <Link href="/about">About</Link>
              </Button>
              <Button size="lg" variant="default" className="px-8 py-6 text-base rounded-full">Download CV</Button>
            </div>
          </div>
          <div className="relative flex justify-center mt-12 md:mt-0">
            <div className="relative bg-primary rounded-3xl p-4 w-[400px] h-[500px]">
                <Image
                  src="https://placehold.co/400x500"
                  alt="Portrait of Zura"
                  width={400}
                  height={500}
                  data-ai-hint="man portrait professional"
                  className="rounded-2xl object-cover h-full w-full"
                  priority
                />
              <Button size="icon" className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-primary text-primary-foreground border-8 border-background hover:bg-primary/90">
                <ArrowUpRight className="h-8 w-8" />
              </Button>
            </div>
            <div className="absolute right-[-4rem] top-0 bottom-0 flex items-center justify-center text-muted-foreground text-sm tracking-widest uppercase [writing-mode:vertical-rl] transform rotate-180">
              Follow me on FB - TW - IG
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="container mx-auto max-w-7xl py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-wider">MY EXPERTISE</p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mt-2">Innovative Solutions</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card border-none rounded-3xl overflow-hidden group">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    data-ai-hint={service.aiHint}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button size="icon" className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="works" className="container mx-auto max-w-7xl py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A selection of my projects that showcase my skills and creativity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks.map((work, index) => (
             <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={work.src}
                alt={work.alt}
                fill
                data-ai-hint={work.aiHint}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-lg font-bold">{work.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
