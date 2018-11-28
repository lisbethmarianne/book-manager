<script>
export default {
  name: 'BookCard',
  props: {
    book: Object
  }
}
</script>

<template>
  <div class='book'>
    <img class='book_image' :src='book.image'>
    <p>{{book.author}}: {{book.title}}</p>
    <a :href="`/books/${book._id}`">View</a>
  </div>
</template>

<style>
.book {
  margin: 30px;
}

.book_image {
  width: 50px;
}
</style>
