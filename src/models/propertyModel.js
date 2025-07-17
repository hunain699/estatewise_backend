const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  //Property Information
  title: String,
  location: String,
  price:  String,
  category: String,
  images: [
      {
        type: String,
        required: true
      }
    ],
  status: String,
  description: String,

  //Property Detail
  bedrooms: String,
  bathrooms: String,
  lotSize: String,
  yearBuild: String,
  garage: String,
  area: String,
  features: [
      {
        type: String,
      }
    ],

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
