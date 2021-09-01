let controller={};
let models=require('../models');
let Account=models.Account;
let PayCard=models.Card;
var bcrypt = require('bcryptjs');
const { getListCardAsync, createCard } = require('./paycardController');

controller.createAccount= async(account)=>{
    var salt = bcrypt.genSaltSync(10);
    account.passWord =bcrypt.hashSync(account.passWord, salt);
    return await Account.create(account);
};

controller.getAccountByUsername= async(userName)=>{
    return await Account.findOne({
        where:{userName: userName}
    });
};


controller.getAccountById = async(id) => {
    return await Account.findOne({
        where:{ userID: id}
    });
};

controller.comparePassword=(passWord,hash) => {
    return bcrypt.compareSync(passWord,hash);
};


controller.addBalance = async(id, ammount) =>{
   const account = await Account.findOne({
        where:{userID: id}
    });

    account.balance += parseFloat(ammount)
    await account.save()
};

controller.releaseBalance = async(id, ammount, date) =>{
    var cardHolder;
    await PayCard.findOne({
        where: {
            cardnumber: id
        }
    }).then(data => cardHolder = data);

    var account;
    await Account.findOne({
        where:{userID: cardHolder.id}
    }).then(data => account = data);
 
     account.balance -= parseFloat(ammount)

     let dateObj = new Date(cardHolder.expirationdate.toString())
     dateObj = dateObj.setMonth(dateObj.getMonth() + parseInt(date))

    console.log(cardHolder)
     cardHolder.expirationdate = dateObj
     console.log(cardHolder)
     await account.save()
     await cardHolder.save()
 };
module.exports=controller;