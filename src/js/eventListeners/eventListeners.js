import {searchCity} from '../search/search';
import create from '../../index';
import { weatherData, unitCheck } from '../weather/weather';
import { translateCountryName } from '../translate/translate';
import { getTime } from '../date/date';
import { renderForecastInfo } from '../dom/dom';
import init from '../map/map';

const refresh = document.querySelector('.control__refresh');
const btn = document.getElementById('btn');
const metric = document.querySelector('.control__unit--metric');
const imperial = document.querySelector('.control__unit--imperial');
const unitToggle = document.querySelector('.control__select-unit');
const selectLang = document.querySelector('.control__select-lang');

const language = import('../../assets/language.json').then(({ default: lang }) => lang);


refresh.addEventListener('click', () => {
  window.location.reload();
});

window.addEventListener('unload', () => {
  btn.addEventListener('click', async () => {
    const search = await searchCity();
    create(search);
  });
});

unitToggle.addEventListener('click', async () => {
  let unit = unitCheck();
  const search = await searchCity();

  metric.classList.toggle('active');
  imperial.classList.toggle('active');

  if (!metric.classList.contains('active')) {
    sessionStorage.setItem('temp', 'imper');
    unit = 'imperial';
  } else {
    unit = 'metric';
    sessionStorage.setItem('temp', 'metric');
  }

  let weatherInfo = await weatherData(search, unit);
  document.querySelector('.weather-today__temperature').innerHTML = `${Math.round(weatherInfo.temp)}<span>&deg;</span>`;
  for (let i = 0; i < 3; i += 1) {
    document.querySelectorAll('.weather-future__temp')[i].innerHTML = `${Math.round(weatherInfo.tempTomorrow[i])}<span>&deg;</span>`;
  }
});

selectLang.addEventListener('change', async (event) => {
  const { ru, en } = await language;
  let lang, data;
  let weatherInfo;
  let unit = unitCheck();
  const search = await searchCity();

  if (event.target.value === 'ru') {
    sessionStorage.setItem('lang', 'ru');
    lang = ru;
    document.children[0].lang = 'ru';

    weatherInfo = await weatherData(search, unit, event.target.value);
    weatherInfo.countryName = await translateCountryName(weatherInfo.countryName);

  } else {
    sessionStorage.setItem('lang', 'en');
    lang = en;
    document.children[0].lang = 'en';

    weatherInfo = await weatherData(search, unit, event.target.value);
  }

    const { timezone } = weatherInfo;
    data = await getTime(timezone, weatherInfo.nextDays);

    document.querySelector('.weather__wrapper').remove();
    document.querySelector('.location__map').remove();

    renderForecastInfo(data, weatherInfo, lang);
    init(weatherInfo.coord);
  });