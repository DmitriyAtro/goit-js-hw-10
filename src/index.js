import { hideError } from './js/functions.js';
import { fetchBreeds, fetchCatByBreed, breedSelect } from './js/cat-api.js';

hideError();

breedSelect.disabled = true;
fetchBreeds();

breedSelect.addEventListener('change', onBreedId);

function onBreedId() {
  const breedId = breedSelect.value;
  if (breedId) {
    fetchCatByBreed(breedId);
  } else {
    catInfo.style.display = 'none';
  }
}
