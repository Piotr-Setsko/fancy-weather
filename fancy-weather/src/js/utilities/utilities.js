async function getTime(timeZone, nextDays) {
  const localDate = {};
  const date = new Date();
  let optionsTime;

  if (timeZone === 'Europe/Minsk') {
    optionsTime = {
      hour12: false, hour: 'numeric', minute: 'numeric', timeZone: `${timeZone}`,
    };
    localDate.time = date.toLocaleString('en', optionsTime);
  } else {
    optionsTime = {
      hour12: false, hour: 'numeric', minute: 'numeric',
    };
    const newTime = new Date(Date.now() - 180 * 60 * 1000 + `${timeZone}` * 1000);
    localDate.time = newTime.toLocaleString('en', optionsTime);
  }

  localDate.week = date.toLocaleString('en', { weekday: 'short' });
  localDate.day = date.toLocaleString('en', { day: 'numeric' });
  localDate.year = date.toLocaleString('en', { month: 'long' });

  const tom = [];
  tom[0] = new Date(`${nextDays[0]}`).toLocaleString('en', { weekday: 'long' });
  tom[1] = new Date(`${nextDays[1]}`).toLocaleString('en', { weekday: 'long' });
  tom[2] = new Date(`${nextDays[2]}`).toLocaleString('en', { weekday: 'long' });

  localDate.tom = tom;
  return localDate;
}

function translate(text, lang) {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  // https://cors-anywhere.herokuapp.com/
  return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=${text}&lang=${lang}`)
    .then((response) => response.json());
}

export { getTime, translate };
