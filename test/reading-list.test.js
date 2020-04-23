const { expect } = require('chai')

const ReadingList = require('../src/reading-list')
const { Book } = require('../src/books')

describe('Reading List', () => {
  it('should add a book to the list', () => {
    const readingList = new ReadingList()
    const book = new Book('foo', 'bar', 'baz')
    expect(readingList.books).to.have.length(0)

    readingList.addBook(book)

    expect(readingList.books).to.have.length(1)
    expect(readingList.books).to.contain(book)
  })

  it('should returns all books on the list', () => {
    const readingList = new ReadingList([
      new Book('foo', 'bar', 'baz'),
      new Book('foo', 'bar', 'baz'),
    ])

    const books = readingList.getBooks()

    expect(books).to.have.length(2)
  })
})
