const Feedback = require("../models/feedbackModel");

const createFeedback = async (req, res) => {
  try {
    const { name, email, rating, comment, status } = req.body;

    if (!name || !email || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newFeedback = new Feedback({
      name,
      email,
      rating,
      comment,
      status: status || "Pending",
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({ success: true, data: savedFeedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Get all feedbacks (optionally filter out deleted)
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get single feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback || feedback.isDeleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Soft delete feedback by ID
const deleteFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback || feedback.isDeleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    feedback.isDeleted = true;
    await feedback.save();

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Toggle feedback status by ID
const toggleFeedbackStatus = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback || feedback.isDeleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Toggle between 'Pending' and 'Published'
    feedback.status = feedback.status === "Published" ? "Pending" : "Published";

    await feedback.save();

    res.status(200).json({ message: "Status updated successfully", updatedStatus: feedback.status });
  } catch (error) {
    console.error("Error toggling feedback status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedbackById,
  toggleFeedbackStatus
};
