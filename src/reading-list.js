const inquirer = require('inquirer')
const { searchGoogleBooks } = require('./google-books')

class ReadingList {
  constructor() {
    this.books = []
    this.header = 'title | authors | publisher'
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.\n')
    this.mainMenu()
  }

  mainMenu() {
    const options = {
      viewList: 'View Reading List',
      addBook: 'Add a Book',
      exit: 'Exit Reading List',
    }

    const question = {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: Object.values(options),
    }

    inquirer
      .prompt([question])
      .then(({ choice }) => {
        switch (choice) {
          case options.viewList:
            this.viewList()
            break

          case options.addBook:
            this.addBook()
            break

          case options.exit:
            process.exit(0)

          default:
            console.log('Error: closing Reading List')
            process.exit(2)
        }
      })
      .catch((error) => console.log(error))
  }

  returnToMain() {
    const question = {
      type: 'list',
      name: 'choice',
      message: 'Return to main menu?',
      choices: ['Yes', 'No'],
    }

    inquirer
      .prompt([question])
      .then(({ choice }) => {
        choice === 'Yes' ? this.mainMenu() : process.exit(0)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  viewList() {
    console.log(this.header)
    this.books.forEach((book) => console.log(book.display))
    this.returnToMain()
  }

  addBook() {
    const question = {
      type: 'input',
      name: 'query',
      message: 'Enter a term to search for in the Google Books library.\n>',
    }

    inquirer
      .prompt([question])
      .then((answer) => this.getBooks(answer.query))
      .then((books) => this.selectBook(books))
      .then((book) => this.books.push(book))
      .catch((error) => console.log(error))
      .then(() => this.returnToMain())
  }

  getBooks(query, results = 5) {
    return searchGoogleBooks(query, results)
  }

  async selectBook(books) {
    const question = {
      type: 'list',
      name: 'choice',
      message: `Select a book to add or return to main menu.\n ${this.header}\n`,
      choices: books.map((book) => book.display),
    }

    return inquirer
      .prompt([question])
      .then((answers) => books.find((book) => book.display === answers.choice))
  }
}

process.on('exit', () => {
  console.log('\nThanks for using your Reading List, have a great day!\n')
})

module.exports = ReadingList
