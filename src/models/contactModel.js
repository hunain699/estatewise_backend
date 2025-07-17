const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Property Information
  name: String,
  email: String,
  phone: String,
  subject: String,
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

module.exports = mongoose.model('Contact', contactSchema);
