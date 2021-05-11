import { setCORS } from "google-translate-api-browser";

const checkLang = async () => {
  const language = import('../../assets/language.json').then(({ default: lang }) => lang);
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
  const translate = setCORS("http://cors-anywhere.herokuapp.com/");

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