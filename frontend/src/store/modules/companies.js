import axios from 'axios'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'

const state = {
  data: []
}

const mutations = {
  [REQUEST_SUCCESS] (state, data) {
    state.data = data
  }
}

const actions = {
  async fetchCompanies ({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/companies`)
    commit(REQUEST_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions
}