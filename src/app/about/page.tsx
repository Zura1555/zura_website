import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Figma", "UI/UX Design", "Agile Methodologies"];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-8 sm:py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">About Me</h1>
        <p className="mt-3 sm:mt-4 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
          A passionate developer with a keen eye for design, dedicated to building beautiful, functional, and user-centric digital experiences.
        </p>
      </section>

      <section className="mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative h-64 w-48 sm:h-80 sm:w-64">
              <Image 
                src="https://placehold.co/400x600"
                alt="Zura in a professional setting"
                width={400}
                height={600}
                data-ai-hint="woman professional"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-2xl sm:text-3xl font-semibold">My Journey</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
              I started my journey into web development with a fascination for how things work on the internet. This curiosity quickly grew into a passion for coding and design. Over the years, I've had the privilege of working on diverse projects, from small business websites to large-scale enterprise applications.
              <br/><br/>
              My philosophy is to approach every project with empathy for the end-user, ensuring that the final product is not only aesthetically pleasing but also intuitive and accessible. I believe in lifelong learning and am constantly exploring new technologies and design trends to stay at the forefront of the industry.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <h2 className="text-center font-headline text-2xl sm:text-3xl font-semibold">My Skills</h2>
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">{skill}</Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
