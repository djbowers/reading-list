const { createBooks } = require('./books')

class App {
  constructor(readingList, userInterface, googleApi) {
    this.readingList = readingList
    this.ui = userInterface
    this.api = googleApi
  }

  start() {
    this.ui.welcome()
    process.on('exit', this.ui.goodbye)
    this.mainMenu()
  }

  async mainMenu() {
    const { choice, options } = await this.ui.mainPrompt()

    switch (choice) {
      case options.viewList:
        this.viewList()
        break

      case options.addBook:
        this.addBook()
        break

      case options.exit:
        process.exit(0)

      // no default
    }
  }

  async returnToMain() {
    const { choice, options } = await this.ui.returnPrompt()
    choice === options.yes ? this.mainMenu() : process.exit(0)
  }

  async viewList() {
    const books = this.readingList.getBooks()
    if (books.length > 0) {
      this.ui.display(books)
      this.returnToMain()
    } else {
      const { choice, options } = await this.ui.addBookPrompt()
      choice === options.yes ? this.addBook() : this.mainMenu()
    }
  }

  async addBook() {
    const query = await this.ui.searchPrompt()
    if (!query) {
      return this.mainMenu()
    }
    if (!this.isValid(query)) {
      this.ui.invalidQuery()
      return this.addBook()
    }

    const books = await this.searchBooks(query)
    const book = await this.selectBook(books)
    if (!book) {
      return this.mainMenu()
    }

    this.readingList.addBook(book)
    this.ui.addedBook(book)
    this.returnToMain()
  }

  isValid(query) {
    return query.match(/^[a-zA-Z0-9_.-]*$/)
  }

  async searchBooks(query, results = 5) {
    const bookData = await this.api.requestBooks(query)
    return createBooks(bookData.slice(0, results))
  }

  async selectBook(books) {
    const { choice, returnToMain } = await this.ui.selectPrompt(books)

    return choice === returnToMain
      ? null
      : books.find((book) => book.display === choice)
  }
}

module.exports = App
