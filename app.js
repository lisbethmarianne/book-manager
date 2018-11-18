const express = require('express')
const bodyParser = require('body-parser')

const CompanyService = require('./services/companyService')
const BookService = require('./services/bookService')
const EmployeeService = require('./services/employeeService')

require('./mongo-connection')

const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())

// Home

app.get('/', (_, res) => {
  res.render('index')
})

// Companies

app.get('/companies', async (_, res) => {
  const companies = await CompanyService.findAll()

  res.send(companies)
})

app.get('/companies/:id', async (req, res) => {
  const company = await CompanyService.find(req.params.id)
  if (!company) res.status(404)

  res.send(company)
})

app.post('/companies', async (req, res) => {
  const company = await CompanyService.add(req.body)

  res.send(company)
})

app.delete('/companies/:id', async (req, res) => {
  await CompanyService.del(req.params.id)

  res.send('ok')
})

app.get('/companies/:id/books', async (req, res) => {
  const books = await BookService.findForOwner(req.params.id)

  res.send(books)
})

app.get('/companies/:id/employees', async (req, res) => {
  const employees = await EmployeeService.findForCompany(req.params.id)

  res.send(employees)
})

app.post('/companies/:id/books', async (req, res) => {
  const book = await BookService.add(Object.assign(req.body, { ownerId: req.params.id }))
  const company = await CompanyService.addBook(req.params.id, book._id)

  res.send(company)
})

app.post('/companies/:id/employees', async (req, res) => {
  const employee = await EmployeeService.add(Object.assign(req.body, { companyId: req.params.id }))
  const company = await CompanyService.addEmployee(req.params.id, employee._id)

  res.send(company)
})

// Books

app.get('/books/:id', async (req, res) => {
  const book = await BookService.find(req.params.id)
  if (!book) res.status(404)

  res.send(book)
})

app.delete('/books/:id', async (req, res) => {
  await BookService.del(req.params.id)

  res.send('ok')
})

app.post('/books/:id/read', async (req, res) => {
  const book = await BookService.addReader(req.params.id, req.body.employeeId)

  res.send(book)
})

// Employees

app.get('/employees/:id', async (req, res) => {
  const employee = await EmployeeService.find(req.params.id)
  if (!employee) res.status(404)

  res.send(employee)
})

app.delete('/employees/:id', async (req, res) => {
  await EmployeeService.del(req.params.id)

  res.send('ok')
})

module.exports = app
