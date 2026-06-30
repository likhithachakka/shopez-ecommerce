const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    mainimg: { type: String, required: true },
    sizes: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);