const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const morgan = require('morgan');

router.get('/', morgan('tiny'), ProductController.pageProducts);
router.post('/search', morgan('dev'), ProductController.pageProducts);

module.exports = router;