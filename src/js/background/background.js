import {IMAGE_API_TOKEN} from '../../assets/constants.json';

export const getImage = (description) => {
  return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=winter+night+${description}+city&client_id=${IMAGE_API_TOKEN}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    });
}
