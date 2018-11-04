const fs = require('fs')

const BookOwner = require('../models/bookOwner')

const dbPath = `${__dirname}/../book-owner-database.json`

async function findAll() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, file) => {
      if (err) return reject(err)

      const bookOwners = JSON.parse(file).map(BookOwner.create)

      resolve(bookOwners)
    })
  })
}

async function saveAll(bookOwners) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(bookOwners), (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}

async function find(ownerId) {
  const allBookOwners = await findAll()

  return allBookOwners.find(bookOwner => bookOwner.id == ownerId)
}

async function add(bookOwner) {
  const allBookOwners = await findAll()

  bookOwner = BookOwner.create(bookOwner)
  allBookOwners.push(bookOwner)

  await saveAll(allBookOwners)

  return bookOwner
}

async function update(bookOwner) {
  const allBookOwners = await findAll()
  const bookOwnerIndex = allBookOwners.findIndex(p => p.id == bookOwner.id)

  allBookOwners[bookOwnerIndex] = BookOwner.create(bookOwner)

  await saveAll(allBookOwners)

  return bookOwner
}

async function del(ownerId) {
  const allBookOwners = await findAll()
  const ownerIndex = allBookOwners.findIndex(p => p.id == ownerId)
  if (ownerIndex < 0) return

  allBookOwners.splice(ownerIndex, 1)

  saveAll(allBookOwners)
}

module.exports = {
  add,
  del,
  find,
  findAll,
  update,
}
