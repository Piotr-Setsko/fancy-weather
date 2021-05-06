import {LOCATION_API_TOKEN} from '../../assets/constants.json';
const countryName = import('../../assets/names.json')

const getUserLocation = () => {
  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`)
    .then((response) => response.json());
}

const getCountryName = (country) => { 
  return countryName          
          .then((data) => data[`${country}`]);    
}

export { getUserLocation, getCountryName };
