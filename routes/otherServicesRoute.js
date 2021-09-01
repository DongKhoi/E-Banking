let express = require('express');
let router = express.Router();
let accountController = require('../controllers/accountController');
let paycardController = require('../controllers/paycardController');
accountController
const stripeSecretKey = 'sk_test_nSeThLcgIzH9SCd0IETqKJQz00cjzVQOcn'
const stripePublicKey = 'pk_test_fStgWbPjxpMXtUdH7XLTslU3007jIeqJQ3'

const stripe = require('stripe')(stripeSecretKey)

router.get('/', async (req, res) => {
    try{
        if (req.session.account) {
            const listCard = await paycardController.getListCardAsync(req.session.account.id)
            res.locals.listCard = listCard;
            res.locals.stripePublicKey = stripePublicKey;
           // console.log(res.locals.listCard);
        }
        else {
            res.locals.listCard = {};
        }
       
        res.render('account', {
            
        });
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
})


router.post('/pay-bill',async function(req, res) {

  try {
    await stripe.pay.create({
        amount: req.body.total*100,
        source: req.body.stripeTokenId,
        currency: 'usd'
      })
      await accountController.decreaseBalance(req.session.account.id, req.body.total)
      res.send({message: 'Payment successful'})
  }
  catch (err) {
    console.log('Payment Fail' + err)
    res.status(500).end()
  }
})

module.exports = router