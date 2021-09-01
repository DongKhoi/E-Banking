let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');


app.use(express.json());
// Cho phép lý dữ liệu từ form method POST
app.use(express.urlencoded({ extended: true }));


//Set public static folder
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
//use session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: null },
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    // account session
    res.locals.userName = req.session.account ? req.session.account.userName : '';
    res.locals.id=req.session.account ? req.session.account.id : '';
    res.locals.isLoggedIn = req.session.account ? true : false; //cái này thì nó hiểu
    res.locals.isAdmin = false;

    if (req.session.account !== undefined) {
        if ( req.session.account.isAdmin !== undefined) {
            res.locals.isAdmin = req.session.account.isAdmin === true
        }
    }
    // user session
    res.locals.id=req.session.user?req.session.user.id:'';
    res.locals.fullName=req.session.user?req.session.user.fullName:'';
    res.locals.birthDate=req.session.user?req.session.user.birthDate:'';
    res.locals.phone=req.session.user?req.session.user.phone:'';
    res.locals.email=req.session.user?req.session.user.email:'';
    //card sesion
    res.locals.cardNumber=req.session.card?req.session.card.cardnumber:'';
    next();
});

//Use view engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Define your router here
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/accounts', require('./routes/accountRouter'));
app.use('/users', require('./routes/userRouter'));
app.use('/paycard', require('./routes/paycardRouter'));
app.use('/visacard', require('./routes/visacardRouter'));
app.use('/account', require('./routes/chargeRouter'));
app.use('/paypals', require('./routes/paypalRouter'));
app.use('/expirate', require('./routes/expirateRouter'));
app.use('/interestrate', require('./routes/interestrateRouter'));
app.use('/transfers', require('./routes/transferRouter'));


app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync()
        .then(() => {
            res.send('database sync completed!')
        });
});
app.get('/:page', (req, res) => {
    let banners = {
    };
    let page = req.params.page;
    res.render(page, { banner: banners[page] })
});


//Set server port  & start server
app.listen(process.env.PORT || 5000)