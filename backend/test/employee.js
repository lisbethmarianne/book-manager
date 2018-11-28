import test from 'ava'
import request from 'supertest'
import app from '../app'
import Employee from '../models/employee'
import Company from '../models/company'

test('Fetch an employee', async t => {
  t.plan(2)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const employeeToCreate = {
    name: 'Katrin',
    companyId: companyCreated._id
  }
  const employeeCreated = await Employee.create(employeeToCreate)

  const res = await request(app).get(`/employees/${employeeCreated._id}`)

  t.is(res.status, 200)
  t.is(res.body.name, employeeToCreate.name)
})

test('Delete an employee', async t => {
  t.plan(3)
  const companyToCreate = { name: 'Marley Spoon AG', city: 'Berlin', country: 'Germany' }
  const companyCreated = await Company.create(companyToCreate)

  const employeeToCreate = {
    name: 'Katrin',
    companyId: companyCreated._id
  }
  const employeeCreated = await Employee.create(employeeToCreate)

  const del = await request(app).delete(`/employees/${employeeCreated._id}`)

  t.is(del.status, 200)
  t.is(del.text, 'ok')

  const fetch = await request(app).get(`/employees/${employeeCreated._id}`)

  t.is(fetch.status, 404)
})
