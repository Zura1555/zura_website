
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from 'lucide-react';

type Heading = {
  level: number;
  text: string;
  slug: string;
};

type NestedHeading = Heading & {
  children: NestedHeading[];
};

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const buildTree = (headingsList: Heading[]): NestedHeading[] => {
      const root: NestedHeading = { level: 0, text: 'root', slug: 'root', children: [] };
      const stack: NestedHeading[] = [root];

      for (const heading of headingsList) {
        const node: NestedHeading = { ...heading, children: [] };
        while (stack.length > 1 && stack[stack.length - 1].level >= heading.level) {
          stack.pop();
        }
        stack[stack.length - 1].children.push(node);
        stack.push(node);
      }
      return root.children;
    };
    setNestedHeadings(buildTree(headings));
  }, [headings]);


  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -85% 0px",
    });

    const elements = headings.map(h => document.getElementById(h.slug)).filter((el): el is HTMLElement => el !== null);
    elements.forEach(elem => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, [headings]);
  
  if (headings.length === 0) {
    return null;
  }
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    document.getElementById(slug)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    history.pushState(null, '', `#${slug}`);
    setActiveId(slug);
  };

  const renderNestedHeadings = (headingsToRender: NestedHeading[], isSublevel = false) => {
    return (
      <ol className={cn("space-y-2", isSublevel ? "pl-4 border-l border-border/50 ml-2 mt-1" : "pl-0")}>
        {headingsToRender.map((heading) => {
          const hasChildren = heading.children.length > 0;
          return (
            <li key={heading.slug}>
              {hasChildren ? (
                <Collapsible>
                  <div className="flex items-center justify-between gap-1 group">
                    <a
                      href={`#${heading.slug}`}
                      onClick={(e) => handleLinkClick(e, heading.slug)}
                      className={cn(
                        'flex-1 text-sm py-1 transition-colors hover:text-primary font-medium',
                        activeId === heading.slug ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {heading.text}
                    </a>
                    <CollapsibleTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-muted -mr-1">
                        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground group-data-[state=open]:rotate-90" />
                      </button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    {renderNestedHeadings(heading.children, true)}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <a
                  href={`#${heading.slug}`}
                  onClick={(e) => handleLinkClick(e, heading.slug)}
                  className={cn(
                    'block text-sm py-1 transition-colors hover:text-primary',
                    activeId === heading.slug ? 'text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {heading.text}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    );
  };
  
  return (
    <aside className="sticky top-24 hidden lg:block" aria-label="Table of contents">
      <h2 className="font-headline text-lg font-semibold mb-3">On this page</h2>
      <div className="border-t border-border mb-4"></div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
        {renderNestedHeadings(nestedHeadings)}
      </div>
    </aside>
  );
}
