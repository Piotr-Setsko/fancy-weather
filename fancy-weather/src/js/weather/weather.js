import { getUserLocation, getCountryName } from '../location/location';

async function weatherData(search, unit, lang) {
  const nextDays = {};
  const iconTomorrow = {};
  const tempTomorrow = {};
  const weatherInfo = {};
  //console.log(lang);
  const weatherData = await getWeatherForecast(search, unit, lang);
  // console.log(weatherData);
    const { city } = weatherData;
    const { name, country, coord, timezone } = city;
    const { list } = weatherData;
    const { main, weather, wind, sys } = list[0];
    const { pad } = sys;
    tempTomorrow[0] = list[8].main.temp;
    tempTomorrow[1] = list[16].main.temp;
    tempTomorrow[2] = list[24].main.temp;
    nextDays[0] = list[8].dt_txt;
    nextDays[1] = list[16].dt_txt;
    nextDays[2] = list[24].dt_txt;
    iconTomorrow[0] = list[8].weather[0].icon;
    iconTomorrow[1] = list[16].weather[0].icon;
    iconTomorrow[2] = list[24].weather[0].icon;
    console.log(list[8].weather[0].icon);

    const { feels_like, temp, humidity, pressure } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];

    const countryName = await getCountryName(country);
    console.log(tempTomorrow);


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
    weatherInfo.tempTomorrow = tempTomorrow;
    weatherInfo.iconTomorrow = iconTomorrow;
    weatherInfo.timezone = timezone;

    //console.log(weatherInfo);

    return weatherInfo;
}

function getWeatherForecast(search, unit, lang) {
  const WEATHER_API_TOKEN = '126d13202c34a940babbe01a1df00e7d';

  return fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${search}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_TOKEN}`)
    .then((response) => response.json());
  // .then(data => console.log(data));
}

export { getWeatherForecast, weatherData};


