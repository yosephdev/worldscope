
import { Search } from 'lucide-react';
import { Region } from '../types/country';

interface SearchAndFilterProps {
  searchTerm: string;
  selectedRegion: Region;
  onSearchChange: (term: string) => void;
  onRegionChange: (region: Region) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  selectedRegion,
  onSearchChange,
  onRegionChange,
}) => {
  const regions: Region[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-md bg-card text-card-foreground shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Region Filter */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value as Region)}
          className="appearance-none bg-card text-card-foreground px-6 py-3 pr-10 rounded-md shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[200px]"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === 'All' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
