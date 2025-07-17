const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
    } = req.body;
    
    let blogImage = '';

    // ✅ Save only the filename instead of full path
    if (req.files && req.files['blogImage']) {
      blogImage = req.files['blogImage'][0].filename;
    }
    // Check required fields
    const missingFields = []
    if (!title) missingFields.push("title")
    if (!blogImage || blogImage.length === 0) missingFields.push("blogImage")

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields.join(", "))
      return res.status(400).json({ message: "Missing required fields", missingFields })
    }

    const property = new Blog({
      title,
      excerpt,
      content,
      category,
      blogImage,
      author,
      tags,
    });

    const savedProperty = await property.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating blogs:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const properties = await Blog.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get property by ID
const getBlogsById = async (req, res) => {
  try {
    const property = await Blog.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete property by ID
const deleteBlogsById = async (req, res) => {
  try {
    const property = await Blog.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blogs:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogsById,
  deleteBlogsById,
};

