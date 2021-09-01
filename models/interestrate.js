'use strict';
module.exports = (sequelize, DataTypes) => {
  const interestrate = sequelize.define('interestrate', {
    period : DataTypes.STRING,
    interestrate : DataTypes.STRING,
  }, {});
  return interestrate;
};