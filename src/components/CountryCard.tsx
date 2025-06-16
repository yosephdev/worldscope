
import { Country } from '../types/country';
import { Link } from 'react-router-dom';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  return (
    <Link 
      to={`/country/${country.cca3}`}
      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden group"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4 text-card-foreground">
          {country.name.common}
        </h3>
        <div className="space-y-1 text-sm">
          <p className="text-card-foreground">
            <span className="font-semibold">Population:</span> {formatPopulation(country.population)}
          </p>
          <p className="text-card-foreground">
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p className="text-card-foreground">
            <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
