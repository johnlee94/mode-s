const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  shopifyId: Number,
  phone: String,
  address: String,
  sub: {type: Boolean, default: false },
  subAt: {type: Date, default: null},
  subId: {type: Number, default: null},
  sport: {type: String, default: null},
  gender: {type: String, default: null}
});

mongoose.model('users', userSchema);
