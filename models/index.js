const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');
const UserBook = require('./UserBook');


// Users can have many comments, and individual comments will always belong to one user (1:M)
  // Cascade delete not needed (at least, at this moment) as we won't be allowing users to be deleted

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


// Books can have many comments, and individual comments will always belong to one book (1:M)
  // Cascade delete not needed (at least, at this moment) as we won't be allowing books to be deleted

Book.hasMany(Comment, {
  foreignKey: 'book_id',
});

Comment.belongsTo(Book, {
  foreignKey: 'book_id'
});


// Users can have many books, and books can have many users
  // Aliases subject to change
User.belongsToMany(Book, {
  through: {
    model: UserBook,
    unique: false
  },
  as: 'users_with_book'
});

Book.belongsToMany(User, {
  through: {
    model: UserBook,
    unique: false
  },
  as: 'books_in_inventory'
});


module.exports = { User, Book, Comment, UserBook };
