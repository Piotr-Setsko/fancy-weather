import { IMAGE_API_TOKEN, LOCATION_API_TOKEN, WEATHER_API_TOKEN } from '../../assets/constants.json';

export const getImage = ((description) => {
  return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=winter+night+${description}+city&client_id=${IMAGE_API_TOKEN}`)
    .then((response) => response.json());
});

export const getUserLocation = (() => {
  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then((response) => response.json());
});

export const getWeatherById = ((search, unit, lang) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?id=${search}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => response.json());
});

export const getWeatherByName = ((search, unit, lang) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => response.json());
});
