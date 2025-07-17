const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

const {
  createBlog,
  getAllBlogs,
  getBlogsById,
  deleteBlogsById,
} = require('../controllers/blogController');

// Register with image
router.post('/', upload.fields([
    { name: 'blogImage', maxCount: 1 },
  ]), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogsById);
router.delete("/:id", deleteBlogsById);

module.exports = router;
