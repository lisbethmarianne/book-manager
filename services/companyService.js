const Company = require('../models/company')
const Book = require('../models/book')
const Employee = require('../models/employee')

async function findAll() {
  return Company.find()
}

async function add(meetup) {
  return Company.create(meetup)
}

async function del(_id) {
  return Company.remove({ _id })
}

async function find(_id) {
  return Company.findOne({ _id })
}

async function addBook(companyId, bookId) {
  const company = await Company.findOne({ _id: companyId })
  const book = await Book.findOne({ _id: bookId })

  company.books.push(book._id)

  company.save()
  return Company
}

async function addEmployee(companyId, employeeId) {
  const company = await Company.findOne({ _id: companyId })
  const employee = await Employee.findOne({ _id: employeeId })

  company.employees.push(employee._id)

  company.save()
  return Company
}

module.exports = {
  findAll,
  find,
  add,
  del,
  addBook,
  addEmployee
}
