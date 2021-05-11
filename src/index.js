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

    getImage(weatherInfo.description);

    let data = await getTime(timezone, weatherInfo.nextDays);

    weatherInfo.countryName = await translateCountryName(weatherInfo.countryName);

    renderForecastInfo(data, weatherInfo, lang);
    init(weatherInfo.coord);

}

create();

export default create;
