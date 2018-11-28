const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  city: String,
  country: String,
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
})

module.exports = mongoose.model('Company', CompanySchema)
