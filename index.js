const express = require('express')
const bodyParser = require('body-parser')

const BookOwnerService = require('./services/bookOwnerService')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded())

app.get('/', (_, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server listening')
})

app.get('/owners', async (_, res) => {
  const owners = await BookOwnerService.findAll()

  res.render('owners', { owners })
})

app.get('/owners/new', async (_, res) => {
  res.render('new')
})

app.get('/owners/:id', async (req, res) => {
  const owner = await BookOwnerService.find(req.params.id)

  res.render('owner', { owner })
})

app.post('/owners', async (req, res) => {
  const owner = await BookOwnerService.add(req.body)

  res.render('owner', { owner })
})

app.delete('/owners/:id', async (req, res) => {
  await BookOwnerService.del(req.params.id)

  res.send('ok')
})

app.post('/owners/:id/books', async (req, res) => {
  const owner = await BookOwnerService.find(req.params.id)

  owner.addBook(req.body.title, req.body.author)
  await BookOwnerService.update(owner)

  res.render('owner', { owner })
})
