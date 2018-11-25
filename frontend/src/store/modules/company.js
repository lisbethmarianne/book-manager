import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const CREATE_SUCCESS = 'CREATE_SUCCESS'

const state = {
  data: {},
  book: {
    author: '',
    title: ''
  }
}

const getters = {
  getField
}

const mutations = {
  [REQUEST_SUCCESS] (state, data) {
    state.data = data
  },
  [CREATE_SUCCESS] (state, data) {
    state.book = {
      author: '',
      title: ''
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
    commit(CREATE_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
