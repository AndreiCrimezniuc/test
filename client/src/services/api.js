const API_URL = 'http://localhost:8000/api/v1';

// Вспомогательная функция для работы с API
async function fetchApi(endpoint, options = {}) {
    console.log('Fetching from:', `${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
}

// Вспомогательная функция для скачивания файлов
async function downloadFile(endpoint) {
    console.log('Downloading from:', `${API_URL}${endpoint}`);
    const response = await fetch(`${API_URL}${endpoint}`);
        console.log()
    console.log('Download response status:', response.status);
    if (!response.ok) {
        throw new Error(`Download Error: ${response.status}`);
    }

    const blob = await response.blob();
    return blob;
}

export const api = {
    // Книги
    getBooks: (params = {}) => {
        const queryParams = new URLSearchParams();
        
        // Добавляем параметры в URL
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);
        if (params.genre_id) queryParams.append('genre_id', params.genre_id);
        if (params.author_id) queryParams.append('author_id', params.author_id);
        
        const queryString = queryParams.toString();
        return fetchApi(`/books${queryString ? `?${queryString}` : ''}`);
    },

    getRandomBooks: (limit = 10) => {
        return fetchApi(`/books/random?limit=${limit}`);
    },

    getLatestBooks: (limit = 10) => {
        return fetchApi(`/books/latest?limit=${limit}`);
    },

    getBook: (id) => {
        console.log('Getting book with id:', id);
        return fetchApi(`/books/${id}`);
    },

    getBooksByGenre: (genreId) => fetchApi(`/books/genre/${genreId}`),

    getBooksByAuthor: (authorId) => fetchApi(`/books/author/${authorId}`),

    // Авторы
    getAuthors: () => fetchApi('/authors'),

    getAuthor: (id) => fetchApi(`/authors/${id}`),

    // Жанры
    getGenres: () => fetchApi('/genres'),

    getGenre: (id) => fetchApi(`/genres/${id}`),

    // Скачивание файлов
    downloadBook: async (id) => {
        console.log('Downloading book with id:', id);
        const blob = await downloadFile(`/books/${id}/download`);
        return blob;
    },

    // Вспомогательные функции
    getBookDownloadUrl: (bookId) => `${API_URL}/books/${bookId}/download`,
    getImageUrl: (path) => `http://localhost:8000/storage/${path}`,
};