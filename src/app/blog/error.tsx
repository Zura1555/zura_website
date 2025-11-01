'use client';

import { SharedErrorComponent } from '@/components/shared-error-component';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="animate-in fade-in duration-500">
      <SharedErrorComponent
        error={error}
        reset={reset}
        title="Failed to Load Blog"
        message="We couldn't load the blog content. This might be a temporary issue."
      />
    </div>
  );
}
