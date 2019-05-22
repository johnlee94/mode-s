const bodyParser = require('body-parser');
const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
require('./models/User');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

mongoose.connect(keys.mongoURI);

const apiKey = keys.SHOPIFY_API_KEY
const apiSecret = keys.SHOPIFY_API_SECRET_KEY;
const forwardingAddress = "https://4203f9de.ngrok.io"
var accessToken;

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
//
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/userRoutes')(app);
require('./routes/shopifyRoutes')(app);
// require('./routes/billingRoutes')(app);
// require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.post('/', function(req,res){
	let inputContent = req.body.textField;
	console.log(inputContent);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
