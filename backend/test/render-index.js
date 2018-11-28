import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Index page should be rendered', async t => {
  const res = await request(app).get('/')

  t.is(res.status, 200)
  t.true(res.text.includes('hello there 👋'))
})
