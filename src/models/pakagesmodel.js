// packageModel.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    firstName:   { type: String, required: true },
    lastName:    { type: String, required: true },
    email:       { type: String, required: true, lowercase: true },
    phone:       { type: String, required: true },
    license:     { type: String, required: true },
    mlsId:       { type: String },

    brokerageName: { type: String,  },
    brokerName:    { type: String,  },
    officeEmail:   { type: String },
    officePhone:   { type: String },
    officeAddress1:{ type: String },
    officeAddress2:{ type: String },
    city:          { type: String },
    state:         { type: String },
    zipCode:       { type: String },

    primaryArea1:   { type: String },
    primaryArea2:   { type: String },
    serviceRadius:  { type: String },
    secondaryArea1: { type: String },
    secondaryArea2: { type: String },

    packageName:           { type: String, required: true },
    amount:                { type: String, required: true },
    isPaid:                { type: Boolean, default: false },
    stripePaymentIntentId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
