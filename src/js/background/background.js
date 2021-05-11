import { getImage } from '../api/api';
import { defaultImage } from '../../assets/constants.json';

const getBackgroundImage = (description) => {
  const wrapper = document.querySelector('.page__wrapper');
  getImage(description)
    .then((data) => {
      const link = data.urls.regular;
      wrapper.style.setProperty('--link', `url(${link})`);
    })
    .catch(
      wrapper.style.setProperty('--link', `url(${defaultImage})`),
    );
};

export default getBackgroundImage;
