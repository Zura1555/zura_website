'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Use dynamic import for Button to reduce bundle size in error pages
const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })), {
  ssr: false,
  loading: () => <button className="btn">Loading...</button>
});

interface SharedErrorProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
}

export function SharedErrorComponent({ 
  error, 
  reset, 
  title = "Something went wrong",
  message = "An unexpected error occurred.",
  showHomeButton = true,
  showRetryButton = true
}: SharedErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error reporting service (e.g., Sentry)
      console.error('Error boundary caught:', error);
    } else {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {error.stack || error.message}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetryButton && reset && (
            <Button onClick={reset} variant="outline">
              Try again
            </Button>
          )}
          
          {showHomeButton && (
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                Go home
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
