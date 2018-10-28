const Database = require('./database')
const BookOwner = require('./bookOwner')

// Code to generate data in data.json:

// const bookOwners = []
// const erica = new BookOwner("Erica Smith", "Germany", "Leipzig")
// const michael = new BookOwner("Michael Becker", "Germany", "Berlin")
// bookOwners.push(erica)
// bookOwners.push(michael)

// erica.addBook("Jane Eyre", "Charlotte Brontë")
// erica.addBook("Emma", "Jane Austen")
// michael.addBook("A Wild Sheep Chase", "Haruki Murakami")

// Database.save('data.json', [erica, michael])

const main = async () => {
  const data = await Database.load('data.json')

  const erica = BookOwner.create(data.find( owner => owner.id === 'erica-smith' ))
  const michael = BookOwner.create(data.find( owner => owner.id === 'michael-becker' ))

  console.log(`${erica.name}'s books: ${erica.books.map(book => book.title).join(', ')}`)
  console.log(`${michael.name}'s books: ${michael.books.map(book => book.title).join(', ')}`)

  console.log(`${erica.name} wants to exchange a book.`)
  const book1 = erica.books[0]
  const book2 = michael.books[0]
  erica.requestExchange(michael, book2, book1)
  console.log(`${michael.name} has ${michael.requestedExchanges.length} request for book exchange.`)

  console.log(`${michael.name} accepts the request.`)
  const exchange = michael.requestedExchanges[0]
  michael.acceptExchange(exchange)

  console.log(`${erica.name}'s books: ${erica.books.map(book => book.title).join(', ')}`)
  console.log(`${michael.name}'s books: ${michael.books.map(book => book.title).join(', ')}`)
}

(async () => {
  try {
    await main()
  } catch (err) {
    console.log(err)
  }
})()
