import './css/style.css';
import '@babel/polyfill';
import { renderForecastInfo } from './js/dom/dom';
import init from './js/map/map';
import { getTime } from './js/date/date';
import { checkLang, translateCountryName } from './js/translate/translate';
import { weatherData, unitCheck } from './js/weather/weather';
import { getImage } from './js/background/background';
import { searchCity } from './js/search/search';
import './js/eventListeners/eventListeners';

const create = async () => {
    let unit = unitCheck();
    const search = await searchCity();
    let { lang, langLetter } = await checkLang();

    let weatherInfo = await weatherData(search, unit, langLetter);

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

    renderForecastInfo(data, weatherInfo, lang);
    init(weatherInfo.coord);

}

create();

export default create;
