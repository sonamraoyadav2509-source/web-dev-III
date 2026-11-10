
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const validateProduct = require('./middleware/validationMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Home Route
app.get('/', (req, res) => {
    res.send('Inventory Management API is Running');
});

// Product Routes
app.use('/api/products', (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return validateProduct(req, res, next);
    }
    next();
}, productRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
