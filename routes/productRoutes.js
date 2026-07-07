const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts); // URL: /api/products
router.get('/:id', getProductById); // URL: /api/products/:id
router.post('/', createProduct); // URL: /api/products
router.put('/:id', updateProduct); // URL: /api/products/:id
router.delete('/:id', deleteProduct); // URL: /api/products/:id

module.exports = router;