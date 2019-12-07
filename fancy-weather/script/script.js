function getUserLocation () {
  const LOCATION_API_TOKEN = 'b319f7092b2b9b';

  fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

getUserLocation();


function  getWeatherForecast () {
  const WEATHER_API_TOKEN = '126d13202c34a940babbe01a1df00e7d';

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&lang=by&units=metric&APPID=${WEATHER_API_TOKEN}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

getWeatherForecast ();

function  translate () {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  //https://cors-anywhere.herokuapp.com/
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=настроение&lang=ru-be`)
    .then(response => response.json())
    .then(data => console.log(data));
}

translate ();

https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=db349e4d510ccbbf8ebc5c4a90dce0cc&text=&accuracy=11&format=json&nojsoncallback=1&auth_token=72157712034747883-1e6ac63d3ec1a9d4&api_sig=cbb4d817fd28c9b6eff721d03edff118

function getImage () {
  const IMAGE_API_TOKEN = 'db349e4d510ccbbf8ebc5c4a90dce0cc';

  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${IMAGE_API_TOKEN}&text=night%2C+winter&geo_context=2&in_gallery=true&extras=url_l&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(data => console.log(data));
}

getImage ();