const BASE_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  timezones?: string[];
  continents?: string[];
  borders?: string[];
  tld?: string[];
  fifa?: string;
}

export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

// Fetch all countries
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,cca2,cca3,capital,region,population,flags`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

// Fetch single country by code
export const fetchCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Country not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching country:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch country details');
  }
};

// Fetch countries by name (for search)
export const searchCountries = async (name: string): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fields=name,cca2,cca3,capital,region,population,flags`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return []; // No countries found
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};

// Fetch countries by region
export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}?fields=name,cca2,cca3,capital,region,population,flags`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    throw new Error('Failed to fetch countries by region');
  }
};