'use client';

import { useEffect } from 'react';

interface CSSLoaderProps {
  href: string;
}

export function CSSLoader({ href }: CSSLoaderProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = function() {
      this.onload = null;
      (this as HTMLLinkElement).rel = 'stylesheet';
    };
    document.head.appendChild(link);

    return () => {
      // Cleanup if component unmounts
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href]);

  // Return a noscript fallback for SEO and users without JS
  return (
    <noscript>
      <link href={href} rel="stylesheet" />
    </noscript>
  );
}
