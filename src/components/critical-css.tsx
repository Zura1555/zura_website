'use client';

import { useEffect, useState } from 'react';

export function CriticalCSS() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load non-critical CSS after initial render
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/non-critical.css';
    link.onload = () => setIsLoaded(true);
    link.onerror = () => setIsLoaded(true); // Still mark as loaded even on error
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return null;
}
