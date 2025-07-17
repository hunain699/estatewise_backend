const Package = require('../models/pakagesmodel'); // adjust path as needed
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a new package record
const createPackage = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      license,
      mlsId,

      brokerageName,
      brokerName,
      officeEmail,
      officePhone,
      officeAddress1,
      officeAddress2,
      city,
      state,
      zipCode,

      primaryArea1,
      primaryArea2,
      serviceRadius,
      secondaryArea1,
      secondaryArea2,

      packageName,
      amount,
      isPaid,
      stripePaymentIntentId
    } = req.body;

    // Create new package document
    const newPackage = new Package({
      firstName,
      lastName,
      email,
      phone,
      license,
      mlsId,

      brokerageName,
      brokerName,
      officeEmail,
      officePhone,
      officeAddress1,
      officeAddress2,
      city,
      state,
      zipCode,

      primaryArea1,
      primaryArea2,
      serviceRadius,
      secondaryArea1,
      secondaryArea2,

      packageName,
      amount,
      isPaid,
      stripePaymentIntentId
    });

    await newPackage.save();

    res.status(201).json({
      message: 'Package created successfully!',
      data: newPackage
    });
  } catch (error) {
    console.error('Create Package Error:', error);
    res.status(500).json({ error: 'Something went wrong while creating the package.' });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, customerInfo, packageName } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        email: customerInfo?.email,
        name: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
        packageName: packageName,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};

const confirmAndSavePackage = async (req, res) => {
  try {
    const { customerInfo, packageName, amount, paymentIntentId } = req.body;

    // Retrieve and verify payment from Stripe
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    // Save package only if payment was successful
    const newPackage = new Package({
      ...customerInfo,
      packageName,
      amount,
      isPaid: true,
      stripePaymentIntentId: paymentIntentId,
    });

    const saved = await newPackage.save();

    res.status(201).json({
      message: 'Package saved after successful payment',
      data: saved
    });
  } catch (error) {
    console.error("Saving package failed:", error);
    res.status(500).json({ error: "Failed to save package after payment" });
  }
};
const getAllPakages = async (req, res) => {
  try {
    const properties = await Package.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching Pakages:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteInquiryById = async (req, res) => {
  try {
    const property = await Package.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting Inquiry:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createPackage,
  deleteInquiryById,
  createPaymentIntent,
  confirmAndSavePackage,
  getAllPakages,
};



