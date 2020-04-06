class ReadingList {
  constructor() {
    this.books = []
  }

  open() {
    console.log('\nWelcome to your Reading List, powered by Google Books.')
    console.log(this.books)
  }
}

module.exports = ReadingList
