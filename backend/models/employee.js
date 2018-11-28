const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
})

module.exports = mongoose.model('Employee', EmployeeSchema)
