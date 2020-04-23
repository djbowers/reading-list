const { expect } = require('chai')

const { createBooks, Book } = require('../src/books')

describe('Books', () => {
  describe('createBooks', () => {
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

      const books = createBooks(bookData)
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
  })

  describe('Book', () => {
    it('should accept a single author', () => {
      const book = new Book('foo', 'bar', 'baz')
      expect(book.title).to.equal('foo')
      expect(book.authors).to.equal('bar')
      expect(book.publisher).to.equal('baz')
      expect(book.display).to.equal('foo | bar | baz')
    })

    it('should accept multiple authors', () => {
      const book = new Book('foo', ['bar1', 'bar2'], 'baz')
      expect(book.title).to.equal('foo')
      expect(book.authors).to.eql(['bar1', 'bar2'])
      expect(book.publisher).to.equal('baz')
      expect(book.display).to.equal('foo | bar1,bar2 | baz')
    })

    it('should accept unknown title', async () => {
      const book = new Book(null, 'bar', 'baz')
      expect(book.title).to.equal('Unknown Title')
    })

    it('should accept unknown authors', async () => {
      const book = new Book('foo', null, 'baz')
      expect(book.authors).to.equal('Unknown Authors')
    })

    it('should accept unknown publisher', async () => {
      const book = new Book('foo', 'bar', null)
      expect(book.publisher).to.equal('Unknown Publisher')
    })
  })
})
