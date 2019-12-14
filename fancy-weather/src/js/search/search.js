import getWeatherForecast from '.././weather/weather';
import create from '../../index';

function someFunc() {
  let search;

  if (document.location.search === '') {
    search = 'Minsk';
  } else {
    search = document.location.search.splice(8);
  }

  //console.log(search);
  return search;
}


let btn = document.getElementById("btn");

window.addEventListener("unload", function() {
  btn.addEventListener('click', () => {
    let search = someFunc();
    create(search);
  });
});


export default someFunc;

