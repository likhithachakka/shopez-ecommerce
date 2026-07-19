const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined. Check your environment file.');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB కనెక్ట్ అయ్యింది: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`డేటాబేస్ ఎర్రర్: ${error.message}`);
        console.warn('Continuing without MongoDB. Falling back to sample data for product listing.');
        return false;
    }
};

module.exports = connectDB;