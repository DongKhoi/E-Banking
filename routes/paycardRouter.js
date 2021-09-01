let express = require('express');
let router = express.Router();
let paycardController = require('../controllers/paycardController');
let accountController = require('../controllers/accountController');
let expirateController = require('../controllers/expirateController');
router.get('/', async(req, res) => {
    try{
        if (req.session.account) {
            const listCard = await paycardController.getListCardAsyncAdmin(req.session.account.id)
            res.locals.listCard = listCard;
            const listExpirate = await expirateController.getExpirate()
            res.locals.listExpirate = listExpirate;
        }
        else {
            res.locals.listCard = {};
        }
       
        res.render('paycard');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
})
router.get('/request', async(req, res) => {
    try{
        if (req.session.account) {
            const listCard = await paycardController.getListCardAsyncAdmin(req.session.account.id)
            res.locals.listCard = listCard;
        }
        else {
            res.locals.listCard = {};
        }
       
        res.render('request');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
})

router.post('/request', async(req, res) => {
    try{
        if (req.session.account) {
            await paycardController.activeCardByCardNumber(req.body.CardNumberList)
            req.locals.isSuccess = true
        }
        else {
            req.locals.isSuccess = fail
        }
    
        res.redirect('/')
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
})

router.post('/', async (req, res, next) => {
            function getRandomInt(max) {
                return Math.floor(Math.random(100) * Math.floor(max));
              }
            let CardNumber = "970407886208" + req.session.account.id + getRandomInt(999);
            let ParentAccount = 0;
            let Status = "nonactive";
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear() + 1;
            today = mm + '/' + dd + '/' + yyyy;
            
            try {
                paycard = {
                    userID:req.session.account.id, //ddaya la id dang dang nhap
                    cardnumber : CardNumber,
                    parentaccount : ParentAccount,
                    status : Status,
                    expirationdate : today

                }
               await paycardController.createCard(paycard)
               //dien vao nay 

               const listCard = await paycardController.getListCardAsync(req.session.account.id)
               console.log("*************************")
               console.log(req.session.account.id)
               console.log(listCard)
                res.render('paycard', {
                    message: 'Sent a tag request to admin!!',
                    type: 'alert-primary',
                    listCard
                });
            }
            catch (error) {
                console.log(error);
                res.render('paycard', {
                    message: 'Create pay card failed !',
                    type: 'alert-primary'
                });
            }
});

router.get('/api/getCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await paycardController.getCardByCardNumber(req.params.cardnumber)

        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})

router.get('/api/lockCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await paycardController.lockCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})

router.get('/api/removeCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await paycardController.removeCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    res.render('paycard', {
    message: 'You have removed !!',
    type: 'alert-primary'
    });
    return res.send({})
})

router.get('/api/CardStatus/:cardnumber', async(req, res) => {
    try {
        const paycard = await paycardController.activeCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        //console.log(err)
        res.send({})
    }
    
})

module.exports = router;