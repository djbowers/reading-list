const axios = require('axios').default
const inquirer = require('inquirer')

class ReadingList {
  constructor() {
    this.books = []
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.')
    this.prompt_main()
  }

  prompt_main() {
    const options = {
      view: 'View Reading List',
      add: 'Add a Book',
      exit: 'Exit Reading List',
    }

    const question = {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: Object.values(options),
    }

    inquirer
      .prompt([question])
      .then((answer) => {
        switch (answer.action) {
          case options.view:
            this.viewBooks()
            break
          case options.add:
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

  viewBooks() {
    console.log(`\ntitle | authors | publisher\n————— | —————–– | –––––––––`)
    this.books.forEach((book) => console.log(book.display))
    console.log('')
    this.prompt_main()
  }

  addBook() {
    const question = {
      type: 'input',
      name: 'query',
      message: 'Enter a term to search for in the Google Books library.',
    }

    inquirer
      .prompt([question])
      .then((answer) => this.getBooks(answer.query))
      .then((books) => this.selectBook(books))
      .then((book) => this.books.push(book))
      .catch((error) => console.log(error))
      .then(() => this.prompt_main())
  }

  async getBooks(query, results = 5) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books`
      )

      const books = response.data.items.slice(0, results)

      return books.map((book) => {
        const title = !!book.volumeInfo.title
          ? book.volumeInfo.title
          : 'Unknown Title'
        const authors = !!book.volumeInfo.authors
          ? book.volumeInfo.authors
          : 'Unknown Authors'
        const publisher = !!book.volumeInfo.publisher
          ? book.volumeInfo.publisher
          : 'Unknown Publisher'
        const display = `${title} | ${authors} | ${publisher}`
        return { title, authors, publisher, display }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async selectBook(books) {
    const header = `title | authors | publisher\n  ————— | —————–– | –––––––––\n `

    const question = {
      type: 'list',
      name: 'choice',
      message: header,
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
