import { Skeleton } from './ui/skeleton';

export const CountryCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export const CountriesGridSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <CountryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};