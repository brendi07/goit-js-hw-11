import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import {fetchSearchQuery} from './fetch_api.js';
import createMarkup from './murkap.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

let page = 1;
let query = '';
loadButton.style.display = 'none';

form.addEventListener('submit', onSearch);
loadButton.addEventListener('click', onLoadMore)


async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  loadButton.style.display = 'none';
  if (!query) {return}

   gallery.innerHTML = '';
   page = 1;
  
  try {
   const response = await fetchSearchQuery(query);
    const hits = response.data.hits;
     createMarkup(hits);
   if (hits.length !== 0) {
     Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
     loadButton.style.display = 'block';
   } else {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
   }
  } catch {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
}

}


async function onLoadMore() {
  page += 1;
  const response = await fetchSearchQuery(query, page);
  const hits = response.data.hits;
  createMarkup(hits);
    if (hits.length < 40) {
      loadButton.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadButton.style.display = 'block';
  }
}


    
 





