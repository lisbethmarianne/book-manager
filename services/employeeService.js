const Employee = require('../models/employee')

async function findAll() {
  return Employee.find()
}

async function find(_id) {
  return Employee.findOne({ _id })
}

async function findForCompany(companyId) {
  return Employee.find({ companyId: companyId })
}

async function add(employee) {
  return Employee.create(employee)
}

async function del(_id) {
  return Employee.remove({ _id })
}

module.exports = {
  findAll,
  find,
  findForCompany,
  add,
  del,
}
