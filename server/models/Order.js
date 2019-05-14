const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  lastChanged: Date,
  grossTotal: Number,
  discountRate: String,
  amountSaved: Number,
  amountCharged: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  fulfilled: { type: Boolean, default: true },
  delivered: {type: Boolean, default: false },
  deliveredAt: Date,
  subId: {type: Schema.Types.ObjectId, ref: "Subscription"},
  products: []
});

mongoose.model('orders', orderSchema);
