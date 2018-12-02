<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'companies',
  created () {
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
    <form class='create-company'>
      <div class="row">
        <div class="six columns offset-by-three">
          <label>Name</label>
          <input type='text' class='input u-full-width' v-model="company.name">
        </div>
      </div>
      <div class="row">
        <div class="three columns offset-by-three">
          <label>City</label>
          <input type='text' class='input u-full-width' v-model="company.city">
        </div>
        <div class="three columns">
          <label>Country</label>
          <input type='text' class='input u-full-width' v-model="company.country">
        </div>
      </div>
      <div class="row">
        <button class='button button-primary' @click="createCompany">
          Add new company
        </button>
      </div>
    </form>

    <h4>These companies use the book manager</h4>
    <div v-for="company in companies" :key="company._id">
      <a :href="`/companies/${company._id}`">{{ company.name }}</a>
    </div>
  </div>
</template>

<style>
.create-company {
  margin: 50px 0;
}
</style>
