const { searchBooks } = require('./books')
const { listPrompt, inputPrompt } = require('./prompts')

class App {
  constructor(readingList, userInterface) {
    this.readingList = readingList
    this.ui = userInterface
  }

  start() {
    this.ui.welcome()

    process.on('exit', () => {
      this.ui.goodbye()
    })

    this.mainMenu()
  }

  async mainMenu() {
    const menuOptions = {
      viewList: 'View Reading List',
      addBook: 'Add a Book',
      exit: 'Exit Reading List',
    }

    const { choice } = await listPrompt(
      'What would you like to do?',
      Object.values(menuOptions)
    )

    switch (choice) {
      case menuOptions.viewList:
        this.viewList()
        break

      case menuOptions.addBook:
        this.addBook()
        break

      case menuOptions.exit:
        process.exit(0)

      // no default
    }
  }

  async returnToMain() {
    const { choice } = await listPrompt('Return to main menu?', ['Yes', 'No'])
    choice === 'Yes' ? this.mainMenu() : process.exit(0)
  }

  viewList() {
    const books = this.readingList.getBooks()
    this.ui.display(books)
    this.returnToMain()
  }

  async addBook() {
    const { query } = await inputPrompt(
      'Enter a term to search for in the Google Books library, or press enter to return to main menu.\n>'
    )
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
    const options = books.map((book) => book.display)
    const returnToMain = 'Return to main menu'
    options.push(returnToMain)

    const { choice } = await listPrompt(
      `Select a book to add or return to main menu. (${this.header})`,
      options
    )

    return choice === returnToMain
      ? null
      : books.find((book) => book.display === choice)
  }
}

module.exports = App
