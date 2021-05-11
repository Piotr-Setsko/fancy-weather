import { setCORS } from "google-translate-api-browser";
const translate = setCORS("http://cors-anywhere.herokuapp.com/")
;
const language = import('../../assets/language.json').then(({ default: lang }) => lang);

const checkLang = async () => {
  const { ru, en } = await language;
  let langData = {};

  if (sessionStorage.lang === undefined || sessionStorage.lang === 'en') {
    sessionStorage.lang = 'en';
    langData.lang = en;
    langData.langLetter = 'en';

  } else {
    document.children[0].lang = sessionStorage.lang;
    langData.lang = ru;
    langData.langLetter = 'ru';
  }

  document.querySelector('.control__select-lang').value = sessionStorage.lang;

  return langData;
}

const translateCountryName = async (name) => {
  if (sessionStorage.lang !== 'en') {
    const transl = await translate(`${name}`, {from:'en', to: `${sessionStorage.lang}`});
    let { text } = transl;
    //const textStr = text.split(',');
    //weatherInfo.countryName = text;
    return text;
  }
  return name;
}

export { checkLang, translateCountryName };