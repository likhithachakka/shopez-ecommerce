const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, default: '' },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    region: { type: String, default: 'North' },
    usertype: { type: String, default: 'customer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);