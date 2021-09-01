let express = require('express');
let router = express.Router();
let expirateController = require('../controllers/expirateController');
let accountController = require('../controllers/accountController');

router.get('/', async function(req,res) {
    try{
        if (req.session.account) {
            const listExpirate = await expirateController.getExpirate()
            res.locals.listExpirate = listExpirate;
           // sao nay su dung dc
           // này là hàm cửa router nhưng bỏ vào controller
        }
        else {
            res.locals.listExpirate = {};
        }
       
        res.render('expirate');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
   
})

router.post('/', async (req, res, next) => {
    let timeExpiration = req.body.Month
    let feeOfExpiration = req.body.Fee
    try {
        expirate = {
            timeExpiration,
            feeOfExpiration,
        }
       await expirateController.createExpirate(expirate)
       //dien vao nay 
        res.render('expirate', {
            message: 'Create Successfully',
            type: 'alert-primary',
        });
    }
    catch (error) {
        console.log(error);
        res.render('expirate', {
            message: 'Create failed !',
            type: 'alert-primary'
        });
    }
});

router.get('/api/getExpirateByTime/:timeExpiration', async (req, res) => {
    try {
        const timeExpiration = await expirateController.getExpirateByMonth(req.params.timeExpiration)
        return res.send({ timeExpiration })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})

router.get('/api/removeExpirate/:timeExpiration', async (req, res) => {
    try {
        const timeExpiration = await expirateController.removeExpirate(req.params.timeExpiration)
        return res.send({ timeExpiration })
    }
    catch (err) {
        console.log(err)
    }
    res.render('expirate', {
    message: 'You have removed !!',
    type: 'alert-primary'
    });
    return res.send({})
})
module.exports = router;