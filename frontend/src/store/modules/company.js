import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS'
const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS'

const state = {
  data: {},
  book: {
    author: '',
    title: ''
  },
  employee: {
    name: ''
  }
}

const getters = {
  getField
}

const mutations = {
  [REQUEST_SUCCESS] (state, data) {
    state.data = data
  },
  [CREATE_BOOK_SUCCESS] (state, data) {
    state.book = {
      author: '',
      title: ''
    }
    state.data = data
  },
  [CREATE_EMPLOYEE_SUCCESS] (state, data) {
    state.employee = {
      name: ''
    }
    state.data = data
  },
  updateField
}

const actions = {
  async fetchCompany ({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/companies/${id}`)
    commit(REQUEST_SUCCESS, res.data)
  },
  async addBook ({ commit, state }, book) {
    await axios.post(`http://localhost:3000/companies/${state.data._id}/books`, book)
    const res = await axios.get(`http://localhost:3000/companies/${state.data._id}`)
    commit(CREATE_BOOK_SUCCESS, res.data)
  },
  async addEmployee ({ commit, state }, employee) {
    await axios.post(`http://localhost:3000/companies/${state.data._id}/employees`, employee)
    const res = await axios.get(`http://localhost:3000/companies/${state.data._id}`)
    commit(CREATE_EMPLOYEE_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
