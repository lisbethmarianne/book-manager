import axios from 'axios'

const REQUEST_SUCCESS = 'REQUEST_SUCCESS'

const state = {
  data: {}
}

const mutations = {
  [REQUEST_SUCCESS] (state, data) {
    state.data = data
  }
}

const actions = {
  async fetchBook ({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/books/${id}`)
    commit(REQUEST_SUCCESS, res.data)
  }
}

export default {
  state,
  mutations,
  actions
}
