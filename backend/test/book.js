import test from 'ava'
import request from 'supertest'
import app from '../app'
import Book from '../models/book'
import Company from '../models/company'
import Employee from '../models/employee'

test('Fetch a book', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const bookToCreate = {
    author: 'Haruki Murakami',
    title: 'Wild Sheep Chase',
    owner: companyCreated._id
  }
  const bookCreated = await Book.create(bookToCreate)

  const res = await request(app).get(`/books/${bookCreated._id}`)

  t.is(res.status, 200)
  t.is(res.body.author, bookToCreate.author)
  t.is(res.body.title, bookToCreate.title)
})

test('Delete a book', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const bookToCreate = {
    author: 'Haruki Murakami',
    title: 'Wild Sheep Chase',
    owner: companyCreated._id
  }
  const bookCreated = await Book.create(bookToCreate)

  const del = await request(app).delete(`/books/${bookCreated._id}`)

  t.is(del.status, 200)
  t.is(del.text, 'ok')

  const fetch = await request(app).get(`/books/${bookCreated._id}`)

  t.is(fetch.status, 404)
})

test('A book can have a reader', async t => {
  t.plan(2)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const bookToCreate = {
    author: 'Haruki Murakami',
    title: 'Wild Sheep Chase',
    owner: companyCreated._id
  }
  const bookCreated = await Book.create(bookToCreate)

  const employeeToCreate = {
    name: 'Katrin',
    companyId: companyCreated._id
  }
  const employeeCreated = await Employee.create(employeeToCreate)

  const res = await request(app).post(`/books/${bookCreated._id}/read`)
    .send({ employeeId: employeeCreated._id })

  t.is(res.status, 200)

  const bookAltered = res.body

  t.notDeepEqual(bookAltered, bookCreated)
  // t.is(bookAltered.reader, employeeCreated._id)
})
