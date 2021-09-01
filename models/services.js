'use strict';
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define('Services', {
    tienDien: DataTypes.DOUBLE,
    tienNuoc: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN
  }, {});
  Services.associate = function(models) {
    // associations can be defined here
    Services.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return Services;
};