async function getUserLocation() {
  const LOCATION_API_TOKEN = 'b319f7092b2b9b';

  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then((response) => response.json());
}

async function getCountryName(country) {
  return fetch('https://cors-anywhere.herokuapp.com/http://country.io/names.json')
    .then((response) => response.json())
    .then((data) => data[`${country}`]);
}

export { getUserLocation, getCountryName };
