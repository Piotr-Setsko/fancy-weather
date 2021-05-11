
let newZone;

const getTime = async (timeZone, nextDays) => {
  newZone = timeZone;
  const localDate = {};
  const date = new Date();
  const { lang } = document.children[0];

  const optionsTime = {
    hour12: false, hour: 'numeric', minute: 'numeric',
  };
  const newTime = new Date(Date.now() - 180 * 60 * 1000 + `${timeZone}` * 1000);
  localDate.time = newTime.toLocaleString('en', optionsTime);

  localDate.week = date.toLocaleString(`${lang}`, { weekday: 'short' });
  localDate.week = date.toLocaleString(`${lang}`, { weekday: 'short' });
  localDate.day = date.toLocaleString('en', { day: 'numeric' });
  localDate.year = date.toLocaleString(`${lang}`, { month: 'long' });

  const tom = [];
  tom[0] = new Date(`${nextDays[0]}`).toLocaleString(`${lang}`, { weekday: 'long' });
  tom[1] = new Date(`${nextDays[1]}`).toLocaleString(`${lang}`, { weekday: 'long' });
  tom[2] = new Date(`${nextDays[2]}`).toLocaleString(`${lang}`, { weekday: 'long' });
  localDate.tom = tom;

  return localDate;
}


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

export { getTime };
