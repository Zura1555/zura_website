
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

// Helper function to find the full path to a node with a given slug
const findPathToNode = (nodes: NestedHeading[], slug: string): NestedHeading[] | null => {
  for (const node of nodes) {
    if (node.slug === slug) {
      return [node];
    }
    if (node.children.length > 0) {
        const childPath = findPathToNode(node.children, slug);
        if (childPath) {
        return [node, ...childPath];
        }
    }
  }
  return null;
};


export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({}); // Control collapsible states
  const [activeAndAboveIds, setActiveAndAboveIds] = useState<Set<string>>(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
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
          // Find the index of the active heading and highlight it and all above it
          const activeIndex = headings.findIndex(h => h.slug === entry.target.id);
          if (activeIndex !== -1) {
            const highlightedIds = new Set(headings.slice(0, activeIndex + 1).map(h => h.slug));
            setActiveAndAboveIds(highlightedIds);
          }
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

  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleRect = article.getBoundingClientRect();
      const articleTop = articleRect.top + window.scrollY;
      const articleHeight = articleRect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate progress based on how much of the article has been scrolled through
      const articleStart = articleTop - windowHeight * 0.3; // Start counting when article is 30% visible
      const articleEnd = articleTop + articleHeight - windowHeight * 0.7; // End when article is 70% past
      
      let progress = 0;
      if (scrollTop > articleStart) {
        progress = Math.min(100, Math.max(0, (scrollTop - articleStart) / (articleEnd - articleStart) * 100));
      }
      
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // This effect will automatically expand parent sections when a new heading becomes active
  useEffect(() => {
    if (activeId && nestedHeadings.length > 0) {
      const path = findPathToNode(nestedHeadings, activeId);
      if (path) {
        const newOpenStates: Record<string, boolean> = {};
        // Find all parents in the path that have children and mark them to be opened
        path.forEach(node => {
          if (node.children.length > 0) {
            newOpenStates[node.slug] = true;
          }
        });
        // Merge with existing states to preserve manual interactions
        setOpenStates(prev => ({ ...prev, ...newOpenStates }));
      }
    }
  }, [activeId, nestedHeadings]);
  
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

  const handleOpenChange = (slug: string, isOpen: boolean) => {
    setOpenStates(prev => ({ ...prev, [slug]: isOpen }));
  };

  const renderNestedHeadings = (headingsToRender: NestedHeading[], isSublevel = false) => {
    return (
      <ol className={cn("space-y-2", isSublevel ? "pl-4 border-l border-border/50 ml-2 mt-1" : "pl-0")}>
        {headingsToRender.map((heading) => {
          const hasChildren = heading.children.length > 0;
          return (
            <li key={heading.slug}>
              {hasChildren ? (
                <Collapsible
                  open={openStates[heading.slug] || false}
                  onOpenChange={(isOpen) => handleOpenChange(heading.slug, isOpen)}
                >
                  <div className="flex items-center justify-between gap-1 group">
                    <a
                      href={`#${heading.slug}`}
                      onClick={(e) => handleLinkClick(e, heading.slug)}
                      className={cn(
                        'flex-1 text-xs py-1 px-2 rounded-md transition-colors font-medium truncate',
                        activeAndAboveIds.has(heading.slug)
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {heading.text}
                    </a>
                    <CollapsibleTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-muted -mr-1">
                        <ChevronRight className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
                          openStates[heading.slug] ? "rotate-90" : "rotate-0"
                        )} />
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
                    'block text-xs py-1 px-2 rounded-md transition-colors truncate',
                    activeAndAboveIds.has(heading.slug)
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
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
      {/* Reading Progress Bar */}
      <div className="w-full bg-muted/30 rounded-full h-1.5 mb-4 overflow-hidden">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      <div className="text-xs text-muted-foreground mb-4 text-center">
        {Math.round(readingProgress)}% complete
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-hidden pr-2">
        {renderNestedHeadings(nestedHeadings)}
      </div>
    </aside>
  );
}
