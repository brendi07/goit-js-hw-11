import axios from 'axios';

export async function fetchSearchQuery(q, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '38012402-0faae6c95475bcc6a920104f9';
    const SETTINGS =
        'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

        const response = await axios.get(
            `${BASE_URL}?key=${API_KEY}&q=${q}&${SETTINGS}&page=${page}`
        );
        return response;
}
