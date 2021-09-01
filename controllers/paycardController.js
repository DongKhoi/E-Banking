let controller={};
let models=require('../models');
let PayCard=models.Card;
let Expirate=models.Expirate;
controller.getPayCardByPhoneNumber= async(PhoneNumber)=>{
    return await PayCard.findOne({
        where:{PhoneNumber:PhoneNumber}
    });
};
controller.createCard=async(Icard)=>{
    return await PayCard.create(Icard);
};
controller.getListCard = async function(req,res) {
    try{
        if (req.session.account) {
            const listCard = await controller.getListCardAsync(req.session.account.id)
            res.locals.listCard = listCard;
           // sao nay su dung dc
           // này là hàm cửa router nhưng bỏ vào controller
        }
        else {
            res.locals.listCard = {};
        }
       
        res.render('paycard');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
   
}

//này get list card "active " roiif
controller.getListCardAsync = async(id) => {
    const listCard = await PayCard.findAll({where: {
        userID: id,
        status: 'active'
    }});
    return listCard;
}
// get list cho admin card nonactive
controller.getListCardAsyncAdmin = async(id) => {
    const listCard = await PayCard.findAll();
    
    return listCard;
}
controller.getCardByCardNumber= async(cardnumber)=>{
    return await PayCard.findOne({
        where:{cardnumber: cardnumber}
    });
};

controller.lockCardByCardNumber = async(cardnumber)=>{
    return await PayCard.update({
        status:"lock"
    },{
        where:{cardnumber: cardnumber}
    });
}

controller.removeCardByCardNumber = async(cardnumber)=>{
    return await PayCard.destroy({
        where:{cardnumber: cardnumber}
    });
};
controller.activeCardByCardNumber = async(cardnumber)=>{
    return await PayCard.update({
        status:"active"
    },{
        where:{cardnumber: cardnumber}
    });
}

//

module.exports=controller