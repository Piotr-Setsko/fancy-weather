import './css/style.css';
import '@babel/polyfill';
import { renderForecastInfo } from './js/dom/dom';
import init from './js/map/map';
import { getTime } from './js/utilities/utilities';
import { checkLang, translateCountryName } from './js/translate/translate';
import { weatherData, unitCheck } from './js/weather/weather';
import { getImage } from './js/background/background';
import { searchCity } from './js/search/search';
import './js/eventListeners/eventListeners';

import { setCORS } from "google-translate-api-browser";
const translate = setCORS("http://cors-anywhere.herokuapp.com/");

const language = import('./assets/language.json').then(({ default: lang }) => lang);

const selectLang = document.querySelector('.control__select-lang');

let weatherInfo;

const create = async () => {
  try {
    let unit = unitCheck();
    const search = await searchCity();
    //const { ru, en } = await language;

    let { lang, langLetter } = await checkLang();


/*
    if (sessionStorage.lang === undefined || sessionStorage.lang === 'en') {
      sessionStorage.lang = 'en';
      lang = en;
      langLetter = 'en';
    } else {
      document.children[0].lang = sessionStorage.lang;
        lang = ru;
        langLetter = 'ru';
    }
    */

    //document.querySelector('.control__select-lang').value = sessionStorage.lang;

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

    weatherInfo.countryName = await translateCountryName(weatherInfo.countryName);
/*
    if (sessionStorage.lang !== 'en') {
      const transl = await translate(`${weatherInfo.countryName}`, {from:'en', to: `${sessionStorage.lang}`});
      let { text } = transl;
      //const textStr = text.split(',');
      weatherInfo.countryName = text;
    }
   */
    renderForecastInfo(data, weatherInfo, lang);

    init(weatherInfo.coord);

    selectLang.addEventListener('change', async (event) => {
      const { ru, en } = await language;
      if (event.target.value === 'ru') {
        sessionStorage.setItem('lang', 'ru');
        lang = ru;
        document.children[0].lang = 'ru';

        weatherInfo = await weatherData(search, unit, event.target.value);

        const transl = await translate(`${weatherInfo.countryName}`, {from: 'en', to: 'ru'});
        console.log(transl);
        let { text } = transl;
        //const textStr = text.split(',');
        weatherInfo.countryName = text;

        data = await getTime(timezone, weatherInfo.nextDays);
      }
     /* else if (event.target.value === 'be') {
        sessionStorage.setItem('lang', 'be');
        lang = be;
        document.children[0].lang = 'be';

        weatherInfo = await weatherData(search, unit, event.target.value);
        data = await getTime(timezone, weatherInfo.nextDays);

        const transl = await translate(`${weatherInfo.name}, ${weatherInfo.countryName}, ${weatherInfo.description}`, {to: "be"});
        let { text } = transl;
        const textStr = text.split(',');
        [weatherInfo.name, weatherInfo.countryName, weatherInfo.description] = textStr;
      } */
      else {
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
  } catch (e) {
    // console.log(e);
  }
}

create();

export default create;
