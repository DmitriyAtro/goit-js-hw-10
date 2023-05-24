import Notiflix from 'notiflix';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function showLoader() {
  loader.style.display = 'block';
  loader.classList.add('loader');
}

function hideLoader() {
  loader.style.display = 'none';
  loader.classList.remove('loader');
}

function showError(message) {
  error.textContent = Notiflix.Notify.failure(message);
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

export { showError, hideError, showLoader, hideLoader };
