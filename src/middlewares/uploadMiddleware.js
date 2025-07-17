const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.fieldname === 'blogImage') {
      cb(null, 'uploads/blogImage/');
    }
    else {
      cb(null, 'uploads/'); 
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
