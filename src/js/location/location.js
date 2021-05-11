
const getCountryName = (country) => {
  const countryName = import('../../assets/names.json')
  return countryName
          .then((data) => data[`${country}`]);}

export { getCountryName };
