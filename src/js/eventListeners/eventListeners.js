import {searchCity} from '../search/search';
import create from '../../index';

const refresh = document.querySelector('.control__refresh');
const btn = document.getElementById('btn');

refresh.addEventListener('click', () => {
  window.location.reload();
});

window.addEventListener('unload', () => {
  btn.addEventListener('click', () => {
    const search = searchCity();
    create(search);
  });
});