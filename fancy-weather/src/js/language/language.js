async function getLanguage() {
  return fetch('./assets/language.json')
  .then((response) => response.json());
  // .then(data => console.log(data));
}

export default getLanguage;