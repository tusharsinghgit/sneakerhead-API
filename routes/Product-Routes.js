const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null,  file.originalname)
    },
  })
const upload = multer({ storage });
const router = express.Router();
const ProductController = require('../controller/ProductController');

router.get('/',ProductController.getAllProducts);
router.get('/distinct-product',ProductController.getDistinctProducts);
router.get('/by-brand',ProductController.getProductsByBrand);
router.get('/collab',ProductController.getCollabProducts);
router.get('/:id',ProductController.getProductById);
router.post('/',upload.fields([
  { name: 'images[0]', maxCount: 1 },
  { name: 'images[1]', maxCount: 1 },
  { name: 'images[2]', maxCount: 1 },
  { name: 'images[3]', maxCount: 1 },
  { name: 'images[4]', maxCount: 1 },
]), ProductController.createProducts);

router.put('/admin/:id', upload.fields([
  { name: 'images[0]', maxCount: 1 },
  { name: 'images[1]', maxCount: 1 },
  { name: 'images[2]', maxCount: 1 },
  { name: 'images[3]', maxCount: 1 },
  { name: 'images[4]', maxCount: 1 },
]), ProductController.updateProduct);
router.delete('/admin/:id', ProductController.deleteProduct);

module.exports = router;
