const mongoose = require('mongoose')

const schemaOrder = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmailId: String,
    displayName: String,
    bentonId: {
      type: String,
      required: true,
    },
    bentonName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    companyId: String,
    companyName: String,
    paid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidMethod: {
      type: String,
      enum: ['fiat', 'crypto', 'line', 'other'],
    },
    amount: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true },
)

const Order = mongoose.model('Order', schemaOrder)

module.exports = Order
