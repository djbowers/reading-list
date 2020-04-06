const { MAIN_PROMPT, ADD_BOOK_PROMPT } = require('./prompts')

class ReadingList {
  constructor() {
    this.books = []
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.')
    console.log(this.books)
    console.log(MAIN_PROMPT)
    console.log(ADD_BOOK_PROMPT)
  }
}

module.exports = ReadingList
