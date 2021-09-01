let express = require('express');
let router = express.Router();
let interestrateController = require('../controllers/interestrateController');

router.get('/', async function(req,res) {
    try{
        if (req.session.account) {
            const listinterestrate = await interestrateController.getinterestrate()
            res.locals.listinterestrate = listinterestrate;
        }
        else {
            res.locals.listinterestrate = {};
        }
       
        res.render('interestrate');
    }catch(err){
        console.log(err);
        res.send('Có lỗi');
    }
   
})
router.post('/', async (req, res, next) => {
    let period = req.body.Period
    let interestrate = req.body.Rate
    try {
        Interestrate = {
            period,
            interestrate,
        }
       await interestrateController.createinterestrate(Interestrate)
       //dien vao nay 
        res.render('interestrate', {
            message: 'Create Successfully',
            type: 'alert-primary',
        });
    }
    catch (error) {
        console.log(error);
        res.render('interestrate', {
            message: 'Create failed !',
            type: 'alert-primary'
        });
    }
});

router.get('/api/getInterestrateByPeriod/:period', async (req, res) => {
    try {
        const period = await interestrateController.getinterestrateByPeriod(req.params.period)
        return res.send({ period })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})
router.get('/api/removeinterestrate/:period', async (req, res) => {
    try {
        const period = await interestrateController.removeinterestrate(req.params.period)
        return res.send({ period })
    }
    catch (err) {
        console.log(err)
    }
    res.render('interestrate', {
    message: 'You have removed !!',
    type: 'alert-primary'
    });
    return res.send({})
})
module.exports = router;