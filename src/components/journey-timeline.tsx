'use client';

import { useState, useEffect, useRef } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Experience = {
  company: string;
  date: string;
  description: string;
};

interface JourneyTimelineProps {
  experiences: Experience[];
}

const ANIMATION_DURATION = 2500; // Must match the transition duration in the Progress component
const INITIAL_DELAY = 100;

export function JourneyTimeline({ experiences }: JourneyTimelineProps) {
  const [progress, setProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          if (experiences.length > 0) {
            const progressPerStep = 100 / experiences.length;

            experiences.forEach((_, index) => {
              const timeout = setTimeout(() => {
                setProgress(progressPerStep * (index + 1));
                setVisibleItems(index + 1);
              }, INITIAL_DELAY + (index * ANIMATION_DURATION));
              timeouts.push(timeout);
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      timeouts.forEach(clearTimeout);
    };
  }, [experiences]);

  return (
    <div ref={ref} className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[120px]">
        {experiences.map((exp, index) => (
            <div 
              key={index}
              className={cn(
                "transition-opacity duration-500 ease-out",
                index < visibleItems ? "opacity-100" : "opacity-0"
              )}
            >
                <p className="font-bold text-primary text-lg">{exp.date}</p>
                <h4 className="font-headline text-xl font-semibold mt-2">{exp.company}</h4>
                <p className="text-muted-foreground mt-1">{exp.description}</p>
            </div>
        ))}
      </div>
        
      <div className="pt-4">
          <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
