export default function createMarkup(hits) {
    const gallery = document.querySelector('.gallery');
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
