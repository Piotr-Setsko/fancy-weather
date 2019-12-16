import './style.css';
import '@babel/polyfill';
import { renderForecastInfo, renderStatic, renderWeather } from './js/dom/dom';
import init from './js/map/map';
import { getTime, translate } from './js/utilities/utilities';
import { getUserLocation, getCountryName } from './js/location/location';
import { getWeatherForecast, weatherData } from './js/weather/weather';
import getImage from './js/background/background';

const language = import('./assets/language.json').then(({ default: lang }) => lang);

const metric = document.querySelector('.control__unit--metric');
const imperial = document.querySelector('.control__unit--imperial');
const selectLang = document.querySelector('.control__select-lang');

let weatherInfo;
let search;

async function create() {
  try {
    let unit;
    const { ru, en, by } = await language;
    let lang = en;

    const { city } = await getUserLocation();

    if (document.location.search === '') {
      search = city;
    } else {
      search = document.location.search.slice(8);
    }

    if (metric.classList.contains('active')) {
      unit = 'metric';
    } else {
      unit = 'imperial';
    }

    weatherInfo = await weatherData(search, unit, lang);

    const { timezone } = weatherInfo;

    const wrapper = document.querySelector('.page__wrapper');
    //console.log(getImage(weatherInfo.description));

    getImage(weatherInfo.description).then(
      result => {
        const { urls } = getImage(weatherInfo.description);
        const link = urls.regular;
        console.log(link);
        wrapper.style.setProperty('--link', `url(${link})`);
        console.log('hello');
      },
      error => {
        console.log('no image');
      }
    );
    /*
    const { urls } = await getImage(weatherInfo.description);

    const link = urls.regular;
    if (link !== 'undefined') {
      wrapper.style.setProperty('--link', `url(${link})`);
    }
    */
    const data = await getTime(timezone, weatherInfo.nextDays);


    renderForecastInfo(data, weatherInfo, lang);

    init(weatherInfo.coord);


    selectLang.addEventListener('change', async (event) => {
      // let weatherInfo;
      if (event.target.value === 'ru') {
        lang = ru;
        weatherInfo = await weatherData(search, unit, event.target.value);
        const transl = await translate(`${weatherInfo.name} ${weatherInfo.countryName}`, 'en-ru');
        let { text } = transl;
        [text] = text;
        text = text.split(' ');
        [weatherInfo.name, weatherInfo.countryName] = text;
      } else if (event.target.value === 'by') {
        lang = by;
        weatherInfo = await weatherData(search, unit, event.target.value);
      } else {
        lang = en;
        weatherInfo = await weatherData(search, unit, event.target.value);
      }

      document.querySelector('.weather__wrapper').remove();
      renderWeather(data, weatherInfo, lang);
    });

    metric.addEventListener('click', async () => {
      if (!metric.classList.contains('active')) {
        metric.classList.toggle('active');
        imperial.classList.toggle('active');
      }
      unit = 'metric';
      weatherInfo = await weatherData(search, unit);
      document.querySelector('.weather__wrapper').remove();
      renderWeather(data, weatherInfo, lang);
    });

    imperial.addEventListener('click', async () => {
      if (!imperial.classList.contains('active')) {
        metric.classList.toggle('active');
        imperial.classList.toggle('active');
      }
      unit = 'imperial';
      weatherInfo = await weatherData(search, unit);
      document.querySelector('.weather__wrapper').remove();
      renderWeather(data, weatherInfo, lang);
    });
  } catch (e) {
    // console.log(e);
  }
}

create();

export default create;

const refresh = document.querySelector('.control__refresh');

refresh.addEventListener('click', () => {
  window.location.reload();
  document.location.search = '';
});
