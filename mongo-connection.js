const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.error(err)
  })
