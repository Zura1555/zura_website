'use client';

import { useState, useEffect, useRef } from 'react';
import { Progress } from "@/components/ui/progress";

type Experience = {
  company: string;
  date: string;
  description: string;
};

interface JourneyTimelineProps {
  experiences: Experience[];
}

export function JourneyTimeline({ experiences }: JourneyTimelineProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target); // Animate only once

          const sortedExperiences = [...experiences].sort((a, b) => parseInt(a.date) - parseInt(b.date));
          const numExperiences = sortedExperiences.length;
          if (numExperiences === 0) return;

          const timeouts: NodeJS.Timeout[] = [];
          
          // Animate progress in stages for each experience
          sortedExperiences.forEach((exp, index) => {
            const timeout = setTimeout(() => {
              const targetProgress = ((index + 1) / numExperiences) * 100;
              setProgress(targetProgress);
            }, index * 800); // Stagger the animation for each step
            timeouts.push(timeout);
          });
          
          // Cleanup timeouts on component unmount
          return () => {
            timeouts.forEach(clearTimeout);
          };
        }
      },
      { threshold: 0.2 } // Start animation when 20% of the section is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [experiences]);

  return (
    <div ref={ref} className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiences.map((exp, index) => (
            <div key={index}>
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
