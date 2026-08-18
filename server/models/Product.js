const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mainimg: { type: String, required: true },
    carousel: { type: Array, required: true },
    sizes: { type: Array, required: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    gender: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);