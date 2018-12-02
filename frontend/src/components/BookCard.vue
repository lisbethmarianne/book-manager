<script>
export default {
  name: 'BookCard',
  props: {
    book: Object
  }
}
</script>

<template>
  <div :class="`book-card ${ book.reader ? 'not-available' : ''}`" >
    <div v-if="book.image !== undefined">
      <img class='book_image' :src="book.image"/>
    </div>
    <div v-else>
      <img class='book_image' src='../assets/book.png' />
    </div>
    <p>{{book.author}}</p>
    <h5>{{book.title}}</h5>
    <p class="availability">{{book.reader ? "" : "Available"}}</p>
    <a :href="`/books/${book._id}`">View</a>
  </div>
</template>

<style lang="scss">
.book_image {
  height: 120px;
  margin: 0 auto;
}

.availability {
  font-weight: bold;
}
</style>
