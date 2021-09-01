let controller={};
let models=require('../models');
let saveaccount = models.saveaccount
controller.createSaveAccount=async(i)=>{
    return await saveaccount.create(i);
};

module.exports=controller