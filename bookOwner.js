const Book = require('./book')
const BookExchange = require('./bookExchange')

module.exports = class BookOwner {
  constructor(name, country, city) {
    this.id = name ? name.replace(/\s+/g, '-').toLowerCase() : null
    this.name = name
    this.country = country
    this.city = city
    this.books = []
    this.proposedExchanges = []
    this.requestedExchanges = []
  }

  addBook(title, author) {
    const book = new Book(title, author, this.id)

    this.books.push(book)
  }

  requestExchange(requestee, requestedBook, offeredBook) { 
    const bookExchange = new BookExchange(this, requestee, requestedBook, offeredBook)

    this.proposedExchanges.push(bookExchange)
    requestee.requestedExchanges.push(bookExchange)
  }

  acceptExchange(exchange) { 
    exchange.accepted = true
    exchange.complete()
  }
}
