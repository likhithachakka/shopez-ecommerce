const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    mainimg: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    orderDate: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    paymentMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);