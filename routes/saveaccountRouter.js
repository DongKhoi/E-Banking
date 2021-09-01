let express = require('express');
let router = express.Router();
let saveaccountController = require('../controllers/saveaccountController');
let interestrateController = require('../controllers/interestrateController');

router.get('/', async function(req,res) {
    try{
        if (req.session.account) {
            
            const listinterestrate = await interestrateController.getinterestrate()
            res.locals.listinterestrate = listinterestrate;
            console.log(listinterestrate)
        }
        else {
            res.locals.listinterestrate = {};
        }
        res.render('saveaccount');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
   
})
router.post('/', async (req, res, next) => {
    let accountnumber ="1400" + req.session.account.id + getRandomInt(999);
    let period = req.body.Period
    let interestrate = req.body.Rate
    let parentaccount =req.body.Money
    try {
        saveaccount = {
            accountnumber,
            parentaccount,
            period,
            interestrate,
        }
       await saveaccountController.createSaveAccount(saveaccount)
       //dien vao nay 
        res.render('saveaccount', {
            message: 'Create Successfully',
            type: 'alert-primary',
        });
    }
    catch (error) {
        console.log(error);
        res.render('saveaccount', {
            message: 'Create failed !',
            type: 'alert-primary'
        });
    }
});
module.exports = router;