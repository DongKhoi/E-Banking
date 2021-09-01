let controller={};
let models=require('../models');
let interestrate=models.interestrate;
controller.createinterestrate=async(i)=>{
    return await interestrate.create(i);
};
controller.getinterestrateByPeriod = async(month) => {
    const listinterestrate = await interestrate.findAll({where: {
        period : month
    }});
    return listinterestrate;
}
controller.getinterestrate = async() => {
    const listinterestrate = await interestrate.findAll();
    return listinterestrate;
}
controller.removeinterestrate = async(period)=>{
    return await interestrate.destroy({
        where:{period: period}
    });
};
module.exports=controller