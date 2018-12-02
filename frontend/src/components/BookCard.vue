<script>
export default {
  name: 'BookCard',
  props: {
    book: Object
  }
}
</script>

<template>
  <div class='book-card'>
    <img class='book_image' :src='book.image'>
    <p>{{book.author}}</p>
    <h5>{{book.title}}</h5>
    <a :href="`/books/${book._id}`">View</a>
  </div>
</template>

<style lang="scss">
.book_image {
  width: 100px;
}
</style>
