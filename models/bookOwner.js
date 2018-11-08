const mongoose = require('mongoose')

const BookOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  city: String,
  country: String,
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

module.exports = mongoose.model('BookOwner', BookOwnerSchema)
