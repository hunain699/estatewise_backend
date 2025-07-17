const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
} = require('../controllers/propertyController');

// Register with image
router.post('/',upload.array('images', 20), createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.delete("/:id", deletePropertyById);

module.exports = router;
