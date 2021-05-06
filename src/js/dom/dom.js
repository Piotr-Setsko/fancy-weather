let wrapper;

const renderStatic = () => {
  const markup = `<div class="page__wrapper">
    <div class="page__control">
      <div class="page__buttons">
        <button class="control__refresh button"><img class="control__refresh--img" src='assets/images/Vector.svg'></button>
        <div class="control__select-wrapper">
        <select class="control__select-lang button">
          <option class="control__option-lang control__option-lang--en">en</option>
          <option class="control__option-lang control__option-lang--ru">ru</option>
          <option class="control__option-lang control__option-lang--by">be</option>
        </select>
      </div>
      <button class="control__unit control__unit--imperial button">&deg;F</button>
      <button class="control__unit control__unit--metric button active">&deg;C</button>
    </div>
    <div class="page__search">
      <form class="search__form">
        <input id="search" class="search__input" type="text" name="search" placeholder="Search city or ZIP" pattern="^[a-zA-Zа-яёА-ЯЁ]+$|^[0-9]+$|^S+$">
        <input id="btn" class="search__button button" type="submit" value="Search">
      </form>
    </div>
  </div>
  <div class="page__weather">
  </div>`;

  document.body.innerHTML = markup;
  wrapper = document.querySelector('.page__weather');
}

renderStatic();

const renderWeather = (data, weatherInfo, language) => {
  const markup = `<div class="weather__wrapper">
    <p class="weather-today__location">${weatherInfo.name}, ${weatherInfo.countryName}</p>
    <p class="weather-today__fulltime"><span class="weather-today__date">${data.week} ${data.day} ${data.year}</span> <span class="weather-today__time">${data.time}</span></p>
    <div class="weather-today__main-block">
      <div class="weather-today__section">
        <p class="weather-today__temperature">${Math.round(weatherInfo.temp)}<span>&deg;</span></p>
        <img class="weather-today__picture" src="http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png">
      </div>
      <ul class="weather-today__description">
        <li>${weatherInfo.description}</li>
        <li>${language[0]}: ${Math.round(weatherInfo.feels)}&deg;</li>
        <li>${language[1]}: ${Math.round(weatherInfo.speed)} m/s</li>
        <li>${language[2]}: ${weatherInfo.humidity}%</li>
      </ul>
    </div>
    <div class="weather-future__wrapper">
      <ul class="weather-future__list">
        <li>
          <p class="weather-future__day">${data.tom[0]}</p>
          <div class="weather-future__present">
          <p class="weather-future__temp">${Math.round(weatherInfo.tempTomorrow[0])}<span>&deg;</span></p><img class="weather-future__picture" src="http://openweathermap.org/img/wn/${weatherInfo.iconTomorrow[0]}@2x.png">
          </div>
        </li>
        <li>
          <p class="weather-future__day">${data.tom[1]}</p>
          <div class="weather-future__present">
          <p class="weather-future__temp">${Math.round(weatherInfo.tempTomorrow[1])}<span>&deg;</span></p>
          <img class="weather-future__picture" src="http://openweathermap.org/img/wn/${weatherInfo.iconTomorrow[1]}@2x.png">
          </div>
        </li>
        <li>
          <p class="weather-future__day">${data.tom[2]}</p>
          <div class="weather-future__present">
          <p class="weather-future__temp">${Math.round(weatherInfo.tempTomorrow[2])}<span>&deg;</span></p>
          <img class="weather-future__picture" src="http://openweathermap.org/img/wn/${weatherInfo.iconTomorrow[2]}@2x.png">
          </div>
        </li>
      </ul>
    </div>
  </div>`;

  wrapper.insertAdjacentHTML('afterbegin', markup);
}

const renderForecastInfo = (data, weatherInfo, language) => {
  renderWeather(data, weatherInfo, language);
  const markup = `<div class="location__map">
    <div id="map"></div>
    <div class="location__footer">
      <p class="location__coord">${language[3]}: ${Math.trunc(weatherInfo.coord.lat)}&#176;${Math.trunc((weatherInfo.coord.lat - Math.trunc(weatherInfo.coord.lat)) * 100)}&#8242;</p>
      <p class="location__coord">${language[4]}: ${Math.trunc(weatherInfo.coord.lon)}&#176;${Math.trunc((weatherInfo.coord.lon - Math.trunc(weatherInfo.coord.lon)) * 100)}&#8242;</p>
    </div>
  </div>`;

  wrapper.insertAdjacentHTML('beforeend', markup);
}

export { renderForecastInfo, renderStatic, renderWeather };
