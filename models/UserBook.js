// 'Link' table for the user-to-book (M:M) relationship

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserBook extends Model {}

UserBook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userbook',
  }
);

module.exports = UserBook;