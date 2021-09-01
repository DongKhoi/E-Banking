'use strict';
module.exports = (sequelize, DataTypes) => {
  const VisaCard = sequelize.define('VisaCard', {
    cardnumber : DataTypes.STRING,
    debitmoney : DataTypes.DOUBLE,
    status : DataTypes.STRING,
    expirationdate : DataTypes.DATE,
  }, {});
  VisaCard.associate = function(models) {
    // associations can be defined here
    VisaCard.belongsTo(models.User, {foreignKey: 'userID'})
  };
  return VisaCard;
};