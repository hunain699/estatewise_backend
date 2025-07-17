const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve images
app.use('/uploads/blogImage', express.static(path.join(__dirname, '../uploads/blogImage')));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/inquiries', require('./routes/InquiriesRoutes'));
app.use('/api/feedbacks', require('./routes/feedbackRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/pakages', require('./routes/packageRoutes'));
app.use('/api/payment', require('./routes/payment'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
