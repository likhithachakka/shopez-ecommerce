const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');
const Product = require('./models/Product');
const seedProducts = require('./data/products');

// ఎన్విరాన్మెంట్ వేరియబుల్స్ లోడ్ చేయడం
const envPath = path.resolve(__dirname, 'er.env');
dotenv.config({ path: envPath });

// డేటాబేస్ కనెక్ట్ చేయడం
let dbConnected = false;

connectDB()
    .then(async (connected) => {
        dbConnected = Boolean(connected);
        if (dbConnected) {
            try {
                const count = await Product.countDocuments();
                if (count === 0) {
                    await Product.insertMany(seedProducts);
                    console.log('Seeded default products to MongoDB.');
                }
            } catch (seedError) {
                console.error('Product seed error:', seedError);
            }
        } else {
            console.log('Database not connected; skipping seed and using fallback data.');
        }
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });

const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
const cartRoutes = require('../routes/cartRoutes');

const app = express();

// మిడిల్‌వేర్ సెటప్
app.use(cors());
app.use(express.json()); // JSON డేటాను రీడ్ చేయడానికి

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// బేసిక్ రూట్ చెకింగ్ కోసం
app.get('/', (req, res) => {
    res.send('ShopEZ బ్యాకెండ్ సర్వర్ రన్ అవుతోంది...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`సర్వర్ పోర్ట్ ${PORT} పై విజయవంతంగా స్టార్ట్ అయ్యింది!`);
});