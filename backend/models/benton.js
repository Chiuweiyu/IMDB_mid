const mongoose = require('mongoose')

const schemaBenton = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
)

const Benton = mongoose.model('Benton', schemaBenton)

module.exports = Benton
