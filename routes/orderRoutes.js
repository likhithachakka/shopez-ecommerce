const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getOrders); // URL: /api/orders
router.post('/', createOrder); // URL: /api/orders
module.exports = router;