const BookOwner = require('../models/bookOwner')
const Book = require('../models/book')

async function findAll() {
  return BookOwner.find()
}

async function add(meetup) {
  return BookOwner.create(meetup)
}

async function del(_id) {
  return BookOwner.remove({ _id })
}

async function find(_id) {
  return BookOwner.findOne({ _id })
}

async function addBook(bookOwnerId, bookId) {
  const bookOwner = await BookOwner.findOne({ _id: bookOwnerId })
  const book = await Book.findOne({ _id: bookId })

  bookOwner.books.push(book._id)

  bookOwner.save()
  return bookOwner
}

module.exports = {
  findAll,
  find,
  add,
  del,
  addBook
}
