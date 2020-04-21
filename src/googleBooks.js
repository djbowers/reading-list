const axios = require('axios').default

async function searchGoogleBooks(query, results) {
  const response = await axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books`
    )
    .catch((error) => console.log(error))

  const books = response.data.items.slice(0, results)

  return books.map((book) => {
    const title = !!book.volumeInfo.title
      ? book.volumeInfo.title
      : 'Unknown Title'

    const authors = !!book.volumeInfo.authors
      ? book.volumeInfo.authors
      : 'Unknown Authors'

    const publisher = !!book.volumeInfo.publisher
      ? book.volumeInfo.publisher
      : 'Unknown Publisher'

    return new Book(title, authors, publisher)
  })
}

class Book {
  constructor(title, authors, publisher) {
    this.title = title
    this.authors = authors
    this.publisher = publisher
    this.display = `${title} | ${authors} | ${publisher}`
  }
}

module.exports = { searchGoogleBooks }
