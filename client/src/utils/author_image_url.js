export function getAuthorImageUrl(author) {
    if (author.image) {
        return 'http://localhost:8000/storage/' + author.image
    }

    return 'http://localhost:8000/storage/authors/placeholder-author.png'
}