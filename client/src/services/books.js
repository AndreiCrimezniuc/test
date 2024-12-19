
export const fetchBooks = async () => {
    try {
        const response = await fetch('http://localhost:8001/api/v1/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
