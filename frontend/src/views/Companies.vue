<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'companies',
  created() {
    this.fetchCompanies(this.$route.params.id)
  },
  computed: {
    ...mapState({
      companies: state => state.companies.data
    }),
  },
  methods: {
    ...mapActions(['fetchCompanies'])
  }
}
</script>

<template>
  <div class="companies">
    <h1>These companies use the book manager</h1>
  <div v-for="company in companies" :key="company._id">
    <a :href="`/companies/${company._id}`">{{ company.name }}</a>
  </div>
  </div>
</template>
