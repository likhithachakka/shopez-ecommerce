const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', getCart); // URL: /api/cart?userId=guest
router.post('/', addToCart); // URL: /api/cart
router.put('/:id', updateCartItem); // URL: /api/cart/:id
router.delete('/:id', removeCartItem); // URL: /api/cart/:id
router.delete('/clear', clearCart); // URL: /api/cart/clear?userId=guest

module.exports = router;
