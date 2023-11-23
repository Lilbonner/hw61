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

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`https://restcountries.com/v2/alpha/${selectedCountry}`);
          const data = await response.json();
          setCountryInfo(data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      }
    };

    fetchCountryInfo();
  }, [selectedCountry]);

  return (
    <div>
      <h2>Информация о стране</h2>
      {selectedCountry ? (
        countryInfo ? (
          <div>
            <h3>{countryInfo.name}<p><img src={countryInfo.flag} alt={`Флаг ${countryInfo.name}`} style={{ maxWidth: '200px' }} /></p></h3>
            <p>Столица: {countryInfo.capital}</p>
            <p>Население: {countryInfo.population}</p>
            <div>
              <p>Граничит с:</p>
              <ul>
                {countryInfo.borders.map((border, index) => (
                  <li key={index}>{border}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Загрузка информации...</p>
        )
      ) : (
        <p>Выберите страну</p>
      )}
    </div>
  );
};

export default CountryInfo;
