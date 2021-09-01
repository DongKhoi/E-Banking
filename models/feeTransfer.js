'use strict';
module.exports = (sequelize, DataTypes) => {
  const FeeTransfer = sequelize.define('FeeTransfer', {
    fee:DataTypes.DOUBLE,
    transDate:DataTypes.STRING
  }, {});
  FeeTransfer.associate = function(models) {
    // associations can be defined here
    FeeTransfer.belongsTo(models.Card, {foreignKey: 'card_ID'})
    
  };
  return FeeTransfer;
};