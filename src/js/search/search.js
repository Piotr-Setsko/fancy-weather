export const searchCity = () => {
  let search;

  if (document.location.search === '') {
    search = 'Minsk';
  } else {
    search = document.location.search.splice(8);
  }
  return search;
}
