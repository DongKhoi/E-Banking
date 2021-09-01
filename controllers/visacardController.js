let controller={};
let models=require('../models');
let VisaCard=models.VisaCard;
controller.createVisaCard=async(Icard)=>{
    return await VisaCard.create(Icard);
};
controller.getListVisaCard = async function(req,res) {
    try{
        if (req.session.account) {
            const listVisaCard = await controller.getListVisaCardAsync(req.session.account.id)
            res.locals.listVisaCard = listVisaCard;
           // console.log(res.locals.listCard);
        }
        else {
            res.locals.listVisaCard = {};
        }
       
        res.render('visacard');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
   
}

//them tham so id tim vao
controller.getListVisaCardAsync = async(id) => {
    const listVisaCard = await VisaCard.findAll({where: {
        userID: id,
        status: 'active'
    }});
    return listVisaCard;
}
controller.getListVisaCardAsyncAdmin = async(id) => {
    const listVisaCard = await VisaCard.findAll();
    return listVisaCard;
}
controller.getVisaCardByCardNumber= async(cardnumber)=>{
    return await VisaCard.findOne({
        where:{cardnumber: cardnumber}
    });
};

controller.removeVisaCardByCardNumber = async(cardnumber)=>{
    return await VisaCard.destroy({
        where:{cardnumber: cardnumber}
    });
};

controller.lockVisaCardByCardNumber = async(cardnumber)=>{
    return await VisaCard.update({
        status:"lock"
    },{
        where:{cardnumber: cardnumber}
    });
}
controller.activeVisaCardByCardNumber = async(cardnumber)=>{
    const visaCard = await VisaCard.findOne({
        where:{cardnumber: cardnumber}
    });
    visaCard.status = "active"
    await visaCard.save()
}
module.exports = controller