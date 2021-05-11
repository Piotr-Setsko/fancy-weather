import {IMAGE_API_TOKEN} from '../../assets/constants.json';

const wrapper = document.querySelector('.page__wrapper');

export const getImage = (description) => {
  return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=winter+night+${description}+city&client_id=${IMAGE_API_TOKEN}`)
    .then((response) => response.json())
      .then((data) => {
          const link = data.urls.regular;
          wrapper.style.setProperty('--link', `url(${link})`);
      })
      .catch(
        wrapper.style.setProperty('--link', 'url("https://images.unsplash.com/photo-1554417063-60e738613596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")'),
      );
}
