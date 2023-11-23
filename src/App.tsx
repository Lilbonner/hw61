import React, { useState } from 'react';
import CountryList from '../src/Components/List/List';
import CountryInfo from '../src/Components/Info/Info';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <CountryList onSelectCountry={setSelectedCountry} />
      <CountryInfo selectedCountry={selectedCountry} />
    </div>
  );
};

export default App;
