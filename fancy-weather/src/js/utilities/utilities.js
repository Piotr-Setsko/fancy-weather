function effectTemp(T, P, v) {
  const result = Math.round(-2.7 + 1.04 * T + (2.0 * P) / 1000 - 0.65 * v);
  return result;
}

async function getTime(timeZone, nextDays) {
  const localDate = {};
  const date = new Date();
  const optionsTime = {
    hour12: false, hour: 'numeric', minute: 'numeric', timeZone: `${timeZone}`,
  };
  localDate.week = date.toLocaleString('en', { weekday: 'short' });
  localDate.day = date.toLocaleString('en', { day: 'numeric' });
  localDate.year = date.toLocaleString('en', { month: 'long' });
  localDate.time = date.toLocaleString('en', optionsTime);

  localDate.tom = new Date(`${nextDays[1]}`).toLocaleString('en', { weekday: 'long' });

  return localDate;
}

function translate() {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  // https://cors-anywhere.herokuapp.com/
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=настроение&lang=ru-be`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

translate();

export { effectTemp, getTime };
