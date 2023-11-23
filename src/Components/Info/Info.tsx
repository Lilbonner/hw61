import React, { useState, useEffect } from 'react';

interface Country {
  alpha3Code: string;
  name: string;
  borders: string[];
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
            <h3>{countryInfo.name}</h3>
            <p>Граничит с: {countryInfo.borders.join(', ')}</p>
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
