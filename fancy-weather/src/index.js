import './style.css';
import '@babel/polyfill';
import { renderForecastInfo, renderStatic, renderWeather} from './js/dom/dom';
import init from './js/map/map';
import { effectTemp, getTime } from './js/utilities/utilities';
import { getUserLocation, getCountryName } from './js/location/location';
import { getWeatherForecast, weatherData} from './js/weather/weather';
import getImage from './js/background/background';
import someFunc from './js/search/search';

let weatherInfo;
let search;

async function create() {
  try {
    const nextDays = {};


    let { city, timezone } = await getUserLocation();

    if (document.location.search === '') {
      search = city;
    } else {
      search = document.location.search.slice(8);
    }

  //console.log(search);
  let unit;
  if (metric.classList.contains("active")) {
    unit = 'metric';
  } else {
    unit = 'imperial';
  }

    weatherInfo = await weatherData(search, unit);

    //console.log(weatherInfo.countryName);

    const data = await getTime(timezone, weatherInfo.nextDays);
    //console.log(data);

    renderForecastInfo(weatherInfo.name, weatherInfo.countryName, data, weatherInfo.temp, weatherInfo.icon, weatherInfo.description, weatherInfo.feels, weatherInfo.speed, weatherInfo.humidity, weatherInfo.coord);

      init(weatherInfo.coord);
      //console.log(getWeatherForecast(search));

      metric.addEventListener('click', async () => {
        if (!metric.classList.contains("active")) {
          metric.classList.toggle('active');
          imperial.classList.toggle('active');
        }
        let unit = 'metric';
        let symbol = '&#8451;';
        let weatherInfo = await weatherData(search, unit);
        document.querySelector('.weather__wrapper').remove();
        renderWeather(weatherInfo, data, symbol);
      });

      imperial.addEventListener('click', async () => {
        if (!imperial.classList.contains("active")) {
          metric.classList.toggle('active');
          imperial.classList.toggle('active');
        }
        let unit = 'imperial';
        let symbol = '&#8457';
        let weatherInfo = await weatherData(search, unit);
        document.querySelector('.weather__wrapper').remove();
        renderWeather(weatherInfo, data, symbol);
      });

  } catch (e) {
    // console.log(e);
  }
}

create();

export default create;

let refresh = document.querySelector('.page__refresh');

  refresh.addEventListener('click', () => {
    location.reload();
    document.location.search = '';
  });

  let metric = document.querySelector('.page__weather--metric');
  let imperial = document.querySelector('.page__weather--imperial');

  console.log(weatherInfo);

