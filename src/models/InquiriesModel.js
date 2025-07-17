const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  // Property Information
  name: String,
  email: String,
  phone: String,
  timeframe: String,
  property_address: String,
  city: String,
  property_type: String,
  message: String,
  isResponse: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
