const Inquiry = require("../models/InquiriesModel");

const createInquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      timeframe,
      property_address,
      city,
      property_type,
      message,
      isResponse
    } = req.body;

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      timeframe,
      property_address,
      city,
      property_type,
      message,
      isResponse: isResponse || false,
      isDeleted: false
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json({ success: true, data: savedInquiry });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const properties = await Inquiry.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching Inquiry:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get property by ID
const getInquiryById = async (req, res) => {
  try {
    const property = await Inquiry.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching Inquiry:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete property by ID
const deleteInquiryById = async (req, res) => {
  try {
    const property = await Inquiry.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting Inquiry:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const toggleInquiryResponse = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // Toggle isResponse boolean
    inquiry.isResponse = !inquiry.isResponse;
    await inquiry.save();

    res.status(200).json({ message: "Inquiry response status updated", isResponse: inquiry.isResponse });
  } catch (error) {
    console.error("Error toggling Inquiry response:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createInquiry,
  getAllInquiries,
  toggleInquiryResponse,
  getInquiryById,
  deleteInquiryById,
};

