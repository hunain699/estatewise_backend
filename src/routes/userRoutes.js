const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  signup,
  loginUser,
  getAllUsers,
  deleteUserById,
  getUserById,
} = require('../controllers/userController');

// Register with image
router.post('/signup', signup);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
