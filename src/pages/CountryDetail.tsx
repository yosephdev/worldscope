
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { fetchCountryByCode, fetchCountriesByCodes } from '../services/api';
import { Country } from '../types/country';
import Header from '../components/Header';

const CountryDetail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { data: countryData, isLoading, error } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code!),
    enabled: !!code,
  });

  const country = countryData?.[0];

  const { data: borderCountries = [] } = useQuery({
    queryKey: ['borderCountries', country?.borders],
    queryFn: () => fetchCountriesByCodes(country!.borders!),
    enabled: !!country?.borders && country.borders.length > 0,
  });

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const getNativeName = (country: Country) => {
    if (!country.name.nativeName) return country.name.common;
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.common || country.name.common;
  };

  const getCurrencies = (country: Country) => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies).map(currency => currency.name).join(', ');
  };

  const getLanguages = (country: Country) => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 w-24 bg-muted rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/3] bg-muted rounded"></div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded"></div>
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-destructive">
            Country not found or error loading data.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg transition-shadow mb-16"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Flag */}
          <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
            <img
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Country Information */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-detail">
              {/* Left Column */}
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold">Native Name:</span> {getNativeName(country)}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Population:</span> {formatPopulation(country.population)}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Region:</span> {country.region}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold">Top Level Domain:</span> {country.tld?.[0] || 'N/A'}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Currencies:</span> {getCurrencies(country)}
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Languages:</span> {getLanguages(country)}
                </p>
              </div>
            </div>

            {/* Border Countries */}
            {borderCountries.length > 0 && (
              <div className="space-y-4">
                <p className="text-foreground font-semibold">Border Countries:</p>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((borderCountry) => (
                    <Link
                      key={borderCountry.cca3}
                      to={`/country/${borderCountry.cca3}`}
                      className="px-4 py-2 bg-card text-card-foreground rounded shadow-md hover:shadow-lg transition-shadow text-sm"
                    >
                      {borderCountry.name.common}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
