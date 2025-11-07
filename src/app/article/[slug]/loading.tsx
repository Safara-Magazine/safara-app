import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleLoading() {
  return (
    <main className="max-w-4xl mx-auto  px-4 py-12 animate-pulse">
      <div className="mb-8">
        {/* date */}
        <Skeleton className="h-5 w-32 mb-4 bg-gray-200" />
        
        {/* title skeleton */}
        <Skeleton className="h-12 w-full mb-3 bg-gray-200" />
        <Skeleton className="h-12 w-full mb-3 bg-gray-200" />
       
        
        {/* category button skeleton */}
        <Skeleton className="h-8 w-24 rounded-full mb-6 bg-gray-200" />
        
        {/* text skeleton */}
        <Skeleton className="h-6 w-full mb-2 bg-gray-200" />
        <Skeleton className="h-6 w-full mb-8 bg-gray-200" />
      </div>

      {/* image skeleton */}
      <Skeleton className="w-full h-[400px] mb-8 rounded-lg bg-gray-200" />

      {/* content skeleton */}
      <div className="prose prose-lg max-w-none space-y-3">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
      </div>
    </main>
  );
}