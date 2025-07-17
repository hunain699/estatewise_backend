const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  deleteInquiryById,
  toggleInquiryResponse,
} = require('../controllers/contactController');

// Register with image
router.post('/', createInquiry);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.delete("/:id", deleteInquiryById);
router.patch("/:id/toggle-response", toggleInquiryResponse);

module.exports = router;
