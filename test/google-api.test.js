const { expect } = require('chai')

const GoogleApi = require('../src/google-api')

describe('Google Books API', () => {
  describe('requestBooks', () => {
    it('receives a valid response', async () => {
      const results = 3
      const response = await GoogleApi.requestBooks('test')
      const books = response.data.items.slice(0, results)

      expect(books).to.have.length(results)
      books.forEach((book) => {
        expect(book).to.haveOwnProperty('volumeInfo')
      })
    }).timeout(10000)
  })
})
