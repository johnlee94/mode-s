const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  active: {type: Boolean, default: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  prodcuts: [],
  lastBillingDate: Date,
  nextBillingDate: Date,
  lifeCycle: Number,
  email: String
});

mongoose.model('subscriptions', subscriptionSchema);
