async function getWeatherForecast(city) {
  const WEATHER_API_TOKEN = '126d13202c34a940babbe01a1df00e7d';

  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&lang=en&units=metric&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => response.json());
  // .then(data => console.log(data));
}

export default getWeatherForecast;
