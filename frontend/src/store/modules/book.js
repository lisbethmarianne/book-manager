import axios from 'axios'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const REQUEST_EMPLOYEES_SUCCESS = 'REQUEST_EMPLOYEES_SUCCESS'

const state = {
  data: {},
  employees: []
}

const mutations = {
  [REQUEST_SUCCESS] (state, data) {
    state.data = data
  },
  [REQUEST_EMPLOYEES_SUCCESS] (state, data) {
    state.employees = data
  }
}

const actions = {
  async fetchBook ({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/books/${id}`)
    commit(REQUEST_SUCCESS, res.data)

    const companyId = res.data.owner._id
    const employeesRes = await axios.get(`http://localhost:3000/companies/${companyId}/employees`)
    commit(REQUEST_EMPLOYEES_SUCCESS, employeesRes.data)
  },
  async addReader ({ commit, state }, readerId) {
    await axios.post(
      `http://localhost:3000/books/${state.data._id}/read`,
      { employeeId: readerId }
    )
    const res = await axios.get(`http://localhost:3000/books/${state.data._id}`)
    commit(REQUEST_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions
}
