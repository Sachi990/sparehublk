const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer  = require('multer');
const ProductController = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { verifyAdmin } = require('../middleware/verifyAdmin.middleware');

// Configure Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

// Admin endpoints for product management
router.post('/', verifyToken, verifyAdmin, ProductController.addProduct);
router.put('/:id', verifyToken, verifyAdmin, ProductController.editProduct);
router.delete('/:id', verifyToken, verifyAdmin, ProductController.deleteProduct);

// Image upload endpoint (admin only)
router.post('/upload', verifyToken, verifyAdmin, upload.array('images', 5), (req, res) => {
  const imagePaths = req.files.map(file => '/uploads/' + file.filename);
  res.json({ images: imagePaths });
});

module.exports = router;
