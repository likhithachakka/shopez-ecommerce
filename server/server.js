const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// ఎన్విరాన్మెంట్ వేరియబుల్స్ లోడ్ చేయడం
dotenv.config();

// డేటాబేస్ కనెక్ట్ చేయడం
connectDB();

const app = express();

// మిడిల్‌వేర్ సెటప్
app.use(cors());
app.use(express.json()); // JSON డేటాను రీడ్ చేయడానికి

// బేసిక్ రూట్ చెకింగ్ కోసం
app.get('/', (req, res) => {
    res.send('ShopEZ బ్యాకెండ్ సర్వర్ రన్ అవుతోంది...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`సర్వర్ పోర్ట్ ${PORT} పై విజయవంతంగా స్టార్ట్ అయ్యింది!`);
});