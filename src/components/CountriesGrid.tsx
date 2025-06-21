import { Country } from '@/lib/api';
import CountryCard from './CountryCard';
import { CountriesGridSkeleton } from './CountryCardSkeleton';

interface CountriesGridProps {
  countries: Country[];
  loading: boolean;
}

export const CountriesGrid: React.FC<CountriesGridProps> = ({ countries, loading }) => {
  if (loading) {
    return <CountriesGridSkeleton />;
  }

  if (countries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          No countries found
        </h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};
