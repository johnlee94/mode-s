const keys = require('../config/keys');
// const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

  // STRIPE STUFF //

  // app.post('/api/stripe', requireLogin, async (req, res) => {
  //   const charge = await stripe.charges.create({
  //     amount: 500,
  //     currency: 'usd',
  //     description: '$5 for 5 credits',
  //     // req.body is parsed with body-parser module
  //     source: req.body.id
  //   });
  //
  //   // req.user comes from passport
  //   req.user.credits += 5;
  //   const user = await req.user.save();
  //
  //   res.send(user);
  // });

};
