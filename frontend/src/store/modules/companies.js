import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const CREATE_SUCCESS = 'CREATE_SUCCESS'

const state = {
  data: [],
  company: {
    name: '',
    city: '',
    country: ''
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
    state.company = {
      name: '',
      city: '',
      country: ''
    }
    state.data = data
  },
  updateField
}

const actions = {
  async fetchCompanies ({ commit }) {
    const res = await axios.get(`http://localhost:3000/companies`)
    commit(REQUEST_SUCCESS, res.data)
  },
  async addCompany ({ commit }, company) {
    await axios.post(`http://localhost:3000/companies`, company)
    const res = await axios.get(`http://localhost:3000/companies`)
    commit(CREATE_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
