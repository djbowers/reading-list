const prompt = require('prompt-sync')

const { MAIN_PROMPT, ADD_BOOK_PROMPT } = require('./prompts')

class ReadingList {
  constructor() {
    this.books = []
    this.prompt = prompt({ sigint: true })
    this.isOpen = false
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.')
    this.isOpen = true
    this.continue()
  }

  continue() {
    while (this.isOpen) {
      console.log(MAIN_PROMPT)
      const action = this.prompt('> ').trim()
      switch (action) {
        case 'v':
          this.viewBooks()
          break
        case 'a':
          console.log('add book')
          break
        case 'q':
          this.isOpen = false
          break
        default:
          console.log('\nInvalid input, please try again...')
          break
      }
    }
  }

  viewBooks() {
    console.log(`\ntitle | authors | publisher\n————— | —————–– | –––––––––`)
    this.books.forEach((book) => console.log(book.display))
    this.prompt('\nPress any key to continue...')
  }
}

module.exports = ReadingList
