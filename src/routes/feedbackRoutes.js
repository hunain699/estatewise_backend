const express = require('express');
const router = express.Router();

const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedbackById,
  toggleFeedbackStatus,
} = require('../controllers/feedbackController');

// Create new feedback
router.post('/', createFeedback);

// Get all feedbacks
router.get('/', getAllFeedbacks);

// Get feedback by ID
router.get('/:id', getFeedbackById);

// Soft delete feedback by ID
router.delete('/:id', deleteFeedbackById);
router.patch("/:id/toggle-status", toggleFeedbackStatus);

module.exports = router;
