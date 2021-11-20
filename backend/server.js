require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('./db')
const Company = require('./models/company')
const Benton = require('./models/benton')
const User = require('./models/user')
const Order = require('./models/order')

console.log(process.env.NODE_ENV)

mongoose.connect()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ---- company ---------

app.post('/admin/company', (req, res) => {
  new Company(req.body)
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.json({ result: err }))
})

app.get('/company', (req, res) => {
  Company.find().then((result) => {
    res.json(result)
  })
})

// be careful this api route must before the /company/:id route
app.get('/company/selected', (req, res) => {
  Company.findOne({ selected: true })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.get('/company/:id', (req, res) => {
  Company.findById(req.params.id).then((result) => {
    res.json(result)
  })
})

app.patch('/admin/company/:id', (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.delete('/admin/company/:id', (req, res) => {
  Company.deleteOne({ id: req.params.id })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.patch('/company/:id/selected', (req, res) => {
  Company.updateMany({}, { selected: false, holderId: '', holderAddress: '' })
    .then((_result) => {
      if (req.body.cancel) {
        return res.json(_result)
      }

      const data = {
        selected: true,
        holderId: req.body.adminUserId,
      }

      if (req.body.adminUserAddress) {
        data.holderAddress = req.body.adminUserAddress
      }

      Company.findByIdAndUpdate(req.params.id, data)
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          res.status(400).json(err)
        })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// ---- benton ---------

app.get('/company/:id/menu', (req, res) => {
  Benton.find({ companyId: req.params.id })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.post('/admin/company/:id/benton', (req, res) => {
  new Benton({
    companyId: req.params.id,
    ...req.body,
  })
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.patch('/admin/benton/:id', (req, res) => {
  Benton.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.delete('/admin/benton/:id', (req, res) => {
  Benton.deleteOne({ id: req.params.id })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

// --- user ------
app.get('/admin/user', (req, res) => {
  User.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.get('/user/:emailId', (req, res) => {
  User.findOne({ emailId: req.params.emailId })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.post('/user', (req, res) => {
  new User(req.body)
    .save()
    .then(() => res.json({ result: 'ok' }))
    .catch((err) => res.json({ result: err }))
})

app.post('/user/:emailId/register', (req, res) => {
  if (!req.params.emailId) {
    return res.status(400).json({ err: 'need emailId' })
  }

  // TODO: should use findOneAndUpdate()
  User.findOne({ emailId: req.params.emailId }).then((result) => {
    if (!result) {
      // create one
      new User({
        emailId: req.params.emailId,
        ...req.body,
      })
        .save()
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          res.json(err)
        })
    } else {
      res.json(result)
    }
  })
})

app.patch('/admin/user/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.delete('/admin/user/:id', (req, res) => {
  User.deleteOne({ id: req.params.id })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

//  ------- order ----------
app.post('/order', (req, res) => {
  new Order(req.body)
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.delete('/order/:orderId', (req, res) => {
  Order.findByIdAndDelete(req.params.orderId)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// total order
app.get('/order/today', (req, res) => {
  const start = new Date().setHours(0, 0, 0, 0)
  const end = new Date().setHours(23, 59, 59, 999)

  Order.find({
    updatedAt: { $gte: start, $lt: end },
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// update order paid status then return the updated order
app.patch('/order/today/:id', (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
})

// get today user order
app.get('/order/today/user/:userId', (req, res) => {
  const start = new Date().setHours(0, 0, 0, 0)
  const end = new Date().setHours(23, 59, 59, 999)

  Order.find({
    userId: req.params.userId,
    updatedAt: { $gte: start, $lt: end },
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.get('/order/today/count', (req, res) => {
  const start = new Date().setHours(0, 0, 0, 0)
  const end = new Date().setHours(23, 59, 59, 999)

  Order.aggregate([
    {
      $match: { updatedAt: { $gte: new Date(start), $lt: new Date(end) } },
    },
    {
      $group: { _id: '$bentonName', total: { $sum: '$amount' } },
    },
    { $sort: { total: -1, _id: 1 } },
  ])
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

app.listen(process.env.PORT, () => {
  console.log(`listening at ${process.env.PORT}`)
})
