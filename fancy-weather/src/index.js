import './style.css';
import '@babel/polyfill';
let language = import('./assets/language.json').then(({default: language}) => language);
import { renderForecastInfo, renderStatic, renderWeather} from './js/dom/dom';
import init from './js/map/map';
import {getTime, translate } from './js/utilities/utilities';
import { getUserLocation, getCountryName } from './js/location/location';
import { getWeatherForecast, weatherData} from './js/weather/weather';
import getImage from './js/background/background';
//import someFunc from './js/search/search';
//import getLanguage from './js/language/language';

let weatherInfo;
let search;


async function create() {
  try {
    let unit;
    let { ru, en, by } = await language;
    let lang = en;

    let { city } = await getUserLocation();

    if (document.location.search === '') {
      search = city;
    } else {
      search = document.location.search.slice(8);
    }


  if (metric.classList.contains("active")) {
    unit = 'metric';
  } else {
    unit = 'imperial';
  }

    weatherInfo = await weatherData(search, unit, lang);

  const timezone = weatherInfo.timezone;



  let wrapper = document.querySelector('.page__wrapper');
  if (link !== 'undefined') {
    wrapper.style.setProperty('--link', `url(${link})`);
  }
  let {urls} = await getImage(weatherInfo.description);
  let link = urls.regular;
  wrapper.style.setProperty('--link', `url(${link})`);



    const data = await getTime(timezone, weatherInfo.nextDays);


    renderForecastInfo(data, weatherInfo, lang);

      init(weatherInfo.coord);


    selectLang.addEventListener('change', async (event) => {
      let weatherInfo;
      if (event.target.value === 'ru') {
        lang = ru;
        weatherInfo = await weatherData(search, unit, event.target.value);
        let transl = await translate(`${weatherInfo.name} ${weatherInfo.countryName}`, 'en-ru');
        let { text } = transl;
        text = text[0];
        text = text.split(" ");
        weatherInfo.name = text[0]
        weatherInfo.countryName = text[1];
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
        if (!metric.classList.contains("active")) {
          metric.classList.toggle('active');
          imperial.classList.toggle('active');
        }
        let unit = 'metric';
        let weatherInfo = await weatherData(search, unit);
        document.querySelector('.weather__wrapper').remove();
        renderWeather(data, weatherInfo, lang);
      });

      imperial.addEventListener('click', async () => {
        if (!imperial.classList.contains("active")) {
          metric.classList.toggle('active');
          imperial.classList.toggle('active');
        }
        let unit = 'imperial';
        let weatherInfo = await weatherData(search, unit);
        document.querySelector('.weather__wrapper').remove();
        renderWeather(data, weatherInfo, lang);
      });

  } catch (e) {
    console.log(e);
  }
}

create();

export default create;

let refresh = document.querySelector('.control__refresh');

  refresh.addEventListener('click', () => {
    location.reload();
    document.location.search = '';
  });

  const metric = document.querySelector('.control__unit--metric');
  const imperial = document.querySelector('.control__unit--imperial');
  const selectLang = document.querySelector('.control__select-lang');



