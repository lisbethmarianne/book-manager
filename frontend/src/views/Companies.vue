<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'companies',
  created() {
    this.fetchCompanies(this.$route.params.id)
  },
  computed: {
    ...mapState({
      companies: state => state.companies.data,
      company: state => state.companies.company
    }),
    ...mapFields([
      'company.name',
      'company.city',
      'company.country'
    ])
  },
  methods: {
    ...mapActions(['fetchCompanies', 'addCompany']),
    createCompany () {
      this.addCompany(this.company)
    }
  }
}
</script>

<template>
  <div class="companies">
    <div class='create-company'>
      <div class="form-element">
        <label>
          Name: <input v-model="company.name">
        </label>
      </div>
      <div class="form-element">
        <label>
          City: <input v-model="company.city">
        </label>
      </div>
      <div class="form-element">
        <label>
          Country: <input v-model="company.country">
        </label>
      </div>
      <button @click="createCompany">
        Add new company
      </button>
    </div>

    <h1>These companies use the book manager</h1>
    <div v-for="company in companies" :key="company._id">
      <a :href="`/companies/${company._id}`">{{ company.name }}</a>
    </div>
  </div>
</template>
