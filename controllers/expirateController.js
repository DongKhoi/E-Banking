let controller={};
let models=require('../models');
let Expirate=models.Expirate;
controller.createExpirate=async(Ex)=>{
    return await Expirate.create(Ex);
};
controller.getExpirateByMonth = async(month) => {
    const listExpirate = await Expirate.findAll({where: {
        timeExpiration: month
    }});
    return listExpirate;
}

controller.getExpirate = async() => {
    const listExpirate = await Expirate.findAll();
    return listExpirate;
}
controller.removeExpirate = async(timeExpiration)=>{
    return await Expirate.destroy({
        where:{timeExpiration: timeExpiration}
    });
};
module.exports=controller