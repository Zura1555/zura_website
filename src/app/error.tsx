'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error reporting service (e.g., Sentry)
      console.error('Error boundary caught:', error);
    } else {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="container mx-auto max-w-2xl py-24 px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Something went wrong!</h1>
        <p className="text-lg text-muted-foreground">
          We apologize for the inconvenience. An error occurred while processing your request.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-muted rounded-lg text-left">
            <p className="font-mono text-sm text-destructive">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        <div className="flex gap-4 justify-center mt-8">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
