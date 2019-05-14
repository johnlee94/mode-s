const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  shopifyId: Number,
  address: String,
  sub: {type: Boolean, default: false }
});

mongoose.model('users', userSchema);
