let express = require('express');
let router = express.Router();
let visacardController = require('../controllers/visacardController');
let accountController = require('../controllers/accountController');
router.get('/', visacardController.getListVisaCard);

router.get('/request', async(req, res) => {
    try{
        if (req.session.account) {
            const listVisaCard = await visacardController.getListVisaCardAsyncAdmin(req.session.account.id)
            res.locals.listVisaCard = listVisaCard;
        }
        else {
            res.locals.listVisaCard = {};
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
            await visacardController.activeVisaCardByCardNumber(req.body.visaCardNumberList)
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
            let VisaCardNumber = "424242424242" + req.session.account.id + getRandomInt(999);
            let DebitMoney = 0;
            let VisaStatus = "nonactive";
            try {
                visacard = {
                    userID:req.session.account.id, //ddaya la id dang dang nhap
                    cardnumber : VisaCardNumber,
                    debitmoney : DebitMoney,
                    status : VisaStatus
                }
               await visacardController.createVisaCard(visacard)
               //dien vao nay 
               const listVisaCard = await visacardController.getListVisaCardAsync(req.session.account.id)
               console.log("*************************")
               console.log(req.session.account.id)
               console.log(listVisaCard)
                res.render('visacard', {
                    message: 'Sent a tag request to admin!!',
                    type: 'alert-primary',
                    listVisaCard
                });
            }
            catch (error) {
                console.log(error);
                res.render('visacard', {
                    message: 'Create visa card failed !',
                    type: 'alert-primary'
                });
            }
});

router.get('/api/getVisaCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await visacardController.getVisaCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})

router.get('/api/removeVisaCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await visacardController.removeVisaCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    res.render('visacard', {
    message: 'You have removed !!',
    type: 'alert-primary'
    });
    return res.send({})
})

router.get('/api/lockVisaCardByCardNumber/:cardnumber', async (req, res) => {
    try {
        const cardNumber = await visacardController.lockVisaCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})

router.get('/api/VisaCardStatus/:cardnumber', async(req, res) => {
    try {
        const visacard = await visacardController.activeVisaCardByCardNumber(req.params.cardnumber)
        return res.send({ cardNumber })
    }
    catch (err) {
        //console.log(err)
        res.send({})
    }
    
})
module.exports = router;