'use strict';
module.exports = (sequelize, DataTypes) => {
  const saveAccount = sequelize.define('saveaccount', {
    accountnumber : DataTypes.STRING,
    parentaccount : DataTypes.DOUBLE,
    period : DataTypes.STRING,
    interestrate : DataTypes.STRING,
  }, {});
  saveAccount.associate = function(models) {
    // associations can be defined here
    saveAccount.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return saveAccount;
};