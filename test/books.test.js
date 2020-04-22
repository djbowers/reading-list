const { expect } = require('chai')

const { parseBookData } = require('../src/books')

describe('Books', () => {
  describe('parseBookData', () => {
    it('parses book data correctly', async () => {
      const bookData = [
        {
          volumeInfo: {
            title: 'foo',
            authors: 'bar',
            publisher: 'baz',
          },
        },
      ]

      const books = parseBookData(bookData)
      expect(books).to.have.lengthOf(1)

      const book = books[0]
      expect(book).to.haveOwnProperty('title')
      expect(book.title).to.equal('foo')
      expect(book).to.haveOwnProperty('authors')
      expect(book.authors).to.equal('bar')
      expect(book).to.haveOwnProperty('publisher')
      expect(book.publisher).to.equal('baz')
      expect(book).to.haveOwnProperty('display')
      expect(book.display).to.equal('foo | bar | baz')
    })

    it('parses book with unknown title', async () => {
      const bookData = [
        {
          volumeInfo: {
            title: null,
            authors: 'bar',
            publisher: 'baz',
          },
        },
      ]
      const book = parseBookData(bookData)[0]
      expect(book.title).to.equal('Unknown Title')
    })

    it('parses book with unknown authors', async () => {
      const bookData = [
        {
          volumeInfo: {
            title: 'foo',
            authors: null,
            publisher: 'baz',
          },
        },
      ]
      const book = parseBookData(bookData)[0]
      expect(book.authors).to.equal('Unknown Authors')
    })

    it('parses book with unknown publisher', async () => {
      const bookData = [
        {
          volumeInfo: {
            title: 'foo',
            authors: 'bar',
            publisher: null,
          },
        },
      ]
      const book = parseBookData(bookData)[0]
      expect(book.publisher).to.equal('Unknown Publisher')
    })
  })
})
