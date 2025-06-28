import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Figma", "UI/UX Design", "Agile Methodologies"];
const experiences = [
  {
    icon: <Briefcase className="h-5 w-5"/>,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    date: "2020 - Present",
    description: "Leading the development of scalable web applications using React and Next.js. Collaborating with UI/UX designers to create intuitive and engaging user interfaces.",
  },
  {
    icon: <Briefcase className="h-5 w-5"/>,
    title: "Frontend Developer",
    company: "Digital Innovations",
    date: "2018 - 2020",
    description: "Developed and maintained responsive websites and web applications for various clients. Specialized in creating pixel-perfect UIs from design mockups.",
  },
  {
    icon: <GraduationCap className="h-5 w-5"/>,
    title: "B.S. in Computer Science",
    company: "University of Technology",
    date: "2014 - 2018",
    description: "Focused on software engineering principles, data structures, and algorithms. Graduated with honors.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 animate-in fade-in duration-500">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">About Me</h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          A passionate developer with a keen eye for design, dedicated to building beautiful, functional, and user-centric digital experiences.
        </p>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-1 flex justify-center">
            <div className="relative h-80 w-64">
              <Image 
                src="https://placehold.co/400x600"
                alt="Jon Dawson in a professional setting"
                width={400}
                height={600}
                data-ai-hint="man professional"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-semibold">My Journey</h2>
            <p className="mt-4 text-muted-foreground space-y-4">
              I started my journey into web development with a fascination for how things work on the internet. This curiosity quickly grew into a passion for coding and design. Over the years, I've had the privilege of working on diverse projects, from small business websites to large-scale enterprise applications.
              <br/><br/>
              My philosophy is to approach every project with empathy for the end-user, ensuring that the final product is not only aesthetically pleasing but also intuitive and accessible. I believe in lifelong learning and am constantly exploring new technologies and design trends to stay at the forefront of the industry.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center font-headline text-3xl font-semibold">My Skills</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">{skill}</Badge>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center font-headline text-3xl font-semibold">Experience & Education</h2>
        <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true"></div>
            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative flex items-center md:justify-normal">
                        <div className={`flex w-full items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            <div className="hidden md:flex md:w-1/2"></div>
                            <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border-2 border-primary text-primary">
                                {exp.icon}
                            </div>
                            <div className="w-full md:w-1/2 md:px-6">
                                <Card className="ml-4 md:ml-0">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl">{exp.title}</CardTitle>
                                        <CardDescription>{exp.company} / {exp.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{exp.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
