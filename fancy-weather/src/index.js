import './style.css';
import '@babel/polyfill';
import { renderForecastInfo, renderWeather } from './js/dom/dom';
import init from './js/map/map';
import { getTime, translate } from './js/utilities/utilities';
import { getUserLocation } from './js/location/location';
import { weatherData } from './js/weather/weather';
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
    let lang;
    let langLetter;
    const { ru, en, be } = await language;
    if (localStorage.lang === undefined || localStorage.lang === 'en') {
      lang = en;
      langLetter = 'en';
    } else {
      document.children[0].lang = localStorage.lang;
      if (localStorage.lang === 'ru') {
        lang = ru;
        langLetter = 'ru';
      } else {
        lang = be;
        langLetter = 'be';
      }
    }

    document.querySelector('.control__select-lang').value = localStorage.lang;

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

    weatherInfo = await weatherData(search, unit, langLetter);

    const { timezone } = weatherInfo;

    const wrapper = document.querySelector('.page__wrapper');

    getImage(weatherInfo.description)
      .then((data) => {
        if (data !== undefined) {
          const link = data.urls.regular;
          wrapper.style.setProperty('--link', `url(${link})`);
        }
      })
      .catch(
        wrapper.style.setProperty('--link', 'url("https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")'),
      );

    let data = await getTime(timezone, weatherInfo.nextDays);

    if (localStorage.lang === 'ru') {
      const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}`, 'en-ru');
      let { text } = transl;
      [text] = text;
      const textStr = text.split(',');
      [weatherInfo.name, weatherInfo.countryName] = textStr;
    } else if (localStorage.lang === 'be') {
      const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}, ${weatherInfo.description}`, 'en-be');
      let { text } = transl;
      [text] = text;
      const textStr = text.split(',');
      [weatherInfo.name, weatherInfo.countryName, weatherInfo.description] = textStr;
    }

    renderForecastInfo(data, weatherInfo, lang);

    init(weatherInfo.coord);


    selectLang.addEventListener('change', async (event) => {
      if (event.target.value === 'ru') {
        localStorage.setItem('lang', 'ru');
        lang = ru;
        document.children[0].lang = 'ru';

        weatherInfo = await weatherData(search, unit, event.target.value);

        const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}`, 'en-ru');
        let { text } = transl;
        [text] = text;
        const textStr = text.split(',');
        [weatherInfo.name, weatherInfo.countryName] = textStr;

        data = await getTime(timezone, weatherInfo.nextDays);
      } else if (event.target.value === 'be') {
        localStorage.setItem('lang', 'be');
        lang = be;
        document.children[0].lang = 'be';

        weatherInfo = await weatherData(search, unit, event.target.value);
        data = await getTime(timezone, weatherInfo.nextDays);

        const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}, ${weatherInfo.description}`, 'en-be');
        let { text } = transl;
        [text] = text;
        const textStr = text.split(',');
        [weatherInfo.name, weatherInfo.countryName, weatherInfo.description] = textStr;
      } else {
        localStorage.setItem('lang', 'en');
        lang = en;
        document.children[0].lang = 'en';

        weatherInfo = await weatherData(search, unit, event.target.value);
        data = await getTime(timezone, weatherInfo.nextDays);
      }

      document.querySelector('.weather__wrapper').remove();
      document.querySelector('.location__map').remove();
      renderForecastInfo(data, weatherInfo, lang);
      init(weatherInfo.coord);
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
