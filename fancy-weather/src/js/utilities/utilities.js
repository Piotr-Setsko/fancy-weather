let newZone;

async function getTime(timeZone, nextDays) {
  newZone = timeZone;
  const localDate = {};
  const date = new Date();
  let optionsTime;
  const { lang }= document.children[0];

  optionsTime = {
    hour12: false, hour: 'numeric', minute: 'numeric',
  };
  let newTime = new Date(Date.now() - 180 * 60 * 1000 + `${timeZone}` * 1000);
  localDate.time = newTime.toLocaleString('en', optionsTime);

  localDate.week = date.toLocaleString(`${lang}`, { weekday: 'short' });
  localDate.week = date.toLocaleString(`${lang}`, { weekday: 'short' });
  localDate.day = date.toLocaleString('en', { day: 'numeric' });
  localDate.year = date.toLocaleString(`${lang}`, { month: 'long' });

  const tom = [];
  tom[0] = new Date(`${nextDays[0]}`).toLocaleString(`${lang}`, { weekday: 'long' });
  tom[1] = new Date(`${nextDays[1]}`).toLocaleString(`${lang}`, { weekday: 'long' });
  tom[2] = new Date(`${nextDays[2]}`).toLocaleString(`${lang}`, { weekday: 'long' });

  if (lang === 'be') {
    const transl = await translate(`${localDate.week}, ${localDate.year}, ${tom[0]}, ${tom[1]}, ${tom[2]}`, 'en-be');
        console.log(transl);
        let { text } = transl;
        [text] = text;
        let textStr = text.split(',');
    [localDate.week, localDate.year, tom[0], tom[1], tom[2]] = textStr;
  }

  localDate.tom = tom;
  return localDate;
}

function translate(text, lang) {
  const TRANSLATE_API_TOKEN = 'trnsl.1.1.20191202T204207Z.43defb5ae2430586.cfd2735072ce15cbc9b5bda9b5848526bcbb95be';

  // https://cors-anywhere.herokuapp.com/
  return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_TOKEN}&text=${text}&lang=${lang}`)
    .then((response) => response.json());
}

setInterval(function time() {
  let date = new Date();
  let time;
  let optionsTime = {
    hour12: false, hour: 'numeric', minute: 'numeric',
  }
  let newTime = new Date(Date.now() - 180 * 60 * 1000 + `${newZone}` * 1000);
  time = newTime.toLocaleString('en', optionsTime);
  if (document.querySelector(".weather-today__time") !== null) {
    document.querySelector(".weather-today__time").innerHTML = time;
  }
}, 10000);

export { getTime, translate };
