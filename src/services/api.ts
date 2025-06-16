
import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
    try {
        // Using multiple common search terms to get more countries
        const searchTerms = ['a', 'e', 'i', 'o', 'u', 'y', 'z', 'c', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w'];
        const promises = searchTerms.map(term =>
            fetch(`${BASE_URL}/name/${term}`)
                .then(response => response.ok ? response.json() : [])
                .catch(() => [])
        );

        const results = await Promise.all(promises);

        // Combine results and remove duplicates based on cca3 code
        const uniqueCountries = Array.from(
            results.flat().reduce((map, country: Country) => {
                if (country && country.cca3 && !map.has(country.cca3)) {
                    map.set(country.cca3, country);
                }
                return map;
            }, new Map<string, Country>()).values()
        );

        return uniqueCountries as Country[];
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const fetchCountryByCode = async (code: string): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/alpha/${code}?fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders,cca3`);
    if (!response.ok) {
        throw new Error('Failed to fetch country');
    }
    return response.json();
};

export const fetchCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3`);
    if (!response.ok) {
        throw new Error('Failed to fetch border countries');
    }
    return response.json();
};
