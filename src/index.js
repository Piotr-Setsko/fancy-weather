import './css/style.css';
import '@babel/polyfill';
import init from './js/map/map';
import { renderForecastInfo } from './js/dom/dom';
import getTime from './js/date/date';
import { checkLang, translateCountryName } from './js/translate/translate';
import weatherData from './js/weather/weather';
import { unitCheck, loadTime } from './js/utilities/utilities';
import getBackgroundImage from './js/background/background';
import searchCity from './js/search/search';
import './js/eventListeners/eventListeners';

const create = async () => {
  const unit = unitCheck();
  const search = await searchCity();
  const { lang, langLetter } = await checkLang();
  const weatherInfo = await weatherData(search, unit, langLetter);
  const { timezone } = weatherInfo;
  loadTime(timezone);
  getBackgroundImage(weatherInfo.description);

  const data = await getTime(timezone, weatherInfo.nextDays);

  weatherInfo.countryName = await translateCountryName(weatherInfo.countryName);

  renderForecastInfo(data, weatherInfo, lang);
  init(weatherInfo.coord);
};

create();

export default create;
