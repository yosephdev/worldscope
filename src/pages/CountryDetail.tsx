import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchCountryByCode } from '@/lib/api';
import { analytics } from '@/lib/analytics';
import { useEffect } from 'react';

export const CountryDetail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const {
    data: country,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code!),
    enabled: !!code,
    retry: 2,
  });

  useEffect(() => {
    if (country) {
      analytics.trackCountryView(country.name.common);
    }
  }, [country]);

  if (isLoading) {
    return <CountryDetailSkeleton />;
  }

  if (isError || !country) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-8 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Country Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            {error instanceof Error ? error.message : 'The country you are looking for could not be found.'}
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} km²`;
  };

  const getNativeName = () => {
    if (!country.name.nativeName) return country.name.official;
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.official || country.name.official;
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map(currency => `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ''}`)
      .join(', ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        className="mb-8 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Flag */}
        <div className="aspect-[3/2] overflow-hidden rounded-lg shadow-lg">
          <img
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Country Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-3">
                <InfoItem
                  label="Native Name"
                  value={getNativeName()}
                />
                <InfoItem
                  label="Population"
                  value={formatPopulation(country.population)}
                />
                <InfoItem
                  label="Region"
                  value={country.region}
                />
                <InfoItem
                  label="Sub Region"
                  value={country.subregion || 'N/A'}
                />
                <InfoItem
                  label="Capital"
                  value={country.capital?.[0] || 'N/A'}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <InfoItem
                  label="Top Level Domain"
                  value={country.tld?.[0] || 'N/A'}
                />
                <InfoItem
                  label="Currencies"
                  value={getCurrencies()}
                />
                <InfoItem
                  label="Languages"
                  value={getLanguages()}
                />
                {country.area && (
                  <InfoItem
                    label="Area"
                    value={formatArea(country.area)}
                  />
                )}
                {country.timezones && (
                  <InfoItem
                    label="Timezones"
                    value={country.timezones.join(', ')}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Border Countries */}
          {country.borders && country.borders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="px-4 py-2 bg-card text-card-foreground rounded shadow hover:shadow-md transition-shadow text-sm"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="flex gap-4 pt-4">
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Wikipedia <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(country.name.common)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View on Maps <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for info items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:gap-2">
    <span className="font-semibold text-foreground min-w-[120px]">{label}:</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

// Loading skeleton for country detail
const CountryDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-10 w-20 mb-8" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <Skeleton className="aspect-[3/2] w-full rounded-lg" />
      
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64 mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
