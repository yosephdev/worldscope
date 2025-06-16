
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCountries } from '../services/api';
import { Country, Region } from '../types/country';
import Header from '../components/Header';
import SearchAndFilter from '../components/SearchAndFilter';
import CountriesGrid from '../components/CountriesGrid';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');

  const { 
    data: countries = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
  });

  const filteredCountries = useMemo(() => {
    let filtered = countries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    return filtered;
  }, [countries, searchTerm, selectedRegion]);

  if (error) {
    console.error('API Error:', error);
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-xl text-destructive">
            Error loading countries. Please try again later.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        onSearchChange={setSearchTerm}
        onRegionChange={setSelectedRegion}
      />
      <CountriesGrid countries={filteredCountries} loading={isLoading} />
    </div>
  );
};

export default Home;
