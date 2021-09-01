let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');


router.get('/infoUser', (req, res) => {
    res.render('infoUser');
});





router.post('/updateUser', (req,res)=>{
   
    // userController.getUserByEmail(email)
    // const user{
    //     fullName=req.body.fullName,
    //     birthDate=req.body.birthDate,
    //     phone=req.body.phone,
    //     email=req.body.email
    // }
    // userController.updateUser(user);


});

// router.post('/register', (req, res, next) => {
//     let email = req.body.username;
//     let password = req.body.password;
//     let keepLoggedId=(req.body.keepLoggedId!=undefined);
//     userController
//         .getUserByEmail(email)
//         .then(user => {
//             if (user) {
//                 if (userController.comparePassword(password, user.password)) {
//                     req.session.cookie.maxAge=keepLoggedId ? 30*24*60*60*100:null;
//                     req.session.user = user;
//                     res.redirect('/');
//                 }
//                 else {
//                     res.render('login', {
//                         message: 'incorrect password!',
//                         type: 'aler-danger'
//                     });
//                 }

//             } else {
//                 res.render('login', {
//                     message: 'Email do not exists!',
//                     type: 'alert-danger'
//                 });
//             }
//         });
// });


// router.get('/register', (rep, res) => {
//     res.render('register');
// });

// //bắt sự kiện post
// router.post('/register', (req, res, next) => {
//     let fullname = req.body.fullname;
//     let email = req.body.username;
//     let password = req.body.password;
//     let confirmPassword = req.body.confirmPassword;
//     let keepLoggedId = (req.body.keepLoggedId != undefined);

//     //kiem tra confrmpassword va password co giong nhau khong
//     if (password != confirmPassword) {
//         return res.render('register', {
//             message: 'Confirm password does not match!',
//             type: 'alert-danger'
//         });
//     }
//     //kiem tra username chua ton tai
//     userController
//         .getUserByEmail(email)
//         .then(user => {
//             if (user) {
//                 return res.render('register', {
//                     message: `Email ${email} exists! Pleasse choose another email adress!`,
//                     type: 'alert-danger'
//                 });
//             };
//             //tao tai khoan
//             user = {
//                 fullname,
//                 username: email,
//                 password
//             };
//             return userController
//                 .createUser(user)
//                 .then(user => {
//                     if (keepLoggedId) {
//                         req.session.cookie.maxAge=30*24*60*60*1000;
//                         req.session.user = user;
//                         res.redirect('/');
//                     } else {
//                         res.render('login', {
//                             message: 'You have registered, now please login!',
//                             type: 'alert-primary'
//                         });
//                     }
//                 });
//         })
//         .catch(error => next(error));
// });

// router.get('/logout', (req, res, next) => {
//     req.session.destroy(error => {
//         if (error) {
//             return next(error);
//         }
//         return res.render('login')
//     })
// });
module.exports = router;