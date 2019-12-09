import './style.css';
import '@babel/polyfill';
import renderForecastInfo from './js/dom/dom';
import init from './js/map/map';
import { effectTemp, getTime } from './js/utilities/utilities';
import { getUserLocation, getCountryName } from './js/location/location';
import getWeatherForecast from './js/weather/weather';
import getImage from './js/background/background';

async function create() {
  try {
    const nextDays = {};

    let { city, timezone } = await getUserLocation();

    // console.log(getWeatherForecast(city));

    const weatherData = await getWeatherForecast(city);
    ({ city } = weatherData);
    const { name, country, coord } = city;
    const { list } = weatherData;
    const { main, weather, wind } = list[0];
    const tempTomorrow = list[8].main.temp;
    const tempAftTom = list[16].main.temp;
    const tempAftAftTom = list[24].main.temp;
    nextDays[0] = list[8].dt_txt;
    nextDays[1] = list[16].dt_txt;
    nextDays[2] = list[24].dt_txt;

    const { temp, humidity, pressure } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];
    const feels = effectTemp(temp, pressure, speed);

    const countryName = await getCountryName(country);

    const data = await getTime(timezone, nextDays);

    renderForecastInfo(name, countryName, data, temp, icon, description, feels, speed, humidity,
      coord);

    init(coord);
  } catch (e) {
    // console.log(e);
  }
}

create();
