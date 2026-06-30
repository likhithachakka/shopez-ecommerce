const Product = require('../models/Product');

// అన్ని ప్రొడక్ట్స్ ని తెచ్చే ఫంక్షన్
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "సర్వర్ లో ఎర్రర్ ఉంది", error });
    }
};

module.exports = { getProducts };