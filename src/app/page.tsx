import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Dribbble, Facebook, Instagram, Twitter } from "lucide-react";
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
      <section id="home" className="container mx-auto max-w-7xl py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              I'm Jane Doe
            </h1>
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary tracking-tight mt-2">
              A Product Designer <br />& UI/UX Designer
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm a passionate and creative product designer with a strong background in user experience and interface design. I specialize in creating intuitive, engaging, and beautiful digital products.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="px-8 py-3 rounded-full">
                <Link href="/contact">Let's Talk</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-3 rounded-full">
                <Link href="/gallery">Portfolio</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Dribbble" className="text-muted-foreground hover:text-primary transition-colors">
                <Dribbble className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center mt-12 md:mt-0">
            <div className="relative w-full max-w-[400px] aspect-[4/5]">
              <Image
                src="https://placehold.co/400x500"
                alt="Portrait of Jane Doe"
                fill
                data-ai-hint="woman portrait professional"
                className="rounded-xl object-cover"
                priority
              />
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
