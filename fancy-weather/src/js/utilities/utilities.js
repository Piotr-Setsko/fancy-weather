async function getTime(timeZone, nextDays) {
  const localDate = {};
  const date = new Date();
  let optionsTime;
  const { lang }= document.children[0];
  console.log(lang);
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

function translate(text, lang) {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  // https://cors-anywhere.herokuapp.com/
  return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=${text}&lang=${lang}`)
    .then((response) => response.json());
}

setInterval(function() {
  let date = new Date();
  let  optionsTime = {
    hour12: false, hour: 'numeric', minute: 'numeric',
  };
  document.querySelector(".weather-today__time").innerHTML = date.toLocaleString('en', optionsTime);
}, 1000);

export { getTime, translate };
