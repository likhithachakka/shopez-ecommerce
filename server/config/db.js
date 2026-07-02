const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB కనెక్ట్ అయ్యింది: ${conn.connection.host}`);
    } catch (error) {
        console.error(`డేటాబేస్ ఎర్రర్: ${error.message}`);
        process.exit(1); // యాప్‌ను ఆపివేయడానికి
    }
};

module.exports = connectDB;