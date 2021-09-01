'use strict';
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define('Services', {
    tienDien: DataTypes.DOUBLE,
    tienNuoc: DataTypes.DOUBLE,
    balance: DataTypes.DOUBLE,
    isAdmin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {});
  Services.associate = function(models) {
    // associations can be defined here
    Services.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return Services;
};