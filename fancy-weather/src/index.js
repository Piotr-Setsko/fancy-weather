import './style.css';
import '@babel/polyfill';
let language = import('./assets/language.json').then(({default: language}) => language);
import { renderForecastInfo, renderStatic, renderWeather} from './js/dom/dom';
import init from './js/map/map';
import { getTime, translate } from './js/utilities/utilities';
import { getUserLocation, getCountryName } from './js/location/location';
import { getWeatherForecast, weatherData} from './js/weather/weather';
import getImage from './js/background/background';
import someFunc from './js/search/search';
import getLanguage from './js/language/language';

let weatherInfo;
let search;


async function create() {
  try {
    const nextDays = {};

    let { city, timezone} = await getUserLocation();



    if (document.location.search === '') {
      search = city;
    } else {
      search = document.location.search.slice(8);
    }


  let unit;
  let symbol;

  if (metric.classList.contains("active")) {
    unit = 'metric';
    symbol = '&#8451;';
  } else {
    unit = 'imperial';
    symbol = '&#8457';
  }

  let { ru, en, by } = await language;
  let lang = en;

    weatherInfo = await weatherData(search, unit, lang);
  //console.log(weatherInfo);
  timezone = weatherInfo.timezone;
console.log(timezone);


    //let {urls} = await getImage(weatherInfo.description);
      //let link = urls.regular;
  //console.log(link);
  let wrapper = document.querySelector('.page__wrapper');
  //wrapper.style.setProperty('--link', `url(${link})`);
    //console.log(feels_like)


    const data = await getTime(timezone, weatherInfo.nextDays);
    console.log(data);

    setInterval(() => function() {
      console.log('hello');
      const time = document.querySelector('.weather-today___time');
      const date = document.querySelector('.weather-today___date');
      document.querySelector('.weather__wrapper').remove();
      const data = getTime(timezone, weatherInfo.nextDays);
      renderForecastInfo(weatherInfo.name, weatherInfo.countryName, data, weatherInfo.temp, weatherInfo.icon, weatherInfo.description, weatherInfo.feels, weatherInfo.speed, weatherInfo.humidity, weatherInfo.coord);
      //time.after(date);
    }, 2000);

    renderForecastInfo(weatherInfo.name, weatherInfo.countryName, data, weatherInfo.temp, weatherInfo.icon, weatherInfo.description, weatherInfo.feels, weatherInfo.speed, weatherInfo.humidity, weatherInfo.coord);

      init(weatherInfo.coord);
      //console.log(getWeatherForecast(search));


    selectLang.addEventListener('change', async (event) => {
      let weatherInfo;
      if (event.target.value === 'ru') {
        lang = ru;
        weatherInfo = await weatherData(search, unit, event.target.value);
       // console.log(ru);
      } else if (event.target.value === 'by') {
        lang = by;
        //translate(weatherInfo.name, weatherInfo.countryName)
        event.target.value = 'ru';
        weatherInfo = await weatherData(search, unit, event.target.value);
        //getLanguage
      } else {
        lang = en;
        weatherInfo = await weatherData(search, unit, event.target.value);
      }
      document.querySelector('.weather__wrapper').remove();
      renderWeather(weatherInfo, data, symbol, lang);
    });

      metric.addEventListener('click', async () => {
        if (!metric.classList.contains("active")) {
          metric.classList.toggle('active');
          imperial.classList.toggle('active');
        }
        let unit = 'metric';
        let symbol = '&#8451;';
        let weatherInfo = await weatherData(search, unit);
        document.querySelector('.weather__wrapper').remove();
        renderWeather(weatherInfo, data, symbol, lang);
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
        renderWeather(weatherInfo, data, symbol, lang);
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

  const metric = document.querySelector('.page__weather--metric');
  const imperial = document.querySelector('.page__weather--imperial');
  const selectLang = document.querySelector('.page__select-lang');

  //console.log(weatherInfo);

