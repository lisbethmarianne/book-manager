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
      book: state => state.company.book,
      employee: state => state.company.employee
    }),
    ...mapFields([
      'book.author',
      'book.title'
    ])
  },
  methods: {
    ...mapActions(['fetchCompany', 'addBook', 'addEmployee']),
    createBook () {
      this.addBook(this.book)
    },
    createEmployee () {
      this.addEmployee(this.employee)
    }
  }
}
</script>

<template>
  <div class="company">
    <h1>{{ company.name }}</h1>
    <p class='location'>{{ company.city }}, {{ company.country }}</p>

    <section>
      <h2>Books</h2>
      <div class='book_list' v-if="company.books">
        <div v-for="book in company.books" :key='book._id'>
          <BookCard :book='book' />
        </div>

        <div class='book-card create-book'>
          <div class="form-element">
            <label>Author</label>
            <input class="input" type="text" v-model="book.author">
          </div>
          <div class="form-element">
            <label>Title</label>
            <input class="input" type="text" v-model="book.title">
          </div>
          <div class="form-element">
            <label>Image link</label>
            <input class="input" type="text" v-model="book.image">
          </div>
          <button class="button button-primary" @click="createBook">
            Add new book
          </button>
        </div>
      </div>
    </section>

    <section>
      <h2>Employees</h2>
      <div class='employee_list' v-if="company.employees">
        <div v-for="employee in company.employees" :key='employee._id'>
          <div class='employee'>
            <img class="user-icon" alt="user icon" src="../assets/user.png">
            <p>{{ employee.name }}</p>
          </div>
        </div>
      </div>

      <div class='create-employee'>
        <div class="form-element">
          <input class="input" type="text" v-model="employee.name">
        </div>
        <button class="button button-primary" @click="createEmployee">
          Add new employee
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
section {
  margin: 40px 0;
}
.location {
  font-size: 20px;
}

.book_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.employee_list {
  display: inline-flex;
}

.book_list-item {
  list-style: none;
}

.book-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 20px;
  width: 250px;
  height: 350px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.employee {
  margin: 5px;
}

.user-icon {
  width: 50px;
}

.create-book {
  .input {
    width: 100%;
  }
}
</style>
