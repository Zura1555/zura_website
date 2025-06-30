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

const START_YEAR = 2023;
const END_YEAR = 2035;

export function JourneyTimeline({ experiences }: JourneyTimelineProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Using 2025 as the target year for progress, as per the last data entry.
  const TARGET_YEAR = 2025;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const finalProgress = ((TARGET_YEAR - START_YEAR) / (END_YEAR - START_YEAR)) * 100;
          // Animate the progress bar when it becomes visible
          const timer = setTimeout(() => setProgress(finalProgress > 0 ? finalProgress : 0), 500);
          observer.unobserve(entry.target); // Ensure animation only happens once
          return () => clearTimeout(timer);
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
  }, []);

  return (
    <div ref={ref} className="w-full space-y-10">
        {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col gap-3">
                {/* Part 1: Year */}
                <p className="font-bold text-primary text-sm">{exp.date}</p>
                
                {/* Part 2: Description */}
                <div>
                    <h4 className="font-headline text-xl font-semibold">{exp.company}</h4>
                    <p className="text-muted-foreground mt-1">{exp.description}</p>
                </div>
                
                {/* Part 3: Progress Bar */}
                <div className="pt-2">
                    <Progress value={progress} className="h-1.5" />
                </div>
            </div>
        ))}
    </div>
  );
}
