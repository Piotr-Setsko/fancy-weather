function init(coord) {

    let myMap = new ymaps.Map('map', {
      center: [`${coord.lat}`, `${coord.lon}`],
      zoom: 10,
      controls: ['searchControl'],
    }, {
      searchControlProvider: 'yandex#search',
    });

}

export default init;
