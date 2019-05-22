const mongoose = require('mongoose');
const keys = require('../config/keys');
const axios = require('axios');

const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/current_user', (req, res) => {

    console.log(req.body);

  var user = createUser(req.body)
  user.then(function(value) {
    console.log(value);
    res.send(value);
  })
});

  // (inputContent) => {
  //   const shop = 'getyourmod-e.myshopify.com'
  //   const shopRequestUrl = 'https://' + shop + '/admin/api/2019-04/customers/' +inputContent + '.json';
  //   const shopRequestHeaders = {
  //     'X-Shopify-Access-Token': accessToken,
  //   };
  //
  //   request.get(shopRequestUrl, { headers: shopRequestHeaders })
  //   .then((shopResponse) => {
  //     res.end(shopResponse);
  //     console.log(shopResponse)
  //   })
  //   .catch((error) => {
  //     res.status(error.statusCode).send(error.error.error_description);
  //   });
  // }
  // // .catch((error) => {
  // //   res.status(error.statusCode).send(error.error.error_description);
  // // });
  // })




  async function createUser(userDetails) {
    const existingUser = await User.findOne({ shopifyId:  userDetails.shopifyId});
    if (existingUser) {
      //we already have a user with the given profile ID
      return existingUser;
    }
      const user = await new User({
        name: userDetails.name,
        email: userDetails.email,
        shopifyId: userDetails.shopifyId,
        address: userDetails.address
      }).save();
      return user;
  }
}
