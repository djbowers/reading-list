const { expect } = require('chai')

const { searchGoogleBooks } = require('../src/google-books')

describe('Google Books', () => {
  describe('searchGoogleBooks', () => {
    it('should get a valid response from the Google Books API', async () => {
      const books = await searchGoogleBooks('code')
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
