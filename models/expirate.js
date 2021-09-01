'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expirate = sequelize.define('Expirate', {
    timeExpiration : DataTypes.DOUBLE,
    feeOfExpiration : DataTypes.DOUBLE,
  }, {});
  return Expirate;
};