const express = require('express');
const { getProducts } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts); // URL: /api/products
module.exports = router;