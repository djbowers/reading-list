class ReadingList {
  constructor(books = []) {
    this.books = books
  }

  getBooks() {
    return this.books
  }

  addBook(book) {
    this.books.push(book)
  }
}

module.exports = ReadingList
