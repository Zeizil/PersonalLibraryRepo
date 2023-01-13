const { User, Book, Comment } = require('./User');

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });





module.exports = { User, Book, Comment };
