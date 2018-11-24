import Vue from 'vue'
import Vuex from 'vuex'

import company from './modules/company'
import companies from './modules/companies'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    company,
    companies
  }
})
