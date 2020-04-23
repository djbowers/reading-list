function createBooks(bookData) {
  return bookData.map((book) => {
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

module.exports = { createBooks, Book }
