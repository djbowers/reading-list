const GoogleApi = require('./google-api')

async function searchBooks(query, results) {
  const response = await GoogleApi.requestBooks(query)
  const bookData = response.data.items.slice(0, results)
  return parseBookData(bookData)
}

function parseBookData(books) {
  return books.map((book) => {
    const { title, authors, publisher } = book.volumeInfo
    return new Book(title, authors, publisher)
  })
}

class Book {
  constructor(title, authors, publisher) {
    this.title = title ? title : 'Unknown Title'
    this.authors = authors ? authors : 'Unknown Authors'
    this.publisher = publisher ? publisher : 'Unknown Publisher'
    this.display = `${title} | ${authors} | ${publisher}`
  }
}

module.exports = { searchBooks, parseBookData }
