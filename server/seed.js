require('dotenv').config()
require('./db/db')
const mongoose = require('mongoose')
var Product = require('./db/models/products')

var prodcts = [
  { code: 'QT0001', name: 'Chair', price: 300, remaingStock: 10 },
  { code: 'QT0002', name: 'Table', price: 500, remaingStock: 10 },
  { code: 'QT0003', name: 'Lamp', price: 200, remaingStock: 10 },
  { code: 'QT0004', name: 'Bed', price: 1000, remaingStock: 10 },
  { code: 'QT0005', name: 'Curtain', price: 500, remaingStock: 10 }
]

Product.insertMany(prodcts)
  .then((res) => {
    console.log('seed products completed')
  })
  .catch((err) => {
    console.error(err)
  })
