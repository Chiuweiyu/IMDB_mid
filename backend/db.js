require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongoDB = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

exports.connect = () => {
  mongoose
    .connect(mongoDB, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 1000,
      serverSelectionTimeoutMS: 1000,
    })
    .then(() => console.log('mongoDB connected...'))
  return mongoose.connection
}
