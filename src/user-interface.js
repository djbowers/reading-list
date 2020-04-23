class UserInterface {
  constructor() {
    this.header = 'title | authors | publisher'
  }

  welcome() {
    console.log('\nWelcome to your Reading List, powered by Google Books.\n')
  }

  goodbye() {
    console.log('\nThanks for using your Reading List, have a great day!\n')
  }

  display(books) {
    console.log(this.header)
    books.forEach((book) => {
      console.log(book.display)
    })
  }
}

module.exports = UserInterface
