const { expect } = require('chai')

const ReadingList = require('../src/readingList')

describe('Reading List', () => {
  describe('getBooks', () => {
    it('should get a valid response from the Google Books API', async () => {
      const readingList = new ReadingList()
      const books = await readingList.getBooks('code')
      expect(books).to.have.lengthOf(5)

      books.forEach((book) => {
        expect(book).to.haveOwnProperty('title')
        expect(book).to.haveOwnProperty('authors')
        expect(book).to.haveOwnProperty('publisher')
        expect(book).to.haveOwnProperty('display')
      })
    })
  })
})
