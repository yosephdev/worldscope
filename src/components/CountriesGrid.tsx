
import { Country } from '../types/country';
import CountryCard from './CountryCard';

interface CountriesGridProps {
  countries: Country[];
  loading: boolean;
}

const CountriesGrid: React.FC<CountriesGridProps> = ({ countries, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-muted"></div>
              <div className="p-6">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-muted-foreground">No countries found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesGrid;
