export  function getImageUrl(book) {
    if (book.cover_image) {
        return 'http://localhost:8000/storage/' + book.cover_image
    }

    return 'http://localhost:8000/storage/books/covers/placeholder-book.png'
}