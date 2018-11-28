<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

import BookCard from '@/components/BookCard.vue'

export default {
  name: 'company',
  created () {
    this.fetchCompany(this.$route.params.id)
  },
  components: {
    BookCard
  },
  computed: {
    ...mapState({
      company: state => state.company.data,
      book: state => state.company.book
    }),
    ...mapFields([
      'book.author',
      'book.title'
    ])
  },
  methods: {
    ...mapActions(['fetchCompany', 'addBook']),
    createBook () {
      this.addBook(this.book)
    }
  }
}
</script>

<template>
  <div class="company">
    <h1>{{ company.name }}</h1>
    <p class='location'>{{ company.city }}, {{ company.country }}</p>

    <div v-if="company.books">
      <h2>Books</h2>
      <div class='book_list'>
        <div v-for="book in company.books" :key='book._id'>
          <BookCard :book='book' />
        </div>
      </div>
    </div>

    <div class='create-book'>
      <div class="form-element">
        <label>
          Author: <input v-model="book.author">
        </label>
      </div>
      <div class="form-element">
        <label>
          Title: <input v-model="book.title">
        </label>
      </div>
       <div class="form-element">
        <label>
          Image link: <input v-model="book.image">
        </label>
      </div>
      <button @click="createBook">
        Add new book
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.location {
  font-size: 20px;
}

.book_list {
  display: flex;
}

.book_list-item {
  list-style: none;
}
</style>
