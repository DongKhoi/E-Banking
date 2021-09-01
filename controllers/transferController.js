
let controller={};
let models = require('../models');
let Card = models.Card;
let FeeTransfer =models.FeeTransfer;

controller.createFee=async(fee)=>{
        return await FeeTransfer.create(fee)
};

module.exports=controller;