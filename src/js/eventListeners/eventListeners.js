import {searchCity} from '../search/search';
import create from '../../index';
import { weatherData, unitCheck } from '../weather/weather';

let unit = unitCheck();

const metric = document.querySelector('.control__unit--metric');
const imperial = document.querySelector('.control__unit--imperial');

const unitToggle = document.querySelector('.page__buttons');

const refresh = document.querySelector('.control__refresh');
const btn = document.getElementById('btn');

refresh.addEventListener('click', () => {
  window.location.reload();
});

window.addEventListener('unload', () => {
  btn.addEventListener('click', async () => {
    const search = await searchCity();
    create(search);
  });
});

unitToggle.addEventListener('click', async (e) => {
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