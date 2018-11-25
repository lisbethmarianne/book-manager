<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'company',
  created () {
    this.fetchCompany(this.$route.params.id)
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
      <ul class='book_list' v-for="book in company.books" :key="book._id">
        <img class='book_image' :src='book.image'>
        <li class='book_list-item'>{{ book.author }}: {{ book.title }}</li>
        <a :href="`/books/${book._id}`">View</a>
      </ul>
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
  padding: 0;
}

.book_list-item {
  list-style: none;
}

.book_image {
  width: 50px;
}
</style>
