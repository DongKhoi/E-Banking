'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    cardnumber : DataTypes.STRING,
    parentaccount : DataTypes.DOUBLE,
    status : DataTypes.STRING,
    expirationdate : DataTypes.DATE,
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return Card;
};