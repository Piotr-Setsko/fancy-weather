async function getImage(description) {
  const IMAGE_API_TOKEN = 'b192701d2a4184a7958908b3962286b23edadd136a9165dcb78244425d039231';

  return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=winter+night+${description}+clear&client_id=${IMAGE_API_TOKEN}`)
    .then((response) => response.json());
}

export default getImage;

