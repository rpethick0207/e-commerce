//Variables
const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers/api');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const logger= require('morgan');
const index = require('./routes/index');
const cookieParser = require('cookie-parser');

require('dotenv').config()

//Express Middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Handlebars Middleware
app.engine('handlebars',exphbs.engine({defaultLayout:'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use('/',index);

// Cart Route
app.get('/', (req, res) => {
  res.render('cart', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

// Charge Route
app.post('/charge', (req, res) => {
  
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount: cartItem.item.price * cartItem.quantity,
    description: 'Graphics Card',
    currency: 'usd',
    customer: customer.id
  }))
  .then(charge => res.render('success'));
});



const port = process.env.PORT || 5000;

app.use(require('./controllers'));



sequelize.sync({ force: false }).then(() => {
 app.listen(port, () => console.log('Now listening'));
});

module.exports = app;