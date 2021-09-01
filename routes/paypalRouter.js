let express = require('express');
let router = express.Router();
const paypal = require('paypal-rest-sdk');
let models=require('../models');
let Account=models.Account;
let accountController = require('../controllers/accountController')
let userController = require('../controllers/userController');

router.get('/payIn',async (req, res) => {
    res.render('payIn');
});

var money;
router.post('/payIn', async (req, res) => {
    money=req.body.money;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/paypals/success",
            "cancel_url": "http://localhost:5000/paypals/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Nạp tiền",
                    "price": money,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": money
            },
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.send('Thu lai.....');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
            
        }
    });


});
//  Config paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXXBkl4b-NSiRZWX-OQDurM0-5yVmhWNvUvOmXqlgc-_s6embn_OX_7g6z5JKQILnN-e_N3kyqbJpEJ_',
    'client_secret': 'EAh73amnxLrDbN7HGjEz9QxGOk15kyuM8zqv1z1rGNQFRvM8SkYFNseGswYD536wmKn1n2qW3T9zG7rU'
});
router.get('/success', (req, res) => {


    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": money
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.send('thu lai......');
        } else {
            let account_id = req.session.account.id;
            let balance=req.session.account.balance;
            Account.update({
                balance: parseInt(money) + parseInt(balance)
            }, {
                where: { id: account_id }
            })
            res.redirect('/account')
        }
    });
});
router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;