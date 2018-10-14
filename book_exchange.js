// Book Exchange
// A book belongs to a bookOwner
// A bookOwner can add a book
// A bookOwner can request a bookExchange
// A bookOwner can accept a bookExchange

class Book {
  constructor(title, author, owner) {
    this.title = title
    this.author = author
    this.owner = owner

    console.log(`Book with author "${author}" and title "${this.title}" created. Book belongs to ${owner.name}.`)
  }
}

class BookOwner {
  constructor(name, country, city) {
    this.name = name
    this.country = country
    this.city = city
    this.books = []
    this.proposedExchanges = []
    this.requestedExchanges = []
  }

  addBook(title, author) {
    const book = new Book(title, author, this)
    this.books.push(book)
  }

  requestExchange(requestedBook, offeredBook) { 
    const bookExchange = new BookExchange(requestedBook, offeredBook)

    this.proposedExchanges.push(bookExchange)
    requestedBook.owner.requestedExchanges.push(bookExchange)
  }

  acceptExchange(exchange) { 
    exchange.accepted = true
    exchange.complete()
  }
}

class BookExchange {
  constructor(requestedBook, offeredBook) {
    this.requestedBook = requestedBook
    this.offeredBook = offeredBook
    this.accepted = false
    this.completed = false
  }

  complete() {
    const bookOwner1 = this.requestedBook.owner
    const bookOwner2 = this.offeredBook.owner

    bookOwner1.books = bookOwner1.books.filter(book => book != this.requestedBook)
    bookOwner2.books = bookOwner2.books.filter(book => book != this.offeredBook)
    this.requestedBook.owner = bookOwner2
    this.offeredBook.owner = bookOwner1
    bookOwner1.books.push(this.offeredBook)
    bookOwner2.books.push(this.requestedBook)

    this.completed = true
  }
}

const erica = new BookOwner("Erica", "Germany", "Leipzig")
const michael = new BookOwner("Michael", "Germany", "Berlin")

erica.addBook("Jane Eyre", "Charlotte Brontë")
erica.addBook("Emma", "Jane Austen")
michael.addBook("Wilde Schafsjagd", "Haruki Murakami")

console.log(`${erica.name}'s books: ${erica.books.map(book => book.title)}`)
console.log(`${michael.name}'s books: ${michael.books.map(book => book.title)}`)

console.log(`${erica.name} wants to exchange a book.`)
const book1 = erica.books[0]
const book2 = michael.books[0]
erica.requestExchange(book2, book1)
console.log(`${book2.owner.name} has ${michael.requestedExchanges.length} request for book exchange.`)

console.log(`${book2.owner.name} accepts the request.`)
const exchange = michael.requestedExchanges[0]
michael.acceptExchange(exchange)

console.log(`${erica.name}'s books: ${erica.books.map(book => book.title)}`)
console.log(`${michael.name}'s books: ${michael.books.map(book => book.title)}`)