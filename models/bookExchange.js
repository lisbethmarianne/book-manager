module.exports = class BookExchange {
  constructor(requester, requestee, requestedBook, offeredBook) {
    this.requester = requester
    this.requestee = requestee
    this.requestedBook = requestedBook
    this.offeredBook = offeredBook
    this.accepted = false
    this.completed = false
  }

  complete() {
    this.requestee.books = this.requestee.books.filter(book => book != this.requestedBook)
    this.requester.books = this.requester.books.filter(book => book != this.offeredBook)
    this.requestedBook.ownerId = this.requester.id
    this.offeredBook.ownerId = this.requestee.id
    this.requestee.books.push(this.offeredBook)
    this.requester.books.push(this.requestedBook)

    this.completed = true
  }
}
