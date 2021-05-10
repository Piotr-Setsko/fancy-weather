import { getUserLocation } from '../location/location';

export const searchCity = async () => {
  const { city } = await getUserLocation();
  let search;

  if (document.location.search === '') {
    search = city;
  } else {
    search = document.location.search.slice(8);
  }

  return search;
}
