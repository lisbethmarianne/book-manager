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
    ref: 'Company'
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }
})

module.exports = mongoose.model('Book', BookSchema)
