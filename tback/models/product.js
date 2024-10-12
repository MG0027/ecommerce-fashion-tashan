const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
  price:{
    type: Number,
    require: true,
  },
  category: {
    type: String,
    required: true
 },
 rating: {
  type: Number,
  default: 0,
  min: 0,
  max: 5
},
image: {
  type: String,
  required: true
},
category2: {
  type: String,
  required: true
},
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;