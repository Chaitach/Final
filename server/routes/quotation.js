var express = require('express')
const res = require('express/lib/response')
var router = express.Router()
const mongoose = require('mongoose')
var Quotation = require('../db/models/quotation')

// list
router.get('/list', (req, res, next) => {
  Quotation.find({})
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
})

// Post
router.post('/create', (req, res, next) => {
  var quotation = req.body

  Quotation.create(quotation)
    .then((data) => {
      res.status(200).json({ success: true, message: 'created quotaion completed' })
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
})

// delete
router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  console.log(id)
  Quotation.findOneAndDelete({ _id: id })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err)

      next(err)
    })
})

module.exports = router
