import React, { useState, useEffect } from 'react';

interface Country {
  alpha3Code: string;
  name: string;
  borders: string[];
  population: number;
  capital: string;
  flag: string;
}

interface CountryInfoProps {
  selectedCountry: string | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ selectedCountry }) => {
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`https://restcountries.com/v2/alpha/${selectedCountry}`);
          const data: Country = await response.json();
          setCountryInfo(data);

          const borderResponses = await Promise.all(data.borders.map(async (borderCode: string) => {
            const borderResponse = await fetch(`https://restcountries.com/v2/alpha/${borderCode}`);
            return await borderResponse.json();
          }));

          const borderCountriesNames = borderResponses.map((country: Country) => country.name);

          setBorderCountries(borderCountriesNames);
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      }
    };

    fetchCountryInfo();
  }, [selectedCountry]);

  return (
    <div className="Info">
        {selectedCountry ? (
        countryInfo ? (
          <div>
            <h2>{countryInfo.name}<p><img src={countryInfo.flag} alt={`Флаг ${countryInfo.name}`} style={{ maxWidth: '150px' }} /></p></h2>
            <p>Capital: {countryInfo.capital}</p>
            <p>Population: {countryInfo.population}</p>
            <ul>Bordered with:
              {borderCountries.map((borderCountry, index) => (
                <li key={index}>{borderCountry}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Uploading information...</p>
        )
      ) : (
        <p>Select country</p>
      )}
    </div>
  );
};

export default CountryInfo;
