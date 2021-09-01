'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    userName: DataTypes.STRING,
    passWord: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    isAdmin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    Account.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return Account;
};