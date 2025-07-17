const Property = require("../models/propertyModel");

const createProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      category,
      status,
      description,
      bedrooms,
      bathrooms,
      lotSize,
      yearBuild,
      garage,
      area,
      features,
    } = req.body;
    const images = req.files?.map(file => file.filename);

    // Check required fields
    const missingFields = []
    if (!title) missingFields.push("title")
    if (!location) missingFields.push("location")
    if (!price) missingFields.push("price")
    if (!category) missingFields.push("category")
    if (!images || images.length === 0) missingFields.push("images")

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields.join(", "))
      return res.status(400).json({ message: "Missing required fields", missingFields })
    }

    const property = new Property({
      title,
      location,
      price,
      category,
      images,
      status,
      description,
      bedrooms,
      bathrooms,
      lotSize,
      yearBuild,
      garage,
      area,
      features,
    });

    const savedProperty = await property.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating property:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete property by ID
const deletePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
};

