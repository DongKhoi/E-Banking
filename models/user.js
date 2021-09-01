'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    imagePath: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Account, {foreignKey: 'userID'})
    User.hasMany(models.Card, {foreignKey: 'userID'})
  };
  return User;
};