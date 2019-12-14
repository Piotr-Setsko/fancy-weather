import { getUserLocation, getCountryName } from '../location/location';

async function weatherData(search, unit) {
  const nextDays = {};
  const weatherInfo = {};

  const weatherData = await getWeatherForecast(search, unit);
  // console.log(weatherData);
    const { city } = weatherData;
    const { name, country, coord } = city;
    const { list } = weatherData;
    const { main, weather, wind } = list[0];
    const tempTomorrow = list[8].main.temp;
    const tempAftTom = list[16].main.temp;
    const tempAftAftTom = list[24].main.temp;
    nextDays[0] = list[8].dt_txt;
    nextDays[1] = list[16].dt_txt;
    nextDays[2] = list[24].dt_txt;

    const { feels_like, temp, humidity, pressure } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];

    const countryName = await getCountryName(country);
    //console.log(countryName);

    //getImage(description);
    //let {urls} = await getImage();
    //let link = urls.regular;
    //let link = 'https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';

    //renderStatic(link);
    //console.log(feels_like)

    weatherInfo.name = name;
    weatherInfo.countryName = countryName;
    weatherInfo.temp = temp;
    weatherInfo.icon = icon;
    weatherInfo.description = description;
    weatherInfo.feels = feels_like;
    weatherInfo.speed = speed;
    weatherInfo.humidity = humidity;
    weatherInfo.coord = coord;
    weatherInfo.nextDays = nextDays;

    //console.log(weatherInfo);

    return weatherInfo;
}

function getWeatherForecast(search, unit) {
  const WEATHER_API_TOKEN = '126d13202c34a940babbe01a1df00e7d';

  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=en&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => response.json());
  // .then(data => console.log(data));
}

export { getWeatherForecast, weatherData};


