<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'book',
  created () {
    this.fetchBook(this.$route.params.id)
  },
  computed: {
    ...mapState({
      book: state => state.book.data
    })
  },
  methods: {
    ...mapActions(['fetchBook'])
  }
}
</script>

<template>
  <div class="book">
    <h1>{{book.author}}: {{book.title}}</h1>
  </div>
</template>

<style lang="scss">
</style>
