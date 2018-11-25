import Vue from 'vue'
import Vuex from 'vuex'

import company from './modules/company'
import companies from './modules/companies'
import book from './modules/book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    company,
    companies,
    book
  }
})
