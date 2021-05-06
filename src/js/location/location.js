const countryName = import('../../assets/names.json')

function getUserLocation() {
  const LOCATION_API_TOKEN = 'b319f7092b2b9b';

  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then((response) => response.json());
}

function getCountryName(country) { 
  return countryName          
          .then((data) => data[`${country}`]);    
}

export { getUserLocation, getCountryName };
