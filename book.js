module.exports = class Book {
  constructor(title, author, ownerId) {
    this.title = title
    this.author = author
    this.ownerId = ownerId
  }

  static create({title, author, ownerId}) {
    return new Book(title, author, ownerId)
  }
}
