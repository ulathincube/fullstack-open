import Country from './Country';
import weatherServices from '../services/weather';
import { useEffect, useState } from 'react';

function Display({ countries, onSetCountries }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('use-effect runs', countries);
    if (countries.length !== 1) return;
    console.log(countries);
    weatherServices
      .getWeather(countries[0].countryName)
      .then(weatherData => setWeather(weatherData));
  }, [countries]);

  if (!countries) return null;

  const showCountryHandler = countryName => {
    const selectedCountry = countries.filter(
      selectCountry => selectCountry.countryName === countryName,
    );
    onSetCountries(selectedCountry);
  };

  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    if (!weather)
      return <div className='loading'>...Loading Weather Data...</div>;
    const {
      temperature,
      weather_icons: [weatherIcon],
      weather_descriptions: [weatherDescription],
      wind_speed: windSpeed,
    } = weather;

    return (
      <section>
        <ul>
          {countries.map(props => (
            <Country
              key={props.id}
              {...props}
              temperature={temperature}
              weatherIcon={weatherIcon}
              windSpeed={windSpeed}
              weatherDescription={weatherDescription}
            />
          ))}
        </ul>
      </section>
    );
  }

  const countryData = countries.map(country => (
    <li key={country.id}>
      <span>{country.countryName}</span>
      <button onClick={() => showCountryHandler(country.countryName)}>
        Show
      </button>
    </li>
  ));

  return <ul className='countries'>{countryData}</ul>;
}

export default Display;
