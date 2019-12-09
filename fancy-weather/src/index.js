import "./style.css";
import '@babel/polyfill';

async function getUserLocation () {
  const LOCATION_API_TOKEN = 'b319f7092b2b9b';

  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then(response => {return response.json()});
}

async function getWeatherForecast (city) {
  const WEATHER_API_TOKEN = '126d13202c34a940babbe01a1df00e7d';

  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&lang=en&units=metric&APPID=${WEATHER_API_TOKEN}`)
    .then(response => {return response.json()});
    //.then(data => console.log(data));
}

function  translate () {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  //https://cors-anywhere.herokuapp.com/
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=настроение&lang=ru-be`)
    .then(response => response.json())
    .then(data => console.log(data));
}

translate ();

async function getImage () {
  const IMAGE_API_TOKEN = 'b192701d2a4184a7958908b3962286b23edadd136a9165dcb78244425d039231';

  return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=minsk-city&client_id=${IMAGE_API_TOKEN}`)
    .then(response =>  response.json())
    .then(data => console.log(data.links.html));
    //console.log(dataImage);
}

//getImage ();

let links = 'https://images.unsplash.com/photo-1518770035226-b1c4f19dec60';
let wrapper = document.querySelector('.page__wrapper');


async function getCountryName(country) {
  return fetch('https://cors-anywhere.herokuapp.com/http://country.io/names.json')
  .then(response => response.json())
  .then(data => {return data[`${country}`]});
}

async function create() {
  try {
    let nextDays = {};

    let { city, timezone } = await getUserLocation();
    //console.log(getUserLocation());
    console.log(getWeatherForecast(city));

    let weatherData = await getWeatherForecast(city);
    ({ city} = weatherData);
    let {name, country, coord} = city;
    let {list} =  weatherData;
    let { main, weather, wind} = list[0];
    let tempTomorrow = list[8].main.temp;
    let tempAftTom = list[16].main.temp;
    let tempAftAftTom = list[24].main.temp;
    nextDays[0] = list[8].dt_txt;
    nextDays[1] = list[16].dt_txt;
    nextDays[2] = list[24].dt_txt;
    //console.log(tommorow);
    let {temp, humidity, pressure} = main;
    let {speed} = wind;
    let {description, icon} = weather[0];
    let feels = effectTemp(temp, pressure, speed);

    const countryName = await getCountryName(country);

    const data = await getTime(timezone, nextDays);

    renderForecastInfo(name, countryName, data, temp, icon, description, feels, speed, humidity, coord);

    init(coord);

  } catch (e) {
    console.log(e);
  }
}

create();



function renderForecastInfo(city, countryName, data, temp, icon, description, feels, speed, humidity, coord) {
  const markup = `<div class="weather__wrapper"><p class="weather-today__city">${city}, ${countryName}</p>
  <p class="weather-today__city">${data.week} ${data.day} ${data.year} ${data.time}</p>
  <p class="weather-today__city">${Math.round(temp)}&#8451;<img src="http://openweathermap.org/img/wn/${icon}@2x.png"  style="margin-bottom: -40px;"></p><ul class="weather-today__city"><li>${description}</li>
  <li>feels like: ${feels}&#8451;</li><li>wind: ${Math.round(speed)}м/с</li><li>humidity: ${humidity}%</li></ul></div>
  <div class="weather__map">
<div id="map"></div>
<p class="weather-today__city">Latitude: ${Math.trunc(coord.lat)}&#176;${Math.trunc((coord.lat - Math.trunc(coord.lat)) * 100)}&#8242;</p>
<p class="weather-today__city">Longitude: ${Math.trunc(coord.lon)}&#176;${Math.trunc((coord.lon - Math.trunc(coord.lon)) * 100)}&#8242;</p>
</div>`

    wrapper.innerHTML = markup;
    wrapper.style.setProperty('--link', `url(${links})`);
}

async function getTime (timeZone, nextDays) {
  let localDate = {};
  const date = new Date();
  const optionsTime = {hour12: false, hour: "numeric", minute: "numeric", timeZone: `${timeZone}`}
  localDate.week = date.toLocaleString('en', {weekday: 'short'});
  localDate.day = date.toLocaleString('en', {day: 'numeric'});
  localDate.year = date.toLocaleString('en', {month: 'long'});
  localDate.time = date.toLocaleString('en', optionsTime);

  localDate.tom = new Date(`${nextDays[1]}`).toLocaleString('en', {weekday: 'long'});

  return localDate;
}

function effectTemp(T, P, v) {
 let result = Math.round(-2.7 + 1.04 * T + (2.0 * P) / 1000 - 0.65 * v);
 return result;
}

var myMap;

// Дождёмся загрузки API и готовности DOM.
//ymaps.ready(init);

async function init(coord) {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [`${coord.lat}`, `${coord.lon}`], // Москва
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
}