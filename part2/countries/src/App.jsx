import { useState, useEffect } from 'react';
import Search from './components/Search';
import Display from './components/Display';
import countryServices from './services/countries';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSetCountries = newCountries => setCountries(newCountries);

  useEffect(() => {
    if (country === '') return;
    countryServices
      .getAllCountries()
      .then(countriesData => {
        const countryDataArray = countriesData
          .filter(countryData =>
            countryData.name.common
              .toLowerCase()
              .includes(country.toLowerCase()),
          )
          .map(countryData => {
            const {
              name: { common: countryName },
              cca2: id,
              capital,
              area,
              flags,
              languages,
            } = countryData;

            return { countryName, id, capital, area, flags, languages };
          });

        return countryDataArray;
      })
      .then(countriesData => setCountries(countriesData))
      .catch(error => setErrorMessage(error));
  }, [country]);

  const onChangeCountry = newCountry => setCountry(newCountry);

  return (
    <section>
      <Search country={country} onChangeCountry={onChangeCountry} />
      <Display countries={countries} onSetCountries={onSetCountries} />
      <ErrorMessage errorMessage={errorMessage} />
    </section>
  );
}

export default App;
