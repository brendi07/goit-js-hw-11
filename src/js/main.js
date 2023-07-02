import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

let page = 1;
let query = '';

form.addEventListener('submit', onSearch);
loadButton.addEventListener('click', onLoadMore)


function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value;

  gallery.innerHTML = '';
  page = 1;
 
  fetchSearchQuery(query)
    .then(response => {
      if (response.data.hits.length !== 0) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        loadButton.classList.remove('is-hidden');
      };
      if (page === response.data.total / response.data.totalHits) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        loadButton.classList.add('is-hidden');
      }
    });

}


function onLoadMore() {
  page += 1;
  fetchSearchQuery(query);
}

async function fetchSearchQuery(q) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '38012402-0faae6c95475bcc6a920104f9';
    const SETTINGS =
      'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${q}&${SETTINGS}&page=${page}`
      );
      if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadButton.classList.add('is-hidden');
      }
      const hits = response.data.hits;
      createMarkup(hits);
      return response;
    } catch (error) {
      console.log(error);
    }
    }
    
 function createMarkup(hits) {
    const markup = hits
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
      )
     .join('');
   
   gallery.insertAdjacentHTML('beforeend', markup);
   const gallerySimple = new SimpleLightbox('.gallery div a', {
     captionsData: 'alt',
     captionDelay: 250,
   });
}





