
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Download, X } from "lucide-react";
import { getBlogPosts } from "@/lib/cms";
import { JourneyTimeline } from "@/components/journey-timeline";

export const dynamic = 'force-dynamic';

const services = [
  {
    number: "01",
    title: "End-to-End Project Delivery",
    slug: "project-delivery",
    tags: ["Agile Execution", "Technical Direction", "Launch Management"],
    description: "Managing projects from concept to launch, ensuring clear communication, on-time delivery, and alignment with business goals. I bridge the gap between stakeholders and development teams to deliver successful outcomes.",
    image: "https://placehold.co/600x400",
    aiHint: "project management"
  },
  {
    number: "02",
    title: "UI/UX Research",
    slug: "ui-ux-research",
    tags: ["User Interviews", "Usability Testing", "Persona & Journey Mapping", "Data-Driven Insights"],
    description: "I uncover the \"why\" behind user behavior to ensure we're building the right product for the right people. Using proven methods like in-depth interviews and usability testing, I gather critical data directly from your target audience. These findings are then translated into actionable insights, personas, and journey maps that eliminate guesswork and empower us to design a truly intuitive and effective product.",
    image: "https://placehold.co/600x400",
    aiHint: "ux research"
  },
  {
    number: "03",
    title: "MVP & Prototype Development",
    slug: "mvp-prototyping",
    tags: ["Rapid Prototyping", "Core Feature Focus", "User Feedback Loop", "Concept Validation"],
    description: "Transform your idea into a tangible product, fast. I specialize in building high-fidelity prototypes and Minimum Viable Products (MVPs) that focus on core functionality. This is the most effective way to test your concept with real users, gather actionable feedback, and validate your business model before investing in full-scale development.",
    image: "https://placehold.co/600x400",
    aiHint: "prototype sketch"
  },
];

const experiences = [
  {
    company: "CPA Australia",
    date: "2023",
    description: "My career journey began as a Business Support Assistant.",
  },
  {
    company: "OplaCRM",
    date: "2024",
    description: "This was my very first project and where my passion for technology was ignited.",
  },
  {
    company: "Maison RMI",
    date: "2025",
    description: "I immersed myself in various digital transformation projects, applying AI and automation.",
  },
];

export default async function Home() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);
  
  return (
    <div className="overflow-x-clip animate-in fade-in duration-700">
      <section id="home" className="px-4">
        <div className="container mx-auto max-w-5xl py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="flex flex-col items-start text-left">
              <div className="relative mb-4">
                  <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">
                      I'm Tuan <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">(Zura),</span> <br />Project Delivery
                  </h1>
              </div>
              
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                With a technologist's curiosity, I love managing diverse projects. My passion is for continuous learning and exploring new tech. I thrive on this variety, building the versatile skillset required to be a true 'Swiss army knife'.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" variant="outline" className="rounded-lg px-8 py-3">
                  <Link href="/about">About</Link>
                </Button>
                <Button asChild size="lg" className="rounded-lg px-8 py-3">
                  <a href="/zura_cv.pdf" download>Download CV <Download className="ml-2" /></a>
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
                          alt="Portrait of Zura"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint="woman portrait professional"
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

      {/* Services Section */}
      <section id="services" className="px-4">
        <div className="container mx-auto max-w-5xl py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
                My Specialization
              </h2>
              <p className="mt-4 font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Services I Provide
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              I provide a wide range of design services to help you create beautiful, functional, and user-friendly digital products that your users will love.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {services.map((service, index) => (
              <AccordionItem key={service.slug} value={`item-${index}`} className="border-none rounded-2xl bg-secondary/30 data-[state=open]:bg-card transition-colors duration-300 overflow-hidden">
                <AccordionTrigger className="w-full p-6 text-left hover:no-underline group [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-2xl font-bold text-muted-foreground">{service.number}.</span>
                      <h3 className="text-2xl font-headline font-semibold">{service.title}</h3>
                    </div>
                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-background/20 text-foreground group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground transition-colors">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:hidden" />
                        <X className="h-5 w-5 transition-transform duration-300 hidden group-data-[state=open]:block" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-8 pt-4">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-8 max-w-3xl">{service.description}</p>
                  <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      data-ai-hint={service.aiHint}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-6 py-3 h-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/gallery" className="flex items-center gap-2">
                View All Services 
                <span className="bg-background/20 rounded-full p-2 leading-none">
                    <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-16 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4 mb-12">
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
            My Path
          </h2>
          <p className="mt-4 font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Career Journey
          </p>
        </div>
        <div className="container mx-auto max-w-5xl px-4">
          <JourneyTimeline experiences={experiences} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-background px-4">
        <div className="container mx-auto max-w-5xl py-16 sm:py-24">
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
                      <div className="flex justify-between items-center mt-4">
                          {post.category && (
                              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-transparent">
                                  {post.category}
                              </Badge>
                          )}
                          <time className="block text-xs font-medium text-primary-foreground/70 ml-auto">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                      </div>
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
