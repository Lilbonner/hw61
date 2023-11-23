import React, { useState, useEffect } from 'react';

interface Country {
  alpha3Code: string;
  name: string;
}

interface CountryListProps {
  onSelectCountry: (code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=alpha3Code,name');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country list:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h2>Выберите страну</h2>
      <ul>
        {countries.map(country => (
          <li
            key={country.alpha3Code}
            onClick={() => onSelectCountry(country.alpha3Code)}
            style={{ cursor: 'pointer' }}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
