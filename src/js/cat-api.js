import Notiflix from 'notiflix';
import { showError, hideError, showLoader, hideLoader } from './functions';

const API_KEY =
  'live_9o5SchndjgqmXwjmbet1sLKXN7es0icDiRz9DFrqvrUbfs7ALwJTkSOSwS0UYUo4';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

function fetchBreeds() {
  showLoader();
  breedSelect.disabled = true;
  const options = {
    headers: {
      'x-api-key': API_KEY,
    },
  };

  fetch('https://api.thecatapi.com/v1/breeds', options)
    .then(response => {
      if (!response.ok) {
        throw Notiflix.Notify.failure('Failed to fetch breeds 💩');
      }
      return response.json();
    })
    .then(data => {
      const dataOptions = data.map(breed => ({
        value: breed.id,
        text: breed.name,
      }));

      dataOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        breedSelect.appendChild(optionElement);
      });

      breedSelect.disabled = false;
      hideLoader();
    })
    .catch(error => {
      showError(error.message);
    });
}

function fetchCatByBreed(breedId) {
  showLoader();
  hideError();
  catInfo.innerHTML = '';

  fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Notiflix.Notify.failure('Failed to fetch cat information 💩');
      }
      return response.json();
    })
    .then(data => {
      const cat = data[0];
      const image = document.createElement('img');
      image.src = cat.url;
      catInfo.appendChild(image);

      const breedName = document.createElement('h3');
      breedName.textContent =
        breedSelect.options[breedSelect.selectedIndex].textContent;
      catInfo.appendChild(breedName);

      const description = document.createElement('p');
      description.textContent = cat.breeds[0].description;
      catInfo.appendChild(description);

      const temperament = document.createElement('p');
      temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catInfo.appendChild(temperament);

      catInfo.style.display = 'block';
      hideLoader();
    })
    .catch(error => {
      showError(error.message);
    });
}

export { fetchBreeds, fetchCatByBreed, breedSelect, catInfo };
