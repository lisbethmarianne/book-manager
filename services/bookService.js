const Book = require('../models/book')

async function findAll() {
  return Book.find()
}

async function find(_id) {
  return Book.findOne({ _id })
}

async function findForOwner(ownerId) {
  return Book.find({ ownerId: ownerId })
}

async function add(book) {
  return Book.create(book)
}

async function del(_id) {
  return Book.remove({ _id })
}

module.exports = {
  findAll,
  find,
  findForOwner,
  add,
  del,
}
