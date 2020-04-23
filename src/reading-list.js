class ReadingList {
  constructor() {
    this.books = []
  }

  getBooks() {
    return this.books
  }

  addBook(book) {
    this.books.push(book)
  }
}

module.exports = ReadingList
