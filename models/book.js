const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookOwner'
  }
})

module.exports = mongoose.model('Book', BookSchema)
