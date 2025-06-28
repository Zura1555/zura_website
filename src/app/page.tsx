import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, BrainCircuit, Palette, PenTool, Code, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


const ToolItem = ({ icon, name }: { icon: React.ReactNode, name: string }) => (
  <div className="flex flex-col items-center text-center gap-4">
    <div className="h-20 w-20 bg-secondary rounded-2xl flex items-center justify-center text-primary transform transition-transform hover:-translate-y-1">
      {icon}
    </div>
    <div className="text-center">
      <h4 className="font-bold">{name.split(' ')[0]}</h4>
      {name.split(' ').length > 1 && <h4 className="font-bold">{name.split(' ').slice(1).join(' ')}</h4>}
    </div>
  </div>
);


export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section id="home" className="container mx-auto max-w-7xl py-16 md:py-24 animate-in fade-in duration-700">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight">
              I&apos;m Zura, <br />
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-primary -skew-y-2 transform" aria-hidden="true"></span>
                <span className="relative text-primary-foreground px-2">Project Delivery</span>
              </span>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              With a technologist&apos;s curiosity, I love managing diverse projects. My passion is for continuous learning and exploring new tech. I thrive on this variety, building the versatile skillset required to be a true &apos;Swiss army knife&apos; for any challenge.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-base">About</Button>
              <Button size="lg" variant="default" className="px-8 py-6 text-base">Download CV</Button>
            </div>
          </div>
          <div className="relative flex justify-center mt-12 md:mt-0">
            <div className="p-2 border-2 border-primary rounded-3xl shadow-2xl shadow-primary/20">
              <div className="relative h-[500px] w-[400px]">
                <Image
                  src="https://placehold.co/400x500"
                  alt="Portrait of Zura"
                  width={400}
                  height={500}
                  data-ai-hint="woman portrait professional"
                  className="rounded-2xl object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-1 md:-right-6 h-16 w-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground transform transition-transform hover:scale-110 cursor-pointer">
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto max-w-7xl py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">My Achievements</h2>
          <p className="mt-4 text-lg text-muted-foreground">A showcase of my professional journey and key skills.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-3">
            <Card className="bg-card border-none p-0 rounded-3xl overflow-hidden">
              <CardContent className="p-0 relative h-[400px] w-full">
                <Image
                  src="https://placehold.co/600x400"
                  alt="Achievements"
                  fill
                  data-ai-hint="office laptop"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                   <h3 className="text-3xl font-bold">Achievements in my professional life.</h3>
                   <p className="mt-2 max-w-md text-gray-300">Since beginning my journey nearly 8 years ago, I've consulted for startups and collaborated with talented people to create digital products.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
                <Lightbulb className="h-8 w-8 text-primary mt-1"/>
              <div>
                <h3 className="text-2xl font-bold">Fueled by Creativity & Purpose</h3>
                <p className="mt-2 text-muted-foreground">I am driven to contribute to innovative projects that challenge me to learn and grow with emerging technologies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="service" className="container mx-auto max-w-7xl py-16 md:py-24">
        <div className="text-center mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">The Tools I Use</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">I work with a variety of tools to bring my designs to life – from wireframing and prototyping to visual storytelling.</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                 <div className="w-full h-px bg-border rotate-[60deg] absolute"></div>
                 <div className="w-full h-px bg-border rotate-[-60deg] absolute"></div>
                 <div className="w-2/3 h-px bg-border absolute"></div>
            </div>
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-y-24 gap-x-12">
              <div className="md:col-start-2 flex justify-center"><ToolItem icon={<BrainCircuit size={32}/>} name="Artificial Intelligence"/></div>
              <div className="flex justify-center"><ToolItem icon={<Palette size={32}/>} name="Canva"/></div>
              <div className="flex justify-center"><ToolItem icon={<PenTool size={32}/>} name="Figma"/></div>
              <div className="flex justify-center"><ToolItem icon={<Code size={32}/>} name="rigjam"/></div>
              <div className="md:col-start-2 flex justify-center"><ToolItem icon={<Mic size={32}/>} name="Photoshop"/></div>
              <div className="flex justify-center"><ToolItem icon={<Palette size={32}/>} name="Illustrator"/></div>
            </div>
        </div>
      </section>

      <section id="portfolio" className="container mx-auto max-w-7xl py-16 md:py-24 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">Let&apos;s take a look at some of my work</h2>
      </section>
    </div>
  );
}
