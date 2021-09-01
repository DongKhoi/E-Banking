let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');
let transferController = require('../controllers/transferController');
let models = require('../models');
let Card = models.Card;
let Account = models.Account;
let FeeTrasfer = models.FeeTrasfer;

router.get('/transfer', (req, res) => {
    res.render('transfer');
});
let userID, cardnumber;
router.post('/getFullname', async (req, res) => {
    cardnumber = req.body.cardNumber;

    await Card.findOne({
        where: { cardnumber: cardnumber }
    }).then(cardNN => {
        userID = cardNN.userID;
        req.session.cardNN = cardNN;
    });

    await userController.getUserById(userID).then(userNN => {
        req.session.userNN = userNN;

    })

    res.locals.cardNumberNN = req.session.cardNN.cardnumber;
    res.locals.fullNameNN = req.session.userNN.fullName;

    res.render('transfer');

});

router.post('/Send', async (req, res) => {
    res.locals.cardNumberNN = cardnumber;
    res.locals.fullNameNN = req.session.userNN.fullName;
    const fee=5000;//mat dinh phi chuyen
    const userID = req.session.userNN.id;
    let account_id_nhan, balance_nhan, account_id_gui, balance_gui;
    const moneySend = req.body.moneySend;
    res.locals.moneySend=moneySend;
    // console.log("so tien chuyen:" + moneySend);
    await Account.findOne({
        where: { userID: userID }
    }).then(account_nhan => {
        account_id_nhan = account_nhan.id;
        balance_nhan = account_nhan.balance;
    });
    let money = parseInt(balance_nhan) + parseInt(moneySend);
    // console.log("so tien tron TK NN:" + money);

    // update account nguoi nhan
    await Account.update({
        balance: money
    }, {
        where: { id: account_id_nhan }
    });
    // // // //update account nguoi gui
     account_id_gui = req.session.account.id;
    //  const cardnumber=req.session.card.cardnumber;
     await Account.findOne({
        where:{id:account_id_gui}
    }).then(account_gui=>{
        balance_gui=account_gui.balance;
    });
    // console.log("account_id_gui:  " + cardnumber);
    // // console.log("balance_gui:  " + balance_gui);
    money = parseInt(balance_gui) - parseInt(moneySend);
    // // console.log("soo tien update:  " + money);
    await Account.update({
        balance: money
    }, {
        where: { id: account_id_gui }
    });
    const userID_NG = req.session.user.id;
    await Card.findOne({
        where:{userID:userID_NG}
    }).then(card_NG=>{
        req.session.card_NG=card_NG
    })
    const cardNumberNG=req.session.card_NG.id;
    const feetrans={
        fee:5000,
        transDate:Date(),
        cardNumber:cardNumberNG 
    }
    await transferController.createFee(feetrans);
    return res.render('transfer')
});

module.exports = router;

