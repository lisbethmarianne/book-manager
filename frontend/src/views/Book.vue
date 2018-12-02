<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'book',
  created () {
    this.fetchBook(this.$route.params.id)
  },
  computed: {
    ...mapState({
      book: state => state.book.data,
      employees: state => state.book.employees
    })
  },
  methods: {
    ...mapActions(['fetchBook', 'addReader']),
    setReader (reader) {
      console.log(reader)
      if (reader && reader === this.book.reader) {
        return
      } else {
        const readerId = reader ? reader._id : null
        this.addReader(readerId)
      }
    }
  }
}
</script>

<template>
  <div class="book">
    <h1>{{book.author}}: {{book.title}}</h1>
    <img class='cover' :src='book.image'>
    <p>{{book.reader ? book.reader.name : 'Nobody'}} is currently reading this book</p>

    <div class="form-element add-reader">
      <v-select
        label="name"
        @input="setReader"
        :options="employees"
        :value="book.reader"
      ></v-select>
    </div>

    <div class="breadcrumbs">
      <div v-if="book.owner !== undefined">
        <a :href="`/companies/${book.owner._id}`">See all books at {{book.owner.name}}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cover {
  width: 200px;
}

.add-reader {
  margin: 50px auto;
  width: 300px;

  button {
    span {
      line-height: 2.3;
    }
  }
}
</style>
