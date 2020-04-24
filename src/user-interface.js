const { listPrompt, inputPrompt } = require('./prompts')

class UserInterface {
  constructor() {}

  welcome() {
    console.log('\nWelcome to your Reading List, powered by Google Books.\n')
  }

  goodbye() {
    console.log('\nThanks for using your Reading List, have a great day!\n')
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

  display(books) {
    console.table(
      books.map((book) => {
        const { title, authors, publisher } = book
        return { title, authors, publisher }
      })
    )
  }

  async addBookPrompt() {
    const options = {
      yes: 'Yes',
      no: 'No',
    }
    const { choice } = await listPrompt(
      'There are no books on your Reading List. Would you like to add one?',
      Object.values(options)
    )
    return { choice, options }
  }

  addedBook(book) {
    console.log(`${book.title} has been added to your Reading List.`)
  }

  async searchPrompt() {
    const { query } = await inputPrompt(
      'Enter a term to search for in the Google Books library, or press enter to return to main menu.\n>'
    )
    return query
  }

  invalidQuery() {
    console.log(
      'The query you entered is invalid. Please enter only letters, numbers, and - _'
    )
  }

  async selectPrompt(books) {
    const options = books.map((book) => book.display)
    const returnToMain = '-> Return to main menu'
    options.push(returnToMain)

    const { choice } = await listPrompt(
      `Select a book to add or return to main menu. (title | author(s) | publisher)`,
      options
    )

    return { choice, returnToMain }
  }
}

module.exports = UserInterface
