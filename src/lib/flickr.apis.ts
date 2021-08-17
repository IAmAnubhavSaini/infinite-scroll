const API_KEY = '84bf9b29bce8db001d1e58dbec8a5770';
const FORMAT = 'format=json';
const NO_JSONP = 'nojsoncallback=1';
const BASE = 'https://api.flickr.com/services/rest/';

const recentApi =
    (page: number = 1, perPage: number = 52) =>
        `${BASE}?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=${perPage}&page=${page}&${FORMAT}&${NO_JSONP}`;

const searchApi =
    (text: string) =>
        `${BASE}?method=flickr.photos.search&api_key=${API_KEY}&text=${text}&${FORMAT}&${NO_JSONP}`;

export {recentApi, searchApi};
