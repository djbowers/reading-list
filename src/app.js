const { searchBooks } = require('./books')

class App {
  constructor(readingList, userInterface) {
    this.readingList = readingList
    this.ui = userInterface
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

  viewList() {
    const books = this.readingList.getBooks()
    this.ui.display(books)
    this.returnToMain()
  }

  async addBook() {
    const query = await this.ui.searchPrompt()
    if (query) {
      const books = await searchBooks(query, 5)
      const book = await this.selectBook(books)
      if (book) {
        this.readingList.addBook(book)
        return this.returnToMain()
      }
    }
    this.mainMenu()
  }

  async selectBook(books) {
    const { choice, returnToMain } = await this.ui.selectPrompt(books)

    return choice === returnToMain
      ? null
      : books.find((book) => book.display === choice)
  }
}

module.exports = App
