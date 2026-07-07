const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            discount: { type: Number, default: 0 },
            mainimg: { type: String },
            size: { type: String }
        }
    ],
    paymentMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
