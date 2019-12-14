let wrapper;
//import init from '../map/map';

function renderStatic() {
  const markup =
  `<div class="page__wrapper">
    <button class="page__refresh">&#8635;</button>
    <select>
      <option>en</option>
      <option>ru</option>
      <option>by</option>
    </select>
    <button class="page__weather page__weather--imperial">&#8457;</button>
    <button class="page__weather page__weather--metric active">&#8451;</button>
    <form>
      <input id="search" type="text" name="search" placeholder="Search sity or ZIP">
      <input id="btn" type="submit" value="search">
    </form>
  </div>`

  document.body.innerHTML = markup;
  wrapper = document.querySelector('.page__wrapper');
}

renderStatic();

function renderForecastInfo(city, countryName, data, temp, icon, description, feels, speed, humidity, coord) {
  const markup =
    `<div class="weather__wrapper">
      <p class="weather-today__city">${city}, ${countryName}</p>
      <p class="weather-today__city">${data.week} ${data.day} ${data.year} ${data.time}</p>
      <p class="weather-today__city">${Math.round(temp)}&#8451;<img src="http://openweathermap.org/img/wn/${icon}@2x.png"></p>
      <ul class="weather-today__city">
        <li>${description}</li>
        <li>feels like: ${feels}&#8451;</li>
        <li>wind: ${Math.round(speed)}m/s</li>
        <li>humidity: ${humidity}%</li>
      </ul>
    </div>
    <div class="weather__map">
      <div id="map"></div>
      <p class="weather-today__city">Latitude: ${Math.trunc(coord.lat)}&#176;${Math.trunc((coord.lat - Math.trunc(coord.lat)) * 100)}&#8242;</p>
      <p class="weather-today__city">Longitude: ${Math.trunc(coord.lon)}&#176;${Math.trunc((coord.lon - Math.trunc(coord.lon)) * 100)}&#8242;</p>
    </div>`;
    /*
  console.log(link);
    if (link !== 'undefined') {
      wrapper.style.setProperty('--link', `url(${link})`);
    }
    */
  wrapper.insertAdjacentHTML('beforeend', markup);
}

function renderWeather(weatherInfo, data, symbol) {
  const markup =
    `<div class="weather__wrapper">
      <p class="weather-today__city">${weatherInfo.name}, ${weatherInfo.countryName}</p>
      <p class="weather-today__city">${data.week} ${data.day} ${data.year} ${data.time}</p>
      <p class="weather-today__city">${Math.round(weatherInfo.temp)}${symbol}<img src="http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png"></p>
      <ul class="weather-today__city">
        <li>${weatherInfo.description}</li>
        <li>feels like: ${weatherInfo.feels}${symbol}</li>
        <li>wind: ${Math.round(weatherInfo.speed)}m/s</li>
        <li>humidity: ${weatherInfo.humidity}%</li>
      </ul>
    </div>`
    let form = document.getElementsByTagName('form')[0];
    form.insertAdjacentHTML('beforeend', markup);
}

export { renderForecastInfo, renderStatic, renderWeather};

