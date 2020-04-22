const { expect } = require('chai')

const { searchGoogleBooks } = require('../src/google-books')

describe('Google Books', () => {
  describe('searchGoogleBooks', () => {
    it('should get a valid response from the Google Books API', async () => {
      const results = 5
      const books = await searchGoogleBooks('test', results)

      expect(books).to.have.lengthOf(results)
      books.forEach((book) => {
        expect(book).to.haveOwnProperty('title')
        expect(book).to.haveOwnProperty('authors')
        expect(book).to.haveOwnProperty('publisher')
        expect(book).to.haveOwnProperty('display')
      })
    }).timeout(10000)
  })
})
