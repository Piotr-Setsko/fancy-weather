import {WEATHER_API_TOKEN} from '../../assets/constants.json';
import { getCountryName } from '../location/location';

const unitCheck = () => {
  const metric = document.querySelector('.control__unit--metric');
  const imperial = document.querySelector('.control__unit--imperial');

  let unit;
  if (sessionStorage.temp === 'imper') {
    unit = 'imperial';
    imperial.classList.add('active');
    metric.classList.remove('active');
  } else {
    unit = 'metric';
    metric.classList.add('active');
    imperial.classList.remove('active');
  }  
  return unit;
}

const getWeatherForecast = (search, unit, lang) => {  
  if (parseInt(search, 10)) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast/?id=${search}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          return response.status;
        }
        return response.json();
      });
  }
  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => {
      if (response.status === 404 || response.status === 400) {
        return response.status;
      }
      return response.json();
    });
}

const weatherData = async (search, unit, lang) => {
  const nextDays = {};
  const iconTomorrow = {};
  const tempTomorrow = {};
  const weatherInfo = {};
  const weatherDataInfo = await getWeatherForecast(search, unit, lang);
  if (weatherDataInfo === 404 || weatherDataInfo === 400) {
    document.location.search = '';
  }

  const {
    city,
  } = weatherDataInfo;
  const {
    name, country, coord, timezone,
  } = city;
  const {
    list,
  } = weatherDataInfo;
  const {
    main, weather, wind,
  } = list[0];
  tempTomorrow[0] = list[8].main.temp;
  tempTomorrow[1] = list[16].main.temp;
  tempTomorrow[2] = list[24].main.temp;
  nextDays[0] = list[8].dt_txt;
  nextDays[1] = list[16].dt_txt;
  nextDays[2] = list[24].dt_txt;
  iconTomorrow[0] = list[8].weather[0].icon;
  iconTomorrow[1] = list[16].weather[0].icon;
  iconTomorrow[2] = list[24].weather[0].icon;
  const {
    temp, humidity,
  } = main;
  weatherInfo.feels = main.feels_like;
  let {
    speed,
  } = wind;
  const {
    description, icon,
  } = weather[0];

  const countryName = await getCountryName(country);

  weatherInfo.name = name;
  weatherInfo.countryName = countryName;
  weatherInfo.temp = temp;
  weatherInfo.icon = icon;

  weatherInfo.description = description;

  if (unit === 'imperial') {
    speed = Math.round(speed / 2.237);
  }
  weatherInfo.speed = speed;
  weatherInfo.humidity = humidity;
  weatherInfo.coord = coord;
  weatherInfo.nextDays = nextDays;
  weatherInfo.tempTomorrow = tempTomorrow;
  weatherInfo.iconTomorrow = iconTomorrow;
  weatherInfo.timezone = timezone;

  return weatherInfo;
}

export { weatherData, unitCheck };
