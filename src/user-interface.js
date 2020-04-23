const { listPrompt, inputPrompt } = require('./prompts')

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

  async mainPrompt() {
    const options = {
      viewList: 'View Reading List',
      addBook: 'Add a Book',
      exit: 'Exit Reading List',
    }
    const { choice } = await listPrompt(
      'What would you like to do?',
      Object.values(options)
    )
    return { choice, options }
  }

  async returnPrompt() {
    const options = {
      yes: 'Yes',
      no: 'No',
    }
    const { choice } = await listPrompt(
      'Return to main menu?',
      Object.values(options)
    )
    return { choice, options }
  }

  async searchPrompt() {
    const { query } = await inputPrompt(
      'Enter a term to search for in the Google Books library, or press enter to return to main menu.\n>'
    )
    return query
  }

  async selectPrompt(books) {
    const options = books.map((book) => book.display)
    const returnToMain = 'Return to main menu'
    options.push(returnToMain)

    const { choice } = await listPrompt(
      `Select a book to add or return to main menu. (${this.header})`,
      options
    )

    return { choice, returnToMain }
  }
}

module.exports = UserInterface
