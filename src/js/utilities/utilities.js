
const unitCheck = () => {
  const metric = document.querySelector('.control__unit--metric');
  const imperial = document.querySelector('.control__unit--imperial');

  let unit;
  if (sessionStorage.temp === 'imper') {
    unit = 'imperial';
    imperial.classList.add('active');
    metric.classList.remove('active');
  } else {
    unit = 'metric';
    metric.classList.add('active');
    imperial.classList.remove('active');
  }
  return unit;
}

const getCountryName = (country) => {
  const countryName = import('../../assets/names.json')
  return countryName
          .then((data) => data[`${country}`]);
}

const loadTime = (newZone) => {
  setInterval(() => {
    const optionsTime = {
      hour12: false, hour: 'numeric', minute: 'numeric',
    };
    const newTime = new Date(Date.now() - 180 * 60 * 1000 + `${newZone}` * 1000);
    const time = newTime.toLocaleString('en', optionsTime);
    if (document.querySelector('.weather-today__time') !== null) {
      document.querySelector('.weather-today__time').innerHTML = time;
    }
  }, 10000);
}

export { unitCheck, getCountryName, loadTime };