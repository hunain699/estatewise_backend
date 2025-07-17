const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createPackage,
  getAllPakages,
  createPaymentIntent,
  confirmAndSavePackage,
  deleteInquiryById,
} = require('../controllers/packageController');

// Register with image
router.post('/', createPackage);
router.get("/", getAllPakages);
router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirm-package', confirmAndSavePackage);
router.delete("/:id", deleteInquiryById);


module.exports = router;
