import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../lib/api';
import { Country, Region } from '../lib/api';
import SearchAndFilter from '../components/SearchAndFilter';
import { CountriesGrid } from '../components/CountriesGrid';

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
    queryFn: fetchCountries,
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
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-red-600 dark:text-red-400">
          Error loading countries. Please try again later.
        </p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        onSearchChange={setSearchTerm}
        onRegionChange={setSelectedRegion}
      />
      <CountriesGrid countries={filteredCountries} loading={isLoading} />
    </>
  );
};

export default Home;
