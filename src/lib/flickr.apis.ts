// Configuration
const API_KEY = import.meta.env.VITE_FLICKR_API_KEY;
const BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.flickr.com/services/rest/';
const FORMAT = 'format=json';
const NO_JSONP = 'nojsoncallback=1';

// Error messages
const ERROR_MESSAGES = {
    NO_API_KEY: 'API key is not configured. Please check your environment variables.',
    INVALID_PAGE: 'Invalid page number provided',
    INVALID_TEXT: 'Invalid search text provided'
};

// Input validation
const validatePage = (page: number): boolean => {
    return Number.isInteger(page) && page > 0;
};

const validatePerPage = (perPage: number): boolean => {
    return Number.isInteger(perPage) && perPage > 0 && perPage <= 500;
};

const validateSearchText = (text: string): boolean => {
    return typeof text === 'string' && text.trim().length > 0;
};

// API endpoints with validation and security measures
const recentApi = (page: number = 1, perPage: number = 52): string => {
    if (!API_KEY) {
        throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    if (!validatePage(page)) {
        throw new Error(ERROR_MESSAGES.INVALID_PAGE);
    }

    if (!validatePerPage(perPage)) {
        perPage = 52; // Reset to default if invalid
    }

    return `${BASE}?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=${perPage}&page=${page}&${FORMAT}&${NO_JSONP}`;
};

const searchApi = (text: string): string => {
    if (!API_KEY) {
        throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    if (!validateSearchText(text)) {
        throw new Error(ERROR_MESSAGES.INVALID_TEXT);
    }

    const sanitizedText = encodeURIComponent(text.trim());
    return `${BASE}?method=flickr.photos.search&api_key=${API_KEY}&text=${sanitizedText}&${FORMAT}&${NO_JSONP}`;
};

export { recentApi, searchApi, ERROR_MESSAGES };
