const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

// Users can have many comments, and individual comments will always belong to one user (1:M)
  // Cascade delete not needed (at least, at this moment) as we won't be allowing users to be deleted

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


// Books can have one comment, and individual comments will always belong to one book (1:M)

Book.hasOne(Comment, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Book, {
  foreignKey: 'book_id'
});


// Users can have many books, and individual books will always belong to one user (1:M)
  // Cascade delete not needed (at least, at this moment) as we won't be allowing users to be deleted

User.hasMany(Book, {
  foreignKey: 'user_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Book, Comment };
