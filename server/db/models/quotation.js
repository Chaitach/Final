//Require Mongoose
var mongoose = require('mongoose')

//Define a schema
var Schema = mongoose.Schema

var QuotationSchema = new Schema(
  {
    products: [{ name: String, qty: Number, price: String, amount: String }],
    totalAmount: String
  },
  { timestamps: { createdAt: 'created_at',updatedAt:'updated_at' } }
)

//Export function to create "ProductSchema" model class
module.exports = mongoose.model('Quotation', QuotationSchema)
