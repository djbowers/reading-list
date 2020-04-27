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

    if (Array.isArray(this.authors)) {
      this.authors = this.authors.join(', ')
    }

    this.display = `${this.title} | ${this.authors} | ${this.publisher}`
  }
}

module.exports = { createBooks, Book }
