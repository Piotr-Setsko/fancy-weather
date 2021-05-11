/* global ymaps */

const init = (coord) => {
  const myMap = new ymaps.Map('map', {
    center: [`${coord.lat}`, `${coord.lon}`],
    zoom: 10,
    controls: ['searchControl'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  window.myMap = myMap;
};

export default init;
