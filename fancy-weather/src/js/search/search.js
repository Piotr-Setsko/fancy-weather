import create from '../../index';

function searchCity() {
  let search;

  if (document.location.search === '') {
    search = 'Minsk';
  } else {
    search = document.location.search.splice(8);
  }
  return search;
}

const btn = document.getElementById('btn');

window.addEventListener('unload', () => {
  btn.addEventListener('click', () => {
    const search = searchCity();
    create(search);
  });
});
