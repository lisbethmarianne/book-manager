const express = require('express')
const bodyParser = require('body-parser')

const CompanyService = require('./services/companyService')
const BookService = require('./services/bookService')
const EmployeeService = require('./services/employeeService')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded())

app.get('/', (_, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server listening')
})

app.get('/companies', async (_, res) => {
  const companies = await CompanyService.findAll()

  // res.render('companies', { companies })
  res.send(companies)
})

app.get('/companies/new', async (_, res) => {
  res.render('new')
})

app.get('/companies/:id', async (req, res) => {
  const company = await CompanyService.find(req.params.id)
  const books = await BookService.findForOwner(company._id)
  const employees = await EmployeeService.findForCompany(company._id)

  res.render('company', { company, books, employees })
})

app.post('/companies', async (req, res) => {
  const company = await CompanyService.add(req.body)

  res.redirect(`/companies/${company._id}`)
})

app.delete('/companies/:id', async (req, res) => {
  await CompanyService.del(req.params.id)

  res.send('ok')
})

app.post('/companies/:id/books', async (req, res) => {
  const company = await CompanyService.find(req.params.id)
  const book = await BookService.add(Object.assign(req.body, { ownerId: company._id }))

  await CompanyService.addBook(company._id, book._id)

  res.redirect(`/companies/${company._id}`)
})

app.post('/companies/:id/employees', async (req, res) => {
  const company = await CompanyService.find(req.params.id)
  const employee = await EmployeeService.add(Object.assign(req.body, { companyId: company._id }))

  await CompanyService.addEmployee(company._id, employee._id)

  res.redirect(`/companies/${company._id}`)
})

// Books

app.get('/books/:id', async (req, res) => {
  const book = await BookService.find(req.params.id)
  const employees = await EmployeeService.findForCompany(book.ownerId)
  const reader = await EmployeeService.find(book.reader)

  res.render('book', { book, reader, employees })
})

app.post('/books/:id/read', async (req, res) => {
  const book = await BookService.find(req.params.id)

  await BookService.addReader(book._id, req.body.employeeId)

  res.redirect(`/books/${book._id}`)
})

module.exports = app
