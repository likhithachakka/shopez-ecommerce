const Order = require('../server/models/Order');
const Cart = require('../server/models/Cart');

const calculateShippingFee = (state, subtotal) => {
    if (!state) return 79;
    const metroStates = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat'];
    const fixedFee = metroStates.includes(state) ? 59 : 99;
    return subtotal > 5000 ? 0 : fixedFee;
};

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            paymentMethod,
            items,
        } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ message: 'Order requires at least one item.' });
        }

        if (!city || !state || !pincode) {
            return res.status(400).json({ message: 'City, state, and pincode are required for shipping.' });
        }

        const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0);
        const shippingFee = calculateShippingFee(state, subtotal);
        const gst = Number((subtotal * 0.05).toFixed(2));
        const total = Number((subtotal + shippingFee + gst).toFixed(2));

        const orderPayload = {
            userId: userId || 'guest',
            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            items,
            paymentMethod,
            shippingFee,
            gst,
            total,
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