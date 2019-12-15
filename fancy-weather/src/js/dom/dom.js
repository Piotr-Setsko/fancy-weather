let wrapper;
//import image from './assets/Vector.svg';

function renderStatic() {
  const markup =
  `<div class="page__wrapper">
    <div class="page__control">
      <div class="page__buttons">
        <button class="control__refresh button"><img class="control__refresh--img" src='assets/images/Vector.svg'></button>
        <div class="control__select-wrapper">
        <select class="control__select-lang button">
          <option class="control__option-lang control__option-lang--en">en</option>
          <option class="control__option-lang control__option-lang--ru">ru</option>
          <option class="control__option-lang control__option-lang--by">by</option>
        </select>
      </div>
      <button class="control__unit control__unit--imperial button">&deg;F</button>
      <button class="control__unit control__unit--metric button active">&deg;C</button>
    </div>
    <div class="page__search">
      <form class="search__form">
        <input id="search" class="search__input" type="text" name="search" placeholder="Search sity or ZIP" pattern="^[a-zA-Zа-яёА-ЯЁ]+$">
        <input id="btn" class="search__button button" type="submit" value="search">
      </form>
    </div>
  </div>
  <div class="page__weather">
  </div>`

  document.body.innerHTML = markup;
  wrapper = document.querySelector('.page__weather');
}

renderStatic();

function renderForecastInfo(city, countryName, data, temp, icon, description, feels, speed, humidity, coord) {
  const markup =
    `
    <div class="weather__wrapper">
      <p class="weather-today__location">${city}, ${countryName}</p>
      <p class="weather-today__fulltime"><span class="weather-today__date">${data.week} ${data.day} ${data.year}</span> <span class="weather-today__time">${data.time}</p>
      <div class="weather-today__main-block">
      <div class="weather-today__section">
      <p class="weather-today__temperature">${Math.round(temp)}</p>
      <img class="weather-today__picture" src="http://openweathermap.org/img/wn/${icon}@2x.png">
      </div>
      <ul class="weather-today__description">
        <li>${description}</li>
        <li>feels like: ${Math.round(feels)}&deg;</li>
        <li>wind: ${Math.round(speed)} m/s</li>
        <li>humidity: ${humidity}%</li>
      </ul>
      </div>
      <div class="weather-today__future">
      <ul>
      <li></li>
      <li></li>
      <li></li>
      </ul>
      </div>
    </div>
    <div class="weather__map">
      <div id="map"></div>
      <p class="weather-today__city">Latitude: ${Math.trunc(coord.lat)}&#176;${Math.trunc((coord.lat - Math.trunc(coord.lat)) * 100)}&#8242;</p>
      <p class="weather-today__city">Longitude: ${Math.trunc(coord.lon)}&#176;${Math.trunc((coord.lon - Math.trunc(coord.lon)) * 100)}&#8242;</p>
    </div>
   `;

  wrapper.insertAdjacentHTML('beforeend', markup);
}

function renderWeather(weatherInfo, data, symbol, language) {
  const markup =
    `<div class="weather__wrapper">
      <p class="weather-today__city">${weatherInfo.name}, ${weatherInfo.countryName}</p>
      <p class="weather-today__city">${data.week} ${data.day} ${data.year} ${data.time}</p>
      <p class="weather-today__city">${Math.round(weatherInfo.temp)}${symbol}<img src="http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png"></p>
      <ul class="weather-today__city">
        <li>${weatherInfo.description}</li>
        <li>${language[0]}: ${Math.round(weatherInfo.feels)}${symbol}</li>
        <li>${language[1]}: ${Math.round(weatherInfo.speed)} m/s</li>
        <li>${language[2]}: ${weatherInfo.humidity}%</li>
      </ul>
    </div>`
    let form = document.querySelector('.search__form');
    form.insertAdjacentHTML('beforeend', markup);
}

export { renderForecastInfo, renderStatic, renderWeather};

