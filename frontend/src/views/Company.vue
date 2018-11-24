<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'company',
  created () {
    this.fetchCompany(this.$route.params.id)
  },
  computed: {
    ...mapState({
      company: state => state.company.data
    })
  },
  methods: {
    ...mapActions(['fetchCompany'])
  }
}
</script>

<template>
  <div class="company">
    <h1>{{company.name}}</h1>
    <p class='location'>{{company.city}}, {{company.country}}</p>

    <div v-if="company.books">
      <h2>Books</h2>
      <ul class='book_list' v-for="book in company.books" :key="book._id">
        <li class='book_list-item'>{{ book.author }}: {{ book.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.location {
  font-size: 20px;
}

.book_list {
  padding: 0;
}

.book_list-item {
  list-style: none;
}
</style>
