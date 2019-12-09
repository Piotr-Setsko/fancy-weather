const links = 'https://images.unsplash.com/photo-1518770035226-b1c4f19dec60';
const wrapper = document.querySelector('.page__wrapper');

function renderForecastInfo(city, countryName, data, temp, icon, description, feels, speed, humidity, coord) {
  const markup = `<div class="weather__wrapper"><p class="weather-today__city">${city}, ${countryName}</p>
  <p class="weather-today__city">${data.week} ${data.day} ${data.year} ${data.time}</p>
  <p class="weather-today__city">${Math.round(temp)}&#8451;<img src="http://openweathermap.org/img/wn/${icon}@2x.png"  style="margin-bottom: -40px;"></p><ul class="weather-today__city"><li>${description}</li>
  <li>feels like: ${feels}&#8451;</li><li>wind: ${Math.round(speed)}м/с</li><li>humidity: ${humidity}%</li></ul></div>
  <div class="weather__map">
<div id="map"></div>
<p class="weather-today__city">Latitude: ${Math.trunc(coord.lat)}&#176;${Math.trunc((coord.lat - Math.trunc(coord.lat)) * 100)}&#8242;</p>
<p class="weather-today__city">Longitude: ${Math.trunc(coord.lon)}&#176;${Math.trunc((coord.lon - Math.trunc(coord.lon)) * 100)}&#8242;</p>
</div>`;

  wrapper.innerHTML = markup;
  wrapper.style.setProperty('--link', `url(${links})`);
}

export default renderForecastInfo;
