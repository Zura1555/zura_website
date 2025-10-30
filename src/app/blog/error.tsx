'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // TODO: Add error reporting service
      console.error('Blog error:', error);
    } else {
      console.error('Blog error:', error);
    }
  }, [error]);

  return (
    <div className="container mx-auto max-w-2xl py-24 px-4 text-center animate-in fade-in duration-500">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Failed to Load Blog</h1>
        <p className="text-lg text-muted-foreground">
          We couldn't load the blog content. This might be a temporary issue.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-left">
            <p className="font-mono text-sm text-destructive">{error.message}</p>
          </div>
        )}
        <div className="flex gap-4 justify-center mt-8">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
