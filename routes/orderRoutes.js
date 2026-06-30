const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder); // URL: /api/orders
module.exports = router;