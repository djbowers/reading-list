const { expect } = require('chai')

const { requestBooks } = require('../src/google-api')

describe('Google Books API', () => {
  describe('requestBooks', () => {
    it('receives a valid response', async () => {
      const bookData = await requestBooks('test')

      bookData.forEach((book) => {
        expect(book).to.haveOwnProperty('volumeInfo')
        expect(book.volumeInfo).to.haveOwnProperty('title')
        expect(book.volumeInfo).to.haveOwnProperty('authors')
        expect(book.volumeInfo).to.haveOwnProperty('publisher')
      })
    }).timeout(10000)
  })
})
