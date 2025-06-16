
export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol?: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
}

export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
