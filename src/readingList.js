const events = require('events')
const axios = require('axios').default
const inquirer = require('inquirer')
const prompt = require('prompt-sync')

const { MAIN_PROMPT, ADD_BOOK_PROMPT } = require('./prompts')

class ReadingList {
  constructor() {
    this.books = []
    this.prompt = prompt({ sigint: true })
    this.eventEmitter = new events.EventEmitter()
    this.isOpen = false
    this.isWaiting = false
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.')
    this.isOpen = true
    this.continue()
  }

  continue() {
    while (this.isOpen && !this.isWaiting) {
      console.log(MAIN_PROMPT)
      const action = this.prompt('> ').trim()
      switch (action) {
        case 'v':
          this.viewBooks()
          break
        case 'a':
          this.addBook()
          break
        case 'q':
          this.isOpen = false
          break
        default:
          console.log('\nInvalid input, please try again...')
          break
      }
    }
    if (this.isWaiting) {
      console.log('\nWaiting...')
    }
  }

  viewBooks() {
    console.log(`\ntitle | authors | publisher\n————— | —————–– | –––––––––`)
    this.books.forEach((book) => console.log(book.display))
    this.prompt('\nPress any key to continue...')
  }

  addBook() {
    console.log('\nEnter a term to search for in the Google Books library.\n')
    const query = this.prompt('> ').trim()

    this.getBooks(query)
      .then((books) => {
        this.selectBook(books).then((book) => {
          this.books.push(book)
          this.eventEmitter.emit('added book', book)
        })
      })
      .catch((error) => {
        console.log(error)
      })

    this.eventEmitter.once('added book', this.addedBookHandler)
    this.isWaiting = true
  }

  addedBookHandler = (book) => {
    console.log(`\nAdded Book to Reading List: ${book.title}`)
    this.isWaiting = false
    this.prompt('\nPress any key to continue...')
    this.continue()
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
    console.log(ADD_BOOK_PROMPT)
    return inquirer
      .prompt([question])
      .then((answers) => books.find((book) => book.display === answers.choice))
  }
}

module.exports = ReadingList
