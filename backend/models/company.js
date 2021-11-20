const mongoose = require('mongoose')

const schemaCompany = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    address: String,
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    minOrderNum: Number,
    minOrderMoney: Number,
    orderBefore: String,
    restDay: [String],
    active: Boolean,
    selected: {
      // 是否被選為今天要訂的餐廳
      type: Boolean,
      default: false,
    },
    holderId: String, // 選擇該餐廳的發起人Id
    holderAddress: String, // 選擇該餐廳的發起人錢包地址, 以後應該在合約中
  },
  { timestamps: true },
)

const Company = mongoose.model('Company', schemaCompany)

module.exports = Company
