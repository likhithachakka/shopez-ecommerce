const Order = require('../server/models/Order');
const Cart = require('../server/models/Cart');

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            mobile,
            address,
            pincode,
            paymentMethod,
            items,
        } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ message: 'Order requires at least one item.' });
        }

        const orderPayload = {
            userId: userId || 'guest',
            name,
            email,
            mobile,
            address,
            pincode,
            items,
            paymentMethod,
        };

        const newOrder = await Order.create(orderPayload);
        await Cart.deleteMany({ userId: orderPayload.userId });

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Order creation error', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = {};
        if (userId) {
            filter.userId = userId;
        }
        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Unable to load orders', error });
    }
};

module.exports = { createOrder, getOrders };