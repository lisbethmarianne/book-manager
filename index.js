const BookOwnerService = require('./bookOwnerService')
const BookOwner = require('./models/bookOwner')

const main = async () => {
  // Code to generate data
  // const firstBookOwner = new BookOwner("Erica Smith", "Germany", "Leipzig")
  // const secondBookOwner = new BookOwner("Michael Becker", "Germany", "Berlin")
  // firstBookOwner.addBook("Jane Eyre", "Charlotte Brontë")
  // firstBookOwner.addBook("Emma", "Jane Austen")
  // secondBookOwner.addBook("A Wild Sheep Chase", "Haruki Murakami")

  // await BookOwnerService.add(firstBookOwner)
  // await BookOwnerService.add(secondBookOwner)

  // Work with data from database
  const erica = await BookOwnerService.find('erica-smith')
  const michael = await BookOwnerService.find('michael-becker')

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

  await BookOwnerService.update(erica)
  await BookOwnerService.update(michael)
}

(async () => {
  try {
    await main()
  } catch (err) {
    console.log(err)
  }
})()
