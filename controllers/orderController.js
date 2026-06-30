const Order = require('../models/Order');

// కొత్త ఆర్డర్ క్రియేట్ చేసే ఫంక్షన్
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await Order.create(newOrder);
        res.status(201).json({ message: "ఆర్డర్ విజయవంతంగా పూర్తయింది!", order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: "ఆర్డర్ సేవ్ చేయడంలో ఎర్రర్ వచ్చింది", error });
    }
};

module.exports = { createOrder };