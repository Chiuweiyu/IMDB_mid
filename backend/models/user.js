const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: String,
    isAdmin: { // 目前只有admin可以發起活動
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', schemaUser)

module.exports = User
