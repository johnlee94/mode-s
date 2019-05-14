const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/current_user', (req, res) => {
  res.send(createUser(req.userDetails));
});

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
};
