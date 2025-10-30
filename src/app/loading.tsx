import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-5xl py-12 sm:py-16 md:py-24 px-4 animate-in fade-in duration-300">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column Skeleton */}
        <div className="flex flex-col items-start space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-[320px] h-[400px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
