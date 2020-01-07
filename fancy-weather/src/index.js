import './style.css';
import '@babel/polyfill';
import { renderForecastInfo } from './js/dom/dom';
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
    if (sessionStorage.lang === undefined || sessionStorage.lang === 'en') {
      lang = en;
      langLetter = 'en';
    } else {
      document.children[0].lang = sessionStorage.lang;
      if (sessionStorage.lang === 'ru') {
        lang = ru;
        langLetter = 'ru';
      } else {
        lang = be;
        langLetter = 'be';
      }
    }

    if (sessionStorage.lang === '' || sessionStorage.lang === undefined) {
      sessionStorage.lang = 'en';
    }
    document.querySelector('.control__select-lang').value = sessionStorage.lang;

    const { city } = await getUserLocation();

    if (document.location.search === '') {
      search = city;
    } else {
      search = document.location.search.slice(8);
    }

    if (sessionStorage.temp === 'imper') {
      unit = 'imperial';
      imperial.classList.add('active');
      metric.classList.remove('active');
    } else {
      unit = 'metric';
      metric.classList.add('active');
      imperial.classList.remove('active');
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
        wrapper.style.setProperty('--link', 'url("https://images.unsplash.com/photo-1554417063-60e738613596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")'),
      );

    let data = await getTime(timezone, weatherInfo.nextDays);

    if (sessionStorage.lang === 'ru') {
      const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}`, 'en-ru');
      let { text } = transl;
      [text] = text;
      const textStr = text.split(',');
      [weatherInfo.name, weatherInfo.countryName] = textStr;
    } else if (sessionStorage.lang === 'be') {
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
        sessionStorage.setItem('lang', 'ru');
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
        sessionStorage.setItem('lang', 'be');
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
        sessionStorage.setItem('lang', 'en');
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
      sessionStorage.setItem('temp', 'metric');
      weatherInfo = await weatherData(search, unit);
      document.querySelector('.weather-today__temperature').innerHTML = `${Math.round(weatherInfo.temp)}<span>&deg;</span>`;
      for (let i = 0; i < 3; i += 1) {
        document.querySelectorAll('.weather-future__temp')[i].innerHTML = `${Math.round(weatherInfo.tempTomorrow[i])}<span>&deg;</span>`;
      }
    });

    imperial.addEventListener('click', async () => {
      if (!imperial.classList.contains('active')) {
        metric.classList.toggle('active');
        imperial.classList.toggle('active');
      }
      sessionStorage.setItem('temp', 'imper');
      unit = 'imperial';
      weatherInfo = await weatherData(search, unit);
      document.querySelector('.weather-today__temperature').innerHTML = `${Math.round(weatherInfo.temp)}<span>&deg;</span>`;
      for (let i = 0; i < 3; i += 1) {
        document.querySelectorAll('.weather-future__temp')[i].innerHTML = `${Math.round(weatherInfo.tempTomorrow[i])}<span>&deg;</span>`;
      }
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
});
