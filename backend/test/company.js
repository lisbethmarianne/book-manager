import test from 'ava'
import request from 'supertest'
import app from '../app'
import Book from '../models/book'
import Company from '../models/company'
import Employee from '../models/employee'

test('Get list of companies', async t => {
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }

  await request(app)
    .post('/companies')
    .send(companyToCreate)

  const res = await request(app).get('/companies')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create new company', async t => {
  t.plan(6)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }

  const res = await request(app)
    .post('/companies')
    .send(companyToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, companyToCreate.name)
  t.is(res.body.city, companyToCreate.city)
  t.is(res.body.country, companyToCreate.country)
  t.deepEqual(res.body.books, [])
  t.deepEqual(res.body.employees, [])
})

test('Fetch a company', async t => {
  t.plan(2)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }

  const companyCreated = (await request(app)
    .post('/companies')
    .send(companyToCreate)).body

  const fetchRes = await request(app).get(`/companies/${companyCreated._id}`)

  const companyFetched = fetchRes.body

  t.is(fetchRes.status, 200)
  t.deepEqual(companyFetched, companyCreated)
})

test('Delete a company', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }

  const company = (await request(app)
    .post('/companies')
    .send(companyToCreate)).body

  const del = await request(app).delete(`/companies/${company._id}`)

  t.is(del.status, 200)
  t.is(del.text, 'ok')

  const fetch = await request(app).get(`/companies/${company._id}`)

  t.is(fetch.status, 404)
})

test('Get all books for a company', async t => {
  t.plan(5)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const bookToCreate = {
    author: 'Haruki Murakami',
    title: 'Wild Sheep Chase',
    ownerId: companyCreated._id
  }
  await Book.create(bookToCreate)

  const res = await request(app).get(`/companies/${companyCreated._id}/books`)

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
  t.deepEqual(res.body[0].author, bookToCreate.author)
  t.deepEqual(res.body[0].title, bookToCreate.title)
})

test('Book can be added to a company', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const bookToCreate = { author: 'Haruki Murakami', title: 'Wild Sheep Chase' }

  const company = (await request(app)
    .post('/companies')
    .send(companyToCreate)).body

  const res = await request(app)
    .post(`/companies/${company._id}/books`)
    .send(bookToCreate)

  t.is(res.status, 200)

  const companyAltered = res.body

  t.notDeepEqual(companyAltered, company)
  t.true(companyAltered.books.length > 0)
})

test('Get all employees for a company', async t => {
  t.plan(4)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const employeeToCreate = {
    name: 'Katrin',
    companyId: companyCreated._id
  }
  await Employee.create(employeeToCreate)

  const res = await request(app).get(`/companies/${companyCreated._id}/employees`)

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
  t.deepEqual(res.body[0].name, employeeToCreate.name)
})

test('Employees can be added to company', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const employeeToCreate = { name: 'Katrin' }

  const company = (await request(app)
    .post('/companies')
    .send(companyToCreate)).body

  const res = await request(app)
    .post(`/companies/${company._id}/employees`)
    .send(employeeToCreate)

  t.is(res.status, 200)

  const companyAltered = res.body

  t.notDeepEqual(companyAltered, company)
  t.true(companyAltered.employees.length > 0)
})
