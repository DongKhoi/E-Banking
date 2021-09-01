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


router.post('/charge',async function(req, res) {

  try {
    await stripe.charges.create({
        amount: req.body.total*100,
        source: req.body.stripeTokenId,
        currency: 'usd'
      })
      await accountController.addBalance(req.session.account.id, req.body.total)
      res.send({message: 'Successfully purchased item'})
  }
  catch (err) {
    console.log('Charge Fail' + err)
    res.status(500).end()
  }
})

/* 
router.post('/charge', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {

        // const itemsArray = JSON.parse(req.body)
        // let total = 0
        // req.body.items.forEach(function(item) {
        //   const itemJson = itemsArray.find(function(i) {
        //     return i.id == item.id
        //   })
        //   total = total
        // })
  
        stripe.charges.create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: 'usd'
        }).then(async function() {
          
          console.log('Charge Successful')

          await accountController.addmoneytobalance(total)

          res.render('paycard', {
            message: 'Successfully purchased item',
            type: 'alert-primary',
        });
        }).catch(function() {
          console.log('Charge Fail')
          res.status(500).end()
        })
      }
    })
  })
  */


module.exports = router