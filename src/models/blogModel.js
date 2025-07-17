const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  //Property Information
  title: String,
  excerpt: String,
  content:  String,
  author: String,
  blogImage: String,
  category: String,
  tags: [
      {
        type: String,
      }
    ],

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
