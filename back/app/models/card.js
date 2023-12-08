const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize');

class Card extends Model {}

Card.init({
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  color: DataTypes.TEXT,
  position: DataTypes.INTEGER,
  list_id: DataTypes.INTEGER
},{
  sequelize,
  tableName: 'card',
})

module.exports = Card;