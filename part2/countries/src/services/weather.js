const baseUrl = 'http://api.weatherstack.com/current';
import axios from 'axios';

const getWeather = countryName =>
  axios
    .get(
      `${baseUrl}?access_key=${import.meta.env.VITE_WEATHERSTACK_TOKEN}&query=${countryName}`,
    )
    .then(response => response.data.current);

export default {
  getWeather,
};
