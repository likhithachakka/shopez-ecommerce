const Product = require('../server/models/Product');

const getProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, discount } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { category: new RegExp(search, 'i') }
            ];
        }

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (discount) {
            filter.discount = { $gte: Number(discount) };
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'సర్వర్ లో ఎర్రర్ ఉంది', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'సర్వర్ లో ఎర్రర్ ఉంది', error });
    }
};

const createProduct = async (req, res) => {
    try {
        const created = await Product.create(req.body);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: 'Unable to create product', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Unable to update product', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const removed = await Product.findByIdAndDelete(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete product', error });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };