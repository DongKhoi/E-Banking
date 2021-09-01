let express = require('express');
let router = express.Router();
let accountController = require('../controllers/accountController');
let userController = require('../controllers/userController');
let emailController = require('../controllers/emailController');
let models=require('../models');
let Account=models.Account;


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let keepLoggedId = (req.body.keepLoggedId != undefined);
    let id;
   
    
    await accountController.getAccountByUsername(userName).then(account => {
        if (account) {
            if (accountController.comparePassword(passWord, account.passWord) &&  account.active==true){
                req.session.cookie.maxAge = keepLoggedId ? 30 * 24 * 60 * 60 * 100 : null;
                req.session.account = account;
                id=account.userID;
               
            }
            else {
                res.render('register', {
                    message: 'Incorrect Password!',
                    type: 'alert-danger'
                });
            }
            
        }
        else {
            res.render('register', {
                message: 'Username not exists!',
                type: 'alert-danger'
            });
        }
    });
    await userController.getUserById(id).then(user=>{
        if(user){
            req.session.user = user;
            res.redirect('/');
        }
    });
 
   
    

});

//bắt sự kiện post

let fullName, email, userName,passWord,confirmPassword;

router.post('/register', async (req, res, next) => {
    fullName = req.body.fullName;
    email = req.body.email;
    userName = req.body.userName;
    passWord = req.body.passWord;
    confirmPassword = req.body.confirmPassword;
    let active=false;
    let balance = 0;
    let isAdmin = true;
    //kiem tra confrmpassword va password co giong nhau khong
    if (passWord != confirmPassword) {
        return res.render('register', {
            message: 'Confirm password does not match!',
            type: 'alert-danger',
        });
    }

    // kiểm tra username tôn tai
    accountController.getAccountByUsername(userName).then(async account => {
        if (account) {
            return res.render('register', {
                message: `Username ${userName} exists!`,
                type: 'alert-danger'
            });
        }
        else {
            //kiểm tra email đã được đăng ký chưa
            userController.getUserByEmail(email).then(async user => {
                if (user) {
                    return res.render('register', {
                        message: `Email ${email} exists! Please choose another email address!`,
                        type: 'alert-danger'
                    });
                }
                else {
                    //tao tai khoan
                    try {
                        user = {
                            fullName,
                            email
                        };
                        userController.createUser(user).then(data => {
                            account = {
                                    userName,
                                    passWord,
                                    active,
                                    balance,
                                    //isAdmin,
                                    userID: data.id
                            }
                            accountController.createAccount(account);
                            rand = Math.floor((Math.random() * 100001) + 100000);
                            host = req.get('host');
                            link = "http://" + host + "/accounts/verify?id=" + rand;
                            options = {
                                from: "thanhnhan02677@gmail.com",
                                to: req.body.email,
                                subject: "Please confirm your Email account",
                                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link +
                                    ">Click here to verify</a>.<br>" +
                                    "Ma kich hoat la:" + rand
                            }
                            try {
                                emailController.sendMail(options);
                                return res.render('register', {
                                    message: `Email is been sent at your email. Please check inbox !`,
                                    type: "alert-primary"
                                });
                            }
                            catch (error) {
                                res.send(error.message);
                            }
                            
                           
                        })
                    }
                    catch (error) {
                        return res.render('register', {
                            message: 'Create account felid !',
                            type: 'alert-danger'
                        });
                    }
                }
            })
        }
    })

});

var rand, options, host, link;
router.get('/verify', function (req, res) {
    
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        if (req.query.id == rand) {
            Account.update({
                active:true

            }, {
                where:{
                    userName:userName
                }
            })

            return res.render('register', {
                message: `Email ${options.from} is been successfully verified!!!`,
                type: "alert-primary"
            });
        }
        else {
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});


router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        res.locals.isLoggedIn = false;
        res.locals.isAdmin = false; //Gai nay false, chac luc nay true ok
        if (error) {
            return next(error);
        }
        return res.render('register')
    })
}); 

router.get('/api/releaseBalance/:amount/numberCard/:numberCard/month/:month', async (req, res) => {
    try {
        const amount = await accountController.releaseBalance(req.params.numberCard,req.params.amount, req.params.month)
        return res.send({ amount })
    }
    catch (err) {
        console.log(err)
    }
    return res.send({})
})
module.exports = router;