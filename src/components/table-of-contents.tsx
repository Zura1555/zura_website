
"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Heading = {
  level: number;
  text: string;
  slug: string;
};

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>();

  // This effect sets up the IntersectionObserver to watch for headings entering the viewport.
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      // The heading is considered "active" when it's in the top 15% of the viewport.
      rootMargin: "0px 0px -85% 0px",
    });

    const elements = headings.map(h => document.getElementById(h.slug)).filter((el): el is HTMLElement => el !== null);
    elements.forEach(elem => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, [headings]);
  
  if (headings.length === 0) {
    return null;
  }
  
  return (
    <aside className="sticky top-24 hidden lg:block" aria-label="Table of contents">
      <h2 className="font-headline text-2xl font-bold mb-3">Contents</h2>
      <div className="border-t border-border mb-4"></div>
      <ol className="space-y-3">
        {headings.map((heading, index) => (
          <li key={heading.slug} className="flex items-start gap-3 text-muted-foreground">
             <span className="text-sm font-medium pt-0.5">{`${index + 1}.`}</span>
            <a
              href={`#${heading.slug}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.slug)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
                history.pushState(null, '', `#${heading.slug}`);
                setActiveId(heading.slug);
              }}
              className={cn(
                'block text-sm leading-tight transition-colors hover:text-primary',
                activeId === heading.slug ? 'text-primary font-semibold' : ''
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
