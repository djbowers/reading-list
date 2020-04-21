const { searchGoogleBooks } = require('./google-books')
const { listPrompt, inputPrompt } = require('./prompts')

class ReadingList {
  constructor() {
    this.books = []
    this.header = 'title | authors | publisher'
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.\n')
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

      default:
        console.log('Error: closing Reading List')
        process.exit(2)
    }
  }

  async returnToMain() {
    const { choice } = await listPrompt('Return to main menu?', ['Yes', 'No'])
    choice === 'Yes' ? this.mainMenu() : process.exit(0)
  }

  viewList() {
    console.log(this.header)
    this.books.forEach((book) => console.log(book.display))
    this.returnToMain()
  }

  async addBook() {
    const { query } = await inputPrompt(
      'Enter a term to search for in the Google Books library.\n>'
    )
    const books = await this.getBooks(query)
    const book = await this.selectBook(books)
    if (book) {
      this.books.push(book)
      this.returnToMain()
    } else {
      this.mainMenu()
    }
  }

  getBooks(query, results = 5) {
    return searchGoogleBooks(query, results)
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

process.on('exit', () => {
  console.log('\nThanks for using your Reading List, have a great day!\n')
})

module.exports = ReadingList
