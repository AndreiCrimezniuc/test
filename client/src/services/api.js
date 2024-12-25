const API_URL = 'http://localhost:8000/api/v1';

// работы с API
async function fetchApi(endpoint, options = {}) {
    console.log('Fetching from:', `${API_URL}${endpoint}`);
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('API Error:', error);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        
        if (data && data.data) {
            return data.data;
        }
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// скачивания файлов
async function downloadFile(endpoint) {
    console.log('Downloading from:', `${API_URL}${endpoint}`);
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Accept': 'application/pdf',
            },
        });
            
        console.log('Download response status:', response.status);
        if (!response.ok) {
            throw new Error(`Download Error: ${response.status}`);
        }

        return await response.blob();
    } catch (error) {
        console.error('Download error:', error);
        throw error;
    }
}

export const api = {
    // Книги
    getBooks: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            
            if (params.sort) queryParams.append('sort', params.sort);
            if (params.genre_id) queryParams.append('genre_id', params.genre_id);
            if (params.author_id) queryParams.append('author_id', params.author_id);
            if (params.search) queryParams.append('search', params.search);
            if (params.limit) queryParams.append('limit', params.limit);
            
            const queryString = queryParams.toString();
            const response = await fetchApi(`/books${queryString ? `?${queryString}` : ''}`);
            console.log('Books response:', response);
            return response;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    getRandomBooks: async (limit = 10) => {
        try {
            const response = await fetchApi(`/books/random?limit=${limit}`);
            return response;
        } catch (error) {
            console.error('Error fetching random books:', error);
            throw error;
        }
    },

    getLatestBooks: async (limit = 10) => {
        try {
            const response = await fetchApi(`/books/latest?limit=${limit}`);
            return response;
        } catch (error) {
            console.error('Error fetching latest books:', error);
            throw error;
        }
    },

    getBook: (id) => {
        console.log('Getting book with id:', id);
        return fetchApi(`/books/${id}`);
    },

    getBooksByGenre: (genreId) => fetchApi(`/books/genre/${genreId}`),

    getBooksByAuthor: (authorId) => {
        console.log('Getting books for author:', authorId);
        return fetchApi(`/books/author/${authorId}`);
    },

    // Авторы
    getAuthors: () => fetchApi('/authors'),

    getAuthor: (id) => {
        console.log('Getting author with id:', id);
        return fetchApi(`/authors/${id}`);
    },

    // Жанры
    getGenres: () => fetchApi('/genres'),

    getGenre: (id) => fetchApi(`/genres/${id}`),

    // Скачивание файлов
    downloadBook: async (id) => {
        console.log('Downloading book with id:', id);
        try {
            const blob = await downloadFile(`/books/${id}/download`);
            if (!blob) {
                throw new Error('Не удалось получить файл');
            }
            return blob;
        } catch (error) {
            console.error('Error downloading book:', error);
            throw error;
        }
    },

    // Вспомогательные функции
    getBookDownloadUrl: (bookId) => `${API_URL}/books/${bookId}/download`,
    getImageUrl: (path) => `http://localhost:8000/storage/${path}`,
};