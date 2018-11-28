const Book = require('../models/book')
const Employee = require('../models/employee')

async function find (_id) {
  return Book.findOne({ _id })
}

async function findForOwner (ownerId) {
  return Book.find({ ownerId: ownerId })
}

async function add (book) {
  return Book.create(book)
}

async function del (_id) {
  return Book.remove({ _id })
}

async function addReader (_id, employeeId) {
  const book = await Book.findOne({ _id: _id })
  const employee = await Employee.findOne({ _id: employeeId })

  book.reader = employee._id
  book.save()

  return book
}

module.exports = {
  find,
  findForOwner,
  add,
  del,
  addReader
}
