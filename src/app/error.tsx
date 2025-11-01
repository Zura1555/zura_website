'use client';

import { SharedErrorComponent } from '@/components/shared-error-component';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SharedErrorComponent
      error={error}
      reset={reset}
      title="Something went wrong!"
      message="We apologize for the inconvenience. An error occurred while processing your request."
    />
  );
}
