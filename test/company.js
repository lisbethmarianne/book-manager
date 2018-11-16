import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Get list of companies', async t => {
  const companyToCreate = { name: 'Marley Spoon', city: 'Berlin', country: 'Germany' }

  await request(app)
    .post('/companies')
    .send(companyToCreate)

  const res = await request(app).get('/companies')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})
